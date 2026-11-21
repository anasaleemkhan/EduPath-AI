"""
EduPath AI - Enterprise Recommendation & Multi-Factor Compatibility Engine.
Uses Natural Language Processing (TF-IDF + Cosine Similarity) and multi-factor
weighted scoring to calculate personalized academic compatibility and 6-D competency metrics.
"""

from typing import Dict, List, Tuple
from data import MAJORS_DATA

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    HAS_SKLEARN = True
except ImportError:
    HAS_SKLEARN = False


def parse_and_merge_inputs(selected_list: List[str], custom_typed_str: str) -> List[str]:
    """Combines predefined selections with user-typed comma-separated values."""
    combined = list(selected_list)
    if custom_typed_str and custom_typed_str.strip():
        # Split by comma or semicolon
        items = [i.strip() for i in custom_typed_str.replace(";", ",").split(",") if i.strip()]
        for itm in items:
            # Case-insensitive deduplication
            if not any(itm.lower() == existing.lower() for existing in combined):
                combined.append(itm)
    return combined


def compute_student_radar_metrics(user_profile: Dict) -> Dict[str, int]:
    """
    Computes 6-dimensional intellectual & career competency metrics (0-100)
    for the student based on their subjects, skills, interests, and aspirations.
    Dimensions:
    - tech: Computational & Algorithmic
    - math: Mathematical & Statistical Rigor
    - science: Physical & Life Sciences
    - business: Economics & Strategy
    - design: Creative & Human-Centered
    - leadership: Communication & Leadership
    """
    text = (
        " ".join(user_profile.get("subjects", [])) + " " +
        " ".join(user_profile.get("skills", [])) + " " +
        " ".join(user_profile.get("interests", [])) + " " +
        user_profile.get("statement", "")
    ).lower()

    keywords = {
        "tech": ["python", "code", "coding", "software", "computer", "linux", "algorithms", "ai", "cloud", "security", "web", "c++", "robotics"],
        "math": ["math", "mathematics", "calculus", "linear algebra", "statistics", "probability", "logic", "quantitative", "discrete", "quant"],
        "science": ["physics", "biology", "chemistry", "science", "lab", "genetics", "medical", "space", "quantum", "thermodynamics", "biomechanics"],
        "business": ["business", "finance", "economics", "investing", "startup", "management", "stocks", "consulting", "marketing", "entrepreneurship"],
        "design": ["design", "art", "figma", "visual", "ui", "ux", "creative", "drawing", "architecture", "interaction", "typography", "aesthetics"],
        "leadership": ["leadership", "communication", "public speaking", "team", "debate", "management", "empathy", "negotiation", "policy"]
    }

    scores = {}
    for dim, kw_list in keywords.items():
        hits = sum(1 for kw in kw_list if kw in text)
        # Scaled dynamically between baseline 35 and ceiling 95
        calc_score = min(35 + (hits * 12), 95)
        scores[dim] = calc_score

    return scores


def calculate_major_matches(user_profile: Dict) -> List[Dict]:
    """
    Computes a personalized compatibility score (0 to 100%) for each major
    based on student interests, preferred subjects, and core skills.
    """
    user_subjects_str = " ".join(user_profile.get("subjects", []))
    user_interests_str = " ".join(user_profile.get("interests", []))
    user_skills_str = " ".join(user_profile.get("skills", []))
    user_statement = user_profile.get("statement", "")

    # Comprehensive profile text
    user_text = f"{user_subjects_str} {user_interests_str} {user_skills_str} {user_statement}".lower()

    # Build corpus from all majors in knowledge base
    major_texts = []
    for m in MAJORS_DATA:
        major_corpus = (
            f"{m['title']} {m['category']} {m['description']} "
            f"{' '.join(m['skills'])} {' '.join(m['interests'])} {' '.join(m.get('prerequisite_subjects', []))} "
            f"{' '.join(m.get('curriculum_highlights', []))}"
        ).lower()
        major_texts.append(major_corpus)

    cosine_scores = []
    if HAS_SKLEARN:
        # NLP TF-IDF Cosine Similarity calculation with sublinear tf scaling
        vectorizer = TfidfVectorizer(stop_words="english", sublinear_tf=True, ngram_range=(1, 2))
        tfidf_matrix = vectorizer.fit_transform([user_text] + major_texts)
        user_vector = tfidf_matrix[0]
        major_vectors = tfidf_matrix[1:]
        cosine_scores = cosine_similarity(user_vector, major_vectors).flatten()
    else:
        # Fallback word-frequency similarity if sklearn is absent
        user_words = set(user_text.split())
        for corpus in major_texts:
            major_words = set(corpus.split())
            intersection = user_words.intersection(major_words)
            sim = len(intersection) / max(len(user_words), 1)
            cosine_scores.append(sim)

    results = []
    user_skills_set = set([s.lower() for s in user_profile.get("skills", [])])
    user_interests_set = set([i.lower() for i in user_profile.get("interests", [])])
    user_subjects_set = set([subj.lower() for subj in user_profile.get("subjects", [])])

    for idx, major in enumerate(MAJORS_DATA):
        nlp_score = float(cosine_scores[idx]) * 100

        # Skill overlap calculation
        major_skills = set([s.lower() for s in major["skills"]])
        skill_matches = user_skills_set.intersection(major_skills)
        skill_score = (len(skill_matches) / max(len(major["skills"]), 1)) * 100

        # Interest overlap calculation
        major_interests = set([i.lower() for i in major["interests"]])
        interest_matches = user_interests_set.intersection(major_interests)
        interest_score = (len(interest_matches) / max(len(major["interests"]), 1)) * 100

        # Subject alignment
        prereqs = set([p.lower() for p in major.get("prerequisite_subjects", [])])
        subject_matches = user_subjects_set.intersection(prereqs)
        subject_score = (len(subject_matches) / max(len(prereqs), 1)) * 100 if prereqs else 70

        # Weighted composite score:
        # 35% NLP semantic context + 30% Interest overlap + 20% Skill alignment + 15% Subject prerequisites
        final_score = (
            (0.35 * nlp_score) +
            (0.30 * interest_score) +
            (0.20 * skill_score) +
            (0.15 * subject_score)
        )

        # Realistic boundary adjustment
        final_score = min(max(final_score, 18.0), 98.8)

        results.append({
            "id": major["id"],
            "title": major["title"],
            "category": major["category"],
            "degree_type": major.get("degree_type", "B.Sc. (3-4 Years)"),
            "match_score": round(final_score, 1),
            "description": major["description"],
            "matched_skills": [s.title() for s in skill_matches],
            "recommended_skills": major["skills"],
            "careers": major["careers"],
            "avg_salary": major["avg_salary"],
            "growth_rate": major["growth_rate"],
            "top_universities": major.get("top_universities", []),
            "curriculum_highlights": major.get("curriculum_highlights", []),
            "radar_profile": major.get("radar_profile", {})
        })

    # Sort descending by match score
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results
