# 🎓 EduPath AI — Intelligent Bachelor Major & Career Guidance System

![Python](https://img.shields.io/badge/Python-3.9%2B-blue.svg)
![Machine Learning](https://img.shields.io/badge/ML-NLP%20%7C%20TF--IDF-green.svg)
![UI](https://img.shields.io/badge/UI-Streamlit%20Dashboard-red.svg)
![License](https://img.shields.io/badge/License-MIT-purple.svg)

An AI-powered academic and career advisory system designed to help prospective college students discover the most compatible Bachelor's degree programs and future career pathways based on their academic strengths, interests, and personal career statements.

---

## 🌟 Why this Project?
Choosing the right college major is one of the most critical decisions for a student. Traditional career counseling often relies on subjective advice. **EduPath AI** bridges this gap using **Natural Language Processing (NLP)** and **Multi-Factor Weighted Compatibility Scoring** to deliver personalized, data-backed recommendations with real-time job market outlooks.

---

## 🚀 Key Features

- **Personalized Compatibility Scoring:** Analyzes student interests, skills, and personal goal statements.
- **NLP Text Matching:** Leverages TF-IDF vectorization and Cosine Similarity to capture semantic context between student aspirations and academic curricula.
- **Interactive Web Dashboard:** Clean, responsive web UI with real-time ranking bar charts powered by Streamlit and Plotly.
- **Comprehensive Career Analytics:** Details on high-demand careers, expected salary ranges, and job growth forecasts.
- **Dual Interface:** Supports both an interactive browser web dashboard and a lightweight terminal CLI mode.
- **Exportable Reports:** Generates downloadable advisory summaries for students and academic counselors.

---

## 📁 Repository Structure

```text
EduPath-AI/
├── app.py              # Interactive Streamlit Web Dashboard
├── cli.py              # Terminal Command Line Interface
├── recommender.py      # Core NLP TF-IDF & Scoring Algorithm
├── data.py             # Knowledge Base of Majors, Skills & Market Data
├── requirements.txt     # Python Dependencies
├── .gitignore           # Ignored files
└── README.md            # Project Documentation
```

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/anasaleemkhan/EduPath-AI.git
cd EduPath-AI
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## 💻 How to Run

### Option A: Launch Interactive Web Dashboard (Recommended)
```bash
streamlit run app.py
```
*Opens automatically in your browser at `http://localhost:8501`.*

### Option B: Run in Terminal (CLI Mode)
```bash
python cli.py
```

---

## 🧠 Methodology & Algorithm

The recommendation engine combines **two analytical layers**:
1. **Semantic Text Compatibility (NLP):**
   - Applies `TfidfVectorizer` to extract n-grams from the user's goals and interests.
   - Computes `cosine_similarity` against structured syllabi and curricula.
2. **Explicit Skill & Interest Overlap:**
   - Computes intersection over union (IoU) of student skills with core program competencies.
3. **Composite Scoring Formula:**
   $$\text{Final Score} = 0.40 \times \text{NLP Similarity} + 0.35 \times \text{Interest Overlap} + 0.25 \times \text{Skill Overlap}$$

---

## 👤 Author
Developed by **Anas Saleem Khan**  
GitHub: [@anasaleemkhan](https://github.com/anasaleemkhan)

---

## 📄 License
This project is open-source and licensed under the [MIT License](LICENSE).
