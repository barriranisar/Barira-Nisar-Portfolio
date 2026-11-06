import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import type { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  // Focus trap, Escape key handling & focus restoration
  useEffect(() => {
    if (project) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          }
        }
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }

        if (e.key === 'Tab' && modalRef.current) {
          const focusable = Array.from(
            modalRef.current.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => !el.hasAttribute('disabled') && el.offsetParent !== null);

          if (focusable.length === 0) return;

          const firstEl = focusable[0];
          const lastEl = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === firstEl) {
              e.preventDefault();
              lastEl.focus();
            }
          } else {
            if (document.activeElement === lastEl) {
              e.preventDefault();
              firstEl.focus();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
        if (
          previouslyFocusedElement.current &&
          typeof previouslyFocusedElement.current.focus === 'function'
        ) {
          previouslyFocusedElement.current.focus();
        }
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#07040e]/90 backdrop-blur-xl"
          />

          {/* Modal Window Container: 2-Column Side-by-Side Layout with Shared-Element Transition */}
          <motion.div
            ref={modalRef}
            layoutId={`project-card-${project.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            tabIndex={-1}
            data-lenis-prevent
            className="relative max-w-6xl w-[94vw] max-h-[88vh] overflow-hidden rounded-2xl bg-[#0d0914] border border-purple-900/40 shadow-2xl shadow-purple-950/80 z-10 my-auto flex flex-col md:flex-row h-full items-stretch focus:outline-none"
          >
            {/* Left Column: Image Preview (55% to 60% Width) - Zero inner vertical scroll */}
            <div className="md:w-3/5 w-full bg-black/50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/10 shrink-0 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto max-h-[78vh] object-contain rounded-xl drop-shadow-2xl select-none"
              />
            </div>

            {/* Right Column: Project Details (40% to 45% Width) */}
            <div className="md:w-2/5 w-full p-6 flex flex-col justify-between overflow-y-auto overscroll-contain bg-[#0d0914] text-left">
              <div>
                {/* Header: Category pill, Role, and Close button */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-white/10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono-code font-semibold text-purple-300 bg-purple-500/15 border border-purple-500/30">
                      {project.category}
                    </span>
                    <span className="text-zinc-500 hidden sm:inline">•</span>
                    <span className="text-xs font-mono-code text-zinc-400">
                      Role: {project.roleIdentity}
                    </span>
                  </div>

                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 focus-visible:ring-2 focus-visible:ring-purple-400"
                    aria-label="Close project details modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Title with id for aria-labelledby */}
                <h3
                  id="modal-title"
                  className="font-space text-2xl font-bold text-white tracking-tight mt-4 mb-3"
                >
                  {project.title}
                </h3>

                {/* Description & Impact Summary */}
                <div className="space-y-1.5 mb-5">
                  <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>

                {/* Key Features & Architecture */}
                <div className="space-y-2 mb-5">
                  <h4 className="flex items-center gap-2 text-xs font-mono-code font-bold text-purple-300 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>Key Features &amp; Architecture</span>
                  </h4>
                  <div className="space-y-2">
                    {project.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies & Tools */}
                <div className="space-y-2 mb-6">
                  <h4 className="flex items-center gap-2 text-xs font-mono-code font-bold text-zinc-300 uppercase tracking-wider">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Technologies &amp; Tools</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-[11px] font-mono-code"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer: Portfolio Showcase note & Close Window button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                <span className="text-[11px] font-mono-code text-zinc-400">
                  Personal Portfolio Project Showcase
                </span>
                <button
                  onClick={onClose}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-400"
                >
                  Close Window
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};