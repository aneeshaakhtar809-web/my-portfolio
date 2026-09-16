import { useRef, useState } from 'react';
import {
  X,
  Printer,
  Download,
  Copy,
  Check,
  FileText,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Award,
  Globe,
  Briefcase,
  GraduationCap,
  Layers,
} from 'lucide-react';
import {
  PERSONAL_INFO,
  ABOUT_ME,
  EXPERIENCES,
  EDUCATION_LIST,
  SKILL_CATEGORIES,
  PROJECTS,
  CERTIFICATIONS,
} from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInternshipLetter?: () => void;
}

export function CvModal({ isOpen, onClose, onOpenInternshipLetter }: CvModalProps) {
  const [copied, setCopied] = useState(false);
  const [viewStyle, setViewStyle] = useState<'document' | 'modern'>('document');
  const cvRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const markdown = `# ${PERSONAL_INFO.name}
## ${PERSONAL_INFO.title}
### ${PERSONAL_INFO.badge}
"${PERSONAL_INFO.tagline}"

Email: ${PERSONAL_INFO.email}
Phone: ${PERSONAL_INFO.phone} (${PERSONAL_INFO.phoneFormatted})
Location: ${PERSONAL_INFO.location}
GitHub: ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}

---

### About Me
${PERSONAL_INFO.summary}
${PERSONAL_INFO.subSummary}

---

### Skills
- Generative AI & Core AI: Generative AI (OpenAI, Claude), Prompt Engineering, RAG, Vector Databases (Pinecone, FAISS), AI Agents
- Automation & No-Code: n8n (Workflow Automation), Zapier, Make (Integromat), Bubble (No-Code Development), Framer (No-Code Websites)
- Development & Tools: Git & GitHub, APIs & Integrations, Google AI Studio, Web Scraping & Data Processing, JavaScript & HTML/CSS
- Soft Skills: ${PERSONAL_INFO.softSkills.join(', ')}
- Languages: English (Professional), Urdu (Native), Punjabi (Conversational)

---

### Experience
- Freelance AI Automation Specialist (2026 – Present) | Remote | Global Clients
  * Build AI agents, chatbots, and automation workflows for businesses.
  * Developed AI-powered websites and tools using no-code platforms.
  * Help clients integrate AI solutions into their existing workflows.
  * Deliver customized solutions to improve productivity and user experience.

- Artificial Intelligence Intern — CodeAlpha (Virtual Internship | Sep 2026 - Sep 2026)
  * Selected for a Virtual Artificial Intelligence Internship (Student ID: CA/DF1/266519)
  * Worked on practical AI assignments and real-world projects.
  * Gained hands-on experience in AI tools and problem solving.
  * Completed the internship with a strong focus on learning and implementation.

---

### Education
- Graduation (2023) — University of Punjab, Lahore
- Intermediate in Computer Science (2021) — Government Degree College for Women, Shahdara Lahore
- Professional Training: Agentic AI Program — NexSkill (2026)

---

### Certifications
- AI Internship — CodeAlpha (2026)
- Generative AI for Everyone — DeepLearning.AI (Coursera)
- Prompt Engineering — OpenAI
- n8n & Automation — Self Learning
"${PERSONAL_INFO.quote}"

---

### Featured Projects
- Sahaara AI: AI Customer Growth Assistant for Online Sellers
- AI Knowledge Assistant Agent: Intelligent Information Retrieval System (RAG)
- AI Translation Assistant: Multilingual AI Communication Tool
- Ayla Rituals: Premium Skincare Website Experience
- Bazaar Express Pakistan: Digital Commerce Platform Concept
- Neon Breaker Game: Interactive Gaming Experience
`;

    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="cv-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-4 sm:my-8 max-h-[94vh] flex flex-col">
        {/* Modal Header & Controls */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 bg-neutral-950 border-b border-neutral-800 shrink-0 gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white font-mono block">
                Official CV — {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400">
                {PERSONAL_INFO.badge}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:inline-flex items-center rounded-lg bg-neutral-900 border border-neutral-800 p-0.5 text-[11px] font-mono">
              <button
                type="button"
                onClick={() => setViewStyle('document')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  viewStyle === 'document'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Official 2-Column
              </button>
              <button
                type="button"
                onClick={() => setViewStyle('modern')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  viewStyle === 'modern'
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Dark Theme
              </button>
            </div>

            {onOpenInternshipLetter && (
              <button
                type="button"
                id="cv-view-offer-letter-btn"
                onClick={() => {
                  onClose();
                  onOpenInternshipLetter();
                }}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-950/70 hover:bg-blue-900/90 border border-blue-800/60 text-xs font-mono text-blue-300 transition-colors"
                title="View CodeAlpha Internship Offer Letter"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Internship Letter</span>
              </button>
            )}

            <button
              type="button"
              id="cv-copy-md-btn"
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              id="cv-print-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-neutral-950 text-xs font-bold font-mono transition-colors shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              id="cv-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* DOCUMENT VIEW (Faithful 2-column layout matching original CV) */}
        {/* ========================================================= */}
        {viewStyle === 'document' ? (
          <div
            ref={cvRef}
            id="cv-document-sheet"
            className="p-4 sm:p-8 md:p-10 overflow-y-auto bg-slate-50 text-slate-800 font-sans print:p-0 print:m-0 print:bg-white selection:bg-purple-100"
          >
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden print:shadow-none print:border-none">
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* ---------------- Left Sidebar Column ---------------- */}
                <div className="md:col-span-4 bg-slate-100/90 border-r border-slate-200 p-6 sm:p-7 space-y-6 print:bg-slate-100">
                  {/* Circular Profile Picture Frame */}
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-teal-500 via-emerald-400 to-indigo-500 shadow-md">
                      <img
                        src={PERSONAL_INFO.profileImage}
                        alt={PERSONAL_INFO.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-full bg-slate-200"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 leading-tight">
                        {PERSONAL_INFO.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 font-semibold block mt-0.5">
                        AI AUTOMATION SPECIALIST
                      </span>
                    </div>
                  </div>

                  {/* Contact Section */}
                  <div className="space-y-3 pt-2 border-t border-slate-200">
                    <h4 className="text-xs uppercase tracking-wider font-bold text-indigo-900 font-mono flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Contact</span>
                    </h4>
                    <div className="space-y-2 text-xs text-slate-700">
                      <div className="flex items-start gap-2">
                        <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span className="break-all select-all font-mono text-[11px]">{PERSONAL_INFO.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="font-mono text-[11px]">{PERSONAL_INFO.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span className="text-[11px]">{PERSONAL_INFO.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Linkedin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <a
                          href={PERSONAL_INFO.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-700 hover:underline truncate text-[11px]"
                        >
                          linkedin.com/in/aneesha-akhtar
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Github className="w-3.5 h-3.5 text-slate-800 shrink-0" />
                        <a
                          href={PERSONAL_INFO.github}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-800 hover:underline truncate text-[11px]"
                        >
                          github.com/aneeshaakhtar809-web
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="space-y-4 pt-3 border-t border-slate-200 text-xs">
                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-indigo-900 font-mono mb-2">
                        Core AI Skills
                      </h4>
                      <ul className="space-y-1 text-slate-700 list-disc list-inside text-[11px]">
                        <li>Generative AI (OpenAI, Claude)</li>
                        <li>Prompt Engineering</li>
                        <li>RAG (Retrieval Augmented Generation)</li>
                        <li>Vector Databases (Pinecone, FAISS)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-indigo-900 font-mono mb-2">
                        Automation & No-Code
                      </h4>
                      <ul className="space-y-1 text-slate-700 list-disc list-inside text-[11px]">
                        <li>n8n (Workflow Automation)</li>
                        <li>Zapier</li>
                        <li>Make (Integromat)</li>
                        <li>Bubble (No-Code Development)</li>
                        <li>Framer (No-Code Websites)</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-indigo-900 font-mono mb-2">
                        Development & Tools
                      </h4>
                      <ul className="space-y-1 text-slate-700 list-disc list-inside text-[11px]">
                        <li>Git & GitHub</li>
                        <li>APIs & Integrations</li>
                        <li>Google AI Studio</li>
                        <li>Web Scraping & Data Processing</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-indigo-900 font-mono mb-2">
                        Soft Skills
                      </h4>
                      <ul className="space-y-1 text-slate-700 list-disc list-inside text-[11px]">
                        {PERSONAL_INFO.softSkills.map((sk, i) => (
                          <li key={i}>{sk}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs uppercase tracking-wider font-bold text-indigo-900 font-mono mb-2">
                        Languages
                      </h4>
                      <ul className="space-y-1 text-slate-700 text-[11px]">
                        {PERSONAL_INFO.languages.map((lang, i) => (
                          <li key={i}>
                            <span className="font-semibold text-slate-900">{lang.name}</span>{' '}
                            <span className="text-slate-500 font-mono">({lang.proficiency})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ---------------- Right Main Column ---------------- */}
                <div className="md:col-span-8 p-6 sm:p-8 space-y-6">
                  {/* Header Banner */}
                  <div className="border-b border-slate-200 pb-5 space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
                        {PERSONAL_INFO.name}
                      </h1>
                      <span className="font-serif italic text-sm text-indigo-700 font-semibold select-none">
                        "{PERSONAL_INFO.tagline}"
                      </span>
                    </div>

                    <h2 className="text-base sm:text-lg font-bold text-teal-700">
                      {PERSONAL_INFO.title}
                    </h2>
                    <p className="text-xs font-mono font-medium text-slate-600">
                      {PERSONAL_INFO.badge}
                    </p>
                  </div>

                  {/* About Me */}
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-indigo-950 font-mono flex items-center gap-2 border-b border-slate-200 pb-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span>About Me</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {PERSONAL_INFO.summary}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {PERSONAL_INFO.subSummary}
                    </p>
                  </div>

                  {/* Experience */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-indigo-950 font-mono flex items-center gap-2 border-b border-slate-200 pb-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span>Experience</span>
                    </h3>
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-sm font-bold text-slate-900">
                            Freelance AI Automation Specialist
                          </h4>
                          <span className="text-xs font-mono text-indigo-600 font-semibold">
                            2023 – Present
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-500">
                          Remote | Global Clients
                        </p>
                        <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                          <li>Build AI agents, chatbots, and automation workflows for businesses.</li>
                          <li>Developed AI-powered websites and tools using no-code platforms.</li>
                          <li>Help clients integrate AI solutions into their existing workflows.</li>
                          <li>Deliver customized solutions to improve productivity and user experience.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Internship */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-indigo-950 font-mono flex items-center gap-2 border-b border-slate-200 pb-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span>Internship</span>
                    </h3>
                    <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200 space-y-1.5">
                      <div className="flex justify-between items-baseline">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-blue-950">
                            Artificial Intelligence Intern — CodeAlpha
                          </h4>
                          <span className="px-2 py-0.5 rounded bg-blue-200 text-blue-900 text-[10px] font-bold font-mono">
                            VERIFIED
                          </span>
                        </div>
                        <span className="text-xs font-mono text-blue-700 font-semibold">
                          Sep 2026 – Sep 2026
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-600">
                        CodeAlpha (Virtual Internship) • Student ID: CA/DF1/266519
                      </p>
                      <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside pt-1">
                        <li>Selected for a Virtual Artificial Intelligence Internship.</li>
                        <li>Worked on practical AI assignments and real-world projects.</li>
                        <li>Gained hands-on experience in AI tools and problem solving.</li>
                        <li>Completed the internship with a strong focus on learning and implementation.</li>
                      </ul>
                      {onOpenInternshipLetter && (
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => {
                              onClose();
                              onOpenInternshipLetter();
                            }}
                            className="inline-flex items-center gap-1.5 text-xs text-blue-700 font-bold hover:underline"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Click to view official CodeAlpha offer letter document</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Selected Projects */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-indigo-950 font-mono flex items-center gap-2 border-b border-slate-200 pb-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span>Projects</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-2.5 text-xs">
                      {PROJECTS.map((proj) => (
                        <div key={proj.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50">
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="font-bold text-slate-900">
                              {proj.title}
                            </h4>
                            <span className="text-[10px] font-mono text-teal-700 font-semibold">
                              {proj.technologies.slice(0, 3).join(' • ')}
                            </span>
                          </div>
                          <p className="text-slate-600 text-[11px] mt-0.5">
                            {proj.overview}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-indigo-950 font-mono flex items-center gap-2 border-b border-slate-200 pb-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-600" />
                      <span>Education</span>
                    </h3>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <h4 className="font-bold text-slate-900">Graduation</h4>
                          <p className="text-slate-600">University of Punjab, Lahore</p>
                        </div>
                        <span className="font-mono text-slate-500 font-semibold">2023</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-1 border-t border-slate-100">
                        <div>
                          <h4 className="font-bold text-slate-900">Intermediate in Computer Science</h4>
                          <p className="text-slate-600">Government Degree College for Women, Shahdara Lahore</p>
                        </div>
                        <span className="font-mono text-slate-500 font-semibold">2021</span>
                      </div>
                    </div>
                  </div>

                  {/* Certifications & Inspiring Motto */}
                  <div className="space-y-2 pt-1 border-t border-slate-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div className="text-xs space-y-1">
                        <span className="font-bold text-indigo-950 font-mono block">
                          Certifications:
                        </span>
                        <p className="text-[11px] text-slate-600">
                          AI Internship (CodeAlpha) • Generative AI for Everyone (DeepLearning.AI) • Prompt Engineering (OpenAI) • n8n & Automation
                        </p>
                      </div>
                      <div className="p-2 rounded bg-indigo-50 border border-indigo-200 text-right shrink-0">
                        <span className="font-serif italic text-xs text-indigo-900 font-semibold block">
                          "{PERSONAL_INFO.quote}"
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================= */
          /* MODERN DARK VIEW */
          /* ========================================================= */
          <div
            ref={cvRef}
            id="cv-modern-sheet"
            className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-neutral-950 text-neutral-200 font-sans print:p-0 print:bg-white print:text-black"
          >
            {/* Document Header */}
            <div className="border-b border-neutral-800 pb-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-20 rounded-full object-cover border-2 border-emerald-400 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <h1 className="text-3xl font-extrabold text-white tracking-tight">
                      {PERSONAL_INFO.name}
                    </h1>
                    <span className="font-serif italic text-xs text-emerald-400">
                      "{PERSONAL_INFO.tagline}"
                    </span>
                  </div>
                  <h2 className="text-sm font-semibold text-emerald-400 font-mono">
                    {PERSONAL_INFO.title}
                  </h2>
                  <p className="text-xs font-mono text-neutral-400">
                    {PERSONAL_INFO.badge}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-400 pt-1">
                <span>Email: {PERSONAL_INFO.email}</span>
                <span>•</span>
                <span>Phone: {PERSONAL_INFO.phone}</span>
                <span>•</span>
                <span>Location: {PERSONAL_INFO.location}</span>
                <span>•</span>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-emerald-400 underline">
                  GitHub
                </a>
                <span>•</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-blue-400 underline">
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold border-b border-neutral-800 pb-1">
                About Me
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {PERSONAL_INFO.summary}
              </p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {PERSONAL_INFO.subSummary}
              </p>
            </div>

            {/* Skills Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold border-b border-neutral-800 pb-1">
                Core Competencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {SKILL_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="p-3 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                    <span className="font-bold text-white block mb-1">
                      {cat.title}
                    </span>
                    <p className="text-neutral-400 leading-relaxed font-mono text-[11px]">
                      {cat.skills.join(' • ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience & Internship */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold border-b border-neutral-800 pb-1">
                Work Experience & Internship
              </h3>
              <div className="space-y-4">
                {EXPERIENCES.map((exp) => (
                  <div key={exp.id} className="space-y-1.5 p-3 rounded-lg bg-neutral-900/40 border border-neutral-800">
                    <div className="flex justify-between items-baseline">
                      <h4 className="text-sm font-bold text-white">
                        {exp.role} {exp.company && <span className="font-normal text-neutral-400">— {exp.company}</span>}
                      </h4>
                      <span className="text-xs font-mono text-emerald-400">{exp.period}</span>
                    </div>
                    {exp.description && (
                      <p className="text-xs text-neutral-300">{exp.description}</p>
                    )}
                    {exp.responsibilities && (
                      <ul className="text-xs text-neutral-400 list-disc list-inside space-y-0.5 pt-1">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold border-b border-neutral-800 pb-1">
                Education
              </h3>
              <div className="space-y-3">
                {EDUCATION_LIST.map((edu) => (
                  <div key={edu.id} className="text-xs space-y-0.5">
                    <div className="flex justify-between font-bold text-white">
                      <span>{edu.degree}</span>
                      <span className="font-mono text-neutral-400">{edu.institution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
