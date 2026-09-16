import { useState, FormEvent } from 'react';
import {
  FlaskConical,
  Cpu,
  Cog,
  Sparkles,
  Lightbulb,
  GitBranch,
  ArrowRight,
  Send,
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { LAB_AREAS } from '../data/portfolioData';

export function AiLabSection() {
  const [selectedArea, setSelectedArea] = useState<string>('lab-agents');
  const [promptInput, setPromptInput] = useState('');
  const [labResult, setLabResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const getAreaIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-400" />;
      case 'Cog':
        return <Cog className="w-5 h-5 text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-emerald-400" />;
      case 'Lightbulb':
        return <Lightbulb className="w-5 h-5 text-emerald-400" />;
      case 'GitBranch':
        return <GitBranch className="w-5 h-5 text-emerald-400" />;
      default:
        return <FlaskConical className="w-5 h-5 text-emerald-400" />;
    }
  };

  const sampleExperiments = [
    {
      title: 'WhatsApp E-commerce Intent Router',
      category: 'Intelligent Workflows',
      summary: 'Distinguishes between pricing queries, shipping status requests, and refund tickets with 98.4% accuracy.',
    },
    {
      title: 'Multi-Agent Customer Follow-Up Loop',
      category: 'AI Agents',
      summary: 'Autonomous agent that cross-checks order statuses, schedules delayed nudges, and alerts the human operator on edge-cases.',
    },
    {
      title: 'No-Code Webhook Normalizer',
      category: 'Automation Systems',
      summary: 'Translates messy social media form responses into structured CRM payloads via n8n & Make.',
    },
  ];

  const handleTestPrompt = (e: FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;

    setIsProcessing(true);
    setLabResult(null);

    setTimeout(() => {
      setLabResult(
        `[Agentic Architecture Proposed]\n1. Ingestion: Webhook trigger captures input "${promptInput}".\n2. Classification: LLM determines intent & priority score.\n3. Context: RAG retrieves relevant past knowledge or product table.\n4. Execution: Dispatches automated draft & logs entry to database.`
      );
      setIsProcessing(false);
    }, 800);
  };

  return (
    <section id="ailab" className="py-20 bg-neutral-900/40 border-t border-b border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium text-emerald-400">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>RESEARCH & INNOVATION</span>
          </div>
          <h2 id="ai-lab-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            AI Lab
          </h2>
          <h3 id="ai-lab-subheading" className="text-xl sm:text-2xl font-bold text-emerald-400">
            Exploring The Future With Artificial Intelligence
          </h3>
          <p id="ai-lab-summary" className="text-base text-neutral-300 max-w-2xl leading-relaxed">
            I continuously experiment with emerging AI technologies to build smarter solutions.
          </p>
        </div>

        {/* Current Areas Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold">
              Current Research & Experimentation Areas:
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" id="ai-lab-areas-grid">
            {LAB_AREAS.map((area) => (
              <div
                key={area.id}
                id={area.id}
                onClick={() => setSelectedArea(area.id)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  selectedArea === area.id
                    ? 'bg-neutral-900 border-emerald-500/60 shadow-lg ring-1 ring-emerald-500/30'
                    : 'bg-neutral-900/60 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900'
                }`}
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center">
                    {getAreaIcon(area.iconName)}
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-white tracking-tight">
                      {area.title}
                    </h5>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-3">
                      {area.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-neutral-800/80 flex flex-wrap gap-1">
                  {area.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-1.5 py-0.5 rounded bg-neutral-950 text-[10px] font-mono text-neutral-400 border border-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Experiment Sandbox Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Sandbox Form */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h5 className="text-sm font-bold text-white font-mono">
                  Interactive AI Automation Sandbox
                </h5>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">
                Workflow Prototyper
              </span>
            </div>

            <p className="text-xs text-neutral-300">
              Type any manual business problem or repetitive workflow (e.g. <em>"Send a WhatsApp confirmation and log customer to Google Sheets when payment screenshot arrives"</em>) to visualize the agent architecture:
            </p>

            <form onSubmit={handleTestPrompt} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder="Describe your automation scenario or challenge..."
                  className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50 pr-24 font-sans"
                />
                <button
                  type="submit"
                  disabled={isProcessing || !promptInput.trim()}
                  className="absolute right-2 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center gap-1.5"
                >
                  <span>{isProcessing ? 'Analyzing...' : 'Simulate'}</span>
                  <Send className="w-3 h-3" />
                </button>
              </div>

              {/* Sample quick prompts */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs text-neutral-400 pt-1">
                <span className="text-[11px] font-mono">Try preset:</span>
                <button
                  type="button"
                  onClick={() => setPromptInput('Auto-answer customer inquiries on Instagram with stock availability')}
                  className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-300 transition-colors"
                >
                  Instagram Stock Queries
                </button>
                <button
                  type="button"
                  onClick={() => setPromptInput('Sync unpaid invoice reminders from Stripe into WhatsApp every Friday')}
                  className="px-2 py-0.5 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-300 transition-colors"
                >
                  Unpaid Invoice Reminders
                </button>
              </div>
            </form>

            {labResult && (
              <div className="p-4 rounded-xl bg-neutral-900/90 border border-emerald-800/50 font-mono text-xs text-neutral-200 whitespace-pre-wrap leading-relaxed space-y-2">
                <div className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Agent Solution Architecture Generated</span>
                </div>
                <div>{labResult}</div>
              </div>
            )}
          </div>

          {/* Sample Laboratory Benchmarks */}
          <div className="lg:col-span-5 space-y-3">
            <h5 className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold px-1">
              Recent Lab Experiments
            </h5>

            <div className="space-y-3">
              {sampleExperiments.map((exp, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                      {exp.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">Validated</span>
                  </div>
                  <h6 className="text-sm font-bold text-white">
                    {exp.title}
                  </h6>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {exp.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
