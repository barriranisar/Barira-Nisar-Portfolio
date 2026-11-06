import type { ProfileData } from '../types';

export const profileData: ProfileData = {
  name: 'Barira',
  surname: 'Nisar',
  fullName: 'Barira Nisar',
  initials: 'BN',
  roles: ['Data Scientist', 'Web Developer', 'Photographer'],
  tagline: 'Turning Data Into Insights, Ideas Into Interactive Experiences, and Light Into Stories.',
  heroDescription:
    'I explore the intersection of technology and intelligent systems through data science, full-stack web engineering, and photographic storytelling.',
  aboutIntro:
    "I am an analytical thinker and creative builder who believes the strongest digital solutions emerge at the crossroads of empirical logic, elegant code, and visual clarity.",
  aboutStory: {
    heading: 'The Confluence of Logic, Code & Visual Storytelling',
    paragraphs: [
      'My journey is driven by an insatiable curiosity about how systems work and how human beings perceive and interact with information. Whether parsing multi-dimensional environmental datasets, architecting responsive web applications, or composing photographic frames, I obsess over clarity, impact, and elegance.',
      'As an aspiring Data Scientist, I turn ambiguous data into actionable mathematical clarity, extracting predictive patterns that inform real-world decisions.',
      'As a Web Developer, I translate those conceptual frameworks into tactile, fluid digital realities—crafting micro-interactions and interfaces that feel alive.',
      'As a Photographer, I freeze atmospheric frames, capturing the visual rhythm of keynote summits, campus milestones, and spontaneous human emotion.'
    ]
  },
  identities: [
    {
      title: 'Data Scientist',
      tagline: 'Analytical Rigor & Pattern Intelligence',
      description: 'Transforming complex multivariate datasets into decisive, visual business intelligence.',
      accentColor: '#06b6d4',
      icon: 'BarChart3'
    },
    {
      title: 'Web Developer',
      tagline: 'Full-Stack Fluidity & Motion Engineering',
      description: 'Building modern, high-performance web applications with seamless UX and interactive architecture.',
      accentColor: '#8b5cf6',
      icon: 'Code2'
    },
    {
      title: 'Photographer',
      tagline: 'Light, Optics & Compositional Rhythm',
      description: 'Documenting keynote summits, university milestones, and atmospheric visual chronicles.',
      accentColor: '#f97316',
      icon: 'Camera'
    }
  ],
  stats: [
    { label: 'Core Disciplines', value: '3' },
    { label: 'Featured Projects', value: '5+' },
    { label: 'Leadership Roles', value: '5+' }
  ],
  contactInfo: {
    email: 'barriranisar@gmail.com',
    location: 'Karachi, Pakistan',
    availability: 'Open for collaborations & opportunities',
    socials: [
      {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/barira-nisar',
        username: 'Barira',
        icon: 'Linkedin'
      },
      {
        platform: 'GitHub',
        url: 'https://github.com/barriranisar',
        username: 'barira-dev',
        icon: 'Github'
      },
      {
        platform: 'Dribbble',
        url: 'https://dribbble.com/barira-nisar',
        username: 'barira-nisar',
        icon: 'Dribbble'
      }
    ]
  }
};
