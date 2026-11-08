export type TemplateId = 
  | 'developer-dark' 
  | 'designer-creative' 
  | 'freelancer-services' 
  | 'minimal-recruiter';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  metrics?: string; // e.g. "Increased conversion by 42%"
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  image?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string; // e.g. "2023 - Present"
  highlights: string[];
}

export interface SkillCategory {
  category: string; // e.g. "Frontend", "Cloud & DevOps", "Design Systems"
  items: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  priceStartingAt?: string;
  deliverables?: string[];
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  avatarUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
}

export interface PortfolioData {
  username: string;
  personal: {
    fullName: string;
    profession: string;
    headline: string;
    bio: string;
    location: string;
    avatarUrl?: string;
    resumeUrl?: string;
    openToWork: boolean;
    availableForHire: boolean;
  };
  contact: {
    email: string;
    phone?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  skills: SkillCategory[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  services?: ServiceItem[];
  testimonials?: TestimonialItem[];
  theme: {
    templateId: TemplateId;
    primaryColor: string; // Hex color or Tailwind accent e.g. "#6366f1"
    fontFamily: 'sans' | 'mono' | 'serif';
    darkMode: boolean;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  scoring?: {
    recruiterScore: number;
    contentScore: number;
    designScore: number;
    seoScore: number;
    overallScore: number;
    feedback: string[];
    missingSkills?: string[];
  };
}

export interface PortfolioScoreResult {
  overallScore: number;
  recruiterScore: number;
  contentScore: number;
  designScore: number;
  seoScore: number;
  strengths: string[];
  improvements: string[];
  missingKeywords: string[];
}

