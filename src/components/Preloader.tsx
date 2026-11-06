import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { profileData } from '../data/profile';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 2600; // ~2.6s smooth duration from 0% to 100%
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let exitTimeoutId: ReturnType<typeof setTimeout> | null = null;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const current = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(current);

      if (current >= 100) {
        clearInterval(interval);
        // Subtle 400ms pause at 100% so the completed state is briefly visible
        timeoutId = setTimeout(() => {
          setIsExiting(true);
          exitTimeoutId = setTimeout(onComplete, 800);
        }, 400);
      }
    }, 25);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
      if (exitTimeoutId) clearTimeout(exitTimeoutId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07040e] text-white overflow-hidden"
        >
          {/* Animated Background Mesh Glows */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-purple-600/30 blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-pink-600/30 blur-[120px] pointer-events-none"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-cyan-600/20 blur-[100px] pointer-events-none"
          />

          {/* Central Logo Emblem */}
          <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
            {/* Monogram Glow Frame */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-24 h-24 mb-6 rounded-2xl p-[2px] bg-gradient-to-tr from-purple-500 via-pink-500 to-cyan-400 shadow-2xl shadow-purple-500/20"
            >
              <div className="w-full h-full rounded-2xl bg-[#0d071d] flex items-center justify-center relative overflow-hidden">
                <span className="font-syne text-4xl font-extrabold bg-gradient-to-br from-white via-purple-200 to-pink-400 bg-clip-text text-transparent">
                  {profileData.initials}
                </span>
                {/* Subtle sheen reflection */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />
              </div>
            </motion.div>

            {/* Name Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-space text-3xl sm:text-4xl font-bold tracking-tight mb-2"
            >
              Barira Nisar
            </motion.h1>

            {/* Dual-Identity Focus Pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex items-center gap-2 text-xs sm:text-sm font-mono-code text-zinc-400 mb-8"
            >
              <span className="text-cyan-400">Data Scientist</span>
              <span className="text-zinc-600">•</span>
              <span className="text-purple-400">Full-Stack Web Developer</span>
            </motion.div>

            {/* Progress Bar & Numeric Indicator */}
            <div className="w-64 sm:w-80 relative">
              <div className="flex justify-between items-center text-xs font-mono-code text-zinc-400 mb-2">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" />
                  INITIALIZING PORTFOLIO
                </span>
                <span className="text-purple-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

