'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import { LinkedinIcon, TwitterIcon } from '@/components/icons/SocialIcons';
import {
  ExternalLink,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
  Layers,
  Palette,
  Briefcase,
} from 'lucide-react';
import Image from 'next/image';

interface TemplateProps {
  portfolio: PortfolioData;
}

export default function DesignerTemplate({ portfolio }: TemplateProps) {
  const { personal, contact, skills, projects, experiences } = portfolio;

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1c1917] font-sans antialiased selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-[#faf9f6]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-18 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-lg sm:text-xl font-serif italic font-bold tracking-tight text-stone-900 truncate">
              {personal.fullName}
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-stone-600 border-l border-stone-300 pl-3">
              Portfolio
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600">
            <a href="#work" className="hover:text-stone-950 transition-colors">Work</a>
            <a href="#about" className="hover:text-stone-950 transition-colors">Philosophy</a>
            <a href="#contact" className="hover:text-stone-950 transition-colors">Contact</a>
          </nav>

          <a
            href={`mailto:${contact.email}`}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white transition-all shadow-sm whitespace-nowrap"
          >
            Start a Project
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 sm:space-y-28">
        {/* Editorial Hero */}
        <section id="about" className="space-y-4 sm:space-y-8 pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-pink-50 border border-pink-200 text-pink-700">
            <Palette className="w-3.5 h-3.5" />
            <span>{personal.profession}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-serif font-normal text-stone-950 tracking-tight leading-[1.15] break-words">
            {personal.headline}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-4 border-t border-stone-200">
            <div className="md:col-span-2 space-y-3 sm:space-y-4">
              <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-light">
                {personal.bio}
              </p>
              {personal.location && (
                <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-500">
                  <MapPin className="w-4 h-4 text-pink-600 shrink-0" />
                  <span>Based in {personal.location}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 sm:space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-stone-400">Connect</span>
              <div className="flex flex-col gap-1.5 sm:gap-2 text-xs sm:text-sm text-stone-600">
                {contact.linkedin && (
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                    <LinkedinIcon className="w-4 h-4" /> LinkedIn
                  </a>
                )}
                {contact.twitter && (
                  <a href={contact.twitter} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-pink-600 transition-colors">
                    <TwitterIcon className="w-4 h-4" /> X (Twitter)
                  </a>
                )}
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-pink-600 transition-colors break-all">
                  <Mail className="w-4 h-4 shrink-0" /> {contact.email}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section id="work" className="space-y-8 sm:space-y-12">
          <div className="flex items-end justify-between border-b border-stone-200 pb-3 sm:pb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-pink-600">Case Studies</span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-0.5">Featured Creations</h2>
            </div>
            <span className="text-xs sm:text-sm font-mono text-stone-500">01 — 0{projects.length}</span>
          </div>

          <div className="space-y-8 sm:space-y-16">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="group grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center rounded-2xl sm:rounded-3xl p-5 sm:p-8 bg-white border border-stone-200/80 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                {/* Visual Mockup */}
                <div className="lg:col-span-7 overflow-hidden rounded-xl sm:rounded-2xl bg-stone-100 aspect-video relative">
                  {proj.image ? (
                    <Image
                      src={proj.image}
                      alt={proj.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-100 to-pink-50 text-stone-400 p-6 text-center">
                      <Layers className="w-8 h-8 sm:w-12 sm:h-12 mb-2 text-pink-400" />
                      <span className="text-[10px] sm:text-xs uppercase font-mono tracking-widest">Interactive Product Showcase</span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="lg:col-span-5 space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-pink-600 uppercase">
                    <span>Project 0{idx + 1}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 group-hover:text-pink-600 transition-colors">
                    {proj.title}
                  </h3>

                  {proj.tagline && (
                    <p className="text-xs sm:text-sm font-medium text-stone-500">{proj.tagline}</p>
                  )}

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                    {proj.description}
                  </p>

                  {proj.metrics && (
                    <div className="p-2.5 sm:p-3 rounded-xl bg-pink-50 border border-pink-100 text-xs text-pink-900 flex items-start gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
                      <span>{proj.metrics}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                    {proj.technologies.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] bg-stone-100 text-stone-600 font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {proj.liveUrl && (
                    <div className="pt-2">
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 hover:text-pink-600 transition-colors"
                      >
                        <span>View Project Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="space-y-4 sm:space-y-6">
          <div className="border-b border-stone-200 pb-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-pink-600">Capabilities</span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">Disciplines & Tooling</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className="p-4 sm:p-6 rounded-2xl bg-white border border-stone-200/80">
                <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 mb-2 sm:mb-3">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {skillGroup.items.map((item, iIdx) => (
                    <span
                      key={iIdx}
                      className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs bg-stone-100 text-stone-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Banner */}
        <section id="contact" className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-stone-900 text-white text-center space-y-4 sm:space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-pink-400">Collaborate</span>
          <h2 className="text-2xl sm:text-4xl font-serif font-normal max-w-xl mx-auto">
            Have a bold project or vision in mind?
          </h2>
          <p className="text-stone-400 max-w-md mx-auto text-xs sm:text-sm font-light">
            I partner with forward-thinking teams, startups, and founders to create digital products that leave a lasting mark.
          </p>
          <div className="pt-2">
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold bg-pink-500 hover:bg-pink-400 text-white transition-all"
            >
              <span>{contact.email}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 py-6 sm:py-8 text-center text-[11px] sm:text-xs font-mono text-stone-400">
        <p>© {new Date().getFullYear()} {personal.fullName} • Crafted with AI Portfolio OS</p>
      </footer>
    </div>
  );
}
