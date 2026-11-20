"""
EduPath AI - Command Line Interface (CLI Mode)
Runs standalone without needing a web browser.
"""

from recommender import calculate_major_matches

def main():
    print("=" * 70)
    print("        🎓 EDUPATH AI - BACHELOR MAJOR & CAREER RECOMMENDER        ")
    print("=" * 70)

    print("\nPlease enter your profile details:")
    interests_input = input("1. Enter your interests/hobbies (comma-separated, e.g. coding, ai, math): ")
    skills_input = input("2. Enter your current skills (comma-separated, e.g. Python, Logic, Design): ")
    statement = input("3. What is your career goal/dream in 1 sentence?: ")

    user_profile = {
        "interests": [i.strip() for i in interests_input.split(",") if i.strip()],
        "skills": [s.strip() for s in skills_input.split(",") if s.strip()],
        "statement": statement
    }

    print("\n[+] Analyzing profile using NLP TF-IDF & compatibility algorithms...")
    results = calculate_major_matches(user_profile)

    print("\n" + "=" * 70)
    print("                      🎯 TOP RECOMMENDATIONS                       ")
    print("=" * 70)

    for rank, major in enumerate(results[:3], 1):
        print(f"\n#{rank} Major: {major['title']}")
        print(f"   Compatibility Score : {major['match_score']}%")
        print(f"   Category            : {major['category']}")
        print(f"   Overview            : {major['description']}")
        print(f"   Potential Careers   : {', '.join(major['careers'])}")
        print(f"   Avg Salary Range    : {major['avg_salary']}")
        print(f"   Market Demand       : {major['growth_rate']}")
        print("-" * 70)

    print("\n[✓] Analysis complete! Best fit for you is: " + results[0]["title"])

if __name__ == "__main__":
    main()
