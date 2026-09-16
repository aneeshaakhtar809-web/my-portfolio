import { Project, SkillCategory, ExperienceItem, EducationItem, LabArea, CertificationItem, InternshipLetter } from '../types';

export const PERSONAL_INFO = {
  name: 'Aneesha Akhtar',
  title: 'AI Automation Specialist | AI Agent Developer',
  badge: 'Generative AI & No-Code Solutions',
  tagline: 'Turning Ideas into Intelligent Solutions',
  quote: 'Continuous Learning a Brighter Tomorrow',
  profileImage: 'public/ChatGPT Image Sep 15, 2026, 11_48_08 AM.png',
  summary:
    'I am an AI Automation Specialist passionate about building intelligent solutions that save time, simplify workflows, and solve real-world problems.',
  subSummary:
    'I work with Generative AI, AI Agents, and no-code tools to help businesses automate processes and create innovative digital products. I am committed to delivering high-quality, user-focused solutions and continuously learning in the AI space.',
  github: 'https://github.com/aneeshaakhtar809-web',
  linkedin: 'https://www.linkedin.com/in/aneesha-akhtar-69651942b',
  email: 'aneeshaakhtar809@gmail.com',
  phone: '03288184728',
  phoneFormatted: '+92 328 8184728',
  location: 'Lahore, Pakistan',
  status: 'Available for freelance AI automation projects & consulting',
  languages: [
    { name: 'English', proficiency: 'Professional' },
    { name: 'Urdu', proficiency: 'Native' },
    { name: 'Punjabi', proficiency: 'Conversational' },
  ],
  softSkills: [
    'Problem Solving',
    'Communication',
    'Project Management',
    'Client Collaboration',
    'Continuous Learning',
  ],
};

export const INTERNSHIP_LETTER: InternshipLetter = {
  organization: 'CodeAlpha',
  tagline: 'YOUR DREAM OUR PASSION',
  documentTitle: 'INTERNSHIP OFFER LETTER',
  date: '31st August 2026',
  studentId: 'CA/DF1/266519',
  candidateName: 'Aneesha Akhtar',
  position: 'Artificial Intelligence Intern',
  duration: '1 Month',
  startDate: '1st September 2026',
  endDate: '30th September 2026',
  mode: 'Virtual Artificial Intelligence Internship (100% Online)',
  stipendNote: 'Performance-based stipend provided depending on performance, participation, and task completion.',
  signatory: {
    name: 'Swati Srivastava',
    title: 'Co-Founder & CEO, CodeAlpha',
  },
  contact: {
    phone: '+91 522 336 9892',
    email: 'support@codealpha.tech',
    address: 'Lucknow, U.P.',
  },
};

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-codealpha',
    name: 'Artificial Intelligence Internship',
    title: 'Virtual AI Internship Selection & Training',
    issuer: 'CodeAlpha',
    year: '2026',
    description: 'Official selection for Virtual AI Internship (ID: CA/DF1/266519) focused on hands-on practical assignments and AI problem solving.',
  },
  {
    id: 'cert-deeplearning',
    name: 'Generative AI for Everyone',
    title: 'Generative AI Fundamentals',
    issuer: 'DeepLearning.AI (Coursera)',
    year: '2024',
    description: 'Foundational principles of generative models, real-world deployment considerations, and business value creation.',
  },
  {
    id: 'cert-openai',
    name: 'Prompt Engineering',
    title: 'Advanced Prompt Engineering',
    issuer: 'OpenAI',
    year: '2024',
    description: 'Context chaining, structured reasoning, few-shot prompting, and deterministic output schema design.',
  },
  {
    id: 'cert-n8n',
    name: 'n8n & Advanced Automation',
    title: 'Workflow Orchestration & Webhooks',
    issuer: 'Self-Learning & Practical Work',
    year: '2023 - 2026',
    description: 'End-to-end automated pipelines connecting LLMs, vector stores, CRMs, WhatsApp webhooks, and enterprise databases.',
  },
];

export const ABOUT_ME = {
  headline: 'I am an AI Automation Specialist focused on building practical Artificial Intelligence solutions using modern AI technologies.',
  expertiseAreas: [
    'Generative AI',
    'AI Agents',
    'Workflow Automation',
    'Prompt Engineering',
    'No-Code Development',
    'AI-powered Digital Products',
  ],
  paragraph1:
    'I enjoy converting real-world problems into intelligent solutions by designing systems that are simple, scalable, and user-focused.',
  paragraph2:
    'My goal is to help businesses and individuals adopt AI solutions that create measurable value.',
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai',
    title: 'Generative AI & Core AI',
    description: 'Generative architectures, context retrieval, vector systems, and prompt engineering.',
    iconName: 'Bot',
    skills: [
      'Generative AI (OpenAI, Claude)',
      'Prompt Engineering',
      'RAG (Retrieval Augmented Generation)',
      'Vector Databases (Pinecone, FAISS)',
      'AI Agents',
      'AI Product Development',
    ],
  },
  {
    id: 'automation',
    title: 'Automation & No-Code',
    description: 'Multi-tool workflow orchestration and no-code digital platforms.',
    iconName: 'Workflow',
    skills: [
      'n8n (Workflow Automation)',
      'Zapier',
      'Make (Integromat)',
      'Bubble (No-Code Development)',
      'Framer (No-Code Websites)',
    ],
  },
  {
    id: 'development',
    title: 'Development & Tools',
    description: 'Developer utilities, APIs, web scraping, and generative toolsets.',
    iconName: 'Code',
    skills: [
      'Git & GitHub',
      'APIs & Integrations',
      'Google AI Studio',
      'Web Scraping & Data Processing',
      'JavaScript & HTML/CSS',
    ],
  },
  {
    id: 'soft-skills',
    title: 'Soft Skills & Languages',
    description: 'Client collaboration, problem solving, and multilingual communication.',
    iconName: 'Layers',
    skills: [
      'Problem Solving',
      'Communication',
      'Project Management',
      'Client Collaboration',
      'Continuous Learning',
      'English (Professional)',
      'Urdu (Native)',
      'Punjabi (Conversational)',
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-freelance',
    role: 'Freelance AI Automation Specialist',
    company: 'Remote | Global Clients',
    period: '2023 – Present',
    type: 'freelance',
    location: 'Remote',
    description:
      'Designing and delivering customized AI solutions to help global businesses improve productivity, automate repetitive workflows, and streamline customer journeys.',
    responsibilities: [
      'Build AI agents, chatbots, and automation workflows for businesses',
      'Developed AI-powered websites and tools using no-code platforms',
      'Help clients integrate AI solutions into their existing workflows',
      'Deliver customized solutions to improve productivity and user experience',
      'Research AI product ideas and prototype no-code AI applications',
    ],
  },
  {
    id: 'exp-internship',
    role: 'Artificial Intelligence Intern',
    company: 'CodeAlpha (Virtual Internship)',
    period: 'Sep 2026 – Sep 2026',
    type: 'internship',
    location: 'Virtual / Remote',
    description:
      'Selected for an intensive Virtual Artificial Intelligence Internship at CodeAlpha (Student ID: CA/DF1/266519) under Swati Srivastava, Co-Founder & CEO.',
    responsibilities: [
      'Selected for a Virtual Artificial Intelligence Internship',
      'Worked on practical AI assignments and real-world projects',
      'Gained hands-on experience in AI tools and problem solving',
      'Completed the internship with a strong focus on learning and implementation',
    ],
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'edu-bachelors',
    degree: 'Graduation',
    institution: 'University of Punjab, Lahore',
    year: '2023',
    type: 'degree',
    detail: 'Undergraduate graduation establishing strong analytical, mathematical, and computational fundamentals.',
  },
  {
    id: 'edu-intermediate',
    degree: 'Intermediate in Computer Science',
    institution: 'Government Degree College for Women, Shahdara Lahore',
    year: '2021',
    type: 'intermediate',
    detail: 'Computer science foundation, algorithm logic, and digital system basics.',
  },
  {
    id: 'edu-training',
    degree: 'Agentic AI Program',
    institution: 'NexSkill',
    year: '2024',
    type: 'training',
    detail: 'Intensive professional training focused on practical agentic workflows and generative systems.',
    topics: [
      'AI Agents',
      'Agentic Workflows',
      'Generative AI Applications',
      'AI Automation Concepts',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'sahaara-ai',
    title: 'Sahaara AI',
    subtitle: 'AI Customer Growth Assistant for Online Sellers',
    category: 'AI Agents',
    isFlagship: true,
    overview:
      'Sahaara AI is an AI-powered customer-growth assistant designed for Pakistani women running small online and home-based businesses. The system helps sellers manage customer inquiries, follow-ups, customer history, and repeat-customer opportunities through a simple AI workflow.',
    problem:
      'Small online sellers often manage customers through WhatsApp, Instagram, Facebook, notes, or spreadsheets.',
    challenges: [
      'Managing multiple customer inquiries',
      'Forgetting follow-ups',
      'Writing repeated replies',
      'Tracking customer history',
    ],
    solution: [
      'AI-assisted customer replies',
      'Customer journey tracking',
      'Follow-up reminders',
      'Customer history management',
      'Repeat customer opportunities',
    ],
    workflow: [
      'Customer Inquiry',
      'AI Understanding',
      'Suggested Reply',
      'Follow-up',
      'Customer History',
      'Repeat Opportunity',
    ],
    technologies: [
      'Generative AI',
      'AI Agents',
      'Automation',
      'RAG Concepts',
      'AI Product Design',
    ],
    highlights: [
      'Tailored for micro-entrepreneurs & social-commerce sellers',
      'Automated multi-channel conversation aggregation',
      'Smart follow-up trigger schedules to prevent missed sales',
      'Zero-code setup for high-frequency inquiries',
    ],
  },
  {
    id: 'ai-knowledge-assistant',
    title: 'AI Knowledge Assistant Agent',
    subtitle: 'Intelligent Information Retrieval System',
    category: 'AI Agents',
    overview:
      'A document-based AI assistant designed to help users quickly retrieve information through natural language interaction.',
    features: [
      'AI-powered answers',
      'Knowledge retrieval',
      'Context understanding',
      'Automated responses',
    ],
    technologies: [
      'AI Models',
      'Prompt Engineering',
      'Automation Workflows',
    ],
    highlights: [
      'Semantic document chunking & vector search',
      'Contextually grounded citations and answers',
      'Zero hallucinations on confidential documents',
    ],
  },
  {
    id: 'ai-translation-assistant',
    title: 'AI Translation Assistant',
    subtitle: 'Multilingual AI Communication Tool',
    category: 'Generative AI',
    overview:
      'An AI-powered assistant designed to provide fast and context-aware translation support.',
    features: [
      'Multi-language conversion',
      'AI-assisted editing',
      'Context-aware translation',
    ],
    technologies: [
      'Generative AI',
      'Language Models',
      'Automation',
    ],
    highlights: [
      'Preserves tone, cultural idioms, and business etiquette',
      'Interactive side-by-side editing recommendations',
      'Cross-lingual nuance preservation',
    ],
  },
  {
    id: 'ayla-rituals',
    title: 'Ayla Rituals',
    subtitle: 'Premium Skincare Website Experience',
    category: 'No-Code & Web',
    overview:
      'A modern premium skincare website concept focused on branding, user experience, and digital presentation.',
    features: [
      'Premium visual design',
      'Product storytelling',
      'Modern website experience',
    ],
    technologies: [
      'Bubble',
      'Framer',
      'AI Creative Tools',
    ],
    highlights: [
      'Editorial-grade luxury aesthetic and motion micro-interactions',
      'Sensory product narrative and ingredient highlights',
      'High-converting responsive checkout layout',
    ],
  },
  {
    id: 'bazaar-express',
    title: 'Bazaar Express Pakistan',
    subtitle: 'Digital Commerce Platform Concept',
    category: 'No-Code & Web',
    overview:
      'A digital marketplace concept designed to improve online shopping experience.',
    features: [
      'Product organization',
      'Digital storefront',
      'User-friendly interface',
    ],
    technologies: [
      'No-Code Development',
      'Web Design',
    ],
    highlights: [
      'Localized catalog navigation for local sellers',
      'Optimized for mobile-first broadband networks',
      'Intuitive checkout and vendor onboarding flows',
    ],
  },
  {
    id: 'neon-breaker',
    title: 'Neon Breaker Game',
    subtitle: 'Interactive Gaming Experience',
    category: 'Interactive',
    overview:
      'A creative digital game project focused on engaging gameplay and visual experience.',
    features: [
      'Interactive gameplay',
      'Custom visual elements',
      'User engagement design',
    ],
    technologies: [
      'JavaScript',
      'HTML5 Canvas',
      'Interactive Game Design',
    ],
    highlights: [
      'Real-time physics and paddle collision mechanics',
      'Neon visual feedback and dynamic score tracking',
      'Fluid 60 FPS animation loop with progressive difficulty',
    ],
  },
];

export const LAB_AREAS: LabArea[] = [
  {
    id: 'lab-agents',
    title: 'AI Agents',
    description: 'Autonomous decision-making agents equipped with tool-use, loop control, and self-correcting mechanisms for complex workflows.',
    iconName: 'Cpu',
    tags: ['Tool Use', 'Multi-Agent Routing', 'Task Planning'],
  },
  {
    id: 'lab-automation',
    title: 'Automation Systems',
    description: 'Robust event-driven webhooks and end-to-end data synchronizations connecting disparate enterprise applications without code.',
    iconName: 'Cog',
    tags: ['n8n Pipelines', 'Webhook Triggers', 'API Integrations'],
  },
  {
    id: 'lab-genai',
    title: 'Generative AI Applications',
    description: 'Custom fine-tuned prompts, structured JSON schema outputs, and multi-modal generative interfaces for real-time utility.',
    iconName: 'Sparkles',
    tags: ['Structured Output', 'Prompt Optimization', 'RAG Synthesis'],
  },
  {
    id: 'lab-products',
    title: 'AI Product Ideas',
    description: 'Prototyping software products that solve specific operational bottlenecks with minimal overhead and intuitive interfaces.',
    iconName: 'Lightbulb',
    tags: ['Micro-SaaS', 'Commerce Workflows', 'Problem Validation'],
  },
  {
    id: 'lab-workflows',
    title: 'Intelligent Workflows',
    description: 'Hybrid human-in-the-loop systems that augment manual worker capability rather than completely replacing critical human oversight.',
    iconName: 'GitBranch',
    tags: ['Human-in-the-Loop', 'Context Caching', 'Decision Trees'],
  },
];
