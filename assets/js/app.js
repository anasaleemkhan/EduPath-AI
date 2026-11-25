/**
 * EduPath AI - Main Application Controller
 * Handles interactive Profile Builder, Chart.js 6-D Radar, Real-Time Recommender,
 * Advisor Chatbot, SOP Evaluator, and Modal Dialogs.
 */

// Application State
const state = {
  selectedSubjects: ["Mathematics", "Physics", "Computer Science"],
  customSubjects: [],
  selectedInterests: ["coding", "ai", "building apps"],
  customInterests: [],
  selectedSkills: ["Problem Solving", "Logic", "Python"],
  customSkills: [],
  statement: "I am passionate about applying intelligent software, mathematical models, and engineering to solve pressing real-world challenges.",
  radarChart: null,
  currentResults: [],
  bestChoice: null,
  catalogFilter: "all",
  catalogSearch: "",
  geminiApiKey: localStorage.getItem("gemini_api_key") || "",
  chatMessages: []
};

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initProfileBuilder();
  initRadarChart();
  updateRecommendations();
  initCatalog();
  initUniversityGuide();
  initChatbot();
  initSOPEvaluator();
  initDossierModal();
  initMobileMenu();
});

// -------------------------------------------------------------
// 1. Profile Builder & Tag Selection
// -------------------------------------------------------------
function initProfileBuilder() {
  renderTags("subjects-container", PREDEFINED_SUBJECTS, state.customSubjects, state.selectedSubjects, "subject");
  renderTags("interests-container", PREDEFINED_INTERESTS, state.customInterests, state.selectedInterests, "interest");
  renderTags("skills-container", PREDEFINED_SKILLS, state.customSkills, state.selectedSkills, "skill");

  // Custom Input Listeners
  setupCustomInput("custom-subject-input", "add-subject-btn", "customSubjects", "selectedSubjects", "subjects-container", PREDEFINED_SUBJECTS, "subject");
  setupCustomInput("custom-interest-input", "add-interest-btn", "customInterests", "selectedInterests", "interests-container", PREDEFINED_INTERESTS, "interest");
  setupCustomInput("custom-skill-input", "add-skill-btn", "customSkills", "selectedSkills", "skills-container", PREDEFINED_SKILLS, "skill");

  // Statement textarea
  const statementArea = document.getElementById("career-statement-input");
  if (statementArea) {
    statementArea.value = state.statement;
    statementArea.addEventListener("input", (e) => {
      state.statement = e.target.value;
      updateRecommendations();
    });
  }

  // Sample prompt buttons
  const sampleBtn1 = document.getElementById("sample-prompt-1");
  const sampleBtn2 = document.getElementById("sample-prompt-2");
  if (sampleBtn1) {
    sampleBtn1.addEventListener("click", () => {
      statementArea.value = "I am fascinated by how machine learning and neural architectures can automate scientific discoveries and autonomous robotics.";
      state.statement = statementArea.value;
      updateRecommendations();
    });
  }
  if (sampleBtn2) {
    sampleBtn2.addEventListener("click", () => {
      statementArea.value = "I aim to combine quantitative economic modeling, algorithmic trading, and software systems to build scalable FinTech platforms.";
      state.statement = statementArea.value;
      updateRecommendations();
    });
  }
}

function renderTags(containerId, standardList, customList, selectedList, type) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  // Predefined standard tags
  standardList.forEach(item => {
    const isSelected = selectedList.includes(item);
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `tag-pill ${isSelected ? "active" : ""}`;
    pill.textContent = item;
    pill.addEventListener("click", () => {
      toggleSelection(selectedList, item);
      pill.classList.toggle("active");
      updateRecommendations();
    });
    container.appendChild(pill);
  });

  // Custom tags
  customList.forEach(item => {
    const isSelected = selectedList.includes(item);
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `tag-pill tag-custom ${isSelected ? "active" : ""}`;
    pill.innerHTML = `<span>${item}</span><span class="tag-remove">&times;</span>`;

    // Click on text toggles selection
    pill.addEventListener("click", (e) => {
      if (e.target.classList.contains("tag-remove")) {
        // Remove custom tag
        const cIdx = customList.indexOf(item);
        if (cIdx > -1) customList.splice(cIdx, 1);
        const sIdx = selectedList.indexOf(item);
        if (sIdx > -1) selectedList.splice(sIdx, 1);
        renderTags(containerId, standardList, customList, selectedList, type);
        updateRecommendations();
        return;
      }
      toggleSelection(selectedList, item);
      pill.classList.toggle("active");
      updateRecommendations();
    });

    container.appendChild(pill);
  });
}

function toggleSelection(list, item) {
  const idx = list.indexOf(item);
  if (idx > -1) {
    list.splice(idx, 1);
  } else {
    list.push(item);
  }
}

function setupCustomInput(inputId, btnId, customArrayName, selectedArrayName, containerId, standardList, type) {
  const input = document.getElementById(inputId);
  const btn = document.getElementById(btnId);

  const addCustom = () => {
    const val = input.value.trim();
    if (!val) return;
    const items = val.split(/[,;]/).map(i => i.trim()).filter(i => i.length > 0);
    items.forEach(itm => {
      if (!state[customArrayName].includes(itm) && !standardList.includes(itm)) {
        state[customArrayName].push(itm);
      }
      if (!state[selectedArrayName].includes(itm)) {
        state[selectedArrayName].push(itm);
      }
    });
    input.value = "";
    renderTags(containerId, standardList, state[customArrayName], state[selectedArrayName], type);
    updateRecommendations();
  };

  if (btn) btn.addEventListener("click", addCustom);
  if (input) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        addCustom();
      }
    });
  }
}

// -------------------------------------------------------------
// 2. Recommendation Engine & Radar Chart
// -------------------------------------------------------------
function updateRecommendations() {
  const userProfile = {
    subjects: state.selectedSubjects,
    interests: state.selectedInterests,
    skills: state.selectedSkills,
    statement: state.statement
  };

  const results = calculateMajorMatches(userProfile);
  state.currentResults = results;
  state.bestChoice = results[0];

  const radarMetrics = computeStudentRadarMetrics(userProfile);

  // Update Top Metrics
  const topMajorEl = document.getElementById("metric-top-major");
  const matchScoreEl = document.getElementById("metric-match-score");
  const activeSkillsEl = document.getElementById("metric-active-skills");

  if (topMajorEl) topMajorEl.textContent = state.bestChoice.title;
  if (matchScoreEl) matchScoreEl.textContent = `${state.bestChoice.match_score}%`;
  if (activeSkillsEl) activeSkillsEl.textContent = `${state.selectedSkills.length} Attributes`;

  // Update Radar Chart
  updateRadarChart(radarMetrics);

  // Render Top 4 Recommendation Cards
  renderTopRecommendations(results.slice(0, 4));

  // Render Curriculum Spotlight for #1 choice
  renderCurriculumSpotlight(state.bestChoice);
}

function initRadarChart() {
  const ctx = document.getElementById("radarChart");
  if (!ctx) return;

  const labels = [
    "Computational Tech",
    "Mathematical Rigor",
    "Physical/Life Sciences",
    "Economics & Strategy",
    "Design & Aesthetics",
    "Leadership & Communication"
  ];

  state.radarChart = new Chart(ctx, {
    type: "radar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Your Competency Aptitude",
          data: [75, 75, 60, 50, 60, 50],
          backgroundColor: "rgba(37, 99, 235, 0.22)",
          borderColor: "#2563eb",
          pointBackgroundColor: "#1d4ed8",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#1d4ed8",
          borderWidth: 2,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            display: false
          },
          grid: {
            color: "rgba(203, 213, 225, 0.5)"
          },
          angleLines: {
            color: "rgba(203, 213, 225, 0.5)"
          },
          pointLabels: {
            font: {
              size: 11,
              weight: "600",
              family: "Plus Jakarta Sans"
            },
            color: "#334155"
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              return ` Score: ${context.raw} / 100`;
            }
          }
        }
      }
    }
  });
}

function updateRadarChart(metrics) {
  if (!state.radarChart) return;
  const values = [
    metrics.tech || 50,
    metrics.math || 50,
    metrics.science || 50,
    metrics.business || 50,
    metrics.design || 50,
    metrics.leadership || 50
  ];
  state.radarChart.data.datasets[0].data = values;
  state.radarChart.update();
}

function renderTopRecommendations(topList) {
  const container = document.getElementById("top-recommendations-list");
  if (!container) return;

  container.innerHTML = "";

  topList.forEach((major, idx) => {
    const card = document.createElement("div");
    card.className = `major-card ${idx === 0 ? "top-rank" : ""}`;

    const scoreColor = major.match_score >= 80 ? "badge-blue" : major.match_score >= 65 ? "badge-green" : "badge-purple";

    card.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div class="flex items-center gap-2">
          <span class="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">#${idx + 1}</span>
          <h3 class="font-bold text-slate-900 text-lg hover:text-blue-600 transition cursor-pointer" onclick="openMajorModal('${major.id}')">${major.title}</h3>
        </div>
        <span class="${scoreColor} text-sm font-bold shadow-sm">${major.match_score}% Match</span>
      </div>

      <div class="flex flex-wrap gap-1.5 mb-3">
        <span class="badge-blue">${major.category}</span>
        <span class="badge-purple">${major.degree_type}</span>
      </div>

      <p class="text-slate-600 text-sm mb-3 leading-relaxed">${major.description}</p>

      <div class="text-xs text-slate-700 space-y-1.5 mb-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
        <div><strong>💼 Careers:</strong> ${major.careers.slice(0, 3).join(", ")}</div>
        <div><strong>💰 Outlook:</strong> ${major.avg_salary} &bull; <span class="text-emerald-700 font-medium">Growth: ${major.growth_rate}</span></div>
        <div><strong>🏛️ Top Hubs:</strong> ${major.top_universities.slice(0, 3).join(", ")}</div>
      </div>

      <div class="flex items-center justify-between pt-2 border-t border-slate-100">
        <div class="text-xs text-slate-500">
          Matched Skills: <span class="text-blue-700 font-semibold">${major.matched_skills.length} / ${major.recommended_skills.length}</span>
        </div>
        <button type="button" class="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1" onclick="openMajorModal('${major.id}')">
          Full Program Details &rarr;
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderCurriculumSpotlight(bestMajor) {
  const titleEl = document.getElementById("spotlight-title");
  const coursesContainer = document.getElementById("spotlight-courses");
  const skillsContainer = document.getElementById("spotlight-skills");

  if (titleEl) titleEl.textContent = bestMajor.title;

  if (coursesContainer) {
    coursesContainer.innerHTML = "";
    (bestMajor.curriculum_highlights || []).forEach(course => {
      const li = document.createElement("li");
      li.className = "flex items-start gap-2 text-sm text-slate-700";
      li.innerHTML = `<span class="text-blue-500 font-bold mt-0.5">&bull;</span><span>${course}</span>`;
      coursesContainer.appendChild(li);
    });
  }

  if (skillsContainer) {
    skillsContainer.innerHTML = "";
    (bestMajor.recommended_skills || []).forEach(skill => {
      const li = document.createElement("li");
      li.className = "flex items-start gap-2 text-sm text-slate-700";
      li.innerHTML = `<span class="text-emerald-500 font-bold mt-0.5">&check;</span><span>${skill}</span>`;
      skillsContainer.appendChild(li);
    });
  }
}

// -------------------------------------------------------------
// 3. Full Programs Catalog & Filter
// -------------------------------------------------------------
function initCatalog() {
  const searchInput = document.getElementById("catalog-search");
  const filterBtns = document.querySelectorAll(".catalog-filter-btn");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.catalogSearch = e.target.value.toLowerCase().trim();
      renderCatalogGrid();
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active", "bg-blue-600", "text-white"));
      filterBtns.forEach(b => b.classList.add("bg-white", "text-slate-700"));
      btn.classList.add("active", "bg-blue-600", "text-white");
      btn.classList.remove("bg-white", "text-slate-700");
      state.catalogFilter = btn.dataset.category || "all";
      renderCatalogGrid();
    });
  });

  renderCatalogGrid();
}

function renderCatalogGrid() {
  const container = document.getElementById("catalog-grid");
  if (!container) return;

  container.innerHTML = "";

  const filtered = MAJORS_DATA.filter(major => {
    // Category check
    let matchesCategory = true;
    if (state.catalogFilter !== "all") {
      matchesCategory = major.category.toLowerCase().includes(state.catalogFilter.toLowerCase());
    }

    // Search check
    let matchesSearch = true;
    if (state.catalogSearch) {
      const q = state.catalogSearch;
      matchesSearch = (
        major.title.toLowerCase().includes(q) ||
        major.category.toLowerCase().includes(q) ||
        major.description.toLowerCase().includes(q) ||
        major.careers.some(c => c.toLowerCase().includes(q)) ||
        major.skills.some(s => s.toLowerCase().includes(q))
      );
    }

    return matchesCategory && matchesSearch;
  });

  const countEl = document.getElementById("catalog-count");
  if (countEl) countEl.textContent = `Showing ${filtered.length} of ${MAJORS_DATA.length} Programs`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center text-slate-500">
        <p class="text-base font-semibold">No undergraduate programs matched your search criteria.</p>
        <p class="text-sm mt-1">Try resetting the filter or typing keywords like "Software", "Physics", or "Business".</p>
      </div>
    `;
    return;
  }

  filtered.forEach(major => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition hover:-translate-y-1 flex flex-col justify-between";

    card.innerHTML = `
      <div>
        <div class="flex items-start justify-between gap-2 mb-2">
          <span class="badge-blue text-xs">${major.category}</span>
          <span class="text-xs text-slate-500 font-medium">${major.degree_type}</span>
        </div>
        <h4 class="font-bold text-slate-900 text-base mb-2 hover:text-blue-600 transition cursor-pointer" onclick="openMajorModal('${major.id}')">${major.title}</h4>
        <p class="text-slate-600 text-xs line-clamp-3 mb-4 leading-relaxed">${major.description}</p>
        
        <div class="space-y-1 text-xs text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <div><strong class="text-slate-800">Careers:</strong> ${major.careers.slice(0, 2).join(", ")}</div>
          <div><strong class="text-slate-800">Top Universities:</strong> ${major.top_universities.slice(0, 2).join(", ")}</div>
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span class="text-xs font-semibold text-emerald-600">${major.growth_rate}</span>
        <button type="button" class="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition" onclick="openMajorModal('${major.id}')">
          View Syllabus &rarr;
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// -------------------------------------------------------------
// 4. Target University & Scholarship Guide
// -------------------------------------------------------------
function initUniversityGuide() {
  const container = document.getElementById("universities-container");
  if (!container) return;

  container.innerHTML = "";

  UNIVERSITIES_DIRECTORY.forEach(uni => {
    const card = document.createElement("div");
    card.className = "bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition";

    card.innerHTML = `
      <div class="flex items-start justify-between gap-2 mb-2">
        <h4 class="font-bold text-slate-900 text-base">${uni.name}</h4>
        <span class="badge-blue text-xs whitespace-nowrap">${uni.country}</span>
      </div>
      <p class="text-xs text-blue-700 font-semibold mb-2">${uni.rank}</p>
      
      <div class="space-y-2 text-xs text-slate-600 mb-3">
        <div class="bg-slate-50 p-2 rounded">
          <strong class="text-slate-800">💶 Tuition:</strong> ${uni.tuition}
        </div>
        <div class="bg-amber-50 text-amber-900 p-2 rounded border border-amber-100">
          <strong>🎁 Scholarships:</strong> ${uni.scholarship}
        </div>
        <div>
          <strong class="text-slate-800">📝 Entrance Exams:</strong> ${uni.entrance_tests.join(", ")}
        </div>
        <div>
          <strong class="text-slate-800">🇬🇧 English Curricula:</strong> ${uni.english_programs}
        </div>
      </div>

      <div class="text-xs text-slate-500 pt-2 border-t border-slate-100">
        <span class="font-semibold text-slate-700">Top Strengths:</span> ${uni.key_fields.join(", ")}
      </div>
    `;

    container.appendChild(card);
  });
}

// -------------------------------------------------------------
// 5. Interactive Academic Advisor Chatbot
// -------------------------------------------------------------
function initChatbot() {
  const chatMessagesEl = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send-btn");
  const pills = document.querySelectorAll(".chat-prompt-pill");

  // Initial welcome message from Dr. Sophia Laurent
  appendChatMessage(
    "assistant",
    `Hello! I am **Dr. Sophia Laurent**, your senior academic counselor. Based on your profile, you are currently an outstanding match for **${state.bestChoice.title}**! How can I assist you with European entrance tests (like TOLC-I), university requirements, or course selection today?`
  );

  // Quick prompt pills
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      const topic = pill.dataset.topic;
      const question = pill.textContent.trim();
      handleChatInteraction(question, topic);
    });
  });

  // User input submission
  const submitChat = () => {
    const query = chatInput.value.trim();
    if (!query) return;
    chatInput.value = "";
    handleChatInteraction(query, null);
  };

  if (sendBtn) sendBtn.addEventListener("click", submitChat);
  if (chatInput) {
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        submitChat();
      }
    });
  }

  // Gemini API Key config button
  const apiKeyBtn = document.getElementById("api-key-config-btn");
  if (apiKeyBtn) {
    apiKeyBtn.addEventListener("click", () => {
      const key = prompt("Enter your free Google Gemini API Key (from https://aistudio.google.com/):", state.geminiApiKey);
      if (key !== null) {
        state.geminiApiKey = key.trim();
        localStorage.setItem("gemini_api_key", state.geminiApiKey);
        alert(state.geminiApiKey ? "✅ Gemini API Key saved locally!" : "ℹ️ Gemini API Key cleared. Built-in knowledge base will be used.");
      }
    });
  }
}

function handleChatInteraction(query, topicKey) {
  appendChatMessage("user", query);

  const chatContainer = document.getElementById("chat-messages");

  // Show typing indicator
  const typingIndicator = document.createElement("div");
  typingIndicator.className = "flex items-center gap-2 text-xs text-slate-500 py-2";
  typingIndicator.id = "typing-indicator";
  typingIndicator.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs font-bold">SL</div>
    <span>Dr. Sophia Laurent is formulating guidance...</span>
  `;
  chatContainer.appendChild(typingIndicator);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  setTimeout(async () => {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) indicator.remove();

    let responseText = "";

    // 1. If Gemini API Key is configured, attempt direct Gemini API call
    if (state.geminiApiKey) {
      try {
        responseText = await callGeminiAPI(query);
      } catch (err) {
        console.warn("Gemini API call failed, falling back to local advisor:", err);
      }
    }

    // 2. Fallback to knowledge base or contextual smart responses
    if (!responseText) {
      if (topicKey && ADVISOR_KNOWLEDGE_BASE[topicKey]) {
        responseText = ADVISOR_KNOWLEDGE_BASE[topicKey].content;
      } else {
        responseText = generateContextualAdvisorResponse(query);
      }
    }

    appendChatMessage("assistant", responseText);
  }, 600);
}

function generateContextualAdvisorResponse(query) {
  const q = query.toLowerCase();
  const topMajor = state.bestChoice;

  if (q.includes("polimi") || q.includes("milano") || q.includes("tolc")) {
    return ADVISOR_KNOWLEDGE_BASE.polimi.content;
  }
  if (q.includes("dsu") || q.includes("scholarship") || q.includes("stipend") || q.includes("waiver")) {
    return ADVISOR_KNOWLEDGE_BASE.dsu_scholarships.content;
  }
  if (q.includes("roadmap") || q.includes("year") || q.includes("career path")) {
    return `### Academic & Milestone Roadmap for ${topMajor.title}
${ADVISOR_KNOWLEDGE_BASE.roadmap.content}

**Recommended Foundational Coursework for you:**
- ${topMajor.curriculum_highlights.slice(0, 3).join(", ")}.`;
  }
  if (q.includes("compare") || q.includes("difference") || q.includes("versus") || q.includes("vs")) {
    return ADVISOR_KNOWLEDGE_BASE.compare_cs_ds_ai.content;
  }
  if (q.includes("sop") || q.includes("statement") || q.includes("letter") || q.includes("essay")) {
    return ADVISOR_KNOWLEDGE_BASE.sop_tips.content;
  }

  // Default contextual counseling response
  return `### Academic Counseling Guidance: ${topMajor.title}
Thank you for your question regarding **${query}**!

As an applicant aiming for **${topMajor.title}**, here are key takeaways based on your current skill profile (${state.selectedSkills.slice(0, 3).join(", ")}):
1. **Academic Alignment:** Your background in ${(state.selectedSubjects || []).join(", ")} provides a solid springboard for technical undergraduate curricula in Europe.
2. **Key Target Schools:** You should strongly consider **${topMajor.top_universities.slice(0, 2).join(" and ")}**, which offer English-taught curricula and affordable public tuition.
3. **Actionable Next Step:** Prepare for standardized entrance requirements (e.g. English TOLC-I, SAT) and start drafting your personal project portfolio.

*Feel free to ask about specific scholarships (like Italian DSU), course comparisons, or motivation letter tips!*`;
}

async function callGeminiAPI(userPrompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${state.geminiApiKey}`;
  const systemInstruction = `You are Dr. Sophia Laurent, an elite undergraduate admissions advisor. The student received a top match for ${state.bestChoice.title}. They studied ${state.selectedSubjects.join(", ")}, with skills in ${state.selectedSkills.join(", ")}. Provide structured, encouraging, actionable academic advice.`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [
          { text: `${systemInstruction}\n\nStudent Inquiry: ${userPrompt}` }
        ]
      }
    ]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error(`Gemini HTTP Error ${res.status}`);
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

function appendChatMessage(role, text) {
  const chatContainer = document.getElementById("chat-messages");
  if (!chatContainer) return;

  const wrapper = document.createElement("div");
  wrapper.className = `flex gap-3 mb-4 ${role === "user" ? "justify-end" : "justify-start"}`;

  if (role === "assistant") {
    // Format markdown-like elements (bold, lists, headers)
    const formatted = formatMarkdown(text);
    wrapper.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-blue-600 text-white flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-sm">SL</div>
      <div class="chat-bubble-assistant text-slate-800 text-sm leading-relaxed">${formatted}</div>
    `;
  } else {
    wrapper.innerHTML = `
      <div class="chat-bubble-user text-sm">${escapeHTML(text)}</div>
      <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex-shrink-0 flex items-center justify-center text-xs font-bold">You</div>
    `;
  }

  chatContainer.appendChild(wrapper);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function formatMarkdown(text) {
  let html = escapeHTML(text);
  // Headers
  html = html.replace(/### (.*?)\n/g, '<h4 class="font-bold text-blue-900 text-sm mt-2 mb-1">$1</h4>');
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-slate-900">$1</strong>');
  // Bullet points
  html = html.replace(/- (.*?)\n/g, '<li class="ml-4 list-disc">$1</li>');
  // Newlines
  html = html.replace(/\n\n/g, '<p class="mb-2"></p>');
  html = html.replace(/\n/g, '<br>');
  return html;
}

function escapeHTML(str) {
  const div = document.createElement("div");
  div.innerText = str;
  return div.innerHTML;
}

// -------------------------------------------------------------
// 6. Statement of Purpose (SOP) Evaluator
// -------------------------------------------------------------
function initSOPEvaluator() {
  const sopInput = document.getElementById("sop-textarea");
  const evaluateBtn = document.getElementById("sop-evaluate-btn");
  const resultsCard = document.getElementById("sop-results-card");

  if (evaluateBtn && sopInput) {
    evaluateBtn.addEventListener("click", () => {
      const text = sopInput.value.trim();
      const review = evaluateSOPDraft(text, state.bestChoice, {
        subjects: state.selectedSubjects,
        skills: state.selectedSkills,
        interests: state.selectedInterests
      });

      renderSOPResults(review);
    });
  }
}

function renderSOPResults(review) {
  const container = document.getElementById("sop-results-container");
  const card = document.getElementById("sop-results-card");
  if (!container || !card) return;

  card.classList.remove("hidden");

  const scoreBadgeColor = review.score >= 80 ? "bg-emerald-100 text-emerald-800" : review.score >= 65 ? "bg-blue-100 text-blue-800" : "bg-amber-100 text-amber-800";

  container.innerHTML = `
    <div class="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
      <div>
        <div class="text-xs uppercase tracking-wider text-slate-500 font-bold">Admissions Rubric Rating</div>
        <div class="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <span>${review.score} / 100</span>
          <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${scoreBadgeColor}">${review.verdict}</span>
        </div>
      </div>
      <div class="text-xs text-slate-600 text-right">
        <div><strong>Word Count:</strong> ${review.wordCount || 0} words</div>
        <div><strong>Target Major:</strong> ${state.bestChoice.title}</div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div class="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
        <h5 class="text-sm font-bold text-emerald-900 mb-2 flex items-center gap-1.5">
          <span>&check;</span> Key Strengths Identified
        </h5>
        <ul class="text-xs text-emerald-800 space-y-1.5 list-disc list-inside">
          ${review.strengths.map(s => `<li>${s}</li>`).join("")}
        </ul>
      </div>

      <div class="bg-amber-50/50 p-4 rounded-xl border border-amber-100">
        <h5 class="text-sm font-bold text-amber-900 mb-2 flex items-center gap-1.5">
          <span>&excl;</span> Actionable Rewrite Recommendations
        </h5>
        <ul class="text-xs text-amber-800 space-y-1.5 list-disc list-inside">
          ${review.improvements.map(i => `<li>${i}</li>`).join("")}
        </ul>
      </div>
    </div>

    <div class="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
      <strong>Foundational Keywords Included:</strong> 
      <span class="text-emerald-700 font-medium">${review.keywordsFound.length > 0 ? review.keywordsFound.join(", ") : "None detected yet"}</span>
      ${review.missingKeywords.length > 0 ? `<br><strong class="text-slate-800 mt-1 inline-block">Recommended Technical Keywords to Add:</strong> <span class="text-blue-700">${review.missingKeywords.join(", ")}</span>` : ""}
    </div>
  `;

  card.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// -------------------------------------------------------------
// 7. Dossier Export & Modal
// -------------------------------------------------------------
function initDossierModal() {
  const downloadBtn = document.getElementById("download-dossier-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const userProfile = {
        subjects: state.selectedSubjects,
        interests: state.selectedInterests,
        skills: state.selectedSkills,
        statement: state.statement
      };

      const dossierText = generateDossierText(userProfile, state.bestChoice, state.currentResults);
      const blob = new Blob([dossierText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `EduPath_Academic_Dossier_${state.bestChoice.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Modal setup
  const modalOverlay = document.getElementById("majorModal");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener("click", () => {
      modalOverlay.classList.remove("open");
    });
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("open");
      }
    });
  }
}

function openMajorModal(majorId) {
  const major = MAJORS_DATA.find(m => m.id === majorId);
  if (!major) return;

  const modalOverlay = document.getElementById("majorModal");
  const modalContent = document.getElementById("modal-body");
  if (!modalOverlay || !modalContent) return;

  modalContent.innerHTML = `
    <div class="p-6">
      <div class="flex items-start justify-between gap-3 mb-3">
        <div>
          <span class="badge-blue text-xs mb-1">${major.category}</span>
          <h3 class="text-xl font-bold text-slate-900">${major.title}</h3>
          <span class="text-xs text-slate-500 font-medium">${major.degree_type}</span>
        </div>
      </div>

      <p class="text-sm text-slate-600 mb-5 leading-relaxed">${major.description}</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <div class="text-xs text-slate-500 font-semibold mb-1">💼 Career Trajectories</div>
          <div class="text-xs text-slate-800 font-medium leading-normal">${major.careers.join(", ")}</div>
        </div>
        <div class="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
          <div class="text-xs text-slate-500 font-semibold mb-1">💰 Global Salary & Growth</div>
          <div class="text-xs text-slate-800 font-medium">${major.avg_salary}</div>
          <div class="text-xs text-emerald-700 font-semibold mt-0.5">${major.growth_rate}</div>
        </div>
      </div>

      <div class="mb-5">
        <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">📚 Core Curriculum Coursework</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
          ${(major.curriculum_highlights || []).map(c => `
            <div class="text-xs text-slate-700 bg-blue-50/50 p-2 rounded border border-blue-100 flex items-center gap-1.5">
              <span class="text-blue-600 font-bold">&bull;</span> ${c}
            </div>
          `).join("")}
        </div>
      </div>

      <div class="mb-5">
        <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">🏛️ Recommended European & Global Universities</h4>
        <div class="flex flex-wrap gap-1.5">
          ${(major.top_universities || []).map(u => `
            <span class="text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded-md border border-slate-200">${u}</span>
          `).join("")}
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 flex justify-end">
        <button type="button" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition" onclick="document.getElementById('majorModal').classList.remove('open')">
          Close Window
        </button>
      </div>
    </div>
  `;

  modalOverlay.classList.add("open");
}

// -------------------------------------------------------------
// 8. Mobile Navigation Toggle
// -------------------------------------------------------------
function initMobileMenu() {
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}
