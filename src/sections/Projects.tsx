import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, ArrowUpRight, Sparkles, Eye, Code, Database, Gamepad2 } from 'lucide-react';
import { projectsData } from '../data/projects';
import type { ProjectItem } from '../types';

const ProjectModal = React.lazy(() =>
  import('../components/ProjectModal').then((m) => ({ default: m.ProjectModal }))
);

// Clean SVG GitHub icon
const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export const Projects: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filters = ['All', 'Data Science', 'Web Development', 'Game Development', 'UI/UX Design'];

  const filteredProjects =
    selectedFilter === 'All'
      ? projectsData
      : projectsData.filter((p) =>
          p.category.toLowerCase().includes(selectedFilter.toLowerCase())
        );

  const getCategoryIcon = (category: string) => {
    if (category.includes('Data Science')) return <Database className="w-4 h-4 text-cyan-400" />;
    if (category.includes('Game')) return <Gamepad2 className="w-4 h-4 text-amber-400" />;
    if (category.includes('UI/UX')) return <Sparkles className="w-4 h-4 text-pink-400" />;
    return <Code className="w-4 h-4 text-purple-400" />;
  };

  const getRoleColor = (role: string) => {
    const lower = role.toLowerCase();
    if (lower.includes('data') || lower.includes('machine learning')) return 'text-cyan-400';
    if (lower.includes('photo')) return 'text-[#f97316]';
    if (lower.includes('game')) return 'text-amber-400';
    return 'text-purple-400';
  };

  return (
    <section id="projects" className="relative py-28 overflow-hidden">
      {/* Background Accent Shading */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-xs font-mono-code text-purple-400 border border-purple-500/30 mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-space text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          >
            Selected Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 mt-4 text-base sm:text-lg leading-relaxed font-sans"
          >
            A collection of projects where technology meets creativity.
          </motion.p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          {filters.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                    : 'glass-panel text-zinc-400 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Uniform 2-Column Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                layoutId={`project-card-${project.id}`}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`View details for ${project.title}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveModalProject(project);
                  }
                }}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group rounded-3xl glass-panel border border-white/10 overflow-hidden flex flex-col justify-between hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-950/50 transition-all duration-300 h-full focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:outline-none"
              >
                {/* Project Image & Overlay - Fixed Aspect Ratio */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-[#0c081e] cursor-pointer shrink-0"
                  onClick={() => setActiveModalProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0922] via-transparent to-transparent opacity-80" />

                  {/* Category Floating Pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono-code font-bold bg-[#0c071d]/85 backdrop-blur-md text-white border border-white/15">
                      {getCategoryIcon(project.category)}
                      <span>{project.tag}</span>
                    </span>
                  </div>

                  {/* View Details Overlay Pill */}
                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white text-zinc-950 shadow-xl">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </span>
                  </div>
                </div>

                {/* Card Content - Uniform Flex Body */}
                <div className="p-7 sm:p-8 flex flex-col justify-between flex-1">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-xs font-mono-code ${getRoleColor(project.roleIdentity)}`}>
                        {project.roleIdentity}
                      </span>
                      <span className="text-[11px] font-mono-code text-zinc-400">
                        Featured Showcase
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="font-space text-xl sm:text-2xl font-bold text-white hover:text-purple-300 transition-colors cursor-pointer mb-2.5 line-clamp-2 min-h-[3.25rem] sm:min-h-[3.5rem] flex items-center"
                    >
                      {project.title}
                    </h3>

                    <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-sans line-clamp-2">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Tech Badges & Action Link */}
                  <div className="mt-auto pt-2">
                    <div className="flex flex-wrap gap-1.5 mb-5 min-h-[2rem] items-center">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono-code text-zinc-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-mono-code text-zinc-400">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-end">
                      <span className="text-[10px] font-mono-code text-zinc-400 uppercase tracking-wider">
                        {project.category.split('/')[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Explore More on GitHub Button (Bottom Right) */}
        <div className="mt-12 flex justify-end">
          <a
            href="https://github.com/barriranisar"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/40 text-purple-200 hover:text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 text-xs sm:text-sm font-mono-code font-semibold shadow-lg shadow-purple-950/40 hover:shadow-purple-700/30 hover:scale-[1.02] cursor-pointer"
          >
            <GithubIcon className="w-4 h-4 text-purple-300 group-hover:text-white transition-colors" />
            <span>Explore More on GitHub</span>
            <ArrowUpRight className="w-4 h-4 text-purple-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Interactive Project Details Modal */}
      <Suspense fallback={null}>
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </Suspense>
    </section>
  );
};
