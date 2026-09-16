import { useState } from 'react';
import {
  ArrowDown,
  FileText,
  Github,
  Linkedin,
  Sparkles,
  Bot,
  Workflow,
  CheckCircle2,
  Terminal,
  Play,
  RotateCcw,
  ShieldCheck,
  Award,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';
import { PERSONAL_INFO, INTERNSHIP_LETTER } from '../data/portfolioData';

interface HeroProps {
  onOpenCv: () => void;
  onOpenInternshipLetter: () => void;
}

export function Hero({ onOpenCv, onOpenInternshipLetter }: HeroProps) {
  const [rightView, setRightView] = useState<'profile' | 'orchestrator'>('profile');
  const [activeTab, setActiveTab] = useState<'agent' | 'workflow' | 'rag'>('agent');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([
    '[INIT] Agent runtime initialized: NexSkill Agentic Engine v2.4',
    '[TRIGGER] Customer inquiry detected from WhatsApp channel',
    '[ANALYSIS] Intent classified: "Product Inquiry & Bulk Pricing"',
    '[EXEC] RAG retrieval queried vector store: 4 chunks matched (score 0.94)',
    '[GEN] Draft reply synthesized with context & polite Urdu/English tone',
    '[STATUS] Ready: Human-in-the-loop review or autonomous dispatch',
  ]);

  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationLog([
      '[INIT] Listening to event stream: Webhook listener on /api/v1/inbound...',
    ]);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        '[AGENT] Task recognized: "Follow-up reminder overdue for 14 clients"',
      ]);
    }, 400);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        '[WORKFLOW] Triggering n8n automation node: Filter buyers by previous engagement',
      ]);
    }, 900);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        '[GENAI] Generating personalized re-engagement proposals via tailored prompt',
      ]);
    }, 1400);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        '[SUCCESS] 14 customized follow-ups prepared with zero manual typing',
      ]);
      setIsSimulating(false);
    }, 1900);
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center overflow-hidden"
    >
      {/* Subtle background ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Subtle radial ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Core Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status / Role Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-medium text-neutral-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-emerald-400 uppercase tracking-wider text-[11px] font-semibold">
                Available for Projects
              </span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-300">{PERSONAL_INFO.location}</span>
              <span className="text-neutral-600 hidden sm:inline">|</span>
              <span className="text-neutral-400 font-mono text-[11px] hidden sm:inline">{PERSONAL_INFO.phoneFormatted}</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-3">
              <h1
                id="hero-name-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
              >
                {PERSONAL_INFO.name}
              </h1>

              <div className="space-y-1.5">
                <h2
                  id="hero-specialist-title"
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-400"
                >
                  {PERSONAL_INFO.title}
                </h2>
                <div className="flex flex-wrap items-center gap-3">
                  <p
                    id="hero-subdiscipline-badge"
                    className="text-sm sm:text-base font-semibold text-neutral-300 font-mono tracking-wide"
                  >
                    {PERSONAL_INFO.badge}
                  </p>
                  <span className="font-serif italic text-neutral-400 text-sm">
                    — "{PERSONAL_INFO.tagline}"
                  </span>
                </div>
              </div>
            </div>

            {/* Structured Paragraphs (Exact Copy from CV) */}
            <div className="space-y-3 max-w-2xl text-neutral-300 text-base sm:text-lg leading-relaxed">
              <p id="hero-statement-1" className="font-medium text-neutral-200">
                {PERSONAL_INFO.summary}
              </p>
              <p id="hero-statement-2" className="text-neutral-400 text-sm sm:text-base leading-normal">
                {PERSONAL_INFO.subSummary}
              </p>
            </div>

            {/* Requested Action Buttons */}
            <div id="hero-action-buttons-group" className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* Button 1: View Projects */}
              <a
                id="hero-btn-view-projects"
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl text-neutral-950 bg-emerald-400 hover:bg-emerald-300 transition-all duration-200 shadow-sm shadow-emerald-500/20 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              >
                <span>View Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              {/* Button 2: Download CV */}
              <button
                id="hero-btn-download-cv"
                type="button"
                onClick={onOpenCv}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold rounded-xl text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-700/60 transition-all duration-200 shadow-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>View / Download CV</span>
              </button>

              {/* Button 3: Internship Letter */}
              <button
                id="hero-btn-internship-letter"
                type="button"
                onClick={onOpenInternshipLetter}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold rounded-xl text-blue-300 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-700/60 transition-all duration-200 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Internship Letter</span>
              </button>

              {/* Button 4: GitHub */}
              <a
                id="hero-btn-github"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
              >
                <Github className="w-4 h-4 text-neutral-300" />
                <span>GitHub</span>
              </a>

              {/* Button 5: LinkedIn */}
              <a
                id="hero-btn-linkedin"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-xl text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Quick Specialization Tags */}
            <div className="pt-4 border-t border-neutral-800/80 flex flex-wrap gap-2 text-xs text-neutral-400 font-mono">
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">
                Agentic Workflows
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">
                n8n & Zapier
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">
                RAG Knowledge Systems
              </span>
              <span className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800">
                Bubble & Framer No-Code
              </span>
            </div>
          </div>

          {/* Right Column: Profile Picture Card & Interactive Console */}
          <div className="lg:col-span-5 space-y-4">
            {/* View Switcher Bar */}
            <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm text-xs font-mono">
              <span className="text-neutral-400 text-[11px] font-medium">SHOWCASE VIEW:</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  id="hero-tab-profile"
                  onClick={() => setRightView('profile')}
                  className={`px-3 py-1 rounded-lg transition-colors text-xs font-medium ${
                    rightView === 'profile'
                      ? 'bg-emerald-400 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Profile Photo & Badge
                </button>
                <button
                  type="button"
                  id="hero-tab-orchestrator"
                  onClick={() => setRightView('orchestrator')}
                  className={`px-3 py-1 rounded-lg transition-colors text-xs font-medium ${
                    rightView === 'orchestrator'
                      ? 'bg-emerald-400 text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Agent Orchestrator
                </button>
              </div>
            </div>

            {/* TAB 1: Profile Photo Showcase Card */}
            {rightView === 'profile' ? (
              <div
                id="hero-profile-card"
                className="p-6 sm:p-7 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-2xl backdrop-blur-sm relative overflow-hidden group space-y-6"
              >
                {/* Ambient glow in corner */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

                {/* Profile Photo Display with Teal Ring */}
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative shrink-0">
                    <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-teal-400 via-emerald-500 to-cyan-400 shadow-xl shadow-teal-500/20">
                      <img
                        src={PERSONAL_INFO.profileImage}
                        alt="Aneesha Akhtar - AI Automation Specialist"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full bg-neutral-950"
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-neutral-950 border-2 border-neutral-900 shadow-md">
                      <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse" title="Available for projects" />
                    </div>
                  </div>

                  <div className="text-center sm:text-left space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-950/60 border border-teal-800/60 text-teal-300 text-[11px] font-mono font-medium">
                      <Sparkles className="w-3 h-3 text-teal-400" />
                      <span>OFFICIAL PROFILE</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs font-mono text-emerald-400 font-semibold">
                      {PERSONAL_INFO.title}
                    </p>
                    <p className="text-xs text-neutral-300 font-medium">
                      "Building Smarter Solutions with AI"
                    </p>
                  </div>
                </div>

                {/* The 4 Core Pillars from her photo graphic */}
                <div className="grid grid-cols-4 gap-2 pt-2 border-t border-neutral-800/80">
                  <div className="p-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-teal-400 block tracking-wider">AI</span>
                    <span className="text-[9px] text-neutral-400 block">Agents & LLMs</span>
                  </div>
                  <div className="p-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block tracking-wider">AUTOMATION</span>
                    <span className="text-[9px] text-neutral-400 block">n8n / Zapier</span>
                  </div>
                  <div className="p-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 block tracking-wider">INNOVATION</span>
                    <span className="text-[9px] text-neutral-400 block">RAG Systems</span>
                  </div>
                  <div className="p-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-blue-400 block tracking-wider">IMPACT</span>
                    <span className="text-[9px] text-neutral-400 block">Real Results</span>
                  </div>
                </div>

                {/* CodeAlpha Selection Badge */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-950/50 to-neutral-950 border border-blue-800/40 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-blue-300 shrink-0 font-bold text-sm">
                      CA
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">CodeAlpha Virtual AI Internship</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-950 border border-emerald-800 text-[9px] text-emerald-400 font-mono">
                          VERIFIED
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-400 block">
                        Student ID: {INTERNSHIP_LETTER.studentId} • Sep 2026
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenInternshipLetter}
                    className="px-2.5 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-[11px] font-mono font-semibold transition-colors shrink-0 flex items-center gap-1"
                  >
                    <span>View Letter</span>
                  </button>
                </div>
              </div>
            ) : (
              /* TAB 2: Interactive Agent Console */
              <div
                id="hero-agent-console"
                className="bg-neutral-900/90 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden backdrop-blur-sm"
              >
                {/* Console Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-neutral-950/80 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-xs text-neutral-400 font-medium">
                      agent-orchestrator.ts
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-medium">
                      STATUS: ACTIVE
                    </span>
                  </div>
                </div>

                {/* Console Tabs */}
                <div className="flex items-center border-b border-neutral-800/80 px-2 bg-neutral-950/40 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setActiveTab('agent')}
                    className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors ${
                      activeTab === 'agent'
                        ? 'border-emerald-400 text-emerald-300'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Agent Stream</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('workflow')}
                    className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors ${
                      activeTab === 'workflow'
                        ? 'border-emerald-400 text-emerald-300'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Workflow className="w-3.5 h-3.5" />
                    <span>Pipeline Nodes</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('rag')}
                    className={`flex items-center gap-1.5 px-3 py-2 border-b-2 font-medium transition-colors ${
                      activeTab === 'rag'
                        ? 'border-emerald-400 text-emerald-300'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Knowledge RAG</span>
                  </button>
                </div>

                {/* Console Body */}
                <div className="p-4 sm:p-5 font-mono text-xs space-y-3 min-h-[260px] flex flex-col justify-between">
                  {activeTab === 'agent' && (
                    <div className="space-y-2">
                      <div className="text-neutral-400 text-[11px] pb-1 border-b border-neutral-800/60 flex items-center justify-between">
                        <span>LIVE AUTOMATION EVENT STREAM</span>
                        <button
                          type="button"
                          onClick={runSimulation}
                          disabled={isSimulating}
                          className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
                        >
                          {isSimulating ? (
                            <RotateCcw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Play className="w-3 h-3" />
                          )}
                          <span>{isSimulating ? 'Executing...' : 'Run Simulation'}</span>
                        </button>
                      </div>
                      <div className="space-y-1.5">
                        {simulationLog.map((log, idx) => (
                          <div
                            key={idx}
                            className={`text-[11px] leading-relaxed transition-opacity ${
                              log.includes('[SUCCESS]')
                                ? 'text-emerald-300 font-semibold'
                                : log.includes('[GEN]')
                                ? 'text-neutral-200'
                                : 'text-neutral-400'
                            }`}
                          >
                            <span className="text-neutral-600 select-none mr-2 font-mono">
                              0{idx + 1}
                            </span>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'workflow' && (
                    <div className="space-y-2.5">
                      <div className="text-neutral-400 text-[11px] pb-1 border-b border-neutral-800/60">
                        Sahaara AI & Enterprise Automation Graph
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 rounded bg-neutral-950/60 border border-neutral-800">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-neutral-200 text-[11px]">
                              Trigger: Inbound Webhook
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-400">n8n / WhatsApp</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-neutral-950/60 border border-neutral-800">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-neutral-200 text-[11px]">
                              Decision Node: Intent Router
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-400">LLM Classifier</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-neutral-950/60 border border-neutral-800">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-neutral-200 text-[11px]">
                              Action: Suggested Reply & CRM Sync
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-400">Database Update</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'rag' && (
                    <div className="space-y-2">
                      <div className="text-neutral-400 text-[11px] pb-1 border-b border-neutral-800/60">
                        Vector Embeddings & Context Retrieval
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-normal">
                        Query: <span className="text-emerald-300">"What are your delivery terms for Lahore orders?"</span>
                      </p>
                      <div className="p-2.5 rounded bg-neutral-950/60 border border-neutral-800 text-[11px] text-neutral-300 space-y-1">
                        <div className="text-neutral-400 text-[10px]">RETRIEVED CONTEXT (Cosine: 0.94):</div>
                        <p className="text-neutral-300 text-[11px]">
                          Same-day dispatch for Lahore orders confirmed before 3 PM. Standard delivery time 24-48 hours with cash on delivery available.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Console Footer */}
                  <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-emerald-400" />
                      <span>Orchestrator: Autonomous</span>
                    </div>
                    <span className="text-neutral-400">Latency: 142ms</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
