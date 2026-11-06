import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, FolderGit2, Mail, Terminal, Database, Camera } from 'lucide-react';
import { profileData } from '../data/profile';
import { Canvas3DHeroFallback } from '../components/Canvas3DHeroFallback';

const Canvas3DHeroLazy = React.lazy(() =>
  import('../components/Canvas3DHero').then((m) => ({ default: m.Canvas3DHero }))
);

const roleIcons: Record<string, React.ReactNode> = {
  'Data Scientist': <Database className="w-4 h-4 text-cyan-400" />,
  'Web Developer': <Terminal className="w-4 h-4 text-purple-400" />,
  'Photographer': <Camera className="w-4 h-4 text-orange-400" />
};

interface HeroProps {
  accentColor?: string;
  scrollProgress?: number;
}

export const Hero: React.FC<HeroProps> = ({
  accentColor = '#8b5cf6',
  scrollProgress = 0
}) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % profileData.roles.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-12"
    >
      {/* 3D WebGL Canvas Layer (Lazy Loaded with Static Fallback) */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<Canvas3DHeroFallback />}>
          <Canvas3DHeroLazy accentColor={accentColor} scrollProgress={scrollProgress} />
        </Suspense>
      </div>

      {/* Atmospheric Radial Shading to Guarantee Text Legibility */}
      <div className="absolute inset-0 bg-radial-glow pointer-events-none z-1" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#07040e]/60 via-transparent to-[#07040e] pointer-events-none z-1" />

      {/* Floating Decorative Geometric Accents */}
      <motion.div
        animate={{ y: [-10, 15, -10], rotate: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute top-1/4 left-10 p-3 rounded-2xl glass-panel text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 z-10"
      >
        <div className="flex items-center gap-2 font-mono-code text-xs">
          <Database className="w-4 h-4 text-cyan-400" />
          <span>AQI_Model.predict()</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [15, -12, 15], rotate: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="hidden lg:block absolute top-1/3 right-12 p-3 rounded-2xl glass-panel text-pink-400 border border-pink-500/20 shadow-lg shadow-pink-500/10 z-10"
      >
        <div className="flex items-center gap-2 font-mono-code text-xs">
          <Sparkles className="w-4 h-4 text-pink-400" />
          <span>Accuracy: 98.4% • F1: 0.96</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [-8, 12, -8], rotate: [0, 6, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="hidden lg:block absolute bottom-28 left-20 p-3 rounded-2xl glass-panel text-purple-400 border border-purple-500/20 shadow-lg shadow-purple-500/10 z-10"
      >
        <div className="flex items-center gap-2 font-mono-code text-xs">
          <Terminal className="w-4 h-4 text-purple-400" />
          <span>&lt;QueueBite status="ready" /&gt;</span>
        </div>
      </motion.div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono-code text-zinc-300 border border-purple-500/30 mb-6 shadow-lg shadow-purple-900/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-zinc-200">Available for projects &amp; creative collaborations</span>
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-2 mb-4"
        >
          <p className="text-sm sm:text-base font-mono-code uppercase tracking-widest text-zinc-400">
            Welcome To My Universe
          </p>
          <h1 className="font-space text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
            Hi, I'm{' '}
            <span className="text-gradient-purple-pink inline-block relative">
              {profileData.name}
              <motion.span
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full"
              />
            </span>
            .
          </h1>
        </motion.div>

        {/* Animated Dynamic Role Badge Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="h-14 flex items-center justify-center mb-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={profileData.roles[currentRoleIndex]}
              initial={{ opacity: 0, y: 20, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: -90 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-6 py-2 rounded-2xl glass-panel border border-white/15 shadow-xl shadow-purple-900/30"
            >
              {roleIcons[profileData.roles[currentRoleIndex]]}
              <span className="font-syne text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                {profileData.roles[currentRoleIndex]}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Main Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="font-space text-lg sm:text-xl md:text-2xl font-semibold text-zinc-100 max-w-3xl mb-4 leading-snug"
        >
          "{profileData.tagline}"
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="text-sm sm:text-base text-zinc-300 max-w-2xl mb-8 leading-relaxed font-sans"
        >
          {profileData.heroDescription}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo('projects')}
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 shadow-xl shadow-pink-600/25 hover:shadow-pink-600/40 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <FolderGit2 className="w-4 h-4 text-purple-200" />
            <span>Explore My Work</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform" />
          </button>

          <button
            onClick={() => scrollTo('contact')}
            className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-sm text-white glass-panel hover:bg-white/10 border border-white/15 hover:border-purple-400/50 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-pink-400" />
            <span>Let's Connect</span>
          </button>
        </motion.div>

        {/* Key Stats Counter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="w-full flex flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10 mx-auto max-w-4xl mt-12"
        >
          {profileData.stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-panel px-6 py-3.5 sm:px-8 sm:py-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center min-w-[130px] sm:min-w-[160px] hover:border-purple-500/30 transition-colors"
            >
              <span className="font-space text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-purple-200 to-pink-400">
                {stat.value}
              </span>
              <span className="text-[11px] font-mono-code text-zinc-400 tracking-wider text-center uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-14 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => scrollTo('about')}
        >
          <span className="text-[11px] font-mono-code text-zinc-400 tracking-widest uppercase group-hover:text-purple-400 transition-colors">
            Scroll To Discover
          </span>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex items-start justify-center p-1 group-hover:border-pink-500/60 transition-colors">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-pink-400 shadow-md shadow-pink-500/50"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
