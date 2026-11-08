'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { GithubIcon, LinkedinIcon } from '@/components/icons/SocialIcons';
import {
  Mail,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

interface TemplateProps {
  portfolio: PortfolioData;
}

export default function MinimalTemplate({ portfolio }: TemplateProps) {
  const { personal, contact, skills, projects, experiences, education } = portfolio;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-neutral-200 overflow-x-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-24 space-y-10 sm:space-y-16">
        {/* Header / Intro */}
        <header className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-neutral-950 break-words">
                {personal.fullName}
              </h1>
              <p className="text-sm sm:text-base text-neutral-600 mt-1 font-medium">{personal.profession}</p>
            </div>

            {personal.openToWork && (
              <span className="self-start sm:self-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                Available for Roles
              </span>
            )}
          </div>

          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed pt-1 sm:pt-2">
            {personal.bio || personal.headline}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs sm:text-sm text-neutral-600 border-t border-neutral-100">
            {personal.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{personal.location}</span>
              </div>
            )}
            <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors break-all">
              <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{contact.email}</span>
            </a>
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors">
                <GithubIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>GitHub</span>
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-neutral-950 transition-colors">
                <LinkedinIcon className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>LinkedIn</span>
              </a>
            )}
          </div>
        </header>

        {/* Experience */}
        {experiences && experiences.length > 0 && (
          <section className="space-y-4 sm:space-y-6">
            <h2 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
              Experience
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5 sm:space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-1">
                    <h3 className="text-xs sm:text-sm font-semibold text-neutral-950">
                      {exp.role} <span className="text-neutral-400 font-normal">at</span> {exp.company}
                    </h3>
                    <span className="text-[11px] sm:text-xs font-mono text-neutral-400">{exp.period}</span>
                  </div>

                  <ul className="space-y-1 pt-1">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs sm:text-sm text-neutral-600 pl-3.5 relative before:content-['–'] before:absolute before:left-0 before:text-neutral-400">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Selected Projects */}
        <section className="space-y-4 sm:space-y-6">
          <h2 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
            Selected Projects
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {projects.map((proj) => (
              <div key={proj.id} className="group p-3 sm:p-4 rounded-xl -mx-3 sm:-mx-4 hover:bg-neutral-50 transition-colors space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs sm:text-sm font-semibold text-neutral-950 group-hover:text-blue-600 transition-colors">
                      {proj.title}
                    </h3>
                    {proj.tagline && (
                      <span className="text-xs text-neutral-400 hidden sm:inline">— {proj.tagline}</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {proj.githubUrl && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900">
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {proj.liveUrl && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900">
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">{proj.description}</p>

                {proj.metrics && (
                  <div className="text-[11px] sm:text-xs text-neutral-500 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-neutral-400 shrink-0" />
                    <span>{proj.metrics}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 pt-1">
                  {proj.technologies.map((t, i) => (
                    <span key={i} className="text-[10px] sm:text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="space-y-3 sm:space-y-4">
          <h2 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
            Skills & Competencies
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
            {skills.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <span className="font-semibold text-neutral-800">{s.category}: </span>
                <span className="text-neutral-600">{s.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {education && education.length > 0 && (
          <section className="space-y-3 sm:space-y-4">
            <h2 className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 border-b border-neutral-100 pb-2">
              Education
            </h2>
            <div className="space-y-2 sm:space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-baseline text-xs">
                  <div>
                    <span className="font-semibold text-neutral-900">{edu.degree}</span>
                    <span className="text-neutral-500"> • {edu.institution}</span>
                  </div>
                  <span className="font-mono text-neutral-400">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="border-t border-neutral-100 pt-6 sm:pt-8 text-center text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} {personal.fullName}</p>
        </footer>
      </div>
    </div>
  );
}
