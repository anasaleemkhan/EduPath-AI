# 🎓 EduPath AI — Intelligent Bachelor Guidance & Career Intelligence Platform

![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)
![AI](https://img.shields.io/badge/Google%20Gemini-Gemini%204%20Hydrogen-orange.svg)
![NLP](https://img.shields.io/badge/NLP-TF--IDF%20%7C%20Cosine%20Similarity-green.svg)
![UI](https://img.shields.io/badge/UI-Streamlit%20%2B%20Plotly%20Radar-red.svg)
![License](https://img.shields.io/badge/License-MIT-purple.svg)

An enterprise-grade academic decision-support platform designed to help prospective undergraduate students identify their optimal Bachelor's degree and career trajectories. Powered by **multi-factor NLP compatibility scoring**, **interactive Plotly 6-D competency radar mapping**, and **Google Gemini 4 (`gemini-4-hydrogen`)**.

---

## 🌟 What Makes EduPath AI Stand Out?

1. **Dynamic Custom Type-In Engine:**
   - Go beyond static dropdowns. Students can type custom high school subjects (e.g. *AP Calculus, Italian Literature*), unique passions (e.g. *quantum computing, drone racing*), and specialized skills (e.g. *PyTorch, Figma*).
2. **Google Gemini 4 Academic Advisor & Chatbot:**
   - Powered by Google's frontier **Gemini 4 Hydrogen** model (`gemini-4-hydrogen`) via the official `google-genai` SDK.
   - Interactive multi-turn chat with **Dr. Sophia Laurent**, advising on admission tests (e.g., TOLC-I, SAT), European curricula, and coursework adjustments.
   - One-click prompt pills for instant university comparisons and scholarship advice.
3. **6-Dimensional Student Competency Radar Chart:**
   - Computes multidimensional intellectual aptitude across *Computational Tech, Mathematical Rigor, Physical/Life Sciences, Economics & Strategy, Design & Aesthetics, and Leadership*.
4. **AI Statement of Purpose (SOP) & Motivation Letter Evaluator:**
   - Evaluates applicant personal essays against admissions rubrics, scores persuasiveness, highlights missing keywords, and gives line-by-line rewrite suggestions.
5. **Global & Italian University Explorer:**
   - Curated directory of top institutions (*Politecnico di Milano, Sapienza University of Rome, University of Bologna, Politecnico di Torino, ETH Zurich, Oxford*).
   - Guidance on public tuition fees, English-taught curricula, and regional Italian **DSU scholarships** (providing full tuition waivers + €7,000/yr stipends).
6. **Downloadable Student Academic Dossier:**
   - Instant export of a comprehensive multi-page guidance report for counselors and university applications.

---

## 📁 Repository Architecture

```text
EduPath-AI/
├── index.html          # Interactive Standalone Webpage & Showcase Platform
├── assets/             # Client-Side CSS, JS Engine & Visual Assets
│   ├── css/style.css   # Modern Design System & Responsive Layout
│   └── js/
│       ├── data.js     # Structured Knowledge Base (24 Programs & Universities)
│       ├── matcher.js  # Client-side TF-IDF & 6-D Radar Calculation Engine
│       └── app.js      # Interactive Controller, Chatbot & SOP Reviewer
├── app.py              # Interactive Streamlit SaaS Web Dashboard
├── cli.py              # Terminal Command Line Interface
├── recommender.py      # NLP TF-IDF Matching & 6-D Radar Engine
├── data.py             # Knowledge Base of 24+ Global Bachelor Programs
├── ai_advisor.py       # Google Gemini 4 (gemini-4-hydrogen) Counselor Module
├── requirements.txt     # Production Dependencies
├── .gitignore           # Clean Git tracking
└── README.md            # Comprehensive Documentation
```

---

## 🛠️ Installation & Quickstart

### 1. Clone the Repository
```bash
git clone https://github.com/anasaleemkhan/EduPath-AI.git
cd EduPath-AI
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. (Optional) Set your Free Gemini API Key
Get your free API key at [Google AI Studio](https://aistudio.google.com/):
```bash
# Windows PowerShell
$env:GEMINI_API_KEY="your-gemini-api-key"

# Linux / macOS
export GEMINI_API_KEY="your-gemini-api-key"
```
*(You can also paste the key directly into the Web UI sidebar).*

---

## 💻 Running the Application

### Option A: Open Interactive Webpage (Instant / Zero-Setup)
Open `index.html` directly in any web browser (Chrome, Edge, Safari, Firefox), or serve locally:
```bash
python -m http.server 8000
```
*Access in your browser at `http://localhost:8000` or double-click `index.html`.*

### Option B: Launch Interactive Streamlit Web Dashboard
```bash
streamlit run app.py
```
*Access in your browser at `http://localhost:8501`.*

### Option C: Run in Terminal (CLI Mode)
```bash
python cli.py --subjects "Mathematics, Physics, Computer Science" --skills "Python, C++, Logic" --ai
```

---

## 🧠 Methodology & Mathematical Formulation

The matching engine employs a 4-tier composite scoring architecture:

$$\text{Final Score} = 0.35 \times \text{NLP}_{\text{semantic}} + 0.30 \times \text{Overlap}_{\text{interest}} + 0.20 \times \text{Overlap}_{\text{skill}} + 0.15 \times \text{Prereq}_{\text{subject}}$$

1. **Semantic Text Compatibility ($\text{NLP}_{\text{semantic}}$):** Sublinear TF-IDF vectorization with unigram and bigram tokenization and Cosine Similarity against structured academic syllabi.
2. **Jaccard Overlap Indexes:** Intersection over union (IoU) of normalized student skill sets and domain interest taxonomy.
3. **Prerequisite Fulfillment:** Evaluation of student preparation against foundational university entrance expectations.

---

## 👤 Author
Developed by **Anas Saleem Khan**  
GitHub: [@anasaleemkhan](https://github.com/anasaleemkhan)

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
