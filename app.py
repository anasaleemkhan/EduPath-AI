"""
EduPath AI - Enterprise Academic & Career Guidance Intelligence Platform.
Powered by Multi-Factor NLP Compatibility Scoring and Google Gemini 4 (gemini-4-hydrogen).
"""

import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import ai_advisor
from recommender import (
    calculate_major_matches,
    parse_and_merge_inputs,
    compute_student_radar_metrics
)

# ---------------------------------------------------------
# Page Configuration
# ---------------------------------------------------------
st.set_page_config(
    page_title="EduPath AI | Global Bachelor Guidance & AI Counselor",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom High-End Styling
st.markdown("""
<style>
    .main-title {
        font-size: 2.3rem;
        font-weight: 800;
        color: #1E3A8A;
        margin-bottom: 0.2rem;
        letter-spacing: -0.5px;
    }
    .sub-title {
        font-size: 1.05rem;
        color: #4B5563;
        margin-bottom: 1.5rem;
    }
    .major-card {
        background: #FFFFFF;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        padding: 1.4rem;
        margin-bottom: 1.2rem;
        box-shadow: 0 2px 6px rgba(0,0,0,0.03);
        border-left: 6px solid #2563EB;
        transition: transform 0.2s ease;
    }
    .major-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    }
    .badge-primary {
        background-color: #EFF6FF;
        color: #1D4ED8;
        font-weight: 600;
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        font-size: 0.85rem;
        display: inline-block;
        margin-right: 0.4rem;
    }
    .badge-success {
        background-color: #ECFDF5;
        color: #047857;
        font-weight: 600;
        padding: 0.25rem 0.6rem;
        border-radius: 6px;
        font-size: 0.85rem;
        display: inline-block;
        margin-right: 0.4rem;
    }
    .advisor-callout {
        background: #F0FDF4;
        border-left: 5px solid #16A34A;
        border-radius: 10px;
        padding: 1.2rem;
        margin-bottom: 1.2rem;
    }
</style>
""", unsafe_allow_html=True)

st.markdown('<div class="main-title">🎓 EduPath AI — Academic & Career Guidance Platform</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-title">Enterprise Decision Support System for Undergraduate Program Selection powered by NLP Modeling and Google Gemini 4.</div>', unsafe_allow_html=True)

# ---------------------------------------------------------
# Sidebar: Dynamic Profile Builder with Type-In Capabilities
# ---------------------------------------------------------
st.sidebar.header("📋 Student Profile Builder")
st.sidebar.caption("Select standard options OR type your custom entries.")

# 1. High School Subjects
standard_subjects = [
    "Mathematics", "Physics", "Computer Science", "Biology",
    "Chemistry", "Economics", "Literature", "Art & Design", "History", "Statistics"
]
selected_subjects = st.sidebar.multiselect(
    "High School Subjects Studied",
    options=standard_subjects,
    default=["Mathematics", "Physics", "Computer Science"]
)
custom_subjects_str = st.sidebar.text_input(
    "✍️ Type Custom Subjects (comma-separated)",
    placeholder="e.g. AP Calculus, Italian, Linear Algebra"
)
final_subjects = parse_and_merge_inputs(selected_subjects, custom_subjects_str)

# 2. Interests & Hobbies
standard_interests = [
    "coding", "ai", "building apps", "machines", "robotics", "startups",
    "investing", "stocks", "healthcare", "medicine", "design", "human behavior",
    "space", "quantum", "cybersecurity", "clean energy", "architecture", "helping people"
]
selected_interests = st.sidebar.multiselect(
    "Areas of Interest & Passions",
    options=standard_interests,
    default=["coding", "ai", "building apps"]
)
custom_interests_str = st.sidebar.text_input(
    "✍️ Type Custom Passions/Hobbies",
    placeholder="e.g. drone racing, quantum computing, game dev"
)
final_interests = parse_and_merge_inputs(selected_interests, custom_interests_str)

# 3. Strengths & Skills
standard_skills = [
    "Problem Solving", "Logic", "Python", "Mathematics", "Communication",
    "Leadership", "Data Analysis", "CAD Design", "Biology", "Empathy",
    "Visual Design", "C++", "Statistics", "Public Speaking", "Writing"
]
selected_skills = st.sidebar.multiselect(
    "Current Strengths & Skills",
    options=standard_skills,
    default=["Problem Solving", "Logic", "Python"]
)
custom_skills_str = st.sidebar.text_input(
    "✍️ Type Custom Strengths/Skills",
    placeholder="e.g. PyTorch, Figma, Lab Experimentation, Debate"
)
final_skills = parse_and_merge_inputs(selected_skills, custom_skills_str)

# 4. Personal Aspiration Statement
user_statement = st.sidebar.text_area(
    "Personal Career Statement / Life Vision",
    value="I am passionate about applying intelligent software, mathematical models, and engineering to solve pressing real-world challenges.",
    height=85
)

# ---------------------------------------------------------
# Sidebar: Google Gemini 4 Engine Configuration
# ---------------------------------------------------------
st.sidebar.markdown("---")
st.sidebar.header("🤖 Google Gemini Intelligence")

api_key_input = st.sidebar.text_input(
    "Gemini API Key",
    value="",
    type="password",
    help="Enter your free API key from https://aistudio.google.com/ or set GEMINI_API_KEY environment variable."
)

gemini_model = st.sidebar.selectbox(
    "Gemini Model Architecture",
    ["gemini-4-hydrogen", "gemini-3.5-flash-lite", "gemini-4-neon", "gemini-2.5-flash"],
    index=0,
    help="gemini-4-hydrogen is the recommended frontier reasoning model for academic advising."
)

effective_api_key = api_key_input if api_key_input.strip() else ai_advisor.get_api_key()

if effective_api_key:
    st.sidebar.success(f"🟢 Gemini Connected: {gemini_model}")
else:
    st.sidebar.info("💡 **Free Gemini Key:** Get one at [aistudio.google.com](https://aistudio.google.com/) for live AI counseling.")

# Assemble Profile
user_profile = {
    "subjects": final_subjects,
    "interests": final_interests,
    "skills": final_skills,
    "statement": user_statement
}

# Execute Multi-Factor Recommendation Engine
results = calculate_major_matches(user_profile)
best_choice = results[0]
radar_scores = compute_student_radar_metrics(user_profile)

# ---------------------------------------------------------
# Top Metrics Bar
# ---------------------------------------------------------
col_m1, col_m2, col_m3, col_m4 = st.columns(4)
col_m1.metric("Top Recommended Degree", best_choice["title"][:24] + "...")
col_m2.metric("Compatibility Rating", f"{best_choice['match_score']}%")
col_m3.metric("Evaluated Academic Majors", f"{len(results)} Programs")
col_m4.metric("Active Skills Profile", f"{len(final_skills)} Attributes")

st.markdown("---")

# ---------------------------------------------------------
# Main Tabs: Modern Multi-Surface Navigation
# ---------------------------------------------------------
tab_rankings, tab_gemini, tab_chat, tab_sop, tab_unis = st.tabs([
    "🎯 Degree Rankings & Competency Radar",
    "✨ Gemini 4 AI Advisory & Roadmap",
    "💬 Interactive AI Counselor Chat",
    "📝 Statement of Purpose (SOP) Evaluator",
    "🏛️ Global & Italian University Explorer"
])

# ---------------------------------------------------------
# TAB 1: Degree Rankings & Competency Radar
# ---------------------------------------------------------
with tab_rankings:
    col_left, col_right = st.columns([1.25, 1])

    with col_left:
        st.subheader("🎯 Top Recommended Undergraduate Degrees")
        for rank, major in enumerate(results[:4], 1):
            st.markdown(f"""
            <div class="major-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                    <h3 style="margin: 0; color: #1E3A8A;">#{rank} {major['title']}</h3>
                    <span class="badge-primary">{major['match_score']}% Match</span>
                </div>
                <div style="margin-bottom: 0.6rem;">
                    <span class="badge-success">{major['category']}</span>
                    <span class="badge-primary">{major['degree_type']}</span>
                </div>
                <p style="color: #374151; font-size: 0.95rem; margin-bottom: 0.6rem;">{major['description']}</p>
                <p style="font-size: 0.88rem; margin-bottom: 0.3rem;"><strong>💼 Career Trajectories:</strong> {', '.join(major['careers'])}</p>
                <p style="font-size: 0.88rem; margin-bottom: 0.3rem;"><strong>💰 Market Outlook:</strong> {major['avg_salary']} | <strong>Growth:</strong> {major['growth_rate']}</p>
                <p style="font-size: 0.88rem; color: #4B5563; margin-bottom: 0;"><strong>🏛️ Top Institutions:</strong> {', '.join(major['top_universities'][:3])}</p>
            </div>
            """, unsafe_allow_html=True)

    with col_right:
        st.subheader("🕸️ 6-D Student Competency Radar")
        st.caption("Multidimensional evaluation across key academic and professional disciplines.")

        # Plotly Radar Chart
        radar_categories = [
            "Computational Tech", "Mathematical Rigor", "Physical/Life Sciences",
            "Economics & Strategy", "Design & Aesthetics", "Leadership & Communication"
        ]
        radar_values = [
            radar_scores["tech"], radar_scores["math"], radar_scores["science"],
            radar_scores["business"], radar_scores["design"], radar_scores["leadership"]
        ]
        # Close the loop
        radar_categories_loop = radar_categories + [radar_categories[0]]
        radar_values_loop = radar_values + [radar_values[0]]

        fig_radar = go.Figure()
        fig_radar.add_trace(go.Scatterpolar(
            r=radar_values_loop,
            theta=radar_categories_loop,
            fill='toself',
            name='Student Aptitude',
            line=dict(color='#2563EB', width=2),
            fillcolor='rgba(37, 99, 235, 0.25)'
        ))
        fig_radar.update_layout(
            polar=dict(radialaxis=dict(visible=True, range=[0, 100])),
            showlegend=False,
            height=360,
            margin=dict(l=40, r=40, t=20, b=20)
        )
        st.plotly_chart(fig_radar, use_container_width=True)

        st.markdown("---")
        st.subheader("📊 Program Compatibility Ranking")
        df_rankings = pd.DataFrame(results[:10])
        fig_bar = px.bar(
            df_rankings,
            x="match_score",
            y="title",
            orientation="h",
            color="match_score",
            color_continuous_scale="Blues",
            labels={"match_score": "Compatibility Score (%)", "title": "Major"}
        )
        fig_bar.update_layout(yaxis=dict(autorange="reversed"), height=380, margin=dict(l=0, r=0, t=10, b=10))
        st.plotly_chart(fig_bar, use_container_width=True)

    st.markdown("---")
    st.subheader(f"📚 Core Curriculum Snapshot for #1 Choice: {best_choice['title']}")
    col_c1, col_c2 = st.columns(2)
    with col_c1:
        st.write("**Key University Coursework:**")
        for course in best_choice.get("curriculum_highlights", []):
            st.markdown(f"- 📖 **{course}**")
    with col_c2:
        st.write("**Recommended High School Prep & Foundational Skills:**")
        for skill in best_choice.get("recommended_skills", [])[:6]:
            st.markdown(f"- 🎯 {skill}")

# ---------------------------------------------------------
# TAB 2: Gemini 4 AI Advisory & Roadmap
# ---------------------------------------------------------
with tab_gemini:
    st.subheader(f"✨ Gemini 4 AI Counseling Rationale for {best_choice['title']}")
    st.caption(f"Powered by Google Gemini ({gemini_model})")

    if not effective_api_key:
        st.warning("🔑 **Gemini API Key Required:** Please enter your free Gemini API key in the sidebar to generate personalized AI evaluations.")
    else:
        cache_key = f"gemini4_{best_choice['id']}_{hash(user_statement)}"
        if st.button("🔄 Generate Fresh In-Depth Advisory Evaluation", type="primary") or cache_key not in st.session_state:
            with st.spinner(f"🤖 Gemini 4 is analyzing your profile against university standards..."):
                st.session_state[cache_key] = {
                    "rationale": ai_advisor.generate_counselor_rationale(
                        user_profile, best_choice, api_key_override=effective_api_key, model_override=gemini_model
                    ),
                    "roadmap": ai_advisor.generate_academic_roadmap(
                        best_choice, final_skills, api_key_override=effective_api_key, model_override=gemini_model
                    )
                }

        insights = st.session_state.get(cache_key, {})

        st.markdown(f"""
        <div class="advisor-callout">
            <h3 style="color:#166534; margin:0 0 0.5rem 0;">🎓 Academic Advisor Briefing: Why {best_choice['title']} is Your Sweet Spot</h3>
        </div>
        """, unsafe_allow_html=True)
        st.markdown(insights.get("rationale", ""))

        st.markdown("---")
        st.subheader("🗺️ 4-Year Undergraduate Academic & Career Milestone Roadmap")
        st.markdown(insights.get("roadmap", ""))

# ---------------------------------------------------------
# TAB 3: Interactive AI Counselor Chatbot
# ---------------------------------------------------------
with tab_chat:
    st.subheader("💬 Interactive Academic Advisor Chatbot")
    st.caption("Ask Dr. Sophia Laurent anything about university prerequisites, European admissions (e.g. Italy TOLC-I, scholarships), or course comparisons.")

    # Quick Prompt Pills
    st.write("**Quick Inquiries (Click to ask):**")
    col_p1, col_p2, col_p3 = st.columns(3)
    pill_prompt = None
    if col_p1.button("🏛️ What are the admission criteria for Politecnico di Milano?"):
        pill_prompt = "What are the specific admission requirements, entrance exams (like TOLC-I), and English language criteria for studying Computer Science or Engineering at Politecnico di Milano?"
    if col_p2.button("⚖️ Compare CS vs Data Science vs AI"):
        pill_prompt = "Can you clearly explain the difference in undergraduate curriculum and career outcomes between Computer Science, Data Science, and Artificial Intelligence?"
    if col_p3.button("💰 How do Italian DSU scholarships work?"):
        pill_prompt = "How do regional scholarships in Italy (like DSU / EDISU) work for international students, and how can I get tuition waivers and living stipends?"

    if not effective_api_key:
        st.info("🔑 Please enter your free Gemini API key in the sidebar to activate the AI Counselor Chatbot.")
    else:
        if "chat_messages" not in st.session_state:
            st.session_state.chat_messages = [
                {
                    "role": "assistant",
                    "content": f"Hello! I am Dr. Sophia Laurent, your academic counselor. Based on your profile, you are an outstanding candidate for **{best_choice['title']}**! How can I assist you with university admissions, exam preparation, or coursework decisions today?"
                }
            ]

        # Display Chat History
        for msg in st.session_state.chat_messages:
            with st.chat_message(msg["role"]):
                st.markdown(msg["content"])

        # Determine prompt from pills or chat_input
        user_chat_input = st.chat_input("Type your academic or career question...")
        active_prompt = pill_prompt or user_chat_input

        if active_prompt:
            st.session_state.chat_messages.append({"role": "user", "content": active_prompt})
            with st.chat_message("user"):
                st.markdown(active_prompt)

            with st.chat_message("assistant"):
                with st.spinner("Dr. Laurent is formulating guidance..."):
                    response = ai_advisor.counselor_chat_turn(
                        messages=st.session_state.chat_messages,
                        user_profile=user_profile,
                        top_major=best_choice,
                        api_key_override=effective_api_key,
                        model_override=gemini_model
                    )
                    st.markdown(response)

            st.session_state.chat_messages.append({"role": "assistant", "content": response})

# ---------------------------------------------------------
# TAB 4: Statement of Purpose (SOP) Evaluator
# ---------------------------------------------------------
with tab_sop:
    st.subheader("📝 AI Statement of Purpose (SOP) & Motivation Letter Reviewer")
    st.markdown("""
    Paste your draft Statement of Purpose, Personal Essay, or Motivation Letter below.
    Gemini 4 will evaluate its academic alignment with **""" + best_choice['title'] + """**,
    score its persuasive strength, identify missing keywords, and suggest line-by-line enhancements.
    """)

    sample_sop = """Ever since I wrote my first line of Python code, I have been fascinated by how algorithms can automate complex reasoning. In high school, I gravitated toward advanced mathematics and physics, where I built a small machine learning project to model environmental data. I am applying to study Computer Science because I want to engineer robust, ethical software architectures that bridge theoretical data science with real-world impact. I am eager to contribute to research laboratories and develop distributed systems."""

    user_sop_text = st.text_area("Your Statement of Purpose (SOP) Draft", value=sample_sop, height=180)

    if st.button("🚀 Evaluate SOP with Gemini 4", type="primary"):
        if not effective_api_key:
            st.error("🔑 Please provide a Gemini API Key in the sidebar to run the SOP evaluation.")
        else:
            with st.spinner("Evaluating SOP against global undergraduate admissions rubrics..."):
                sop_review = ai_advisor.evaluate_statement_of_purpose(
                    sop_text=user_sop_text,
                    top_major=best_choice,
                    user_profile=user_profile,
                    api_key_override=effective_api_key,
                    model_override=gemini_model
                )
                st.markdown(sop_review)

# ---------------------------------------------------------
# TAB 5: Global & Italian University Explorer
# ---------------------------------------------------------
with tab_unis:
    st.subheader("🏛️ Target University Explorer & Admissions Guide")
    st.markdown("""
    Targeting top universities in **Italy and Europe**? Here is an overview of top-ranked institutions
    offering your recommended degree (**""" + best_choice['title'] + """**) with practical application details:
    """)

    uni_col1, uni_col2 = st.columns(2)
    with uni_col1:
        st.markdown("""
        ### 🇮🇹 Top Italian Universities:
        - **Politecnico di Milano (PoliMi):** Italy's #1 technical university. Highly renowned in Computer Science, Mechanical, and Aerospace Engineering.
        - **Sapienza Università di Roma:** Historic institution with leading faculties in AI, Physics, and Data Science.
        - **Politecnico di Torino (PoliTo):** Premier engineering and cybersecurity hub in northern Italy.
        - **Università di Bologna (UniBo):** World's oldest university; outstanding modern curricula in Artificial Intelligence and Biotechnology.
        - **University of Padua (UniPd):** Renowned for Biomedical Engineering, Data Science, and Cognitive Science.

        #### 💶 Tuition & Scholarship Advantage:
        - Public university tuition in Italy is income-based (typically **€1,000 – €3,000 per year**).
        - **DSU / Regional Scholarships:** Eligible international students can receive a **100% tuition waiver + up to €7,000/year living stipend** plus subsidized meals!
        """)

    with uni_col2:
        st.markdown("""
        ### 🇪🇺 Top European Institutions:
        - **ETH Zurich (Switzerland):** Continental Europe's top university in CS and Engineering.
        - **TU Munich (Germany):** German excellence university with zero tuition fees for many programs.
        - **TU Delft (Netherlands):** Global powerhouse for Aerospace, Robotics, and Architecture.
        - **Oxford / Cambridge (UK):** World leaders in fundamental theoretical computer science and mathematics.

        #### 📋 Key Admissions Requirements:
        - **Entrance Tests:** TOLC-I (English TOLC-I for Engineering), SAT, or university-specific tests.
        - **Language Proof:** IELTS (typically 6.0 - 6.5) or TOEFL iBT (80+).
        - **Documents Needed:** High School Transcripts (Declaration of Value / CIMEA), SOP, and Letters of Recommendation.
        """)

# ---------------------------------------------------------
# Sidebar: Downloadable Dossier
# ---------------------------------------------------------
st.sidebar.markdown("---")
dossier_text = f"""EduPath AI - Comprehensive Academic Guidance Dossier
==============================================================
Candidate Name: Anas Saleem Khan
Primary Recommendation: {best_choice['title']} ({best_choice['match_score']}% Match)
Degree Type: {best_choice['degree_type']}
Faculty Category: {best_choice['category']}
Average Compensation: {best_choice['avg_salary']}
Market Demand Growth: {best_choice['growth_rate']}

Candidate Profile:
- Subjects: {', '.join(final_subjects)}
- Skills: {', '.join(final_skills)}
- Interests: {', '.join(final_interests)}
- Statement: "{user_statement}"

Top Alternative Programs:
1. {results[1]['title']} ({results[1]['match_score']}% Match)
2. {results[2]['title']} ({results[2]['match_score']}% Match)
3. {results[3]['title']} ({results[3]['match_score']}% Match)

Core Recommended Coursework:
{', '.join(best_choice.get('curriculum_highlights', []))}

Target Global Universities:
{', '.join(best_choice.get('top_universities', []))}
"""

st.sidebar.download_button(
    label="📥 Download Academic Dossier (TXT)",
    data=dossier_text,
    file_name="EduPath_Academic_Dossier.txt",
    mime="text/plain"
)
