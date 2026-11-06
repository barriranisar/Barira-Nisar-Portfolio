import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { profileData } from '../data/profile';

interface NavbarProps {
  activeSection: string;
  onSectionSelect?: (id: string) => void;
}

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Daily UI', href: '#daily-ui' },
  { name: 'Photography', href: '#photography' },
  { name: 'Experience', href: '#experience' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionSelect }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    onSectionSelect?.(id);
    const element = document.getElementById(id);
    if (element) {
      if (window.__lenis) {
        window.__lenis.scrollTo(element, { offset: -60, duration: 1.4 });
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 ${
              scrolled
                ? 'bg-[#0e0920]/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-950/40'
                : 'bg-transparent border border-white/5'
            }`}
          >
            {/* Logo / Monogram */}
            <a
              href="#home"
              onClick={(e) => scrollToSection(e, '#home')}
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            >
              <div className="relative w-9 h-9 rounded-xl p-[1.5px] bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 group-hover:scale-105 transition-transform duration-300 shrink-0">
                <div className="w-full h-full rounded-[10px] bg-[#0c071d] flex items-center justify-center">
                  <span className="font-syne text-sm sm:text-base font-bold text-white group-hover:text-pink-400 transition-colors">
                    {profileData.initials}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-space text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-pink-300 transition-colors whitespace-nowrap">
                  Barira Nisar
                </span>
                <span className="text-[10px] font-mono-code text-zinc-400 -mt-0.5 hidden sm:block">
                  Creative Portfolio
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] px-3 py-1.5 rounded-full border border-white/5">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBadge"
                        className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full -z-10 shadow-lg shadow-pink-500/35"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </div>

            {/* Right Action: Let's Connect CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, '#contact')}
                className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md shadow-purple-600/20 hover:shadow-purple-600/40 transition-all duration-300"
              >
                <span>Let's Connect</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-20 z-40 lg:hidden rounded-3xl bg-[#0f0923]/95 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl shadow-purple-950/60"
          >
            <div className="flex flex-col gap-2">
              <div className="text-[11px] font-mono-code text-zinc-400 px-3 pb-2 border-b border-white/10 flex items-center justify-between">
                <span>NAVIGATION</span>
                <span className="flex items-center gap-1 text-pink-400">
                  <Sparkles className="w-3 h-3" /> Barira Nisar
                </span>
              </div>
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500/30 to-rose-500/30 text-white border border-pink-500/40 font-semibold'
                        : 'text-zinc-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
                    )}
                  </a>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-purple-600/25"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
