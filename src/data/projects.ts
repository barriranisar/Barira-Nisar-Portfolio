import type { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'air-quality-intelligence',
    title: 'Pakistan Air Quality Intelligence Dashboard',
    category: 'Data Science / Business Intelligence',
    tag: 'BI & Analytics',
    roleIdentity: 'Data Scientist',
    shortDescription:
      'An air quality analysis dashboard focused on understanding pollution patterns across major cities in Pakistan.',
    fullDescription:
      'The Pakistan Air Quality Intelligence Dashboard aggregates, synthesizes, and visualizes multi-year particulate matter readings and meteorological conditions across major Pakistani metropolitan regions including Karachi, Lahore, and Islamabad. Designed to help environmental researchers and civic policy leaders pinpoint critical danger windows, examine the relationship between humidity and airborne toxins, and track seasonal spike dynamics.',
    features: [
      'Comprehensive AQI (Air Quality Index) analysis and classification',
      'Continuous PM2.5 and PM10 granular particulate measurements',
      'Comparative multi-city pollution level indexing and rankings',
      'Seasonal winter smog pattern mapping and heatmaps',
      'Interactive drill-down charts with customizable temporal filters'
    ],
    technologies: ['Tableau', 'Power BI', 'Data Visualization', 'Statistical Analysis', 'Excel ETL'],
    tools: ['Tableau', 'Power BI'],
    image: '/images/projects/project-air-quality.jpeg',
    gradient: 'from-blue-600 via-cyan-500 to-teal-500',
    featured: true
  },
  {
    id: 'queuebite',
    title: 'QueueBite',
    category: 'Full-Stack Web Development',
    tag: 'MERN Full-Stack',
    roleIdentity: 'Web Developer',
    shortDescription:
      'A campus canteen management system designed to improve the ordering experience and reduce waiting time for students.',
    fullDescription:
      'QueueBite addresses the long lines and rush-hour bottlenecks common in university canteens. By modernizing ordering workflows into a synchronized digital experience, students can view menu availability in real time, place contactless orders between lectures, and receive push notifications when their food is prepared. Kitchen staff and managers receive a streamlined Kanban order-management dashboard.',
    features: [
      'Interactive student ordering portal with instant cart calculation',
      'Live dynamic queue status and estimated prep countdowns',
      'Real-time canteen menu inventory visibility and item tagging',
      'Order progression tracking (Received, Cooking, Ready, Collected)',
      'Dedicated admin and kitchen staff terminal for high-speed ticket dispatch'
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
    image: '/images/projects/project-queuebite.jpeg',
    gradient: 'from-purple-600 via-fuchsia-500 to-pink-500',
    featured: true
  },
  {
    id: 'unity-3d-flying-game',
    title: 'Unity 3D Flying Game',
    category: 'Game Development',
    tag: '3D Simulation',
    roleIdentity: 'Web Developer',
    shortDescription:
      'A low-poly 3D motivational game about a character who gradually develops the ability to fly by helping people and completing challenges.',
    fullDescription:
      'Built inside the Unity 3D engine, this game combines uplifting storytelling with rewarding physics-based progression. The player starts grounded, undertaking community quests and helping non-player characters resolve dilemmas. With each act of kindness, the protagonist unlocks enhanced glide ratios, wind draft mechanics, and aerial maneuvers, culminating in complete free-flight through a stylized low-poly sky archipelago.',
    features: [
      'Stylized low-poly 3D environment with dynamic lighting and atmosphere',
      'Smooth character locomotion with seamless ground-to-flight transitions',
      'Progressive flight training mechanics (Gliding, Soaring, Thermal Drafting)',
      'Multiple level objectives and interactive narrative checkpoints',
      'Physics-tuned aerial controls with particle wake effects'
    ],
    technologies: ['Unity', 'C#', '3D Modeling', 'Game Mechanics', 'Level Design', 'Physics Simulation'],
    tools: ['Unity Engine', 'Blender Low-Poly'],
    image: '/images/projects/project-unity-game.jpeg',
    gradient: 'from-amber-500 via-orange-500 to-rose-500',
    featured: true
  },

  {
    id: 'sukhan-hci-design',
    title: 'Sukhan',
    category: 'UI/UX Design',
    tag: 'Human-Computer Interaction',
    roleIdentity: 'Web Developer',
    shortDescription:
      'An HCI project focused on designing an engaging digital experience.',
    fullDescription:
      'Sukhan is an experimental Human-Computer Interaction (HCI) project centered around empathetic digital engagement, expressive typography, and culturally resonant visual communication. Developed through user persona discovery, heuristic evaluations, and interactive Figma prototyping, the design prioritizes intuitive sensory feedback, minimal cognitive friction, and deeply satisfying micro-interactions.',
    features: [
      'Comprehensive HCI user research and empathy mapping',
      'Intuitive typographic hierarchy honoring poetic and expressive content',
      'Frictionless micro-interactions tailored for high engagement',
      'Iterative wireframing and interactive clickable prototypes',
      'Usability testing and heuristic evaluation documentation'
    ],
    technologies: ['UI/UX Design', 'HCI Principles', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    image: '/images/projects/project-sukhan.jpeg',
    gradient: 'from-violet-600 via-indigo-500 to-pink-500',
    featured: false
  }
];
