export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI Agents' | 'Generative AI' | 'No-Code & Web' | 'Interactive';
  overview?: string;
  problem?: string;
  challenges?: string[];
  solution?: string[];
  workflow?: string[];
  features?: string[];
  technologies: string[];
  isFlagship?: boolean;
  demoUrl?: string;
  githubUrl?: string;
  highlights?: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: string[];
  iconName: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company?: string;
  period: string;
  type: 'freelance' | 'internship';
  location?: string;
  description?: string;
  responsibilities?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year?: string;
  detail?: string;
  type: 'degree' | 'intermediate' | 'training';
  topics?: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  title?: string;
  issuer: string;
  year?: string;
  description?: string;
}

export interface InternshipLetter {
  organization: string;
  tagline: string;
  documentTitle: string;
  date: string;
  studentId: string;
  candidateName: string;
  position: string;
  duration: string;
  startDate: string;
  endDate: string;
  mode: string;
  stipendNote: string;
  signatory: {
    name: string;
    title: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface LabArea {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}
