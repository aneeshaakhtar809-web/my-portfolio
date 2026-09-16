import { Sparkles, Layers, Cpu, Check, Compass, Target, Sliders, Zap } from 'lucide-react';
import { ABOUT_ME } from '../data/portfolioData';

export function About() {
  const pillars = [
    {
      title: 'Simple',
      icon: Sliders,
      desc: 'Intuitive AI interactions without unnecessary operational friction or steep learning curves.',
    },
    {
      title: 'Scalable',
      icon: Cpu,
      desc: 'Robust automated architecture engineered to effortlessly handle thousands of events daily.',
    },
    {
      title: 'User-Focused',
      icon: Compass,
      desc: 'Built around the genuine human workflows of business owners, operators, and everyday buyers.',
    },
    {
      title: 'Measurable Value',
      icon: Target,
      desc: 'Clear reduction in repetitive hours, faster response times, and noticeable revenue recovery.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-neutral-900/40 border-t border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BACKGROUND & PHILOSOPHY</span>
          </div>
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <p id="about-headline" className="text-xl sm:text-2xl text-neutral-200 font-medium max-w-3xl leading-snug">
            {ABOUT_ME.headline}
          </p>
        </div>

        {/* Core Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Combined Areas */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-md">
              <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-mono font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>My Work Combines</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="about-expertise-list">
                {ABOUT_ME.expertiseAreas.map((area, idx) => (
                  <div
                    key={idx}
                    id={`about-area-${idx}`}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 hover:border-emerald-500/40 transition-colors"
                  >
                    <div className="w-5 h-5 rounded-md bg-emerald-950/60 border border-emerald-800/60 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-sm font-medium text-neutral-200">{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative Paragraphs */}
            <div className="space-y-4 text-neutral-300 text-base leading-relaxed bg-neutral-950/40 p-6 rounded-2xl border border-neutral-800/60">
              <p id="about-paragraph-1" className="text-neutral-200 font-medium">
                {ABOUT_ME.paragraph1}
              </p>
              <p id="about-paragraph-2" className="text-neutral-400">
                {ABOUT_ME.paragraph2}
              </p>
            </div>
          </div>

          {/* Right Column: 4 Pillars of Solution Design */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-neutral-400 font-mono font-semibold px-1">
              Guiding Principles
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    id={`about-pillar-${idx}`}
                    className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-200 space-y-2.5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-emerald-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Practical value highlight card */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/30 flex items-start gap-3.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400 mt-0.5">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-sm font-semibold text-emerald-300">
                  Business Value First
                </h5>
                <p className="text-xs text-neutral-300 mt-1 leading-normal">
                  Prioritizing reliable agentic automation workflows that integrate directly into everyday channels like WhatsApp, CRMs, and email without heavy enterprise maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
