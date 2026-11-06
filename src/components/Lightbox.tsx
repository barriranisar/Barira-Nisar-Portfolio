import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { PhotographyItem } from '../types';

interface LightboxProps {
  photo: PhotographyItem | null;
  photos: PhotographyItem[];
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  photo,
  photos,
  onClose,
  onNext,
  onPrev,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!photo) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    if (photo) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [photo, onClose, onNext, onPrev]);

  if (!photo) return null;

  const currentIndex = photos.findIndex((p) => p.id === photo.id);

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 overflow-y-auto overscroll-contain"
      >
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#05030b]/95 backdrop-blur-2xl"
        />

        {/* Top Floating Controls */}
        <div className="fixed top-6 inset-x-6 z-20 flex items-center justify-between pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-3 glass-panel px-4 py-2 rounded-full border border-white/10">
            <span className="font-space text-xs font-bold text-white tracking-wide">
              {photo.title}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="font-mono-code text-xs text-pink-400">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="pointer-events-auto p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="fixed left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 cursor-pointer"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="fixed right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 cursor-pointer"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Photo Container */}
        <motion.div
          key={photo.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 max-w-5xl my-auto max-h-[85vh] flex flex-col items-center justify-center p-2"
        >
          {/* Main Visual */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-black/60 max-h-[75vh] flex items-center justify-center p-2">
            <img
              src={photo.image}
              alt={photo.title}
              className="max-h-[72vh] w-auto object-contain rounded-2xl mx-auto shadow-2xl"
            />
          </div>

          {/* Minimal Title Badge */}
          <div className="mt-4 px-5 py-2 rounded-full glass-panel border border-white/10 text-center">
            <h4 className="font-space text-sm font-semibold text-zinc-200 tracking-wide">
              {photo.title}
            </h4>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
