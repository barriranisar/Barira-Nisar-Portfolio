import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Sparkles,
  X,
  ArrowUpRight,
  ExternalLink,
  Download,
  ShieldCheck
} from 'lucide-react';
import { achievementsData } from '../data/achievements';
import type { AchievementItem } from '../types';

export const Achievements: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<AchievementItem | null>(null);

  // Lock body scroll and handle Escape key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  return (
    <section id="achievements" className="relative py-28 overflow-hidden bg-mesh-dark">
      {/* Background Cosmic Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-purple-900/15 blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-900/15 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono-code text-purple-400 border border-purple-500/30 mb-4"
          >
            <Award className="w-3.5 h-3.5" />
            <span>HONORS &amp; RECOGNITION</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Milestones &amp; Recognition
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 mt-3 text-base sm:text-lg leading-relaxed font-sans"
          >
            Accredited credentials, professional certifications, and verified industry achievements.
          </motion.p>
        </div>

        {/* Holographic Glassmorphism Credential Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              className="bg-[#130f24]/70 backdrop-blur-md border border-purple-800/30 hover:border-purple-500/60 transition-all duration-300 rounded-2xl p-6 relative group overflow-hidden flex flex-col justify-between select-none shadow-xl hover:shadow-2xl hover:shadow-purple-950/40"
            >
              {/* Subtle animated gradient glow in the corner on hover */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-purple-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                {/* Header: Issuer / Category badge & Glowing Verified Credential pill */}
                <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono-code font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/25 truncate max-w-[150px]">
                    <Sparkles className="w-3 h-3 text-purple-400 shrink-0" />
                    <span className="truncate">{item.badgeText || item.badge || item.category}</span>
                  </span>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono-code font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Verified Credential
                  </span>
                </div>

                {/* Center: Certificate Image Preview Box */}
                <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center p-2.5 mb-4 group-hover:border-purple-500/30 transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain rounded-lg select-none pointer-events-none transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent && !parent.querySelector('.img-error-fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'img-error-fallback flex flex-col items-center justify-center gap-2 text-zinc-400';
                        fallback.innerHTML = '<span class="text-3xl">🏅</span><span class="text-xs font-mono-code text-purple-400">Accredited Certificate</span>';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>

                {/* Body: Certificate Title & Issuing Authority + Year */}
                <div className="mb-4">
                  <h3 className="font-space text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-purple-300 transition-colors mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono-code text-zinc-400 truncate">
                    <span className="text-purple-300 font-semibold truncate">
                      {item.organization || item.issuer}
                    </span>
                    <span>•</span>
                    <span className="text-zinc-400 shrink-0">
                      {item.year || item.issueDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Sleek bottom button with micro-hover state */}
              <button
                onClick={() => setSelectedCert(item)}
                aria-haspopup="dialog"
                aria-label={`View credentials for ${item.title}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-600/15 hover:bg-purple-600/30 border border-purple-500/30 hover:border-purple-500/60 text-xs font-mono-code font-semibold text-purple-200 hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-purple-500/20 active:scale-98 relative z-10 focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span>View Verification &amp; Docs</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-purple-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Clean High-Resolution Certificate Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto overscroll-contain"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-modal-title"
              tabIndex={-1}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl glass-panel bg-[#130f24]/95 border border-purple-500/30 shadow-2xl overflow-hidden my-auto focus:outline-none"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-purple-800/30 bg-white/[0.02]">
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 id="cert-modal-title" className="font-space text-base sm:text-lg font-bold text-white truncate max-w-[240px] sm:max-w-md">
                        {selectedCert.title}
                      </h3>
                      {(selectedCert.badgeText || selectedCert.badge) && (
                        <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono-code font-bold bg-purple-500/20 border border-purple-500/40 text-purple-300">
                          {selectedCert.badgeText || selectedCert.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono-code text-zinc-400 truncate">
                      {selectedCert.organization || selectedCert.issuer} • {selectedCert.year || selectedCert.issueDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {selectedCert.credentialUrl &&
                    selectedCert.credentialUrl !== '#' &&
                    !selectedCert.credentialUrl.startsWith('#') && (
                      <a
                        href={selectedCert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/35 border border-purple-500/40 text-purple-200 hover:text-white text-xs font-mono-code transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Verify Credential</span>
                      </a>
                    )}
                  {selectedCert.pdfUrl &&
                    selectedCert.pdfUrl !== '#' &&
                    !selectedCert.pdfUrl.startsWith('#') && (
                      <a
                        href={selectedCert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
                        title="Download Original Document"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close certificate modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Body - Clean Centered Certificate Image */}
              <div className="p-4 sm:p-6 flex-1 flex items-center justify-center overflow-hidden bg-black/40">
                <img
                  src={selectedCert.image || ''}
                  alt={selectedCert.title}
                  className="max-w-full max-h-[75vh] w-auto h-auto object-contain rounded-lg shadow-2xl select-none"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
