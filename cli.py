"""
EduPath AI - Enterprise Command Line Interface (CLI Mode).
Allows headless profiling, competency assessment, and Gemini 4 academic counseling.
"""

import argparse
import sys
from recommender import (
    calculate_major_matches,
    parse_and_merge_inputs,
    compute_student_radar_metrics
)
import ai_advisor


def main():
    parser = argparse.ArgumentParser(description="EduPath AI - Terminal Academic Guidance Engine")
    parser.add_argument("--subjects", "-sub", type=str, default="Mathematics, Physics, Computer Science", help="Comma-separated subjects")
    parser.add_argument("--interests", "-i", type=str, default="coding, ai, software, robotics", help="Comma-separated passions/hobbies")
    parser.add_argument("--skills", "-sk", type=str, default="Python, Logic, Problem Solving", help="Comma-separated skills")
    parser.add_argument("--statement", "-st", type=str, default="I want to design intelligent systems and software to solve real-world problems.", help="Personal career vision")
    parser.add_argument("--model", "-m", type=str, default="gemini-4-hydrogen", help="Gemini Model (default: gemini-4-hydrogen)")
    parser.add_argument("--ai", action="store_true", help="Generate live Gemini AI advisory insights")

    args = parser.parse_args()

    subjects = parse_and_merge_inputs([], args.subjects)
    interests = parse_and_merge_inputs([], args.interests)
    skills = parse_and_merge_inputs([], args.skills)

    profile = {
        "subjects": subjects,
        "interests": interests,
        "skills": skills,
        "statement": args.statement
    }

    print("=" * 75)
    print("      🎓 EDUPATH AI — ENTERPRISE ACADEMIC & CAREER GUIDANCE SYSTEM       ")
    print("=" * 75)
    print(f"Profile: {len(subjects)} Subjects | {len(skills)} Skills | {len(interests)} Passions")
    print("-" * 75)

    results = calculate_major_matches(profile)
    radar = compute_student_radar_metrics(profile)

    print("\n[+] 6-D Student Competency Assessment (0-100):")
    for dim, score in radar.items():
        print(f"    • {dim.capitalize():<12}: {score}/100")

    print("\n[+] Top 3 Recommended Undergraduate Degrees:")
    for rank, major in enumerate(results[:3], 1):
        print(f"\n#{rank} {major['title']} ({major['degree_type']})")
        print(f"   Category         : {major['category']}")
        print(f"   Compatibility    : {major['match_score']}% Match")
        print(f"   Description      : {major['description']}")
        print(f"   Career Paths     : {', '.join(major['careers'])}")
        print(f"   Compensation     : {major['avg_salary']}")
        print(f"   Top Universities : {', '.join(major['top_universities'][:3])}")
        print("-" * 75)

    if args.ai:
        print(f"\n[+] Requesting Gemini 4 Advisory Evaluation ({args.model})...\n")
        rationale = ai_advisor.generate_counselor_rationale(profile, results[0], model_override=args.model)
        print(rationale)
        print("=" * 75)


if __name__ == "__main__":
    main()
