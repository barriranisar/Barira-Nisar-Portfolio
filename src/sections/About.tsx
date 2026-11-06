import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { profileData } from '../data/profile';
import { HoloAvatarCard } from '../components/HoloAvatarCard';
import { ExpertiseExperiences } from '../components/ExpertiseExperiences';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 -translate-y-1/2 rounded-full bg-purple-900/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-900/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Pill & Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono-code text-cyan-400 border border-cyan-500/30 mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WHO I AM</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            A Little About Me
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 mt-4 text-base sm:text-lg leading-relaxed font-sans"
          >
            {profileData.aboutIntro}
          </motion.p>
        </div>

        {/* Editorial Layout: Profile Artwork + Narrative Story & Tri-Discipline Experiences */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Visual Profile Card with 3D Holographic Tilt */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative lg:sticky lg:top-28"
          >
            <HoloAvatarCard
              imageSrc="/images/profile/avatar.jpeg"
              name={profileData.name}
            />

            {/* Discipline Summary Pill */}
            
          </motion.div>

          {/* Right Column: Narrative Story & Three Interactive Expertise Experiences */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-space text-2xl sm:text-3xl font-bold text-white leading-tight mb-4">
                {profileData.aboutStory.heading}
              </h3>
              <div className="space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed">
                {profileData.aboutStory.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Tri-Discipline Interactive Expertise Experiences (Regression, Code Editor, Camera Viewfinder) */}
            <div className="mt-4 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-mono-code text-zinc-400 uppercase tracking-wider font-semibold">
                  Interactive Discipline Showcases:
                </p>
                <span className="text-[11px] font-mono-code text-cyan-400">
                  Live Interactive Sandboxes
                </span>
              </div>

              {/* Render Tabbed Expertise Experiences (Real Linear Regression, Code Editor, Camera Viewfinder) */}
              <ExpertiseExperiences activeTab={activeTab} onTabChange={setActiveTab} />

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-zinc-400">
                <span className="flex items-center gap-1.5 text-zinc-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Analytical &amp; Technical Synergy
                </span>
                <a
                  href="#projects"
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold"
                >
                  <span>Explore Selected Works</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
