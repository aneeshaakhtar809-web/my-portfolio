import { ArrowUp, Sparkles, Github, Linkedin, Mail, FileText, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, INTERNSHIP_LETTER } from '../data/portfolioData';

interface FooterProps {
  onOpenCv?: () => void;
  onOpenInternshipLetter?: () => void;
}

export function Footer({ onOpenCv, onOpenInternshipLetter }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-neutral-950 border-t border-neutral-800/80 py-12 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-teal-500/70 shrink-0">
              <img
                src={PERSONAL_INFO.profileImage}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-white text-sm block">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[11px] font-mono text-neutral-400">
                AI Automation Specialist & Agent Developer • {PERSONAL_INFO.location}
              </span>
            </div>
          </div>

          {/* Quick Credential Links & Socials */}
          <div className="flex flex-wrap items-center gap-3">
            {onOpenCv && (
              <button
                type="button"
                onClick={onOpenCv}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-emerald-400 border border-neutral-800 text-xs font-mono transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>CV</span>
              </button>
            )}

            {onOpenInternshipLetter && (
              <button
                type="button"
                onClick={onOpenInternshipLetter}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-blue-400 border border-neutral-800 text-xs font-mono transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Internship Letter</span>
              </button>
            )}

            <a
              id="footer-github-link"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="footer-linkedin-link"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-blue-400 border border-neutral-800 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              id="footer-email-link"
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-emerald-400 border border-neutral-800 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            {/* Back to top */}
            <button
              type="button"
              id="footer-back-to-top"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800 transition-colors ml-2"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-400">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>Student ID: {INTERNSHIP_LETTER.studentId}</span>
            <span>•</span>
            <span>Phone: {PERSONAL_INFO.phoneFormatted}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
