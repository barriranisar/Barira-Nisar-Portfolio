import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Briefcase, Calendar, Building2, Users, Sparkles, Globe } from 'lucide-react';
import { experiencesData, extracurricularData } from '../data/experiences';

export const Experience: React.FC = () => {
  const [isDeckExpanded, setIsDeckExpanded] = useState(false);
  const [isDeckHovered, setIsDeckHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // 6-Card Stacked Fan Deck Physics
  const getDeckTransform = (index: number) => {
    const rotations = [-8, 6, -4, 4, -2, 7];
    const yOffsets = [0, 8, 16, 24, 30, 36];
    const scales = [0.94, 0.95, 0.96, 0.97, 0.98, 1.0];
    const hoverMultiplier = isDeckHovered && !isDeckExpanded ? 1.5 : 1;

    return {
      rotate: isDeckExpanded || shouldReduceMotion ? 0 : rotations[index % 6] * hoverMultiplier,
      y: isDeckExpanded || shouldReduceMotion ? 0 : yOffsets[index % 6],
      x: 0,
      scale: isDeckExpanded ? 1 : scales[index % 6],
      zIndex: isDeckExpanded ? 1 : (6 - index),
    };
  };
  return (
    <section id="experience" className="relative py-28 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 bg-blue-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-purple-900/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono-code text-cyan-400 border border-cyan-500/30 mb-4"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>WORK EXPERIENCE &amp; INTERNSHIPS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Where I've Contributed
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 mt-4 text-base sm:text-lg leading-relaxed font-sans"
          >
            Hands-on data science internships, predictive ML pipelines, and production data workflows.
          </motion.p>
        </div>

        {/* Animated Vertical Timeline - Internships */}
        <div className="relative">
          {/* Central glowing spine line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-purple-500 via-pink-500 to-cyan-500 opacity-30" />

          <div className="space-y-12">
            {experiencesData.map((item, index) => {
              const isEven = index % 2 === 0;
              const skillsList = item.skills || item.skillsGained || [];

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Central Node Marker */}
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-8 h-8 rounded-full bg-[#0a0618] border-2 border-purple-500 shadow-lg shadow-purple-500/40 items-center justify-center z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping" />
                    <span className="absolute w-2 h-2 rounded-full bg-white" />
                  </div>

                  {/* Experience Card */}
                  <div className="w-full md:w-[calc(50%-40px)]">
                    <div className="bg-[#0f0c1b]/80 border border-purple-900/30 rounded-2xl p-6 sm:p-7 backdrop-blur-xl hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-950/50 transition-all duration-300">
                      {/* Top Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-mono-code font-bold uppercase border ${
                            item.badgeColor || 'border-purple-500/30 text-purple-300 bg-purple-500/10'
                          }`}
                        >
                          {item.type}
                        </span>

                        <div className="flex items-center gap-1.5 text-xs font-mono-code text-zinc-400">
                          <Calendar className="w-3.5 h-3.5 text-pink-400" />
                          <span>{item.period || item.date}</span>
                        </div>
                      </div>

                      {/* Role & Company */}
                      <h3 className="font-space text-xl sm:text-2xl font-bold text-white mb-1">
                        {item.role}
                      </h3>
                      <h4 className="font-sans text-sm sm:text-base font-semibold text-purple-300 mb-2.5 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{item.company || item.organization}</span>
                      </h4>

                      {item.location && (
                        <p className="flex items-center gap-1.5 text-xs sm:text-sm font-mono-code text-purple-300/70 mb-4">
                          <Globe className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span>{item.location}</span>
                        </p>
                      )}

                      {/* Bullet Description */}
                      <div className="space-y-2.5 mb-6">
                        {item.description.map((desc, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 shrink-0 mt-2" />
                            <span>{desc}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack / Skills Tags */}
                      {skillsList.length > 0 && (
                        <div className="pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
                          {skillsList.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono-code text-zinc-300 hover:text-white hover:border-purple-500/30 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Leadership & Extracurricular Activities Subsection */}
        <div className="mt-28 pt-16 border-t border-white/10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono-code text-pink-400 border border-pink-500/30 mb-4"
            >
              <Users className="w-3.5 h-3.5" />
              <span>COMMUNITY &amp; LEADERSHIP</span>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-space text-2xl sm:text-4xl font-extrabold text-white tracking-tight"
            >
              Leadership &amp; Extracurricular Activities
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-300 mt-3 text-sm sm:text-base leading-relaxed font-sans"
            >
              Campus technical event leadership, tech conference volunteering, and competitive initiatives.
            </motion.p>
          </div>

          {/* Interactive Deck Header Controls / Floating Indicator */}
          <div className="flex flex-col items-center mb-6">
            {!isDeckExpanded ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [0, -4, 0] }}
                transition={{ y: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } }}
                onClick={() => setIsDeckExpanded(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-pink-500/40 text-pink-300 text-xs font-mono-code shadow-lg shadow-pink-950/40 hover:border-pink-400 hover:text-white hover:scale-105 transition-all cursor-pointer select-none"
              >
                <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                <span>Interactive Deck: Click to Reveal 6 Leadership Roles (✦)</span>
              </motion.div>
            ) : (
              <div className="w-full flex justify-end max-w-6xl">
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setIsDeckExpanded(false)}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel border border-purple-500/40 text-purple-200 hover:text-white hover:border-pink-500/50 hover:bg-purple-900/20 text-xs font-mono-code transition-all cursor-pointer shadow-md"
                  aria-label="Collapse cards back into deck"
                >
                  <span>Stack Roles</span>
                  <span className="text-pink-400 font-bold text-sm">⤺</span>
                </motion.button>
              </div>
            )}
          </div>

          {/* Interactive Stacked Fan Deck / 3x2 Grid Container */}
          <div
            className={
              isDeckExpanded
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'
                : 'relative h-[520px] flex items-center justify-center cursor-pointer select-none group/deck'
            }
            onClick={() => {
              if (!isDeckExpanded) setIsDeckExpanded(true);
            }}
            onMouseEnter={() => setIsDeckHovered(true)}
            onMouseLeave={() => setIsDeckHovered(false)}
          >
            {extracurricularData.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                layout
                initial={false}
                animate={getDeckTransform(idx)}
                transition={{
                  type: 'spring',
                  stiffness: 95,
                  damping: 14,
                  mass: 1,
                  delay: isDeckExpanded ? idx * 0.08 : (5 - idx) * 0.04,
                }}
                whileHover={
                  isDeckExpanded
                    ? { scale: 1.02, y: -4, transition: { duration: 0.2 } }
                    : undefined
                }
                onClick={(e) => {
                  if (isDeckExpanded) e.stopPropagation();
                }}
                style={{
                  transformOrigin: 'center bottom',
                }}
                className={`${
                  isDeckExpanded
                    ? 'relative w-full h-full'
                    : 'absolute w-full max-w-[340px] sm:max-w-[420px]'
                } bg-[#120e22]/90 border border-purple-900/40 rounded-xl p-5 backdrop-blur-md hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-950/50 transition-colors duration-300 flex flex-col justify-between shadow-xl shadow-black/40`}
              >
                <div>
                  {/* Top Badge & Period */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider border ${
                        item.badgeColor || 'border-purple-500/30 text-purple-300 bg-purple-500/10'
                      }`}
                    >
                      {item.category || item.badge}
                    </span>
                    <span className="text-[11px] font-mono-code text-zinc-400">
                      {item.year || item.period}
                    </span>
                  </div>

                  {/* Role Title */}
                  <h4 className="font-space text-base sm:text-lg font-bold text-white mb-1.5 leading-snug">
                    {item.role}
                  </h4>

                  {/* Organization */}
                  <p className="text-xs font-mono-code text-purple-300 mb-3.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                    <span className="truncate">{item.organization}</span>
                  </p>

                  {/* Description Bullets */}
                  <div className="space-y-2 mb-4">
                    {item.description.map((desc, dIdx) => (
                      <div
                        key={dIdx}
                        className="flex items-start gap-2 text-xs text-zinc-300 leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400/80 shrink-0 mt-1.5" />
                        <span>{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Chips */}
                {item.skills && item.skills.length > 0 && (
                  <div className="pt-3 border-t border-white/5 flex flex-wrap gap-1.5 mt-auto">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] font-mono-code text-zinc-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
