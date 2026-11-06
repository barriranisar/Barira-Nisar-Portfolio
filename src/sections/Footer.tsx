import React from 'react';
import { ArrowUp, Terminal, Database } from 'lucide-react';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-16 pb-12 border-t border-white/10 bg-[#06030c] overflow-hidden">
      {/* Decorative Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-r from-purple-600/15 via-pink-600/15 to-cyan-600/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl p-[2px] bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400">
                <div className="w-full h-full rounded-[10px] bg-[#0c071d] flex items-center justify-center font-syne font-extrabold text-white text-lg">
                  {profileData.initials}
                </div>
              </div>
              <span className="font-space text-xl font-black text-white">
                {profileData.name}
              </span>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-sm font-sans">
              "Designed with curiosity. Built with creativity."
            </p>
          </div>

          {/* Quick Nav Anchors */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono-code text-zinc-400">
            <a href="#about" className="hover:text-purple-300 transition-colors">About</a>
            <a href="#projects" className="hover:text-pink-300 transition-colors">Projects</a>
            <a href="#daily-ui" className="hover:text-cyan-300 transition-colors">Daily UI</a>
            <a href="#experience" className="hover:text-purple-300 transition-colors">Experience</a>
            <a href="#achievements" className="hover:text-emerald-300 transition-colors">Achievements</a>
            <a href="#contact" className="hover:text-pink-300 transition-colors">Contact</a>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-purple-500/50 text-xs font-mono-code text-zinc-300 hover:text-white transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <div className="p-1 rounded-full bg-white/10 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUp className="w-3 h-3 text-pink-400" />
            </div>
          </button>
        </div>

        {/* Bottom Metadata & Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-code text-zinc-500 text-center sm:text-left">
          <p>© {currentYear} {profileData.name}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <Database className="w-3.5 h-3.5 text-cyan-400" /> Data Science
              <span className="text-zinc-600">•</span>
              <Terminal className="w-3.5 h-3.5 text-purple-400" /> Web Development
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
