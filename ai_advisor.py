"""
EduPath AI: Gemini-Powered Academic & Career Advisory Module.
Integrates Google's latest Gemini 4 models (e.g. gemini-4-hydrogen) via the official
google-genai SDK to provide personalized counseling, interactive advisor chat,
4-year curriculum roadmaps, and Statement of Purpose (SOP) evaluations.
"""

import os
from typing import Dict, List, Optional
from dotenv import load_dotenv

# Explicitly load .env from current file's directory
current_dir = os.path.dirname(os.path.abspath(__file__))
env_file = os.path.join(current_dir, ".env")
if os.path.exists(env_file):
    load_dotenv(dotenv_path=env_file)
parent_env = os.path.join(os.path.dirname(current_dir), ".env")
if os.path.exists(parent_env):
    load_dotenv(dotenv_path=parent_env)

try:
    from google import genai
    from google.genai import types
    GEMINI_AVAILABLE = True
except ImportError:
    GEMINI_AVAILABLE = False

# Default to the frontier balanced model explicitly requested by user
DEFAULT_MODEL = "gemini-4-hydrogen"


def get_api_key(api_key_override: Optional[str] = None) -> Optional[str]:
    """Retrieve Gemini API key from explicit override, .env file directly, environment, or Streamlit secrets."""
    if api_key_override and api_key_override.strip():
        return api_key_override.strip()

    # Direct file read guarantee from .env
    for candidate in [env_file, parent_env]:
        if os.path.exists(candidate):
            try:
                with open(candidate, "r", encoding="utf-8") as f:
                    for line in f:
                        line = line.strip()
                        if line.startswith("GEMINI_API_KEY=") and not line.startswith("#"):
                            val = line.split("=", 1)[1].strip().strip('"').strip("'")
                            if val:
                                return val
            except Exception:
                pass

    env_key = os.getenv("GEMINI_API_KEY", "").strip()
    if env_key:
        return env_key

    try:
        import streamlit as st
        if "GEMINI_API_KEY" in st.secrets:
            return st.secrets["GEMINI_API_KEY"].strip()
    except Exception:
        pass

    return None


def get_model_name(model_override: Optional[str] = None) -> str:
    """Retrieve the model name to use, defaulting to gemini-4-hydrogen."""
    if model_override and model_override.strip():
        return model_override.strip()
    return os.getenv("GEMINI_MODEL", DEFAULT_MODEL).strip()


def get_gemini_client(api_key_override: Optional[str] = None):
    """Initializes and returns a Gemini Client instance."""
    if not GEMINI_AVAILABLE:
        return None

    key = get_api_key(api_key_override)
    if not key:
        return None

    try:
        return genai.Client(api_key=key)
    except Exception:
        return None


def is_gemini_ready(api_key_override: Optional[str] = None) -> bool:
    """Checks whether the Gemini client can be initialized."""
    key = get_api_key(api_key_override)
    return bool(GEMINI_AVAILABLE and key)


def _call_gemini(client, prompt: str, model: str) -> str:
    """
    Calls Google Gemini using the modern Interactions API or models.generate_content
    with automatic fallbacks.
    """
    # 1. Try modern Interactions API
    try:
        interaction = client.interactions.create(
            model=model,
            input=prompt
        )
        if hasattr(interaction, "output_text") and interaction.output_text:
            return interaction.output_text
    except Exception:
        pass

    # 2. Try models.generate_content
    try:
        response = client.models.generate_content(
            model=model,
            contents=prompt
        )
        if hasattr(response, "text") and response.text:
            return response.text
    except Exception:
        pass

    # 3. Fallback to gemini-3.5-flash-lite or gemini-2.5-flash if hydrogen is rate limited or unavailable on free key
    fallback_models = ["gemini-3.5-flash-lite", "gemini-2.5-flash", "gemini-1.5-flash"]
    for fb in fallback_models:
        if model != fb:
            try:
                response = client.models.generate_content(
                    model=fb,
                    contents=prompt
                )
                if hasattr(response, "text") and response.text:
                    return response.text
            except Exception:
                continue

    return "⚠️ Unable to generate AI response. Please verify your Gemini API key and quota."


def generate_counselor_rationale(
    user_profile: Dict,
    top_major: Dict,
    api_key_override: Optional[str] = None,
    model_override: Optional[str] = None
) -> str:
    """Generates an in-depth, personalized counseling rationale explaining why this major fits the student."""
    if not GEMINI_AVAILABLE:
        return "⚠️ `google-genai` library is not installed. Run `pip install google-genai`."

    client = get_gemini_client(api_key_override)
    if not client:
        return (
            "💡 **Gemini API Key Needed:** Add your free API key in the sidebar or `.env` file "
            "to unlock personalized AI counseling insights and rationale."
        )

    model = get_model_name(model_override)
    prompt = f"""
You are Dr. Sophia Laurent, an expert university academic advisor and career mentor at a world-class institution.
A prospective undergraduate student received a top match for: **{top_major.get('title', 'Academic Major')}** ({top_major.get('category', 'Category')}).

### Student Comprehensive Profile:
- **High School Subjects Studied:** {', '.join(user_profile.get('subjects', [])) or 'General high school curriculum'}
- **Passions & Hobbies:** {', '.join(user_profile.get('interests', [])) or 'Exploring various fields'}
- **Current Strengths & Skills:** {', '.join(user_profile.get('skills', [])) or 'Strong foundational abilities'}
- **Personal Career Statement:** "{user_profile.get('statement', '')}"

### Instructions:
Write an inspiring, intellectually rigorous, and structured advisory evaluation (approx. 250 words) covering:
1. **The Alignment Rationale:** Connect specific elements of their subjects, skills, and personal statement to {top_major.get('title')}. Explain why this is their natural sweet spot.
2. **2-3 Future-Proof Specializations:** Propose high-impact niches (e.g., Quantum ML, Green Edge Computing, FinTech Cryptography, Neuro-Robotics) they should look into.
3. **Standout Portfolio Project:** Suggest ONE tangible project or research paper topic they can build before university to impress admissions committees.

Format with clean Markdown, bold headers, and motivating language.
"""

    try:
        return _call_gemini(client, prompt, model)
    except Exception as e:
        return f"⚠️ **Could not generate AI advice:** {str(e)}"


def generate_academic_roadmap(
    top_major: Dict,
    user_skills: List[str],
    api_key_override: Optional[str] = None,
    model_override: Optional[str] = None
) -> str:
    """Generates a structured 4-Year Bachelor Roadmap for the student."""
    client = get_gemini_client(api_key_override)
    if not client:
        return "💡 **Gemini API Key Needed:** Enter your free Gemini API key to generate a customized 4-Year Academic & Skills Roadmap."

    model = get_model_name(model_override)
    prompt = f"""
You are the Dean of Undergraduate Curriculum.
Create a structured 4-Year Undergraduate Roadmap for a student pursuing: **{top_major.get('title')}**.
Existing Foundation Skills: {', '.join(user_skills) or 'General High School Knowledge'}.

Provide a clear, detailed 4-Year breakdown:
- **Year 1 (Foundations & Core Rigor):** Essential foundational coursework (math, core theory), academic adjustments, and student clubs.
- **Year 2 (Core Competence & First Hackathon/Project):** Intermediate engineering/theory, lab work, personal portfolio project, and open-source contributions.
- **Year 3 (Specialization & Summer Internship Prep):** High-level electives, industry certifications, research with professors, and internship interviews.
- **Year 4 (Senior Capstone & Global Launch):** Undergraduate thesis / capstone project, publishing research or launching a startup, and job placement / Master's applications.

Include specific course names and practical project milestones.
"""

    try:
        return _call_gemini(client, prompt, model)
    except Exception as e:
        return f"⚠️ **Could not generate roadmap:** {str(e)}"


def evaluate_statement_of_purpose(
    sop_text: str,
    top_major: Dict,
    user_profile: Dict,
    api_key_override: Optional[str] = None,
    model_override: Optional[str] = None
) -> str:
    """Evaluates a student's Statement of Purpose (SOP) or Motivation Letter against university criteria."""
    client = get_gemini_client(api_key_override)
    if not client:
        return "💡 **Gemini API Key Needed:** Enter your Gemini API key in the sidebar to run the AI SOP & Motivation Letter Evaluator."

    model = get_model_name(model_override)
    prompt = f"""
You are the Head of University Admissions evaluating a student's Statement of Purpose (SOP) / Motivation Letter.
Target Major: **{top_major.get('title')}**
Student Profile Context:
- Subjects: {', '.join(user_profile.get('subjects', []))}
- Skills: {', '.join(user_profile.get('skills', []))}
- Passions: {', '.join(user_profile.get('interests', []))}

### Student's Statement of Purpose Draft:
\"\"\"
{sop_text}
\"\"\"

Please evaluate this SOP with high academic standards. Structure your review into:
1. **Admissions Compatibility Score (1 to 100):** Give an honest rating with justification.
2. **Key Strengths:** What stands out positively (narrative flow, technical curiosity, authenticity)?
3. **Critical Areas for Improvement:** What is missing (e.g. specificity about professors/curriculum, proof of resilience, clear career horizon)?
4. **Actionable Rewrite Suggestions:** 2-3 specific paragraph revisions or vocabulary upgrades to make the application world-class for top universities (e.g. Politecnico di Milano, Oxford, ETH Zurich).
"""

    try:
        return _call_gemini(client, prompt, model)
    except Exception as e:
        return f"⚠️ **Could not evaluate SOP:** {str(e)}"


def counselor_chat_turn(
    messages: List[Dict[str, str]],
    user_profile: Dict,
    top_major: Dict,
    api_key_override: Optional[str] = None,
    model_override: Optional[str] = None
) -> str:
    """Handles an interactive conversation turn with the AI Academic Counselor."""
    client = get_gemini_client(api_key_override)
    if not client:
        return "Please configure your Gemini API Key in the sidebar to chat with the AI Counselor."

    model = get_model_name(model_override)

    system_instruction = f"""
You are 'Dr. Sophia Laurent', Chief Academic Counselor for EduPath AI.
You are talking to an ambitious student preparing for undergraduate university admissions.
Context about the student:
- Top Recommended Degree: {top_major.get('title')} ({top_major.get('category')})
- Degree Type: {top_major.get('degree_type')}
- High School Subjects: {', '.join(user_profile.get('subjects', []))}
- Student Skills & Strengths: {', '.join(user_profile.get('skills', []))}
- Student Passions & Interests: {', '.join(user_profile.get('interests', []))}
- Personal Career Goal: "{user_profile.get('statement')}"
- Top Target Universities: {', '.join(top_major.get('top_universities', []))}

Personality & Guidelines:
1. Speak with warmth, academic authority, and clear actionable steps.
2. If asked about admissions (e.g. Italy, Politecnico di Milano, Sapienza, UK, Germany, USA), explain realistic admission tests (e.g., TOLC-I, SAT), tuition benefits (e.g., Italian DSU scholarships, low public EU tuition), and preparation strategies.
3. Keep responses structured, concise, and inspiring. Use bold headings and bullet points.
"""

    formatted_contents = [system_instruction, "--- Conversation History ---"]
    for msg in messages:
        role = "Student" if msg["role"] == "user" else "Counselor"
        formatted_contents.append(f"{role}: {msg['content']}")

    prompt = "\n".join(formatted_contents) + "\nCounselor:"

    try:
        return _call_gemini(client, prompt, model)
    except Exception as e:
        return f"⚠️ Error communicating with Gemini ({model}): {str(e)}"
