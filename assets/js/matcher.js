/**
 * EduPath AI - Client-Side Recommendation & NLP Matching Engine
 * Implements TF-IDF Cosine Similarity, Jaccard Set Overlap, 6-D Competency Profiler,
 * and Admissions Dossier Generator.
 */

// Simple tokenizer that extracts unigrams and bigrams
function tokenize(text) {
  const clean = (text || "")
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = clean.split(" ").filter(w => w.length > 2);
  const tokens = [...words];
  // Add bigrams
  for (let i = 0; i < words.length - 1; i++) {
    tokens.push(`${words[i]} ${words[i + 1]}`);
  }
  return tokens;
}

// Compute TF-IDF vectors and Cosine Similarity
function computeTFIDFCosineSimilarity(userText, corpusArray) {
  const allDocs = [userText, ...corpusArray];
  const N = allDocs.length;
  const tokenizedDocs = allDocs.map(doc => tokenize(doc));

  // Build Document Frequency (DF)
  const df = {};
  tokenizedDocs.forEach(docTokens => {
    const uniqueTokens = new Set(docTokens);
    uniqueTokens.forEach(t => {
      df[t] = (df[t] || 0) + 1;
    });
  });

  // Calculate TF-IDF vectors
  const vectors = tokenizedDocs.map(docTokens => {
    const tf = {};
    docTokens.forEach(t => {
      tf[t] = (tf[t] || 0) + 1;
    });

    const vec = {};
    let normSq = 0;
    Object.keys(tf).forEach(t => {
      // Sublinear TF scaling: 1 + ln(tf)
      const tfVal = 1 + Math.log(tf[t]);
      // Smooth IDF: ln((1 + N) / (1 + df)) + 1
      const idfVal = Math.log((1 + N) / (1 + (df[t] || 0))) + 1;
      const weight = tfVal * idfVal;
      vec[t] = weight;
      normSq += weight * weight;
    });

    const norm = Math.sqrt(normSq) || 1;
    // Normalize to unit length
    const unitVec = {};
    Object.keys(vec).forEach(t => {
      unitVec[t] = vec[t] / norm;
    });
    return unitVec;
  });

  const userVec = vectors[0];
  const cosineScores = [];

  for (let i = 1; i < vectors.length; i++) {
    const targetVec = vectors[i];
    let dotProduct = 0;
    Object.keys(userVec).forEach(token => {
      if (targetVec[token]) {
        dotProduct += userVec[token] * targetVec[token];
      }
    });
    cosineScores.push(dotProduct);
  }

  return cosineScores;
}

/**
 * Combines selected options with custom typed input
 */
function parseAndMergeInputs(selectedList, customTypedStr) {
  const combined = [...(selectedList || [])];
  if (customTypedStr && customTypedStr.trim()) {
    const items = customTypedStr
      .replace(/;/g, ",")
      .split(",")
      .map(i => i.trim())
      .filter(i => i.length > 0);

    items.forEach(item => {
      const exists = combined.some(c => c.toLowerCase() === item.toLowerCase());
      if (!exists) {
        combined.push(item);
      }
    });
  }
  return combined;
}

/**
 * Computes 6-D student competency metrics (0 to 100)
 */
function computeStudentRadarMetrics(userProfile) {
  const text = [
    ...(userProfile.subjects || []),
    ...(userProfile.skills || []),
    ...(userProfile.interests || []),
    userProfile.statement || ""
  ].join(" ").toLowerCase();

  const keywords = {
    tech: ["python", "code", "coding", "software", "computer", "linux", "algorithms", "ai", "cloud", "security", "web", "c++", "robotics", "dev"],
    math: ["math", "mathematics", "calculus", "linear algebra", "statistics", "probability", "logic", "quantitative", "discrete", "quant"],
    science: ["physics", "biology", "chemistry", "science", "lab", "genetics", "medical", "space", "quantum", "thermodynamics", "biomechanics"],
    business: ["business", "finance", "economics", "investing", "startup", "management", "stocks", "consulting", "marketing", "entrepreneurship"],
    design: ["design", "art", "figma", "visual", "ui", "ux", "creative", "drawing", "architecture", "interaction", "typography", "aesthetics"],
    leadership: ["leadership", "communication", "public speaking", "team", "debate", "management", "empathy", "negotiation", "policy"]
  };

  const scores = {};
  Object.keys(keywords).forEach(dim => {
    const kwList = keywords[dim];
    let hits = 0;
    kwList.forEach(kw => {
      if (text.includes(kw)) hits++;
    });
    // Scaled dynamically between baseline 35 and ceiling 95
    scores[dim] = Math.min(35 + (hits * 12), 95);
  });

  return scores;
}

/**
 * Calculates match percentage for all majors using the 4-tier composite formula:
 * Final Score = 0.35 * NLP + 0.30 * Interest + 0.20 * Skill + 0.15 * Prereq
 */
function calculateMajorMatches(userProfile) {
  const userSubjects = userProfile.subjects || [];
  const userInterests = userProfile.interests || [];
  const userSkills = userProfile.skills || [];
  const userStatement = userProfile.statement || "";

  const userText = `${userSubjects.join(" ")} ${userInterests.join(" ")} ${userSkills.join(" ")} ${userStatement}`.toLowerCase();

  const majorTexts = MAJORS_DATA.map(m => {
    return [
      m.title,
      m.category,
      m.description,
      m.skills.join(" "),
      m.interests.join(" "),
      (m.prerequisite_subjects || []).join(" "),
      (m.curriculum_highlights || []).join(" ")
    ].join(" ").toLowerCase();
  });

  const cosineScores = computeTFIDFCosineSimilarity(userText, majorTexts);

  const userSkillsSet = new Set(userSkills.map(s => s.toLowerCase()));
  const userInterestsSet = new Set(userInterests.map(i => i.toLowerCase()));
  const userSubjectsSet = new Set(userSubjects.map(s => s.toLowerCase()));

  const results = MAJORS_DATA.map((major, idx) => {
    const nlpScore = (cosineScores[idx] || 0) * 100;

    // Skill Overlap
    const majorSkillsLower = major.skills.map(s => s.toLowerCase());
    const matchedSkills = major.skills.filter(s => userSkillsSet.has(s.toLowerCase()));
    const skillScore = (matchedSkills.length / Math.max(major.skills.length, 1)) * 100;

    // Interest Overlap
    const majorInterestsLower = major.interests.map(i => i.toLowerCase());
    const matchedInterests = major.interests.filter(i => userInterestsSet.has(i.toLowerCase()));
    const interestScore = (matchedInterests.length / Math.max(major.interests.length, 1)) * 100;

    // Subject Prerequisite Alignment
    const prereqs = major.prerequisite_subjects || [];
    const matchedSubjects = prereqs.filter(p => userSubjectsSet.has(p.toLowerCase()));
    const subjectScore = prereqs.length > 0
      ? (matchedSubjects.length / prereqs.length) * 100
      : 70;

    // Multi-factor formula
    let finalScore = (
      (0.35 * nlpScore) +
      (0.30 * interestScore) +
      (0.20 * skillScore) +
      (0.15 * subjectScore)
    );

    // Realistic boundary adjustment [18.0, 98.8]
    finalScore = Math.min(Math.max(finalScore, 18.0), 98.8);

    return {
      id: major.id,
      title: major.title,
      category: major.category,
      degree_type: major.degree_type || "B.Sc. (3-4 Years)",
      match_score: Math.round(finalScore * 10) / 10,
      description: major.description,
      matched_skills: matchedSkills,
      recommended_skills: major.skills,
      careers: major.careers,
      avg_salary: major.avg_salary,
      growth_rate: major.growth_rate,
      top_universities: major.top_universities || [],
      curriculum_highlights: major.curriculum_highlights || [],
      radar_profile: major.radar_profile || {},
      scores_breakdown: {
        nlp: Math.round(nlpScore * 10) / 10,
        skill: Math.round(skillScore * 10) / 10,
        interest: Math.round(interestScore * 10) / 10,
        subject: Math.round(subjectScore * 10) / 10
      }
    };
  });

  // Sort descending by match score
  results.sort((a, b) => b.match_score - a.match_score);
  return results;
}

/**
 * Generates formatted text dossier for export
 */
function generateDossierText(userProfile, bestChoice, results) {
  const dateStr = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  return `================================================================================
🎓 EDUPATH AI - OFFICIAL STUDENT ACADEMIC & CAREER GUIDANCE DOSSIER
================================================================================
Generated Date: ${dateStr}
Platform: EduPath AI Intelligence Engine (Version 2.0 Enterprise)

--------------------------------------------------------------------------------
1. EXECUTIVE SUMMARY & PRIMARY ACADEMIC MATCH
--------------------------------------------------------------------------------
Primary Recommended Major: ${bestChoice.title}
Compatibility Rating:      ${bestChoice.match_score}% High Alignment
Degree Qualification:      ${bestChoice.degree_type}
Disciplinary Faculty:      ${bestChoice.category}
Global Compensation Range: ${bestChoice.avg_salary}
Industry Growth Horizon:   ${bestChoice.growth_rate}

Overview:
${bestChoice.description}

Key Career Trajectories:
- ${bestChoice.careers.join("\n- ")}

--------------------------------------------------------------------------------
2. CANDIDATE PROFILE ARCHITECTURE
--------------------------------------------------------------------------------
- Academic Subjects Studied:  ${(userProfile.subjects || []).join(", ")}
- Documented Skills:          ${(userProfile.skills || []).join(", ")}
- Passions & Domain Interests: ${(userProfile.interests || []).join(", ")}
- Personal Career Statement:
  "${userProfile.statement || "No statement provided"}"

--------------------------------------------------------------------------------
3. TOP ALTERNATIVE & INTERDISCIPLINARY PROGRAM RANKINGS
--------------------------------------------------------------------------------
${results.slice(1, 5).map((r, i) => `${i + 2}. ${r.title}
   Compatibility: ${r.match_score}% | Faculty: ${r.category}
   Careers: ${r.careers.slice(0, 3).join(", ")}`).join("\n\n")}

--------------------------------------------------------------------------------
4. CURRICULUM BLUEPRINT & PREPARATORY FOCUS FOR ${bestChoice.title.toUpperCase()}
--------------------------------------------------------------------------------
Core University Coursework:
- ${(bestChoice.curriculum_highlights || []).join("\n- ")}

Recommended High School Foundation Skills:
- ${(bestChoice.recommended_skills || []).join("\n- ")}

Target Higher Education Institutions:
- ${(bestChoice.top_universities || []).join("\n- ")}

--------------------------------------------------------------------------------
5. EUROPEAN TUITION & SCHOLARSHIP INTELLIGENCE
--------------------------------------------------------------------------------
- Italian Public Universities: Politecnico di Milano, Bologna, Sapienza, PoliTo.
- Standard Public Tuition: €1,000 to €3,800/yr (income-dependent).
- Regional DSU Grants: 100% Tuition Waiver + up to €7,000/yr Living Stipend + Free Meals.
- Entrance Exams: English TOLC-I, SAT, CIMEA Statement of Comparability.

================================================================================
Report End. Developed by Anas Saleem Khan.
EduPath AI: Empowering Prospective Undergraduates Worldwide.
================================================================================`;
}

/**
 * Evaluates draft Statement of Purpose (SOP)
 */
function evaluateSOPDraft(sopText, topMajor, userProfile) {
  if (!sopText || sopText.trim().length < 50) {
    return {
      score: 30,
      verdict: "Needs Expansion",
      strengths: ["Initial attempt to draft an introductory statement."],
      improvements: [
        "Your draft is too brief. Standard university SOPs should be 400 to 700 words.",
        "Provide concrete details regarding your high school projects, programming experience, or lab experiments.",
        `Explicitly state why you chose ${topMajor.title}.`
      ],
      keywordsFound: [],
      missingKeywords: topMajor.skills.slice(0, 4)
    };
  }

  const words = sopText.trim().split(/\s+/);
  const wordCount = words.length;
  const lowerSop = sopText.toLowerCase();

  // Check relevant skills and keywords
  const matchedKeywords = topMajor.skills.filter(s => lowerSop.includes(s.toLowerCase()));
  const missingKeywords = topMajor.skills.filter(s => !lowerSop.includes(s.toLowerCase()));

  let score = 50;

  // Length scoring
  if (wordCount >= 100 && wordCount <= 600) score += 20;
  else if (wordCount > 60) score += 12;

  // Keyword scoring
  const keywordRatio = matchedKeywords.length / Math.max(topMajor.skills.length, 1);
  score += Math.round(keywordRatio * 20);

  // Hook & narrative markers
  const intellectualMarkers = ["fascinated", "curiosity", "problem", "engineered", "built", "research", "aspire", "impact", "challenge"];
  const markerHits = intellectualMarkers.filter(m => lowerSop.includes(m)).length;
  score += Math.min(markerHits * 2, 10);

  score = Math.min(Math.max(score, 45), 96);

  const strengths = [];
  if (wordCount >= 80) strengths.push("Strong structural progression with clear personal motivation.");
  if (matchedKeywords.length > 0) strengths.push(`Effectively highlights relevant domain skills: ${matchedKeywords.join(", ")}.`);
  if (lowerSop.includes("impact") || lowerSop.includes("future") || lowerSop.includes("aspire")) {
    strengths.push("Articulates a clear forward-looking career trajectory and societal purpose.");
  } else {
    strengths.push("Clear, concise conversational tone.");
  }

  const improvements = [];
  if (missingKeywords.length > 0) {
    improvements.push(`Incorporate more technical rigor by mentioning specific foundational topics like: ${missingKeywords.slice(0, 3).join(", ")}.`);
  }
  if (!lowerSop.includes("politecnico") && !lowerSop.includes("university") && !lowerSop.includes("curriculum")) {
    improvements.push("Specify target academic institutions, faculties, or specific courses in the curriculum to show tailored preparation.");
  }
  if (!lowerSop.includes("project") && !lowerSop.includes("experiment") && !lowerSop.includes("portfolio")) {
    improvements.push("Add a specific anecdote describing a tangible personal project, competition, or research paper.");
  }

  return {
    score,
    wordCount,
    verdict: score >= 85 ? "Excellent Alignment" : score >= 70 ? "Good Foundation (Minor Refinements Needed)" : "Developing Draft",
    strengths,
    improvements,
    keywordsFound: matchedKeywords,
    missingKeywords: missingKeywords.slice(0, 4)
  };
}
