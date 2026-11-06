import React from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { photographyData } from '../data/photography';

export const Photography: React.FC = () => {
  return (
    <section id="photography" className="relative py-28 overflow-hidden bg-mesh-dark">
      {/* Background Ambient Cosmic Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-pink-900/15 blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-purple-900/15 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono-code text-pink-400 border border-pink-500/30 mb-4"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>THROUGH MY LENS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Visual Chronicles
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 mt-4 text-base sm:text-lg leading-relaxed font-sans"
          >
            A curated visual exhibition of campus moments, international tech summits, and spontaneous atmospheric frames.
          </motion.p>
        </div>

        {/* Clean Responsive Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {photographyData.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (index % 6) * 0.07 }}
              className="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c081e]/80 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-950/50 hover:scale-[1.02] transition-all duration-300 break-inside-avoid select-none"
            >
              {/* Natural Aspect Ratio Photo */}
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-auto object-cover rounded-2xl block transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                loading="lazy"
              />

              {/* Gradient Overlay & Title Fade-Up on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090514]/90 via-[#090514]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5 pointer-events-none">
                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-space text-sm sm:text-base font-bold text-white tracking-wide drop-shadow-md">
                    {photo.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
