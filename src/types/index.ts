export type IdentityRole = 'Data Scientist' | 'Web Developer';

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon: string;
}

export interface ProfileData {
  name: string;
  surname: string;
  fullName?: string;
  initials: string;
  roles: IdentityRole[];
  tagline: string;
  heroDescription: string;
  aboutIntro: string;
  aboutStory: {
    heading: string;
    paragraphs: string[];
  };
  identities: {
    title: IdentityRole;
    tagline: string;
    description: string;
    accentColor: string;
    icon: string;
  }[];
  stats: {
    label: string;
    value: string;
    suffix?: string;
  }[];
  contactInfo: {
    email: string;
    location: string;
    availability: string;
    socials: SocialLink[];
  };
}

export interface SkillItem {
  name: string;
  level?: string;
  icon?: string;
  highlight?: boolean;
}

export interface ExpertiseCategory {
  id: string;
  title: string;
  badge: string;
  role: IdentityRole;
  description: string;
  color: {
    primary: string;
    secondary: string;
    glow: string;
    gradient: string;
    border: string;
  };
  skills: SkillItem[];
  highlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  interactiveVisualType: 'data-chart' | 'code-ide' | 'camera-lens';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  roleIdentity: IdentityRole;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  technologies: string[];
  tools?: string[];
  image: string;
  gradient: string;
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  organization?: string;
  location?: string;
  period: string;
  date?: string;
  type: string;
  description: string[];
  skills: string[];
  skillsGained?: string[];
  image?: string;
  badgeColor?: string;
}

export interface ExtracurricularItem {
  id?: string;
  role: string;
  organization: string;
  category?: string;
  badge?: string;
  badgeColor?: string;
  year?: string;
  period?: string;
  location?: string;
  description: string[];
  skills: string[];
}

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  issuer?: string;
  year: string;
  issueDate?: string;
  description?: string;
  category: string;
  credentialUrl?: string;
  pdfUrl?: string;
  image?: string;
  badge?: string;
  badgeText?: string;
  verified?: boolean;
  iconType?: 'award' | 'star' | 'camera' | 'code' | 'sparkles';
  highlight?: boolean;
}

export interface UIChallenge {
  day: string;
  dayNumber: number;
  title: string;
  category: string;
  tags: string[];
  image?: string;
  palette?: string[];
}


