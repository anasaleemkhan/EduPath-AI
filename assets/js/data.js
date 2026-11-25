/**
 * EduPath AI - Academic Knowledge Base (Client-Side Edition)
 * Contains 24 structured Bachelor's Degree Programs, University Directory,
 * and Admissions Knowledge Base.
 */

const MAJORS_DATA = [
  {
    id: "cs",
    title: "Computer Science & Software Architecture",
    category: "Technology & Computing",
    degree_type: "B.Sc. (3-4 Years)",
    description: "Explores computation theory, high-performance software engineering, distributed systems, and core computer architecture.",
    skills: ["Python", "C++", "Algorithms", "Data Structures", "Mathematics", "Problem Solving", "Linux", "Object-Oriented Programming"],
    interests: ["coding", "software", "building apps", "open source", "system design", "algorithms", "problem solving", "automation"],
    prerequisite_subjects: ["Mathematics", "Physics", "Computer Science"],
    careers: ["Software Architect", "Full-Stack Engineer", "Cloud Systems Engineer", "Backend Developer"],
    avg_salary: "$90,000 - $140,000 (€45,000 - €75,000 in EU)",
    growth_rate: "26% (High Global Demand)",
    top_universities: ["Politecnico di Milano (Italy)", "ETH Zurich (Switzerland)", "Oxford University (UK)", "Politecnico di Torino (Italy)", "TU Munich (Germany)"],
    curriculum_highlights: ["Data Structures & Algorithms", "Operating Systems & Networking", "Computer Architecture", "Database Systems", "Software Engineering Lab"],
    radar_profile: { tech: 95, math: 85, science: 65, business: 45, design: 60, leadership: 50 }
  },
  {
    id: "ai_robotics",
    title: "Artificial Intelligence & Autonomous Robotics",
    category: "Technology & Artificial Intelligence",
    degree_type: "B.Sc. / B.Eng. (3-4 Years)",
    description: "Blends deep learning, computer vision, natural language processing, and mechatronic control for intelligent autonomous systems.",
    skills: ["Machine Learning", "Python", "Linear Algebra", "Calculus", "PyTorch", "Computer Vision", "Control Systems", "Probability"],
    interests: ["ai", "robotics", "deep learning", "neural networks", "autonomous vehicles", "automation", "drones", "future tech"],
    prerequisite_subjects: ["Mathematics", "Physics", "Computer Science"],
    careers: ["AI/ML Research Engineer", "Robotics Perception Specialist", "Computer Vision Scientist", "Autonomous Systems Developer"],
    avg_salary: "$105,000 - $160,000 (€52,000 - €85,000 in EU)",
    growth_rate: "38% (Explosive Growth)",
    top_universities: ["Politecnico di Milano (Italy)", "University of Bologna (Italy)", "TU Delft (Netherlands)", "Sapienza University of Rome (Italy)", "EPFL (Switzerland)"],
    curriculum_highlights: ["Foundations of AI & Search", "Deep Neural Networks", "Probabilistic Robotics", "Perception & Computer Vision", "Reinforcement Learning"],
    radar_profile: { tech: 98, math: 92, science: 75, business: 40, design: 50, leadership: 45 }
  },
  {
    id: "ds",
    title: "Data Science & Applied Analytics",
    category: "Technology & Mathematics",
    degree_type: "B.Sc. (3-4 Years)",
    description: "Focuses on statistical modeling, large-scale data engineering, predictive analytics, and scientific machine learning.",
    skills: ["Statistics", "Python", "SQL", "Data Visualization", "Pandas", "Hypothesis Testing", "Machine Learning", "Big Data"],
    interests: ["data", "statistics", "predictions", "analytics", "patterns", "data visualization", "graphs", "decision making"],
    prerequisite_subjects: ["Mathematics", "Statistics", "Computer Science"],
    careers: ["Data Scientist", "Quantitative Analyst", "Machine Learning Engineer", "BI Analytics Architect"],
    avg_salary: "$95,000 - $145,000 (€48,000 - €78,000 in EU)",
    growth_rate: "33% (Very High Demand)",
    top_universities: ["University of Bologna (Italy)", "Politecnico di Milano (Italy)", "Sapienza University of Rome (Italy)", "KU Leuven (Belgium)", "Imperial College London (UK)"],
    curriculum_highlights: ["Statistical Inference & Probability", "Machine Learning & Pattern Recognition", "Big Data Architectures (Spark/Hadoop)", "Time Series Analysis", "Data Ethics"],
    radar_profile: { tech: 90, math: 95, science: 65, business: 65, design: 55, leadership: 50 }
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity & Cloud Infrastructure",
    category: "Technology & Security",
    degree_type: "B.Sc. (3-4 Years)",
    description: "Specializes in offensive and defensive security, cryptography, network forensics, reverse engineering, and resilient cloud architecture.",
    skills: ["Network Security", "Cryptography", "Linux", "Penetration Testing", "Python", "Cloud Computing", "Reverse Engineering", "Incident Response"],
    interests: ["cybersecurity", "hacking", "cryptography", "privacy", "networks", "security", "linux", "cloud systems"],
    prerequisite_subjects: ["Computer Science", "Mathematics", "Physics"],
    careers: ["Security Operations Engineer", "Penetration Tester / Ethical Hacker", "Cloud Security Architect", "Cryptographic Protocol Engineer"],
    avg_salary: "$92,000 - $140,000 (€46,000 - €76,000 in EU)",
    growth_rate: "32% (Critical Global Shortage)",
    top_universities: ["Politecnico di Torino (Italy)", "Royal Holloway London (UK)", "TU Munich (Germany)", "Sapienza University of Rome (Italy)", "Aalto University (Finland)"],
    curriculum_highlights: ["Applied Cryptography", "Network Protocol & Intrusion Detection", "Cloud Computing & DevSecOps", "Software Vulnerability Analysis", "Digital Forensics"],
    radar_profile: { tech: 94, math: 80, science: 60, business: 50, design: 35, leadership: 60 }
  },
  {
    id: "mech_mechatronics",
    title: "Mechanical & Mechatronics Engineering",
    category: "Engineering & Physics",
    degree_type: "B.Eng. / B.Sc. (3-4 Years)",
    description: "Integrates classical mechanical mechanics, thermodynamics, sensor integration, and micro-electromechanical control systems.",
    skills: ["CAD / SolidWorks", "Thermodynamics", "Statics & Dynamics", "Microcontrollers", "Control Theory", "Materials Science", "MATLAB"],
    interests: ["machines", "cars", "engines", "hardware", "building prototypes", "mechanics", "3d printing", "manufacturing"],
    prerequisite_subjects: ["Physics", "Mathematics", "Chemistry"],
    careers: ["Mechatronics Engineer", "Automotive Systems Designer", "Robotics Hardware Specialist", "Manufacturing Automation Lead"],
    avg_salary: "$82,000 - $125,000 (€42,000 - €70,000 in EU)",
    growth_rate: "12% (Steady Engineering Backbone)",
    top_universities: ["Politecnico di Milano (Italy)", "Politecnico di Torino (Italy)", "RWTH Aachen (Germany)", "TU Delft (Netherlands)", "University of Padua (Italy)"],
    curriculum_highlights: ["Applied Mechanics & Kinematics", "Fluid Dynamics & Heat Transfer", "Mechatronic Systems & Actuators", "Sensors & Instrumentation", "Computer-Aided Design"],
    radar_profile: { tech: 75, math: 85, science: 92, business: 40, design: 65, leadership: 45 }
  },
  {
    id: "aerospace",
    title: "Aerospace & Astronautical Engineering",
    category: "Engineering & Physics",
    degree_type: "B.Eng. / B.Sc. (3-4 Years)",
    description: "Studies atmospheric aerodynamics, orbital mechanics, propulsion systems, composite materials, and satellite navigation.",
    skills: ["Aerodynamics", "Orbital Mechanics", "Computational Fluid Dynamics", "Calculus", "Physics", "Propulsion", "Flight Dynamics"],
    interests: ["space", "rockets", "airplanes", "satellites", "astronomy", "aerodynamics", "nasa", "flight simulation"],
    prerequisite_subjects: ["Physics", "Mathematics", "Chemistry"],
    careers: ["Aerospace Propulsion Engineer", "Satellite Systems Specialist", "Flight Dynamics Analyst", "Aero-structures Consultant"],
    avg_salary: "$88,000 - $138,000 (€46,000 - €80,000 in EU)",
    growth_rate: "14% (Expanding Space Economy)",
    top_universities: ["Politecnico di Milano (Italy)", "Politecnico di Torino (Italy)", "TU Delft (Netherlands)", "ISAE-Supaero (France)", "Sapienza University of Rome (Italy)"],
    curriculum_highlights: ["Incompressible & Compressible Aerodynamics", "Aerospace Propulsion", "Orbital Mechanics & Space Missions", "Structures & Lightweight Materials", "Avionics"],
    radar_profile: { tech: 80, math: 94, science: 95, business: 35, design: 55, leadership: 40 }
  },
  {
    id: "electrical_electronic",
    title: "Electrical & Electronic Engineering (Semiconductors)",
    category: "Engineering & Physics",
    degree_type: "B.Eng. / B.Sc. (3-4 Years)",
    description: "Covers semiconductor microelectronics, embedded circuits, analog/digital signal processing, and power grid electronics.",
    skills: ["Circuit Design", "Signal Processing", "VHDL / Verilog", "Embedded C", "Electromagnetism", "PCB Design", "Semiconductor Physics"],
    interests: ["electronics", "chips", "hardware", "circuits", "gadgets", "semiconductors", "iot", "arduino"],
    prerequisite_subjects: ["Physics", "Mathematics"],
    careers: ["Semiconductor Design Engineer", "Embedded Hardware Architect", "FPGA Engineer", "Power Electronics Lead"],
    avg_salary: "$86,000 - $132,000 (€44,000 - €74,000 in EU)",
    growth_rate: "15% (European Chips Act Priority)",
    top_universities: ["Politecnico di Milano (Italy)", "Politecnico di Torino (Italy)", "KU Leuven (Belgium)", "Eindhoven TU (Netherlands)", "University of Pisa (Italy)"],
    curriculum_highlights: ["Digital Circuit Synthesis", "Analog Microelectronics", "Semiconductor Physics", "Signals & Linear Systems", "Embedded Microcontrollers"],
    radar_profile: { tech: 88, math: 88, science: 90, business: 35, design: 45, leadership: 40 }
  },
  {
    id: "biomedical_eng",
    title: "Biomedical Engineering & Neurotechnology",
    category: "Engineering & Life Sciences",
    degree_type: "B.Eng. / B.Sc. (3-4 Years)",
    description: "Bridges engineering with healthcare, creating neural implants, bionic prosthetics, MRI imaging systems, and tissue scaffolds.",
    skills: ["Biomechanics", "Biomedical Signal Processing", "Physiology", "Biomaterials", "Python / MATLAB", "Medical Device Regulations"],
    interests: ["healthcare", "medicine", "bionics", "prosthetics", "neuroscience", "implants", "saving lives", "bioengineering"],
    prerequisite_subjects: ["Biology", "Physics", "Mathematics", "Chemistry"],
    careers: ["Biomedical Device Engineer", "Clinical Systems Specialist", "Neuro-prosthetics Researcher", "Medical Robotics Engineer"],
    avg_salary: "$80,000 - $125,000 (€40,000 - €68,000 in EU)",
    growth_rate: "20% (High Longevity & Healthcare Demand)",
    top_universities: ["Politecnico di Milano (Italy)", "University of Padua (Italy)", "ETH Zurich (Switzerland)", "University of Bologna (Italy)", "Imperial College London (UK)"],
    curriculum_highlights: ["Biomedical Signals & Imaging", "Biomechanics & Biofluids", "Biomaterials & Tissue Engineering", "Human Anatomy & Physiology for Engineers", "Medical Robotics"],
    radar_profile: { tech: 80, math: 82, science: 94, business: 40, design: 60, leadership: 50 }
  },
  {
    id: "sustainable_energy",
    title: "Sustainable Energy & Environmental Engineering",
    category: "Engineering & Sustainability",
    degree_type: "B.Eng. / B.Sc. (3-4 Years)",
    description: "Focuses on decarbonization, photovoltaic systems, wind power, green hydrogen, carbon capture, and environmental monitoring.",
    skills: ["Renewable Energy Modeling", "Thermodynamics", "Environmental Chemistry", "GIS Mapping", "Lifecycle Assessment (LCA)", "Energy Policy"],
    interests: ["clean energy", "climate change", "sustainability", "solar panels", "wind energy", "green tech", "environment", "ecology"],
    prerequisite_subjects: ["Physics", "Chemistry", "Mathematics"],
    careers: ["Renewable Energy Engineer", "Sustainability Consultant", "Grid Decarbonization Analyst", "Environmental Impact Assessor"],
    avg_salary: "$78,000 - $120,000 (€40,000 - €65,000 in EU)",
    growth_rate: "28% (European Green Deal Mandate)",
    top_universities: ["Politecnico di Milano (Italy)", "Politecnico di Torino (Italy)", "DTU Denmark", "KTH Royal Institute (Sweden)", "University of Bologna (Italy)"],
    curriculum_highlights: ["Solar, Wind & Hydro Systems", "Energy Storage & Batteries", "Thermal Power & Decarbonization", "Environmental Impact Assessment", "Smart Grid Dynamics"],
    radar_profile: { tech: 75, math: 80, science: 92, business: 55, design: 45, leadership: 60 }
  },
  {
    id: "biotech_bioinformatics",
    title: "Biotechnology & Computational Genomics",
    category: "Life Sciences & Computing",
    degree_type: "B.Sc. (3-4 Years)",
    description: "Applies gene editing (CRISPR), molecular biology, computational sequence alignment, and algorithmic drug design.",
    skills: ["Genetics", "Molecular Biology", "Python / R", "Bioinformatics Pipelines", "Biochemistry", "Sequence Alignment", "Statistical Genetics"],
    interests: ["genetics", "dna", "crispr", "biology", "pharmaceuticals", "curing cancer", "lab research", "vaccines"],
    prerequisite_subjects: ["Biology", "Chemistry", "Mathematics"],
    careers: ["Computational Biologist", "Genomics Specialist", "Biotech Research Scientist", "Bioinformatics Pipeline Engineer"],
    avg_salary: "$76,000 - $122,000 (€40,000 - €70,000 in EU)",
    growth_rate: "22% (Precision Medicine Revolution)",
    top_universities: ["University of Bologna (Italy)", "University of Padua (Italy)", "Sapienza University of Rome (Italy)", "Wageningen University (Netherlands)", "Cambridge (UK)"],
    curriculum_highlights: ["Genomics & Proteomics", "Algorithms in Bioinformatics", "Recombinant DNA Technology", "Structural Biochemistry", "Biostatistics"],
    radar_profile: { tech: 78, math: 80, science: 96, business: 45, design: 40, leadership: 45 }
  },
  {
    id: "fintech_quant",
    title: "Quantitative Finance & Financial Technology (FinTech)",
    category: "Economics & Mathematics",
    degree_type: "B.Sc. (3-4 Years)",
    description: "Merges stochastic calculus, algorithmic trading, financial derivatives, blockchain architecture, and quantitative risk modeling.",
    skills: ["Stochastic Calculus", "Python / C++", "Financial Modeling", "Time Series Econometrics", "Risk Management", "Machine Learning in Finance"],
    interests: ["stocks", "investing", "crypto", "markets", "trading algorithms", "economics", "fintech", "wealth management"],
    prerequisite_subjects: ["Mathematics", "Economics", "Computer Science"],
    careers: ["Quantitative Trader", "Financial Risk Analyst", "FinTech Product Architect", "Investment Banking Strategist"],
    avg_salary: "$100,000 - $175,000 (€55,000 - €95,000 in EU)",
    growth_rate: "24% (High Financial Center Demand)",
    top_universities: ["Bocconi University (Milan, Italy)", "Politecnico di Milano (Italy)", "London School of Economics (UK)", "University of St. Gallen (Switzerland)", "Bologna (Italy)"],
    curriculum_highlights: ["Financial Mathematics & Derivatives", "Algorithmic Trading & High-Frequency Systems", "Econometrics & Time Series", "Corporate Finance & Capital Markets", "Blockchain & Decentralized Finance"],
    radar_profile: { tech: 85, math: 96, science: 50, business: 92, design: 35, leadership: 70 }
  },
  {
    id: "econ_mgmt",
    title: "International Economics & Strategic Management",
    category: "Business & Economics",
    degree_type: "B.Sc. / B.B.A. (3-4 Years)",
    description: "Studies global macroeconomic policy, organizational leadership, supply chain dynamics, consulting strategy, and corporate development.",
    skills: ["Strategic Planning", "Micro & Macroeconomics", "Data-Driven Decision Making", "Financial Accounting", "Leadership", "Public Speaking"],
    interests: ["startups", "entrepreneurship", "business", "global trade", "leadership", "management", "consulting", "public speaking"],
    prerequisite_subjects: ["Mathematics", "Economics", "Literature / History"],
    careers: ["Management Consultant", "Strategic Operations Lead", "Global Product Manager", "Venture Capital Analyst", "Founder / CEO"],
    avg_salary: "$82,000 - $135,000 (€45,000 - €75,000 in EU)",
    growth_rate: "15% (Solid Global Corporate Demand)",
    top_universities: ["Bocconi University (Milan, Italy)", "LUISS University (Rome, Italy)", "HEC Paris (France)", "Erasmus University Rotterdam (Netherlands)", "Bologna (Italy)"],
    curriculum_highlights: ["Strategic Corporate Management", "Macroeconomic Policy & International Trade", "Financial Accounting & Valuation", "Organizational Behavior", "Business Analytics"],
    radar_profile: { tech: 50, math: 75, science: 40, business: 98, design: 50, leadership: 95 }
  },
  {
    id: "cognitive_science",
    title: "Cognitive Science & Computational Linguistics",
    category: "Social & Computational Sciences",
    degree_type: "B.Sc. (3-4 Years)",
    description: "Investigates human cognition, mental architectures, cognitive neuroscience, and Natural Language Processing (NLP) models.",
    skills: ["Cognitive Psychology", "Neuroscience Fundamentals", "Python", "Natural Language Processing", "Experimental Design", "Data Analysis"],
    interests: ["human mind", "psychology", "brain", "languages", "nlp", "llms", "mental models", "philosophy of mind"],
    prerequisite_subjects: ["Biology", "Mathematics", "English / Literature"],
    careers: ["NLP Data Strategist", "Cognitive UX Researcher", "AI Conversation Designer", "Human Factors Engineer"],
    avg_salary: "$75,000 - $118,000 (€40,000 - €65,000 in EU)",
    growth_rate: "22% (Driven by Generative AI)",
    top_universities: ["University of Trento (Italy)", "University of Bologna (Italy)", "Sapienza University of Rome (Italy)", "Edinburgh (UK)", "Radboud (Netherlands)"],
    curriculum_highlights: ["Cognitive Psychology & Memory", "Computational Linguistics & Syntax", "Neuroscience & Brain Imaging", "Human-Agent Interaction", "Statistical Experimental Methods"],
    radar_profile: { tech: 75, math: 70, science: 82, business: 45, design: 70, leadership: 60 }
  },
  {
    id: "uiux_design",
    title: "UI/UX & Human-Centered Interaction Design",
    category: "Design & Technology",
    degree_type: "B.Des. / B.Sc. (3-4 Years)",
    description: "Fuses visual aesthetics, cognitive psychology, front-end prototyping, design systems, and inclusive user experience architecture.",
    skills: ["Figma", "User Research", "Wireframing", "Interaction Design", "Design Systems", "HTML/CSS/JS", "Usability Testing", "Design Thinking"],
    interests: ["art", "design", "figma", "visual aesthetics", "creative apps", "drawing", "typography", "user experience"],
    prerequisite_subjects: ["Art & Design", "Computer Science", "Psychology"],
    careers: ["Lead Product Designer", "Senior UX/UI Specialist", "Creative Tech Director", "Design Systems Lead"],
    avg_salary: "$80,000 - $125,000 (€42,000 - €68,000 in EU)",
    growth_rate: "18% (Strong Tech & Studio Demand)",
    top_universities: ["Politecnico di Milano - School of Design (Italy)", "Umeå Institute of Design (Sweden)", "Delft University of Technology (Netherlands)", "UAL London (UK)", "IUAV Venice (Italy)"],
    curriculum_highlights: ["Human-Computer Interaction (HCI)", "Design Systems & Visual Typography", "Qualitative User Research & Usability Testing", "Interactive Web Prototyping", "Inclusive Design"],
    radar_profile: { tech: 65, math: 40, science: 45, business: 60, design: 98, leadership: 65 }
  },
  {
    id: "architecture_smartcities",
    title: "Architecture & Sustainable Urban Planning",
    category: "Architecture & Engineering",
    degree_type: "B.Arch. / B.Sc. (3-5 Years)",
    description: "Blends historical building design, computational generative architecture (BIM), urban sociology, and smart city infrastructure.",
    skills: ["Architectural Drawing", "Revit / BIM", "Rhino / Grasshopper", "Spatial Analysis / GIS", "Structural Statics", "Sustainable Materials"],
    interests: ["buildings", "architecture", "city planning", "urban design", "drawing", "monuments", "smart cities", "construction"],
    prerequisite_subjects: ["Art & Design", "Physics", "Mathematics", "History"],
    careers: ["Architectural Designer", "Smart City Urban Planner", "BIM Coordinator", "Historic Heritage Conservator"],
    avg_salary: "$72,000 - $115,000 (€38,000 - €62,000 in EU)",
    growth_rate: "12% (High in European Restoration & Urban Renewal)",
    top_universities: ["Politecnico di Milano (Italy)", "IUAV University of Venice (Italy)", "TU Delft (Netherlands)", "Politecnico di Torino (Italy)", "Sapienza University of Rome (Italy)"],
    curriculum_highlights: ["Architectural Design Studio", "Building Information Modeling (BIM)", "History of European Architecture", "Urban Geography & Smart Cities", "Structural Statics & Timber/Steel"],
    radar_profile: { tech: 60, math: 65, science: 65, business: 50, design: 96, leadership: 65 }
  },
  {
    id: "physics_quantum",
    title: "Applied Physics & Quantum Information Science",
    category: "Natural Sciences & Mathematics",
    degree_type: "B.Sc. (3-4 Years)",
    description: "Explores quantum mechanics, condensed matter physics, quantum computing algorithms (Qiskit), and laser photonics.",
    skills: ["Quantum Mechanics", "Differential Equations", "Linear Algebra", "Python / Qiskit", "Electrodynamics", "Experimental Physics"],
    interests: ["quantum", "physics", "universe", "relativity", "quantum computing", "lasers", "theoretical research", "atoms"],
    prerequisite_subjects: ["Physics", "Mathematics"],
    careers: ["Quantum Software Engineer", "Optical & Photonics Specialist", "Condensed Matter Researcher", "Data Modeling Physicist"],
    avg_salary: "$92,000 - $145,000 (€46,000 - €78,000 in EU)",
    growth_rate: "22% (Emerging Quantum Tech Horizon)",
    top_universities: ["Sapienza University of Rome (Italy)", "University of Padua (Italy)", "ETH Zurich (Switzerland)", "Politecnico di Milano (Italy)", "Oxford (UK)"],
    curriculum_highlights: ["Quantum Mechanics I & II", "Quantum Computing & Information Theory", "Electromagnetism & Wave Optics", "Statistical Thermodynamics", "Computational Physics Methods"],
    radar_profile: { tech: 82, math: 98, science: 98, business: 30, design: 30, leadership: 40 }
  },
  {
    id: "civil_infrastructure",
    title: "Civil & Smart Infrastructure Engineering",
    category: "Engineering & Construction",
    degree_type: "B.Eng. / B.Sc. (3-4 Years)",
    description: "Covers earthquake-resistant structural design, smart transportation grids, geotechnical mechanics, and sustainable mega-structures.",
    skills: ["Structural Analysis", "AutoCAD", "Geotechnical Engineering", "Fluid Mechanics", "Concrete & Steel Design", "Environmental Impact"],
    interests: ["bridges", "skyscrapers", "tunnels", "transportation", "construction", "civil works", "earthquake safety", "public infrastructure"],
    prerequisite_subjects: ["Physics", "Mathematics", "Geology / Chemistry"],
    careers: ["Structural Bridge Engineer", "Transportation Grid Modeler", "Geotechnical Consultant", "Infrastructure Project Director"],
    avg_salary: "$76,000 - $118,000 (€40,000 - €65,000 in EU)",
    growth_rate: "11% (High in EU Modernization)",
    top_universities: ["Politecnico di Milano (Italy)", "Politecnico di Torino (Italy)", "TU Delft (Netherlands)", "EPFL (Switzerland)", "University of Bologna (Italy)"],
    curriculum_highlights: ["Theory of Structures & Statics", "Hydraulics & River Engineering", "Geotechnics & Foundation Design", "Bridge Dynamics", "Smart Transport Networks"],
    radar_profile: { tech: 68, math: 85, science: 88, business: 55, design: 70, leadership: 60 }
  },
  {
    id: "chem_eng",
    title: "Chemical & Sustainable Materials Engineering",
    category: "Engineering & Chemistry",
    degree_type: "B.Eng. / B.Sc. (3-4 Years)",
    description: "Focuses on chemical process optimization, polymer chemistry, battery materials, green catalysis, and pharmaceutical manufacturing.",
    skills: ["Chemical Process Design", "Thermodynamics", "Reaction Kinetics", "Separation Processes", "Polymer Chemistry", "MATLAB / Aspen Plus"],
    interests: ["chemistry", "molecules", "batteries", "green chemicals", "materials", "industrial synthesis", "catalysis", "pharma"],
    prerequisite_subjects: ["Chemistry", "Mathematics", "Physics"],
    careers: ["Process Optimization Engineer", "Battery Materials Specialist", "Catalysis Research Lead", "Pharmaceutical Plant Engineer"],
    avg_salary: "$82,000 - $128,000 (€43,000 - €72,000 in EU)",
    growth_rate: "14% (Circular Economy Growth)",
    top_universities: ["Politecnico di Milano (Italy)", "University of Bologna (Italy)", "TU Eindhoven (Netherlands)", "RWTH Aachen (Germany)", "Politecnico di Torino (Italy)"],
    curriculum_highlights: ["Chemical Reaction Engineering", "Mass & Heat Transport Phenomena", "Process Simulation & Dynamics", "Polymers & Nanomaterials", "Industrial Safety"],
    radar_profile: { tech: 72, math: 86, science: 95, business: 45, design: 40, leadership: 45 }
  },
  {
    id: "medicine_surgery",
    title: "Medicine & Surgery (International English Track)",
    category: "Medicine & Healthcare",
    degree_type: "Single-Cycle M.D. (6 Years)",
    description: "Direct entry English-taught medical curriculum focusing on clinical diagnostics, pathology, translational medical research, and surgery.",
    skills: ["Human Anatomy", "Pathophysiology", "Clinical Diagnostics", "Empathy", "Medical Ethics", "Critical Observation", "Pharmacology"],
    interests: ["medicine", "saving lives", "biology", "human body", "surgery", "hospitals", "diseases", "clinical research"],
    prerequisite_subjects: ["Biology", "Chemistry", "Physics", "Mathematics"],
    careers: ["Medical Doctor / Physician", "Surgeon", "Clinical Research Scientist", "Hospital Medical Officer"],
    avg_salary: "$90,000 - $180,000 (€50,000 - €110,000 in EU)",
    growth_rate: "16% (Constant High Demand)",
    top_universities: ["University of Bologna (Italy)", "Sapienza University of Rome (Italy)", "University of Milan (Italy)", "University of Padua (Italy)", "Karolinska Institute (Sweden)"],
    curriculum_highlights: ["Human Gross Anatomy & Dissection", "Systemic Pathology & Microbiology", "Clinical Pharmacology", "Internal Medicine & Semiotics", "General Surgery & Traumatology"],
    radar_profile: { tech: 55, math: 65, science: 99, business: 35, design: 30, leadership: 85 }
  },
  {
    id: "game_dev",
    title: "Interactive Media & Video Game Engineering",
    category: "Technology & Creative Media",
    degree_type: "B.Sc. / B.A. (3-4 Years)",
    description: "Combines 3D graphics programming, physics engines, procedural world generation, game design mechanics, and shader programming.",
    skills: ["C# / C++", "Unity / Unreal Engine 5", "3D Mathematics", "Shader Programming", "Game Physics", "Audio Integration", "Level Design"],
    interests: ["video games", "game dev", "gaming", "unreal engine", "unity", "animation", "interactive storytelling", "3d graphics"],
    prerequisite_subjects: ["Computer Science", "Mathematics", "Art & Design"],
    careers: ["Game Engine Developer", "Graphics Programmer", "Technical Game Designer", "XR / VR Virtual World Architect"],
    avg_salary: "$78,000 - $125,000 (€40,000 - €68,000 in EU)",
    growth_rate: "19% (Entertainment & Metaverse)",
    top_universities: ["Aalto University (Finland)", "Politecnico di Torino (Italy)", "Breda University (Netherlands)", "Dundee University (UK)", "Utrecht University (Netherlands)"],
    curriculum_highlights: ["Real-Time Rendering Pipelines", "Game Physics & Simulation", "Procedural World Generation", "Multiplayer Network Architecture", "Interactive Storytelling Lab"],
    radar_profile: { tech: 92, math: 80, science: 55, business: 45, design: 88, leadership: 45 }
  },
  {
    id: "international_relations",
    title: "International Relations, Global Governance & Law",
    category: "Humanities & Social Sciences",
    degree_type: "B.A. / B.Sc. (3-4 Years)",
    description: "Examines geopolitical treaties, diplomatic negotiation, international humanitarian law, macro-conflict analysis, and NGO policy.",
    skills: ["Diplomatic Negotiation", "Public Policy Analysis", "International Law", "Cross-Cultural Communication", "Debate & Oratory", "Geopolitical Research"],
    interests: ["politics", "diplomacy", "un", "international law", "world history", "human rights", "negotiation", "policy"],
    prerequisite_subjects: ["History", "Literature / English", "Economics"],
    careers: ["Diplomatic Attaché", "Global Policy Analyst", "International NGO Director", "Foreign Affairs Strategist"],
    avg_salary: "$70,000 - $115,000 (€38,000 - €65,000 in EU)",
    growth_rate: "10% (Government & Global Institutions)",
    top_universities: ["Sciences Po (France)", "Bologna University (Italy)", "LUISS Guido Carli (Italy)", "Geneva Graduate Institute (Switzerland)", "Oxford (UK)"],
    curriculum_highlights: ["Public International Law & Treaties", "Theories of Global Governance", "Geopolitics & Security Studies", "International Organizations (UN/EU)", "Diplomatic Simulation & Rhetoric"],
    radar_profile: { tech: 35, math: 45, science: 35, business: 75, design: 45, leadership: 96 }
  },
  {
    id: "math_crypto",
    title: "Pure & Applied Mathematics (Cryptography Focus)",
    category: "Natural Sciences & Mathematics",
    degree_type: "B.Sc. (3-4 Years)",
    description: "Rigorous theoretical mathematics including abstract algebra, number theory, post-quantum cryptographic primitives, and topology.",
    skills: ["Abstract Algebra", "Number Theory", "Mathematical Proofs", "Real & Complex Analysis", "Topology", "Python / SageMath", "Elliptic Curves"],
    interests: ["math", "logic", "puzzles", "cryptography", "proofs", "number theory", "prime numbers", "pure science"],
    prerequisite_subjects: ["Mathematics", "Physics"],
    careers: ["Cryptographic Researcher", "Mathematical Modeler", "Security Algorithm Architect", "Quantitative Research Fellow"],
    avg_salary: "$92,000 - $150,000 (€48,000 - €82,000 in EU)",
    growth_rate: "25% (Quantum-Resistant Era)",
    top_universities: ["University of Cambridge (UK)", "Sapienza University of Rome (Italy)", "ETH Zurich (Switzerland)", "Bologna (Italy)", "Pisa (Italy)"],
    curriculum_highlights: ["Group Theory & Galois Fields", "Modern Number Theory & Primes", "Elliptic Curve Cryptography", "Measure Theory & Functional Analysis", "Post-Quantum Algorithms"],
    radar_profile: { tech: 80, math: 100, science: 70, business: 45, design: 30, leadership: 40 }
  },
  {
    id: "digital_marketing",
    title: "Digital Marketing Analytics & E-Commerce Growth",
    category: "Business & Communication",
    degree_type: "B.Sc. / B.B.A. (3-4 Years)",
    description: "Integrates behavioral consumer economics, marketing attribution data pipelines, SEO algorithms, performance marketing, and branding.",
    skills: ["Growth Marketing", "Google Analytics 4 / SQL", "Consumer Psychology", "Conversion Rate Optimization (CRO)", "Copywriting", "Paid Ad Performance"],
    interests: ["marketing", "social media", "branding", "sales", "consumer psychology", "content creation", "startups", "advertising"],
    prerequisite_subjects: ["Economics", "English / Literature", "Mathematics"],
    careers: ["Growth Marketing Lead", "Digital Acquisition Strategist", "Brand Marketing Director", "E-Commerce Director"],
    avg_salary: "$68,000 - $115,000 (€36,000 - €62,000 in EU)",
    growth_rate: "18% (E-Commerce Expansion)",
    top_universities: ["Bocconi University (Italy)", "Erasmus Rotterdam (Netherlands)", "ESADE (Spain)", "Bologna University (Italy)", "Copenhagen Business School (Denmark)"],
    curriculum_highlights: ["Behavioral Consumer Economics", "Marketing Analytics & Attribution", "Omnichannel E-Commerce Strategy", "Search Algorithm Optimization", "Brand Narrative Architecture"],
    radar_profile: { tech: 60, math: 65, science: 35, business: 94, design: 75, leadership: 85 }
  },
  {
    id: "environmental_science",
    title: "Environmental Earth Science & Climate Analytics",
    category: "Natural Sciences & Sustainability",
    degree_type: "B.Sc. (3-4 Years)",
    description: "Investigates planetary earth systems, oceanographic circulation, satellite remote sensing, paleoclimatology, and atmospheric modeling.",
    skills: ["Remote Sensing / GIS", "Geochemical Sampling", "Climate Modeling", "Python / Earth Engine", "Ecological Impact Analysis", "Field Hydrology"],
    interests: ["climate", "earth", "nature", "oceans", "wildlife", "satellites", "geology", "conservation"],
    prerequisite_subjects: ["Biology", "Chemistry", "Physics", "Geography / Mathematics"],
    careers: ["Climate Risk Analyst", "Environmental Remote Sensing Specialist", "Hydrologist / Conservation Scientist", "Carbon Offset Auditor"],
    avg_salary: "$72,000 - $112,000 (€38,000 - €62,000 in EU)",
    growth_rate: "17% (Global ESG Mandate)",
    top_universities: ["Wageningen University (Netherlands)", "University of Padua (Italy)", "Sapienza University of Rome (Italy)", "ETH Zurich (Switzerland)", "Utrecht (Netherlands)"],
    curriculum_highlights: ["Satellite Earth Observation & GIS", "Atmospheric Physics & Climate Dynamics", "Environmental Geochemistry", "Oceanography & Marine Systems", "Biodiversity Restoration"],
    radar_profile: { tech: 70, math: 75, science: 96, business: 50, design: 45, leadership: 55 }
  }
];

const PREDEFINED_SUBJECTS = [
  "Mathematics", "Physics", "Computer Science", "Biology",
  "Chemistry", "Economics", "Literature", "Art & Design", "History", "Statistics"
];

const PREDEFINED_INTERESTS = [
  "coding", "ai", "building apps", "machines", "robotics", "startups",
  "investing", "stocks", "healthcare", "medicine", "design", "human behavior",
  "space", "quantum", "cybersecurity", "clean energy", "architecture", "helping people",
  "genetics", "video games", "politics", "earth"
];

const PREDEFINED_SKILLS = [
  "Problem Solving", "Logic", "Python", "Mathematics", "Communication",
  "Leadership", "Data Analysis", "CAD Design", "Biology", "Empathy",
  "Visual Design", "C++", "Statistics", "Public Speaking", "Writing",
  "Figma", "Machine Learning", "Physics", "Circuit Design"
];

const UNIVERSITIES_DIRECTORY = [
  {
    name: "Politecnico di Milano (PoliMi)",
    country: "Italy 🇮🇹",
    city: "Milan",
    rank: "#1 Technical University in Italy, Top 15 Worldwide in Engineering & Design",
    tuition: "€1,000 – €3,890 / year (Income-based, waived with DSU)",
    key_fields: ["Computer Science", "Mechanical Eng", "Aerospace", "Biomedical Eng", "Architecture", "Design"],
    entrance_tests: ["TOLC-I (Engineering)", "TIL-D (Design)", "Architettura (Bilingual)"],
    scholarship: "DSU Regional Grant (Full tuition waiver + €7,000+ cash stipend + subsidized cafeteria)",
    english_programs: "Multiple English-taught Bachelor & Master degrees"
  },
  {
    name: "Sapienza Università di Roma",
    country: "Italy 🇮🇹",
    city: "Rome",
    rank: "Founded in 1303, #1 Globally in Classics & Ancient History, Top in Physics & AI",
    tuition: "€1,000 – €2,900 / year (Income-based)",
    key_fields: ["Applied Computer Science & AI", "Applied Physics & Quantum", "Bioinformatics", "Medicine (IMAT)"],
    entrance_tests: ["English TOLC-I", "IMAT (Medicine)", "SAT"],
    scholarship: "LazioDisco Regional Scholarship (Tuition waiver + living stipend)",
    english_programs: "Applied Computer Science and Artificial Intelligence (100% in English)"
  },
  {
    name: "Università di Bologna (UniBo)",
    country: "Italy 🇮🇹",
    city: "Bologna",
    rank: "World's Oldest University (Est. 1088), Leading research output in Europe",
    tuition: "€1,000 – €3,000 / year (Full waiver for ISEE < €26,000)",
    key_fields: ["Artificial Intelligence", "Data Science", "Economics & Finance", "Genomics", "Medicine"],
    entrance_tests: ["TOLC-I / English TOLC-E", "SAT", "IMAT"],
    scholarship: "ER.GO Scholarship (Up to €7,200/yr stipend + free accommodation / meals)",
    english_programs: "High number of English-taught undergraduate degree tracks"
  },
  {
    name: "Politecnico di Torino (PoliTo)",
    country: "Italy 🇮🇹",
    city: "Turin",
    rank: "Italy's Top Automotive & Cybersecurity Hub, Strong industry ties with Ferrari, Stellantis",
    tuition: "€1,200 – €3,800 / year",
    key_fields: ["Computer Engineering", "Automotive & Mechanical", "Electronic & Semiconductors", "Aerospace"],
    entrance_tests: ["TIL-I (Test di Ingresso in Ingegneria - online or in-person)"],
    scholarship: "EDISU Piemonte (Tuition waiver + €7,000+ living grant)",
    english_programs: "100% English-taught Bachelor in Computer Engineering and Mechanical Engineering"
  },
  {
    name: "Università degli Studi di Padova (UniPd)",
    country: "Italy 🇮🇹",
    city: "Padua",
    rank: "Historic scientific excellence (Galileo's chair), Top in Life Sciences & Cognitive Tech",
    tuition: "€1,000 – €2,900 / year",
    key_fields: ["Biomedical Engineering", "Information Engineering", "Psychological Science", "Earth Sciences"],
    entrance_tests: ["English TOLC-I", "SAT"],
    scholarship: "ESU Padova regional scholarship + Padua International Excellence Awards",
    english_programs: "Bachelors in Information Engineering, Psychological Science, and Animal Care"
  },
  {
    name: "Università Bocconi",
    country: "Italy 🇮🇹",
    city: "Milan",
    rank: "Top 3 in Europe for Economics, Business & Finance (Financial Times)",
    tuition: "€14,000 – €16,500 / year (Merit & Need-based 100% scholarships available)",
    key_fields: ["Quantitative Finance", "International Economics & Management", "Economics & AI"],
    entrance_tests: ["Bocconi Test or SAT / ACT"],
    scholarship: "Bocconi Graduate & Undergraduate Merit & Need Grants (ISU Bocconi)",
    english_programs: "Extensive world-renowned English-taught Bachelor degrees (BESS, BIEM, BIEF)"
  },
  {
    name: "ETH Zurich",
    country: "Switzerland 🇨🇭",
    city: "Zurich",
    rank: "#7 in QS World University Rankings, European center of theoretical physics and CS",
    tuition: "~CHF 1,460 / year (Nominal Swiss public tuition)",
    key_fields: ["Computer Science", "Mathematics", "Mechanical Engineering", "Physics"],
    entrance_tests: ["Comprehensive ETH Entrance Exam (German C1 required for undergraduate)"],
    scholarship: "Excellence Scholarship & Opportunity Programme (ESOP)",
    english_programs: "Bachelors primarily German with English transitions; Masters 100% English"
  },
  {
    name: "TU Delft (Delft University of Technology)",
    country: "Netherlands 🇳🇱",
    city: "Delft",
    rank: "World Top 10 in Mechanical & Aerospace Engineering, Global Architecture pioneer",
    tuition: "€2,530 / yr (EU) | €16,000 / yr (Non-EU)",
    key_fields: ["Aerospace Engineering", "Computer Science & Engineering", "Applied Earth Sciences"],
    entrance_tests: ["Numerus Fixus matching procedure & Math/Physics assessments"],
    scholarship: "Justus & Louise van Effen Excellence Scholarships",
    english_programs: "B.Sc. Aerospace Engineering & B.Sc. Computer Science in English"
  },
  {
    name: "TU Munich (TUM)",
    country: "Germany 🇩🇪",
    city: "Munich",
    rank: "Germany's #1 University of Excellence, Tech startup incubator powerhouse",
    tuition: "Zero public tuition for domestic/EU; modest service fee (~€150/semester)",
    key_fields: ["Information Engineering", "Robotics & AI", "Informatics", "Aerospace"],
    entrance_tests: ["Aptitude Assessment (Curriculum grade matching + online interview)"],
    scholarship: "Deutschlandstipendium (€300/month merit stipend)",
    english_programs: "B.Sc. Information Engineering at TUM Heilbronn Campus (100% English)"
  }
];

const ADVISOR_KNOWLEDGE_BASE = {
  polimi: {
    title: "Admission Requirements for Politecnico di Milano (PoliMi)",
    content: `**Politecnico di Milano (PoliMi)** is Italy's leading technical university. Here is what prospective applicants need to know:
- **Undergraduate Entrance Exam:** Engineering applicants must take the **TOLC-I** (or English TOLC-I for programs taught in English). Scores above 30-33/50 significantly boost admission chances.
- **English Proficiency:** B2 minimum (IELTS 6.0 - 6.5 or TOEFL iBT 78-80+).
- **Tuition & Costs:** Standard public tuition ranges from €1,000 to €3,890/year depending on your family's ISEE Parificato economic indicator.
- **DSU Scholarship:** Students can apply for the Lombardy regional **DSU Scholarship**, which provides a **100% tuition waiver**, free campus lunches, and an annual living cash stipend of up to **€7,000+**!`
  },
  compare_cs_ds_ai: {
    title: "Comparison: Computer Science vs Data Science vs AI & Robotics",
    content: `While these three fields share strong algorithmic foundations, their undergraduate trajectory and daily focus diverge:
1. **Computer Science (CS):** Focuses on the core infrastructure of computation—algorithms, operating systems, networking, distributed cloud systems, compilers, and software architecture. Best if you want to build high-scale software, backends, or systems.
2. **Data Science (DS):** Focuses heavily on probability, statistical inference, data engineering, time-series, and quantitative decision-making. Best if you love uncovering hidden patterns, forecasting, and data visualization.
3. **Artificial Intelligence & Robotics (AI):** Bridges deep neural networks, computer vision, reinforcement learning, and mechatronic control. Best if you want to build autonomous systems, drones, robotics, or research frontier generative models.`
  },
  dsu_scholarships: {
    title: "How Italian Regional DSU Scholarships Work for International Students",
    content: `Italy offers one of the most generous student welfare systems in Europe:
- **What is DSU?** "Diritto allo Studio Universitario" is a regional government scholarship (e.g., DSU in Lombardy, ER.GO in Emilia-Romagna, EDISU in Piedmont, LazioDisco in Rome).
- **Core Benefits:**
  1. **100% Tuition Fee Exemption** (Tuition drops to €0).
  2. **Cash Living Stipend:** Up to **€7,000 - €7,500 per academic year**, deposited directly into your bank account.
  3. **One Free Daily Meal** at campus university dining halls (Mensa).
  4. **Subsidized Student Dorm Housing**.
- **Eligibility:** Based primarily on family income/assets calculated through the **ISEE Parificato** document (typically income under €25,000 - €27,000/year).
- **How to Prepare:** Obtain your family income certificate, property documents, and bank statements, translated and apostilled by the Italian Embassy.`
  },
  roadmap: {
    title: "Strategic 4-Year Bachelor Roadmap",
    content: `Here is the high-yield blueprint for undergraduate academic excellence:
- **Year 1 (Foundational Rigor):** Master Calculus, Linear Algebra, Object-Oriented Programming, and discrete structures. Join a university student technical society (robotics team, hackathon club).
- **Year 2 (Core Competence & First Project):** Build your first end-to-end full-stack or ML project. Contribute to open-source on GitHub. Compete in 1-2 collegiate hackathons.
- **Year 3 (Specialization & Summer Internship):** Take advanced electives (Distributed Systems, Deep Learning, Cryptography). Complete a competitive summer industry internship or university lab research fellowship.
- **Year 4 (Senior Capstone & Global Launch):** Author your undergraduate thesis. Present at an academic conference or launch a startup MVP. Apply for top Master's/Ph.D. programs or high-tier engineering roles.`
  },
  sop_tips: {
    title: "How to Craft an Irresistible Statement of Purpose (SOP)",
    content: `Admissions committees at top institutions (Oxford, PoliMi, ETH, TU Delft) read hundreds of essays. Here is the formula that wins:
1. **The Hook (First 15%):** Avoid clichés like "Ever since I was a child." Instead, start with a specific intellectual question or problem you tackled with code/math.
2. **Academic Preparation (35%):** Detail specific projects, courses, books, or research that taught you analytical resilience.
3. **Why THIS University (25%):** Mention specific laboratories, professors, curriculum tracks, or student incubators at the target school.
4. **Career Trajectory (25%):** Clearly articulate what technological or societal problem you will solve in the 5 years following graduation.`
  }
};
