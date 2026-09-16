import {
  Github,
  Linkedin,
  FileText,
  ArrowUpRight,
  ShieldCheck,
  Download,
  Sparkles,
  Award,
} from 'lucide-react';
import { PERSONAL_INFO, INTERNSHIP_LETTER } from '../data/portfolioData';

interface ConnectSectionProps {
  onOpenCv: () => void;
  onOpenInternshipLetter: () => void;
}

export function ConnectSection({ onOpenCv, onOpenInternshipLetter }: ConnectSectionProps) {
  return (
    <section id="connect" className="py-16 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DEVELOPER PRESENCE & VERIFIED CREDENTIALS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Connect & Verify Credentials
          </h2>
          <p className="text-sm text-neutral-400">
            Explore code repositories, professional profile, curriculum vitae, and official internship selection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* 1. GitHub Card */}
          <div
            id="github-profile-card"
            className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-white group-hover:border-emerald-500/50 transition-colors">
                <Github className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-mono tracking-wider text-emerald-400 font-semibold block">
                  GitHub Code
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight mt-1">
                  AI Repositories
                </h4>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                  View open-source agent code, n8n workflows, and prompts.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a
                id="github-profile-btn"
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-neutral-100 uppercase tracking-wider transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* 2. LinkedIn Card */}
          <div
            id="linkedin-profile-card"
            className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-blue-400 group-hover:border-blue-500/50 transition-colors">
                <Linkedin className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-mono tracking-wider text-blue-400 font-semibold block">
                  LinkedIn
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight mt-1">
                  Professional Network
                </h4>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                  Connect professionally and follow my AI development updates.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <a
                id="linkedin-profile-btn"
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold text-neutral-100 uppercase tracking-wider transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-4 h-4 text-blue-400" />
              </a>
            </div>
          </div>

          {/* 3 / CV Card */}
          <div
            id="resume-profile-card"
            className="p-6 rounded-2xl bg-neutral-900/70 border border-emerald-900/40 hover:border-emerald-700/60 transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/50 transition-colors">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-mono tracking-wider text-emerald-400 font-semibold block">
                  Curriculum Vitae
                </span>
                <h4 className="text-lg font-bold text-white tracking-tight mt-1">
                  Official CV Document
                </h4>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                  Complete professional history, 2-column resume with profile photo.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                id="card-download-cv-btn"
                onClick={onOpenCv}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shadow-emerald-500/20"
              >
                <Download className="w-4 h-4" />
                <span>View CV</span>
              </button>
            </div>
          </div>

          {/* 4. Internship Offer Letter Card */}
          <div
            id="internship-letter-card"
            className="p-6 rounded-2xl bg-neutral-900/70 border border-blue-900/40 hover:border-blue-700/60 transition-all duration-200 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-800/80 flex items-center justify-center text-blue-400 group-hover:border-blue-500/50 transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] uppercase font-mono tracking-wider text-blue-400 font-semibold">
                    CodeAlpha
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-950 border border-blue-800 text-blue-300 font-mono">
                    OFFICIAL
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white tracking-tight mt-1">
                  Internship Letter
                </h4>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                  Selection offer letter for Virtual AI Internship (ID: {INTERNSHIP_LETTER.studentId}).
                </p>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                id="card-view-internship-letter-btn"
                onClick={onOpenInternshipLetter}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm shadow-blue-500/20"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>View Letter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
