"""
EduPath AI: College Major & Career Recommendation System
Interactive Web Dashboard built with Streamlit and Plotly.
"""

import streamlit as st
import pandas as pd
import plotly.express as px
from recommender import calculate_major_matches

# Page Configuration
st.set_page_config(
    page_title="EduPath AI - College Major Recommender",
    page_icon="🎓",
    layout="wide"
)

# Custom CSS for styling
st.markdown("""
<style>
    .main-header {
        font-size: 2.2rem;
        font-weight: 700;
        color: #1E3A8A;
        margin-bottom: 0.2rem;
    }
    .sub-header {
        font-size: 1.1rem;
        color: #4B5563;
        margin-bottom: 1.5rem;
    }
    .card {
        background-color: #F8FAFC;
        padding: 1.2rem;
        border-radius: 10px;
        border-left: 5px solid #2563EB;
        margin-bottom: 1rem;
    }
</style>
""", unsafe_allow_html=True)

st.markdown('<div class="main-header">🎓 EduPath AI: Intelligent Major & Career Recommender</div>', unsafe_allow_html=True)
st.markdown('<div class="sub-header">Discover the most compatible bachelor degrees and career trajectories based on your unique profile.</div>', unsafe_allow_html=True)

# Sidebar: Student Input Form
st.sidebar.header("📋 Your Academic Profile")

favorite_subjects = st.sidebar.multiselect(
    "High School Favorite Subjects",
    ["Mathematics", "Physics", "Computer Science", "Biology", "Chemistry", "Economics", "Literature", "Art & Design"],
    default=["Mathematics", "Computer Science"]
)

selected_interests = st.sidebar.multiselect(
    "Areas of Interest & Hobbies",
    ["coding", "ai", "building apps", "machines", "robotics", "startups", "investing", "stocks", "healthcare", "medicine", "design", "human behavior", "helping people"],
    default=["coding", "ai", "building apps"]
)

selected_skills = st.sidebar.multiselect(
    "Your Current Skills / Strengths",
    ["Problem Solving", "Logic", "Python", "Mathematics", "Communication", "Leadership", "Data Analysis", "CAD Design", "Biology", "Empathy", "Visual Design"],
    default=["Problem Solving", "Logic", "Python"]
)

user_statement = st.sidebar.text_area(
    "Personal Goal / Aspirations (Short Statement)",
    "I love technology, solving mathematical puzzles, and building software that can help people in their everyday lives."
)

submit_btn = st.sidebar.button("🚀 Analyze & Generate Recommendations", type="primary")

# Execute Recommendation
user_profile = {
    "subjects": favorite_subjects,
    "interests": selected_interests,
    "skills": selected_skills,
    "statement": user_statement
}

results = calculate_major_matches(user_profile)

# Main Dashboard View
col1, col2 = st.columns([1.2, 1])

with col1:
    st.subheader("🎯 Top Recommended Bachelor Degrees")
    
    top_3 = results[:3]
    for rank, major in enumerate(top_3, 1):
        with st.container():
            st.markdown(f"""
            <div class="card">
                <h3>#{rank} {major['title']}</h3>
                <p><strong>Category:</strong> {major['category']} | <strong>Match Compatibility:</strong> <span style="color:#2563EB; font-weight:bold;">{major['match_score']}%</span></p>
                <p>{major['description']}</p>
                <p><strong>Potential Careers:</strong> {', '.join(major['careers'])}</p>
                <p><strong>Salary Range:</strong> {major['avg_salary']} | <strong>Job Growth:</strong> {major['growth_rate']}</p>
            </div>
            """, unsafe_allow_html=True)

with col2:
    st.subheader("📊 Compatibility Match Overview")
    
    # Prepare DataFrame for chart
    df = pd.DataFrame(results)
    fig = px.bar(
        df,
        x="match_score",
        y="title",
        orientation="h",
        color="match_score",
        color_continuous_scale="Blues",
        labels={"match_score": "Compatibility Score (%)", "title": "Academic Major"},
        title="Major Compatibility Ranking"
    )
    fig.update_layout(yaxis=dict(autorange="reversed"), height=420)
    st.plotly_chart(fig, use_container_width=True)

st.markdown("---")
st.subheader("💡 Recommended Skills Roadmap for Your #1 Choice")
best_choice = results[0]

skills_col1, skills_col2 = st.columns(2)
with skills_col1:
    st.info(f"**Target Major:** {best_choice['title']}")
    st.write("**Core Skills to Develop during your Bachelor's:**")
    for skill in best_choice["recommended_skills"]:
        st.markdown(f"- ✅ {skill}")

with skills_col2:
    st.success("**Future Career Opportunities:**")
    for role in best_choice["careers"]:
        st.markdown(f"- 💼 {role}")

# Downloadable Report
st.sidebar.markdown("---")
report_text = f"""EduPath AI - Student Recommendation Report
=============================================
Top Major: {best_choice['title']} ({best_choice['match_score']}% Match)
Category: {best_choice['category']}
Average Starting Salary: {best_choice['avg_salary']}
Job Growth: {best_choice['growth_rate']}

Recommended Skills:
{', '.join(best_choice['recommended_skills'])}

Career Trajectories:
{', '.join(best_choice['careers'])}
"""

st.sidebar.download_button(
    label="📥 Download Recommendation Report (TXT)",
    data=report_text,
    file_name="major_recommendation_report.txt",
    mime="text/plain"
)
