import { useState, useEffect } from 'react';
import { Menu, X, FileText, Github, Linkedin, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCv: () => void;
  onOpenInternshipLetter?: () => void;
}

export function Navbar({ onOpenCv, onOpenInternshipLetter }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'AI Lab', href: '#ailab' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/85 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-lg shadow-black/20'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Personal Brand */}
          <a
            href="#"
            id="nav-brand-link"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border border-teal-500/70 shadow-sm shrink-0">
              <img
                src={PERSONAL_INFO.profileImage}
                alt="Aneesha Akhtar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-base tracking-tight text-neutral-100 group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[10px] font-medium text-neutral-400 block tracking-wider uppercase font-mono">
                AI Automation Specialist
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1 bg-neutral-900/60 border border-neutral-800/80 rounded-full px-4 py-1.5 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                href={link.href}
                className="px-3.5 py-1 text-xs font-medium text-neutral-300 hover:text-emerald-400 hover:bg-neutral-800/60 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Quick Actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            {onOpenInternshipLetter && (
              <button
                type="button"
                id="nav-internship-letter-btn"
                onClick={onOpenInternshipLetter}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-300 bg-blue-950/40 hover:bg-blue-900/60 border border-blue-800/60 rounded-lg transition-all"
                title="View CodeAlpha Internship Offer Letter"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Internship Letter</span>
              </button>
            )}

            <button
              id="nav-download-cv-btn"
              type="button"
              onClick={onOpenCv}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-700/60 rounded-lg transition-all duration-200 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>CV</span>
            </button>

            <a
              id="nav-github-link"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 rounded-lg border border-neutral-800/80 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="nav-linkedin-link"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900 rounded-lg border border-neutral-800/80 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="nav-mobile-cv-btn"
              type="button"
              onClick={onOpenCv}
              className="p-2 text-emerald-400 bg-neutral-900 border border-neutral-800 rounded-lg"
              title="View CV"
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              id="nav-mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-neutral-100 bg-neutral-900 border border-neutral-800 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="md:hidden mt-3 p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl space-y-3"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm text-neutral-300 hover:text-emerald-400 hover:bg-neutral-800/80 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCv();
                  }}
                  className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 border border-emerald-700/60 rounded-lg"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Curriculum Vitae</span>
                </button>
                {onOpenInternshipLetter && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenInternshipLetter();
                    }}
                    className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-semibold text-blue-300 bg-blue-950/60 border border-blue-800/60 rounded-lg"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Offer Letter</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
