import type { ExpertiseCategory } from '../types';

export const expertiseData: ExpertiseCategory[] = [
  {
    id: 'data-science',
    title: 'Data Science & Analytics',
    badge: 'Empirical Logic',
    role: 'Data Scientist',
    description: 'Turning complex datasets into meaningful insights and data-driven decisions.',
    color: {
      primary: '#3b82f6',
      secondary: '#06b6d4',
      glow: 'rgba(59, 130, 246, 0.3)',
      gradient: 'from-blue-600 via-cyan-500 to-indigo-500',
      border: 'border-blue-500/30'
    },
    skills: [
      { name: 'Python', level: 'Core Language', highlight: true },
      { name: 'Pandas', level: 'Data Manipulation', highlight: true },
      { name: 'NumPy', level: 'Numerical Computing' },
      { name: 'Data Analysis', level: 'Exploratory & Diagnostic', highlight: true },
      { name: 'Data Visualization', level: 'Visual Storytelling' },
      { name: 'SQL', level: 'Relational Queries', highlight: true },
      { name: 'Machine Learning', level: 'Supervised Models' },
      { name: 'Statistical Analysis', level: 'Hypothesis Testing' },
      { name: 'Power BI', level: 'Executive Dashboards', highlight: true },
      { name: 'Tableau', level: 'Interactive Analytics' }
    ],
    highlights: [
      'Multi-source data aggregation & ETL pipelines',
      'Air Quality & environmental time-series modeling',
      'Executive dashboard storytelling for stakeholders',
      'Correlation discovery and statistical benchmarking'
    ],
    metrics: [
      { label: 'Analytical Accuracy', value: '99%' },
      { label: 'Key Toolsets', value: '10+' }
    ],
    interactiveVisualType: 'data-chart'
  },
  {
    id: 'web-dev',
    title: 'Full-Stack Web Engineering',
    badge: 'Digital Experiences',
    role: 'Web Developer',
    description: 'Building interactive, responsive and user-friendly digital experiences.',
    color: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
      glow: 'rgba(139, 92, 246, 0.35)',
      gradient: 'from-purple-600 via-pink-500 to-rose-400',
      border: 'border-purple-500/30'
    },
    skills: [
      { name: 'React', level: 'Modern SPA & Hooks', highlight: true },
      { name: 'JavaScript', level: 'ESNext Mastery', highlight: true },
      { name: 'HTML & CSS', level: 'Semantic & CSS Grid' },
      { name: 'Tailwind CSS', level: 'Utility-first & Design Systems', highlight: true },
      { name: 'Node.js', level: 'Backend Runtime' },
      { name: 'Express.js', level: 'REST APIs & Middleware', highlight: true },
      { name: 'MongoDB', level: 'NoSQL Schemas' },
      { name: 'Git & GitHub', level: 'Version Control & CI/CD', highlight: true }
    ],
    highlights: [
      'Component-driven modular React architecture',
      'Full-stack MERN campus solutions & queues',
      'Responsive, accessible, fluid UI/UX layouts',
      'State management and performance optimization'
    ],
    metrics: [
      { label: 'Responsive Breakpoints', value: '100%' },
      { label: 'Modern Stack', value: 'MERN' }
    ],
    interactiveVisualType: 'code-ide'
  }
];
