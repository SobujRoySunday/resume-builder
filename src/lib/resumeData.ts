export interface ResumeData {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    summary?: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    projects?: Project[];
    languages?: string[];
    certifications?: string[];
    hobbies?: string[];
  }
  
  export interface Skill {
    name: string;
    level: string;
  }

  export interface Experience {
    jobTitle: string;
    company: string;
    startDate: string; // ISO Date string
    endDate: string | "Present"; // ISO Date string or 'Present' if ongoing
    description: string;
  }
  
  export interface Education {
    degree: string;
    institution: string;
    startDate: string; // ISO Date string
    endDate: string;
    description: string;
  }
  
  export interface Project {
    title: string;
    description: string;
    url?: string;
    technologies: string[];
  }
  