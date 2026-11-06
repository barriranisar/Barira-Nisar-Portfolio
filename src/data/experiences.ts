import type { ExperienceItem, ExtracurricularItem } from '../types';

export const experiencesData: ExperienceItem[] = [
  {
    id: 'exp-encoderx',
    role: 'Data Science Intern',
    company: 'EncoderX',
    organization: 'EncoderX',
    period: 'Sep 2026 - Oct 2026',
    date: 'Sep 2026 - Oct 2026',
    location: 'Remote',
    type: 'Internship',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    description: [
      'Developed and tuned predictive machine learning models to solve data-driven business challenges.',
      'Performed automated data preprocessing, feature engineering, and rigorous statistical validation.',
      'Collaborated with cross-functional development teams to integrate ML models into production-ready pipelines.'
    ],
    skills: ['Python', 'Scikit-Learn', 'Data Pipelines', 'Predictive Modeling', 'Feature Engineering'],
    skillsGained: ['Python', 'Scikit-Learn', 'Data Pipelines', 'Predictive Modeling', 'Feature Engineering']
  },
  {
    id: 'exp-exps-nexus',
    role: 'Data Science Intern',
    company: 'EXPS Nexus (Expert Petroleum Services)',
    organization: 'EXPS Nexus (Expert Petroleum Services)',
    period: 'Aug 2026 - Oct 2026',
    date: 'Aug 2026 - Oct 2026',
    location: 'Remote',
    type: 'Internship',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    description: [
      'Engineered end-to-end machine learning pipelines for predictive classification and regression models.',
      'Conducted exploratory data analysis (EDA) and data cleansing workflows across multi-variable domain datasets.',
      'Designed interactive dashboards and statistical visualizations to translate model outputs into clear business insights.'
    ],
    skills: ['Python', 'Pandas', 'Scikit-Learn', 'Machine Learning', 'EDA', 'Data Visualization'],
    skillsGained: ['Python', 'Pandas', 'Scikit-Learn', 'Machine Learning', 'EDA', 'Data Visualization']
  }
];

export const extracurricularData: ExtracurricularItem[] = [
  
  {
    id: 'extra-jtech-content',
    role: 'Co-Head of Content Management',
    organization: 'JTECH 2026 (Jinnah University for Women)',
    category: 'EVENT LEADERSHIP',
    badge: 'EVENT LEADERSHIP',
    badgeColor: 'border-purple-500/40 text-purple-300 bg-purple-500/10',
    year: '2026',
    period: '2026',
    description: [
      'Directed end-to-end content management, rule guidelines, and announcements for university flagship tech competition.',
      'Orchestrated cross-functional communication between technical teams, designers, and event leads.'
    ],
    skills: ['Content Strategy', 'Event Operations', 'Team Leadership', 'Documentation']
  },
  {
    id: 'extra-iccyd-2026',
    role: 'Event Head Photographer',
    organization: '3rd International Conference on Computing & Youth Development (ICCYD)',
    category: 'EVENT MEDIA & COVERAGE',
    badge: 'EVENT MEDIA & COVERAGE',
    badgeColor: 'border-pink-500/40 text-pink-300 bg-pink-500/10',
    year: '2026',
    period: '2026',
    description: [
      'Managed official keynote sessions, research paper presentations, and VIP delegate media coverage.',
      'Captured high-profile conference proceedings, award ceremonies, and interactive student exhibits.'
    ],
    skills: ['Event Photography', 'Media Management', 'Visual Documentation', 'Live Coverage']
  },
  {
    id: 'extra-itcn-asia',
    role: 'Task Officer Volunteer',
    organization: 'ITCN Asia Tech Summit',
    category: 'TECH SUMMIT VOLUNTEER',
    badge: 'TECH SUMMIT VOLUNTEER',
    badgeColor: 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10',
    year: '2026',
    period: '2026',
    description: [
      "Facilitated on-ground floor operations, VIP delegate routing, and session execution at Pakistan's premier tech summit.",
      'Assisted international keynote speakers and technology executives with coordination and agenda flow.'
    ],
    skills: ['Operations', 'Coordination', 'Stakeholder Communication', 'Tech Summits']
  },
  {
    id: 'extra-techathon',
    role: 'Techathon 2.0 Contributor',
    organization: 'Techathon AI-ML (Bahria Dev Society)',
    category: 'COMPETITIVE TECH',
    badge: 'COMPETITIVE TECH',
    badgeColor: 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10',
    year: '2026',
    period: '2026',
    description: [
      'Competed in algorithmic problem-solving and AI/ML model prototyping challenges under tight sprint constraints.',
      'Engineered machine learning pipelines using Python, data preprocessing, and model evaluation techniques.'
    ],
    skills: ['AI/ML', 'Python', 'Data Science', 'Problem Solving']
  },
  {
    id: 'extra-iccyd-2025',
    role: 'Event Photographer',
    organization: '2nd International Conference on Computing & Youth Development (ICCYD)',
    category: 'EVENT MEDIA & COVERAGE',
    badge: 'EVENT MEDIA & COVERAGE',
    badgeColor: 'border-amber-500/40 text-amber-300 bg-amber-500/10',
    year: '2025',
    period: '2025',
    description: [
      'Delivered on-ground event photography covering guest lectures, stage events, and conference sessions.',
      'Handled real-time visual documentation and event storytelling for institutional publications.'
    ],
    skills: ['Event Photography', 'Visual Storytelling', 'On-ground Coverage', 'Media Production']
  },
  {
    id: 'extra-judge-mgmt',
    role: 'Judge Management Coordinator',
    organization: 'JTECH 2025 (Jinnah University for Women)',
    category: 'EVENT OPERATIONS',
    badge: 'EVENT OPERATIONS',
    badgeColor: 'border-blue-500/40 text-blue-300 bg-blue-500/10',
    year: '2025',
    period: '2025',
    description: [
      'Managed judge welcoming, orientation, and evaluation workflows across competitive technical project tracks.',
      'Coordinated scoring sheets, criteria tabulation, and communication between faculty evaluators and participants.'
    ],
    skills: ['Judge Liaison', 'Event Operations', 'Evaluation Coordination', 'Management']
  },
  
];

// Alias export for backward compatibility
export const experienceData = experiencesData;
