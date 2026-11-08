'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import { trackEvent } from '@/components/analytics/AnalyticsTracker';
import {
  Terminal,
  ExternalLink,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ArrowUpRight,
  Download,
} from 'lucide-react';

interface TemplateProps {
  portfolio: PortfolioData;
}

export default function DeveloperTemplate({ portfolio }: TemplateProps) {
  const { personal, contact, skills, projects, experiences, education } = portfolio;

  const handleDownloadResume = () => {
    trackEvent(portfolio.username, 'resume_download');
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-x-hidden">
      {/* Glow background accent */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-900/15 via-indigo-900/10 to-transparent pointer-events-none blur-3xl" />

      {/* Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0d1117]/90 border-b border-[#30363d] print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-white truncate max-w-[120px] sm:max-w-none">
              ~/{portfolio.username}
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm text-[#8b949e]">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] hover:text-white border border-[#30363d] transition-colors"
              title="Print or Save as PDF"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">PDF</span>
            </button>

            <a
              href={`mailto:${contact.email}`}
              onClick={() => trackEvent(portfolio.username, 'contact_inquiry')}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm whitespace-nowrap"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 sm:space-y-24">
        {/* Hero Section */}
        <section id="about" className="pt-2 sm:pt-8 space-y-4 sm:space-y-6">
          <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-6">
            <div className="space-y-4 sm:space-y-6 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono bg-[#161b22] border border-[#30363d] text-blue-400 max-w-full">
                <Code2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{personal.profession}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight break-words">
                Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">{personal.fullName}</span>
              </h1>
            </div>

            {personal.avatarUrl && (
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-xl shadow-blue-500/20 shrink-0 bg-[#161b22]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={personal.avatarUrl}
                  alt={personal.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <p className="text-base sm:text-xl md:text-2xl text-[#8b949e] font-light max-w-3xl leading-relaxed">
            {personal.headline}
          </p>

          <p className="text-sm sm:text-base text-[#8b949e] max-w-2xl leading-relaxed">
            {personal.bio}
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            {personal.location && (
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#8b949e]">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            <div className="h-4 w-px bg-[#30363d] hidden sm:block" />
            <div className="flex items-center gap-2 sm:gap-3">
              {contact.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] text-[#8b949e] hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {contact.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] text-[#8b949e] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
              {contact.twitter && (
                <a
                  href={contact.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#8b949e] text-[#8b949e] hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Skills Matrix */}
        <section id="skills" className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-blue-400">
            <Cpu className="w-4 h-4" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Skills & Architecture</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {skills.map((skillGroup, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-blue-500/40 transition-colors"
              >
                <h3 className="font-mono text-xs sm:text-sm font-semibold text-white mb-2.5">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {skillGroup.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[11px] font-mono bg-[#0d1117] text-[#8b949e] border border-[#30363d] hover:text-white hover:border-blue-500/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Showcase */}
        <section id="projects" className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-blue-400 mb-1">
                <Layers className="w-4 h-4" />
                <span>Featured Engineering Work</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Built & Shipped Systems</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="group relative flex flex-col justify-between p-4 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        <span>{proj.title}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline" />
                      </h3>
                      {proj.tagline && (
                        <p className="text-[11px] font-mono text-blue-400/90">{proj.tagline}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => trackEvent(portfolio.username, 'project_click', proj.title)}
                          className="p-1.5 rounded-md hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-colors"
                          aria-label="Repository"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => trackEvent(portfolio.username, 'project_click', proj.title)}
                          className="p-1.5 rounded-md hover:bg-[#30363d] text-[#8b949e] hover:text-white transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                    {proj.description}
                  </p>

                  {proj.metrics && (
                    <div className="flex items-start gap-2 p-2.5 sm:p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span className="leading-tight">{proj.metrics}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-4 sm:pt-6 mt-4 border-t border-[#30363d]">
                  {proj.technologies.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-mono bg-[#0d1117] text-[#8b949e] border border-[#30363d]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-4 sm:space-y-6">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-blue-400">
            <Briefcase className="w-4 h-4" />
            <span>Career Path</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Work Experience</h2>

          <div className="relative border-l border-[#30363d] ml-2 sm:ml-3 pl-4 sm:pl-6 space-y-8 sm:space-y-10">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative group">
                <div className="absolute -left-[21px] sm:-left-[31px] top-1.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#161b22] border-2 border-blue-400 group-hover:bg-blue-400 transition-colors" />

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      {exp.role} <span className="text-blue-400 font-normal">@ {exp.company}</span>
                    </h3>
                    <span className="text-[11px] sm:text-xs font-mono text-[#8b949e]">{exp.period}</span>
                  </div>

                  {exp.location && (
                    <p className="text-[11px] sm:text-xs text-[#8b949e]">{exp.location}</p>
                  )}

                  <ul className="space-y-1.5 sm:space-y-2 pt-1.5">
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} className="text-xs sm:text-sm text-[#8b949e] flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {education && education.length > 0 && (
          <section className="space-y-4 sm:space-y-6">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-blue-400">
              <GraduationCap className="w-4 h-4" />
              <span>Background</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Education</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="p-4 sm:p-5 rounded-xl bg-[#161b22] border border-[#30363d]"
                >
                  <h3 className="text-xs sm:text-sm font-bold text-white">{edu.degree}</h3>
                  <p className="text-xs text-blue-400 mt-1">{edu.institution}</p>
                  <p className="text-[11px] font-mono text-[#8b949e] mt-1.5">{edu.year}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact CTA */}
        <section id="contact" className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#30363d] text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Let&apos;s Build Something Incredible
          </h2>

          <p className="text-[#8b949e] max-w-lg mx-auto text-xs sm:text-sm leading-relaxed">
            I am currently open to high-impact engineering roles and technical advisory engagements. Feel free to reach out directly.
          </p>

          <div className="pt-2">
            <a
              href={`mailto:${contact.email}`}
              onClick={() => trackEvent(portfolio.username, 'contact_inquiry')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-500/20 w-full sm:w-auto break-all"
            >
              <span>{contact.email}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </section>
      </main>

      {/* Floating SaaS badge for viral conversion */}
      <div className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-40 print:hidden">
        <a
          href="/"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b22]/90 hover:bg-[#21262d] border border-[#30363d] text-[10px] sm:text-[11px] text-[#8b949e] hover:text-white transition-all shadow-xl backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>Made with PortfolioOS</span>
        </a>
      </div>

      <footer className="border-t border-[#30363d] py-6 sm:py-8 text-center text-[11px] sm:text-xs font-mono text-[#8b949e]">
        <p>© {new Date().getFullYear()} {personal.fullName} • All Rights Reserved</p>
      </footer>
    </div>
  );
}
