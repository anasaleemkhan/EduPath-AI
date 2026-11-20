"""
Majors and Careers Knowledge Base.
Contains detailed data for various academic majors, required skills, 
compatible interests, career opportunities, and market outlook.
"""

MAJORS_DATA = [
    {
        "id": "cs",
        "title": "Computer Science & Software Engineering",
        "category": "Technology & Engineering",
        "description": "Focuses on computation, software architecture, algorithms, and artificial intelligence.",
        "skills": ["Python", "Algorithms", "Mathematics", "Problem Solving", "Logic", "Web Development"],
        "interests": ["coding", "gaming", "building apps", "ai", "problem solving", "automation", "computers"],
        "careers": ["Software Engineer", "Full-Stack Developer", "AI/ML Engineer", "Cloud Architect"],
        "avg_salary": "$85,000 - $130,000",
        "growth_rate": "25% (Much faster than average)"
    },
    {
        "id": "ds",
        "title": "Data Science & Artificial Intelligence",
        "category": "Technology & Mathematics",
        "description": "Combines statistical analysis, machine learning, and big data to solve complex problems.",
        "skills": ["Statistics", "Python", "Data Analysis", "Machine Learning", "SQL", "Critical Thinking"],
        "interests": ["math", "data", "predictions", "ai", "research", "patterns", "analytics"],
        "careers": ["Data Scientist", "Machine Learning Engineer", "Business Intelligence Analyst", "Data Engineer"],
        "avg_salary": "$90,000 - $135,000",
        "growth_rate": "35% (Extremely high demand)"
    },
    {
        "id": "mech",
        "title": "Mechanical & Aerospace Engineering",
        "category": "Engineering & Physics",
        "description": "Involves design, manufacturing, thermodynamics, robotics, and mechanical systems.",
        "skills": ["Physics", "Calculus", "CAD Design", "Thermodynamics", "Robotics", "Material Science"],
        "interests": ["machines", "cars", "planes", "robotics", "building things", "physics", "hardware"],
        "careers": ["Mechanical Engineer", "Robotics Specialist", "Aerospace Engineer", "Automotive Designer"],
        "avg_salary": "$78,000 - $115,000",
        "growth_rate": "10% (Steady growth)"
    },
    {
        "id": "bba",
        "title": "Business Administration & Management",
        "category": "Business & Finance",
        "description": "Covers organizational leadership, strategic decision-making, marketing, and business operations.",
        "skills": ["Leadership", "Communication", "Project Management", "Strategic Planning", "Negotiation"],
        "interests": ["startups", "entrepreneurship", "business", "leadership", "management", "public speaking"],
        "careers": ["Product Manager", "Management Consultant", "Business Operations Lead", "Entrepreneur"],
        "avg_salary": "$70,000 - $120,000",
        "growth_rate": "11% (Faster than average)"
    },
    {
        "id": "fin",
        "title": "Finance & Financial Technology (FinTech)",
        "category": "Business & Mathematics",
        "description": "Examines financial markets, investments, algorithmic trading, and corporate finance.",
        "skills": ["Financial Modeling", "Accounting", "Quantitative Analysis", "Risk Management", "Excel"],
        "interests": ["stocks", "investing", "crypto", "economics", "markets", "banking", "finance"],
        "careers": ["Investment Banker", "Financial Analyst", "Quantitative Trader", "Risk Manager"],
        "avg_salary": "$80,000 - $140,000",
        "growth_rate": "15% (High demand)"
    },
    {
        "id": "biotech",
        "title": "Biotechnology & Biomedical Sciences",
        "category": "Life Sciences & Healthcare",
        "description": "Applies biological principles, genetics, and biotechnology to develop medicines and healthcare solutions.",
        "skills": ["Biology", "Chemistry", "Laboratory Research", "Genetics", "Scientific Writing"],
        "interests": ["healthcare", "medicine", "genetics", "biology", "research", "lab experiments", "curing diseases"],
        "careers": ["Biomedical Researcher", "Genomics Specialist", "Clinical Trial Coordinator", "Biochemist"],
        "avg_salary": "$72,000 - $110,000",
        "growth_rate": "17% (Rapid expansion)"
    },
    {
        "id": "psych",
        "title": "Psychology & Behavioral Science",
        "category": "Social Sciences",
        "description": "Studies human behavior, mental processes, cognitive psychology, and behavioral economics.",
        "skills": ["Active Listening", "Empathy", "Behavioral Analysis", "Research Methods", "Communication"],
        "interests": ["human behavior", "mental health", "counseling", "brain", "helping people", "social research"],
        "careers": ["UX Researcher", "Human Resources Specialist", "Behavioral Analyst", "Clinical Counselor"],
        "avg_salary": "$62,000 - $95,000",
        "growth_rate": "12% (Steady growth)"
    },
    {
        "id": "design",
        "title": "UI/UX & Interactive Digital Design",
        "category": "Design & Technology",
        "description": "Blends visual aesthetics, psychology, and technology to build intuitive user experiences.",
        "skills": ["Figma", "User Research", "Wireframing", "Visual Design", "Prototyping", "Design Thinking"],
        "interests": ["art", "design", "creative apps", "graphics", "aesthetics", "drawing", "creativity"],
        "careers": ["UI/UX Designer", "Product Designer", "Creative Director", "Interaction Designer"],
        "avg_salary": "$75,000 - $118,000",
        "growth_rate": "16% (High demand in tech)"
    }
]
