import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Layout, Layers, CheckCircle2, ArrowUpRight, X, Sparkles } from 'lucide-react';
import { dailyUIChallenges } from '../data/uiChallenges';
import type { UIChallenge } from '../types';

// Clean SVG Dribbble basketball icon
const DribbbleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 0 1 1.93 5.312c-.27-.054-2.428-.46-4.708-.216a22.25 22.25 0 0 1-.784-1.872c2.585-1.127 3.447-3.048 3.562-3.224zM12 3.538c2.08 0 3.987.755 5.467 2.01-.137.23-.974 1.547-3.415 2.535a39.81 39.81 0 0 0-3.32-4.41c.414-.09.84-.135 1.268-.135zm-2.825.568c.95 1.258 2.094 2.766 3.245 4.305-1.996.607-4.838 1.096-7.533.896a8.567 8.567 0 0 1 4.288-5.201zM3.538 12c0-.12.006-.237.014-.355 2.72.188 5.795-.297 7.842-.937.228.473.447.954.654 1.442-2.812.87-5.59 3.21-6.93 5.41A8.483 8.483 0 0 1 3.538 12zm8.462 8.462c-2.036 0-3.906-.725-5.37-1.938 1.15-1.87 3.585-3.892 6.27-4.72.84 2.19 1.28 4.335 1.402 5.012-.734.414-1.558.646-2.302.646zm3.843-1.22c-.1-.58-.517-2.617-1.332-4.72 2.148-.258 4.072.164 4.316.22a8.543 8.543 0 0 1-2.984 4.5z"
    />
  </svg>
);

interface ChallengeCardPreviewProps {
  challenge: UIChallenge;
  theme: {
    badge: string;
    accent: string;
    dot: string;
  };
}

const ChallengeCardPreview: React.FC<ChallengeCardPreviewProps> = ({ challenge, theme }) => {
  const [imageFailed, setImageFailed] = useState(false);

  // If image is defined and has not failed loading, render image tag
  if (challenge.image && !imageFailed) {
    return (
      <div className="relative mb-5 rounded-2xl bg-black/40 border border-white/10 overflow-hidden group-hover:border-purple-500/40 transition-colors aspect-[16/10] flex items-center justify-center p-2.5">
        <img
          src={challenge.image}
          alt={challenge.title}
          onError={() => setImageFailed(true)}
          className="object-contain w-full h-full rounded-lg transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Subtle hover gradient sheen */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0515]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    );
  }

  // Fallback to stylized abstract UI artboard placeholder
  return (
    <div className="relative mb-5 rounded-2xl bg-[#090514] border border-white/5 p-4 flex flex-col justify-between h-28 overflow-hidden group-hover:border-white/15 transition-colors">
      {/* Abstract wireframe lines representing UI layout */}
      <div className="flex items-center justify-between pb-2 border-b border-white/5">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-rose-500/60" />
          <span className="w-2 h-2 rounded-full bg-amber-500/60" />
          <span className="w-2 h-2 rounded-full bg-emerald-500/60" />
        </div>
        <span className="text-[9px] font-mono-code text-zinc-500">
          UI/{challenge.dayNumber < 10 ? `0${challenge.dayNumber}` : challenge.dayNumber}
        </span>
      </div>

      {/* Wireframe Mockup Shape */}
      <div className="space-y-1.5 my-auto">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-md shrink-0"
            style={{ backgroundColor: `${theme.accent}60` }}
          />
          <div className="h-2 w-3/4 rounded-full bg-white/10" />
        </div>
        <div className="h-1.5 w-1/2 rounded-full bg-white/5" />
      </div>

      {/* Bottom status line */}
      <div className="flex items-center justify-between text-[10px] font-mono-code text-zinc-500">
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          Artboard Ready
        </span>
        <span className="group-hover:text-white transition-colors">View Specs →</span>
      </div>
    </div>
  );
};

const getChallengeRationale = (challenge: UIChallenge): string => {
  const cat = challenge.category;

  if (cat === 'Forms & Auth') {
    return 'Engineered with frictionless visual hierarchy, real-time input feedback, and thumb-friendly touch zones to drastically reduce drop-off during initial user authentication.';
  }

  if (cat === 'E-Commerce' || cat === 'Pricing' || cat === 'SaaS') {
    return 'Architected to minimize checkout cognitive load and accelerate purchase confidence with transparent pricing, instant card validation feedback, and clear trust anchors.';
  }

  if (cat === 'Gamification' || cat === 'Gaming' || cat === 'Entertainment' || cat === 'Media') {
    return 'Crafted for high sensory immersion and playful user retention, utilizing dynamic score progress meters, tactile audio settings, and arcade-inspired visual rewards.';
  }

  if (cat === 'Maps & Travel' || cat === 'Maps & Retail' || cat === 'Travel' || cat === 'Delivery') {
    return 'Engineered for rapid spatial wayfinding and live navigational awareness. Emphasizes clean route telemetry, prominent landmark pins, and zero visual clutter.';
  }

  if (cat === 'Data Visualization' || cat === 'Dashboard') {
    return 'Constructed around scannable telemetry and dense metric comparison. Prioritizes quick executive decision-making through segmented analytical cards and clear axes.';
  }

  if (cat === 'Mobile UX' || cat === 'Navigation') {
    return 'Optimized for ergonomic one-handed operation and fluid gesture flow. Features clear progress indicators, intuitive swipe mechanics, and low-cognitive-friction onboarding.';
  }

  // Default for Iconography, Utility, Web Design, Components, Feedback, Marketing
  return 'Created to demonstrate modular design system principles, tactile component states, and expressive brand typography built for modern high-performance interfaces.';
};

export const DailyUISection: React.FC = () => {
  const [activeModalChallenge, setActiveModalChallenge] = useState<UIChallenge | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Filter ONLY Days 07, 08, 09, 22, 25, and 30
  const filteredChallenges = dailyUIChallenges.filter((item) => {
    const dayNum = item.dayNumber ?? Number(item.day.replace(/\D/g, ''));
    return [7, 8, 9, 22, 25, 30].includes(dayNum);
  });

  // Lock scroll & handle ESC key when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalChallenge(null);
    };
    if (activeModalChallenge) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModalChallenge]);

  // Color coding by category family
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'Forms & Auth':
      case 'Mobile UX':
      case 'Navigation':
        return {
          badge: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
          accent: '#06b6d4',
          dot: 'bg-cyan-400'
        };
      case 'E-Commerce':
      case 'Pricing':
      case 'SaaS':
      case 'Delivery':
        return {
          badge: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
          accent: '#8b5cf6',
          dot: 'bg-purple-400'
        };
      case 'Gamification':
      case 'Gaming':
      case 'Entertainment':
      case 'Media':
        return {
          badge: 'text-pink-400 bg-pink-500/10 border-pink-500/30',
          accent: '#ec4899',
          dot: 'bg-pink-400'
        };
      case 'Data Visualization':
      case 'Dashboard':
      case 'Maps & Travel':
      case 'Maps & Retail':
      case 'Travel':
        return {
          badge: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
          accent: '#3b82f6',
          dot: 'bg-blue-400'
        };
      default:
        return {
          badge: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
          accent: '#f59e0b',
          dot: 'bg-amber-400'
        };
    }
  };

  return (
    <section id="daily-ui" className="relative py-28 overflow-hidden bg-mesh-dark">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 -left-40 w-[550px] h-[550px] rounded-full bg-purple-900/15 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[550px] h-[550px] rounded-full bg-pink-900/15 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono-code text-cyan-400 border border-cyan-500/30 mb-4"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>DESIGN SPRINT SHOWCASE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Daily UI Showcase
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 mt-4 text-base sm:text-lg leading-relaxed font-sans"
          >
            A curated selection of interface designs exploring UX patterns, interactive micro-delights, brand aesthetics, and typography systems.
          </motion.p>

          {/* Sprint Highlights Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="inline-flex items-center gap-3 mt-6 px-4 py-2 rounded-2xl glass-panel border border-pink-500/30 text-xs font-mono-code text-zinc-300"
          >
            <div className="flex items-center gap-1.5 text-pink-400 font-bold">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Curated UI Sprint Highlights</span>
            </div>
            <span className="text-zinc-600">|</span>
            <span className="text-purple-300">Days 07, 08, 09, 22, 25, 30</span>
          </motion.div>
        </div>

        {/* Challenge Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredChallenges.map((item, idx) => {
              const theme = getCategoryTheme(item.category);

              return (
                <motion.div
                  key={item.day}
                  initial={
                    shouldReduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          scale: 0.3,
                          y: -400,
                          x: idx % 2 === 0 ? -250 : 250,
                          rotate: idx % 2 === 0 ? -45 : 45,
                        }
                  }
                  whileInView={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          x: 0,
                          rotate: 0,
                        }
                  }
                  viewport={{ once: true, amount: 0.15 }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0.3 }
                      : {
                          type: 'spring',
                          stiffness: 90,
                          damping: 14,
                          mass: 1.2,
                          delay: idx * 0.18,
                        }
                  }
                  className="h-full flex"
                >
                  <motion.div
                    tabIndex={0}
                    role="button"
                    aria-haspopup="dialog"
                    aria-label={`View Daily UI challenge: ${item.title}`}
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: [0, -8, 0, 8, 0],
                            rotate: [0, 1.2, 0, -1.2, 0],
                          }
                    }
                    transition={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: {
                              repeat: Infinity,
                              duration: 4 + idx * 0.5,
                              ease: 'easeInOut',
                              delay: idx * 0.18 + 0.9,
                            },
                            rotate: {
                              repeat: Infinity,
                              duration: 5 + idx * 0.4,
                              ease: 'easeInOut',
                              delay: idx * 0.18 + 0.9,
                            },
                          }
                    }
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            scale: 1.05,
                            y: -10,
                            rotate: 0,
                            transition: { duration: 0.2 },
                          }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    onClick={() => setActiveModalChallenge(item)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveModalChallenge(item);
                      }
                    }}
                    className="group relative rounded-3xl glass-panel border border-white/10 p-6 flex flex-col justify-between hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300 cursor-pointer overflow-hidden focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none w-full"
                  >
                  {/* Subtle Top Gradient Bar */}
                  <div
                    className="absolute top-0 inset-x-0 h-1 opacity-40 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)`
                    }}
                  />

                  <div>
                    {/* Top Pill Row: Day Badge & Category */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      {/* Day Pill */}
                      <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-white/5 border border-white/15 text-white group-hover:border-purple-400/50 transition-colors">
                        {item.day}
                      </span>

                      {/* Category Tag */}
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-semibold border ${theme.badge}`}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Image Preview / Fallback Wireframe Box */}
                    <ChallengeCardPreview challenge={item} theme={theme} />

                    {/* Challenge Title */}
                    <h3 className="font-space text-lg font-bold text-white group-hover:text-purple-300 transition-colors mb-3 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  {/* Tags & Action Link */}
                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] font-mono-code text-zinc-400"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-zinc-400">
                      <span className="flex items-center gap-1 text-[11px] text-zinc-400">
                        <Layers className="w-3.5 h-3.5 text-pink-400" />
                        <span>Figma Spec</span>
                      </span>
                      <span className="text-pink-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5 font-semibold text-[11px]">
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>

        {/* Explore More on Dribbble Button (Bottom Right) */}
        <div className="mt-12 flex justify-end">
          <a
            href="https://dribbble.com/barira-nisar"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 bg-pink-600/20 hover:bg-pink-600/30 border border-pink-500/40 text-pink-200 hover:text-white px-5 py-2.5 rounded-full transition-all font-medium text-sm ml-auto shadow-lg shadow-pink-950/40 hover:shadow-pink-600/30 hover:scale-[1.02] cursor-pointer"
          >
            <DribbbleIcon className="w-4 h-4 text-pink-400 group-hover:text-white transition-colors" />
            <span>Explore More on Dribbble</span>
            <ArrowUpRight className="w-4 h-4 text-pink-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Challenge Quick Detail Modal - Side-by-Side 2-Column Layout */}
      <AnimatePresence>
        {activeModalChallenge && (() => {
          const theme = getCategoryTheme(activeModalChallenge.category);
          const rationale = getChallengeRationale(activeModalChallenge);

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalChallenge(null)}
                className="fixed inset-0 bg-[#07040e]/90 backdrop-blur-xl"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dailyui-modal-title"
                tabIndex={-1}
                data-lenis-prevent
                className="relative max-w-5xl w-[92vw] max-h-[88vh] overflow-hidden rounded-2xl bg-[#0d0914] border border-purple-900/40 shadow-2xl shadow-purple-950/80 z-10 my-auto flex flex-col md:flex-row h-full items-stretch focus:outline-none"
              >
                {/* Left Side: Full Image Display (55% to 60% Width) */}
                <div className="md:w-3/5 w-full bg-black/50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 shrink-0 overflow-hidden">
                  {activeModalChallenge.image ? (
                    <img
                      src={activeModalChallenge.image}
                      alt={activeModalChallenge.title}
                      className="w-full h-auto max-h-[78vh] object-contain drop-shadow-2xl rounded-lg select-none"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-3 text-zinc-400 p-8">
                      <Layout className="w-16 h-16 text-purple-400/60" />
                      <span className="font-space text-sm text-white">Artboard Preview</span>
                      <span className="text-xs font-mono-code text-zinc-500">Full vector specification ready</span>
                    </div>
                  )}
                </div>

                {/* Right Side: Design Context & Details (40% to 45% Width) */}
                <div className="md:w-2/5 w-full p-6 flex flex-col justify-between overflow-y-auto overscroll-contain bg-[#0d0914] text-left">
                  <div>
                    {/* Header: Day tag, Category badge, Close icon */}
                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-white/10 text-white border border-white/20">
                          {activeModalChallenge.day}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono-code font-semibold border ${theme.badge}`}
                        >
                          {activeModalChallenge.category}
                        </span>
                      </div>

                      <button
                        onClick={() => setActiveModalChallenge(null)}
                        className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                        aria-label="Close modal"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Title */}
                    <h3
                      id="dailyui-modal-title"
                      className="font-space text-2xl font-bold text-white tracking-tight mt-4 mb-3"
                    >
                      {activeModalChallenge.title}
                    </h3>

                    {/* Design Rationale */}
                    <div className="space-y-1.5 mb-5">
                      <h4 className="text-[11px] font-mono-code font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                        <span>Why it was designed this way</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                        {rationale}
                      </p>
                    </div>

                    {/* Color Palette - Dynamic Swatches */}
                    <div className="space-y-2 mb-5 p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                      <h4 className="text-[11px] font-mono-code font-bold text-zinc-300 uppercase tracking-wider">
                        Color Palette
                      </h4>

                      {/* Swatches rendered dynamically from challenge.palette */}
                      <div className="flex items-center gap-2.5 pt-0.5">
                        {(activeModalChallenge.palette || ['#8B5CF6', '#EC4899', '#06B6D4', '#0D0914', '#FFFFFF']).map((color, index) => (
                          <span
                            key={index}
                            className="w-5 h-5 rounded-full border border-white/20 shadow-sm transition-transform hover:scale-125 cursor-pointer"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Tags / Focus Areas */}
                    <div className="space-y-2 mb-4">
                      <h4 className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-wider">
                        Tags &amp; Focus Areas:
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeModalChallenge.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-mono-code"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer: Sprint Badge & Clean Close Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1.5 text-xs font-mono-code text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Sprint Item Verified</span>
                    </span>
                    <button
                      onClick={() => setActiveModalChallenge(null)}
                      className="px-5 py-2 rounded-xl text-xs font-mono-code font-bold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all cursor-pointer hover:border-purple-400/40"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};
