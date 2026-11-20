"""
Recommendation Engine for EduPath AI.
Uses NLP text vectorization (TF-IDF + Cosine Similarity) along with
multi-criteria weighted scoring to rank academic majors for students.
"""

try:
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity
    HAS_SKLEARN = True
except ImportError:
    HAS_SKLEARN = False

from data import MAJORS_DATA


def calculate_major_matches(user_profile: dict) -> list:
    """
    Computes a personalized compatibility score (0 to 100%) for each major
    based on student interests, preferred subjects, and core skills.
    """
    user_interests_str = " ".join(user_profile.get("interests", []))
    user_skills_str = " ".join(user_profile.get("skills", []))
    user_statement = user_profile.get("statement", "")
    
    # Combined user feature text
    user_text = f"{user_interests_str} {user_skills_str} {user_statement}".lower()

    # Build corpus from majors
    major_texts = []
    for m in MAJORS_DATA:
        major_corpus = (
            f"{m['title']} {m['category']} {m['description']} "
            f"{' '.join(m['skills'])} {' '.join(m['interests'])}"
        ).lower()
        major_texts.append(major_corpus)

    cosine_scores = []
    if HAS_SKLEARN:
        # NLP TF-IDF Cosine Similarity calculation
        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix = vectorizer.fit_transform([user_text] + major_texts)
        user_vector = tfidf_matrix[0]
        major_vectors = tfidf_matrix[1:]
        cosine_scores = cosine_similarity(user_vector, major_vectors).flatten()
    else:
        # Fallback word-frequency similarity if sklearn is not yet installed
        user_words = set(user_text.split())
        for corpus in major_texts:
            major_words = set(corpus.split())
            intersection = user_words.intersection(major_words)
            sim = len(intersection) / max(len(user_words), 1)
            cosine_scores.append(sim)

    results = []
    user_skills_set = set([s.lower() for s in user_profile.get("skills", [])])
    user_interests_set = set([i.lower() for i in user_profile.get("interests", [])])

    for idx, major in enumerate(MAJORS_DATA):
        nlp_score = float(cosine_scores[idx]) * 100

        # Direct skill overlap bonus
        major_skills = set([s.lower() for s in major["skills"]])
        skill_matches = user_skills_set.intersection(major_skills)
        skill_score = (len(skill_matches) / max(len(major["skills"]), 1)) * 100

        # Direct interest overlap bonus
        major_interests = set([i.lower() for i in major["interests"]])
        interest_matches = user_interests_set.intersection(major_interests)
        interest_score = (len(interest_matches) / max(len(major["interests"]), 1)) * 100

        # Weighted composite score
        # 40% NLP text similarity + 35% Interest match + 25% Skill alignment
        final_score = (0.40 * nlp_score) + (0.35 * interest_score) + (0.25 * skill_score)
        final_score = min(max(final_score, 12.0), 98.5) # Natural realistic boundaries

        results.append({
            "title": major["title"],
            "category": major["category"],
            "match_score": round(final_score, 1),
            "description": major["description"],
            "matched_skills": list(skill_matches),
            "recommended_skills": major["skills"],
            "careers": major["careers"],
            "avg_salary": major["avg_salary"],
            "growth_rate": major["growth_rate"]
        })

    # Sort descending by match score
    results.sort(key=lambda x: x["match_score"], reverse=True)
    return results
