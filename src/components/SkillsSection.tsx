import { useState } from 'react';
import { Bot, Workflow, Code, Layers, Sparkles, Check, ArrowRight } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Bot':
        return <Bot className="w-5 h-5 text-emerald-400" />;
      case 'Workflow':
        return <Workflow className="w-5 h-5 text-emerald-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-emerald-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
    }
  };

  const displayedCategories =
    selectedCategory === 'all'
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((cat) => cat.id === selectedCategory);

  return (
    <section id="skills" className="py-20 bg-neutral-900/40 border-t border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TECHNICAL COMPETENCIES</span>
            </div>
            <h2 id="skills-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Skills
            </h2>
            <p className="text-base text-neutral-400 max-w-2xl">
              Practical expertise across autonomous agents, workflow automation, modern web standards, and rapid no-code product development.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 overflow-x-auto">
            <button
              type="button"
              id="skill-filter-all"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              All Categories
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`skill-filter-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="skills-grid">
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              id={`skill-card-${category.id}`}
              className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800/90 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Icon & Category Title */}
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center shadow-inner group-hover:border-emerald-500/50 transition-colors">
                    {getCategoryIcon(category.iconName)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-semibold px-2 py-0.5 rounded bg-neutral-950/60 border border-neutral-800">
                    {category.skills.length} competencies
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                {/* Skill List */}
                <div className="pt-3 border-t border-neutral-800/80 space-y-2">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      id={`skill-item-${category.id}-${idx}`}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/70 hover:border-emerald-500/40 hover:bg-neutral-950 transition-colors"
                    >
                      <span className="text-xs font-medium text-neutral-200">
                        {skill}
                      </span>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Capability Highlight Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold text-neutral-200">
              Cross-Platform Connectivity: Connecting APIs, Webhooks, LLMs, and No-Code Frontends into Unified Systems
            </span>
          </div>
          <a
            href="#projects"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 font-mono tracking-wide"
          >
            <span>See Project Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
