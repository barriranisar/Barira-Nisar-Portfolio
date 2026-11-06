import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface TechItem {
  name: string;
  category: 'data' | 'web' | 'design';
  color: string;
  svgIcon: React.ReactNode;
}

const techItems: TechItem[] = [
  {
    name: 'Python',
    category: 'data',
    color: '#38bdf8',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.9 2c-3.7 0-4.9.4-5.8 1.4-.9.9-1.1 2.3-1.1 4.6v2h7v1H4.5C2.6 11 1 12.6 1 14.5c0 2.2.8 3.5 1.7 4.5.9 1 2.1 1.4 5.3 1.4h1.5v-2.3c0-1.7.5-2.8 1.4-3.7 1-.9 2.2-1.4 4.1-1.4h4.5c1.1 0 2-.9 2-2v-4.3c0-2.3-.3-3.7-1.2-4.6-.9-1-2.2-1.4-5.9-1.4h-2.5zm-2.4 2.1c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1zm6.9 7.9c-1 0-1.9.3-2.6 1-.7.7-1 1.6-1 2.8v2.2h-3v1h7.5c1.9 0 3.5-1.6 3.5-3.5 0-2.2-.8-3.5-1.7-4.5-.9-1-2.1-1.4-5.3-1.4h-1.4v2.4h4zm-2.4 8.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
      </svg>
    )
  },
  {
    name: 'Scikit-Learn',
    category: 'data',
    color: '#f97316',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="7" cy="8" r="3" />
        <circle cx="17" cy="6" r="2.5" />
        <circle cx="14" cy="17" r="3.5" />
        <path d="M7 8l7 9M17 6l-3 11" stroke="currentColor" strokeWidth="1.5" fill="none" />
      </svg>
    )
  },
  {
    name: 'Pandas',
    category: 'data',
    color: '#06b6d4',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="4" width="4" height="16" rx="1" />
        <rect x="10" y="7" width="4" height="13" rx="1" />
        <rect x="17" y="10" width="4" height="10" rx="1" />
      </svg>
    )
  },
  {
    name: 'React',
    category: 'web',
    color: '#61dafb',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    )
  },
  {
    name: 'Node.js',
    category: 'web',
    color: '#22c55e',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z"/>
      </svg>
    )
  },
  {
    name: 'Express',
    category: 'web',
    color: '#ffffff',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12h16M14 6l6 6-6 6M4 6l4 6-4 6" />
      </svg>
    )
  },
  {
    name: 'MongoDB',
    category: 'web',
    color: '#10b981',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C12 2 6 7.5 6 13.5c0 3.3 2.7 6 6 6.5v2c0 .3.2.5.5.5s.5-.2.5-.5v-2c3.3-.5 6-3.2 6-6.5C18 7.5 12 2 12 2zm0 15.5c-2.2-.4-4-2.1-4-4.5 0-3.2 3.3-7.2 4-8.1.7.9 4 4.9 4 8.1 0 2.4-1.8 4.1-4 4.5z"/>
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    category: 'web',
    color: '#38bdf8',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.8-2.3 4.5-2 1 .2 1.7.9 2.5 1.7C14.3 12 16 13.5 19 13.5c3.3 0 5.3-1.7 6-5-1.3 1.7-2.8 2.3-4.5 2-1-.2-1.7-.9-2.5-1.7C16.7 7.5 15 6 12 6zM5 13.5c-3.3 0-5.3 1.7-6 5 1.3-1.7 2.8-2.3 4.5-2 1 .2 1.7.9 2.5 1.7 1.3 1.3 3 2.8 6 2.8 3.3 0 5.3-1.7 6-5-1.3 1.7-2.8 2.3-4.5 2-1-.2-1.7-.9-2.5-1.7-1.3-1.3-3-2.8-6-2.8z"/>
      </svg>
    )
  },
  {
    name: 'Tableau',
    category: 'data',
    color: '#e11d48',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 2h2v4h-2zm-6 6h2v4H5zm12 0h2v4h-2zm-6 3h2v7h-2zm-6 6h2v3H5zm12 0h2v3h-2z" />
      </svg>
    )
  },
  {
    name: 'Power BI',
    category: 'data',
    color: '#facc15',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <rect x="4" y="11" width="3.5" height="9" rx="0.8" />
        <rect x="10.25" y="7" width="3.5" height="13" rx="0.8" />
        <rect x="16.5" y="3" width="3.5" height="17" rx="0.8" />
      </svg>
    )
  },
  {
    name: 'Figma',
    category: 'design',
    color: '#ec4899',
    svgIcon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 2h4a4 4 0 0 1 0 8H8V2zm0 8h4a4 4 0 0 1 0 8H8v-8zm0 8h2a4 4 0 1 1-4-4 4 4 0 0 1 2 4zm0-16a4 4 0 0 0 0 8h4V2H8zm0 8a4 4 0 0 0 0 8h4v-8H8z"/>
      </svg>
    )
  }
];

export const TechMarquee: React.FC = () => {
  // Duplicate for seamless infinite loop
  const displayItems = [...techItems, ...techItems];

  return (
    <div className="relative w-full py-8 overflow-hidden border-y border-white/[0.06] bg-[#07040e]/60 backdrop-blur-sm group/marquee">
      {/* Ambient background glow accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-24 bg-purple-600/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-24 bg-cyan-600/10 blur-3xl pointer-events-none" />

      {/* Masked Marquee Wrapper */}
      <div className="mask-marquee w-full overflow-hidden">
        <div className="animate-marquee flex items-center gap-3 py-1">
          {displayItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-purple-500/50 hover:bg-purple-900/20 hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all duration-300 cursor-pointer select-none shrink-0 hover:scale-105 active:scale-98"
            >
              {/* Dynamic Tech Icon */}
              <span
                className="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ color: item.color }}
              >
                {item.svgIcon}
              </span>

              {/* Tech Label */}
              <span className="font-space text-xs sm:text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                {item.name}
              </span>

              {/* Outward Diagonal Arrow */}
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
