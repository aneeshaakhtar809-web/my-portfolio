import { useState } from 'react';
import {
  Sparkles,
  ExternalLink,
  Bot,
  Globe,
  Gamepad2,
  FileSearch,
  Languages,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Layers,
  Play,
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types';
import { SahaaraWorkflowVisualizer } from './SahaaraWorkflowVisualizer';
import { NeonBreakerModal } from './NeonBreakerModal';

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'nocode' | 'interactive'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const flagship = PROJECTS.find((p) => p.isFlagship) || PROJECTS[0];
  const secondaryProjects = PROJECTS.filter((p) => !p.isFlagship);

  const filteredProjects = secondaryProjects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'ai') return project.category === 'AI Agents' || project.category === 'Generative AI';
    if (activeFilter === 'nocode') return project.category === 'No-Code & Web';
    if (activeFilter === 'interactive') return project.category === 'Interactive';
    return true;
  });

  const getProjectIcon = (category: string) => {
    switch (category) {
      case 'AI Agents':
        return <Bot className="w-5 h-5 text-emerald-400" />;
      case 'Generative AI':
        return <Languages className="w-5 h-5 text-emerald-400" />;
      case 'No-Code & Web':
        return <Globe className="w-5 h-5 text-emerald-400" />;
      case 'Interactive':
        return <Gamepad2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PORTFOLIO SHOWCASE</span>
            </div>
            <h2 id="featured-projects-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Projects
            </h2>
            <p className="text-base text-neutral-400 max-w-2xl">
              Practical AI systems, automated customer workflows, multi-lingual translation assistants, and full-fidelity digital platforms.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
            <button
              type="button"
              id="filter-projects-all"
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              All Systems ({secondaryProjects.length + 1})
            </button>
            <button
              type="button"
              id="filter-projects-ai"
              onClick={() => setActiveFilter('ai')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'ai'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              AI Agents & GenAI
            </button>
            <button
              type="button"
              id="filter-projects-nocode"
              onClick={() => setActiveFilter('nocode')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'nocode'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              No-Code & Web
            </button>
            <button
              type="button"
              id="filter-projects-interactive"
              onClick={() => setActiveFilter('interactive')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'interactive'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Interactive
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FLAGSHIP PROJECT: Sahaara AI Deep Dive */}
        {/* ========================================================================= */}
        <div
          id="flagship-sahaara-ai-container"
          className="rounded-3xl bg-neutral-900/80 border border-neutral-800 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden"
        >
          {/* Ambient accent highlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-8 relative z-10">
            {/* Header / Badges */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-mono font-semibold tracking-wider uppercase">
                    Flagship System
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Social Commerce AI
                  </span>
                </div>
                <h3 id="sahaara-ai-title" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {flagship.title}
                </h3>
                <h4 id="sahaara-ai-subtitle" className="text-lg sm:text-xl font-bold text-emerald-400">
                  {flagship.subtitle}
                </h4>
              </div>

              {/* Technologies Pill Group */}
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {flagship.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview paragraph */}
            <div className="p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800/80">
              <h5 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold mb-2">
                System Overview
              </h5>
              <p id="sahaara-ai-overview" className="text-neutral-200 text-base leading-relaxed">
                {flagship.overview}
              </p>
            </div>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Problem Card */}
              <div id="sahaara-ai-problem-card" className="p-6 rounded-2xl bg-neutral-950/50 border border-neutral-800 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-red-950/60 border border-red-800/60 flex items-center justify-center text-red-400">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <h5 className="text-base font-bold text-white tracking-tight">
                    The Problem
                  </h5>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {flagship.problem}
                </p>
                <div className="space-y-2 pt-2 border-t border-neutral-800/60">
                  <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold block">
                    Key Operational Challenges:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {flagship.challenges?.map((chal, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                        <span>{chal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Solution Card */}
              <div id="sahaara-ai-solution-card" className="p-6 rounded-2xl bg-neutral-950/50 border border-emerald-900/40 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h5 className="text-base font-bold text-white tracking-tight">
                    The Sahaara AI Solution
                  </h5>
                </div>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Sahaara AI replaces manual notes and haphazard messaging with an autonomous assistant that unifies customer interactions into an automated pipeline.
                </p>
                <div className="space-y-2 pt-2 border-t border-neutral-800/60">
                  <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold block">
                    Core Capabilities Provided:
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {flagship.solution?.map((sol, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{sol}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Step-by-Step Workflow Diagram & Payload Inspector */}
            <SahaaraWorkflowVisualizer />
          </div>
        </div>

        {/* ========================================================================= */}
        {/* OTHER FEATURED PROJECTS GRID */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>More Featured Systems & Digital Products</span>
            </h3>
            <span className="text-xs font-mono text-neutral-400">
              Showing {filteredProjects.length} items
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="secondary-projects-grid">
            {filteredProjects.map((project) => {
              const isNeonGame = project.id === 'neon-breaker';

              return (
                <div
                  key={project.id}
                  id={`project-card-${project.id}`}
                  className="rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 p-6 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Top Category Badge & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-inner group-hover:border-emerald-500/50 transition-colors">
                        {getProjectIcon(project.category)}
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
                        {project.category}
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors tracking-tight">
                        {project.title}
                      </h4>
                      <p className="text-xs font-medium text-emerald-400/90 font-mono mt-0.5">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Overview */}
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {project.overview}
                    </p>

                    {/* Features list if present */}
                    {project.features && (
                      <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
                        <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 font-semibold block">
                          Features:
                        </span>
                        {project.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Technologies & Action */}
                  <div className="pt-5 mt-4 border-t border-neutral-800 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800/80 text-[10px] font-mono text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {isNeonGame ? (
                      <button
                        type="button"
                        id="btn-play-neon-breaker"
                        onClick={() => setIsGameModalOpen(true)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/60 text-xs font-semibold text-emerald-300 transition-colors"
                      >
                        <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
                        <span>Launch Interactive Game Preview</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-medium text-neutral-300 transition-colors"
                      >
                        <span>View System Specifications</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Neon Breaker Game Modal */}
      <NeonBreakerModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
      />

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          id="project-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-neutral-800 pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase font-semibold text-emerald-400 tracking-wider">
                  {selectedProject.category}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-neutral-300 font-mono mt-0.5">
                  {selectedProject.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm text-neutral-300">
              <div>
                <h5 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold mb-1">
                  Overview
                </h5>
                <p className="text-neutral-200 leading-relaxed">
                  {selectedProject.overview}
                </p>
              </div>

              {selectedProject.features && (
                <div>
                  <h5 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold mb-2">
                    Features
                  </h5>
                  <div className="space-y-1.5">
                    {selectedProject.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h5 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold mb-2">
                  Technologies
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
