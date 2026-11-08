'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import {
  CheckCircle2,
  Mail,
  MapPin,
  ArrowRight,
  Sparkles,
  Quote,
  Star,
  DollarSign,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';

interface TemplateProps {
  portfolio: PortfolioData;
}

export default function FreelancerTemplate({ portfolio }: TemplateProps) {
  const { personal, contact, services, testimonials, projects, experiences, skills } = portfolio;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Top Banner */}
      {personal.availableForHire && (
        <div className="bg-emerald-600 text-white text-[11px] sm:text-xs font-medium py-1.5 sm:py-2 px-3 sm:px-4 text-center flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white animate-pulse" />
          <span>Currently accepting new client projects</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="font-bold text-base sm:text-lg tracking-tight text-slate-900 truncate">
            {personal.fullName} <span className="text-emerald-600">.</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-medium text-slate-600">
            <a href="#services" className="hover:text-emerald-600 transition-colors">Services</a>
            <a href="#results" className="hover:text-emerald-600 transition-colors">Client Results</a>
            <a href="#testimonials" className="hover:text-emerald-600 transition-colors">Reviews</a>
          </nav>

          <a
            href={`mailto:${contact.email}?subject=Project%20Inquiry`}
            className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-sm shadow-emerald-500/20 whitespace-nowrap"
          >
            Hire Me
          </a>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 space-y-16 sm:space-y-28">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6 pt-2 sm:pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Guaranteed Deliverables</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
            {personal.headline}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
            {personal.bio}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 sm:pt-4 w-full">
            <a
              href={`mailto:${contact.email}?subject=Project%20Inquiry`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-lg shadow-emerald-600/25"
            >
              <span>Work With Me</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#results"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 sm:px-7 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 transition-all"
            >
              View Results
            </a>
          </div>

          {personal.location && (
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>{personal.location}</span>
            </div>
          )}
        </section>

        {/* Services & Packages */}
        {services && services.length > 0 && (
          <section id="services" className="space-y-6 sm:space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-1 sm:space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 font-semibold">Services</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How I Can Help You</h2>
              <p className="text-xs sm:text-sm text-slate-600">Fixed-scope sprints with clear deliverables and timelines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-emerald-500/50 hover:bg-white transition-all duration-300 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">{srv.title}</h3>
                      {srv.priceStartingAt && (
                        <span className="self-start px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          {srv.priceStartingAt}
                        </span>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {srv.description}
                    </p>

                    {srv.deliverables && (
                      <div className="space-y-1.5 pt-2">
                        <span className="text-[11px] font-semibold text-slate-900 uppercase tracking-wider">What&apos;s Included:</span>
                        <ul className="space-y-1">
                          {srv.deliverables.map((del, dIdx) => (
                            <li key={dIdx} className="text-xs text-slate-600 flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-slate-200">
                    <a
                      href={`mailto:${contact.email}?subject=Inquiry:%20${encodeURIComponent(srv.title)}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-500 transition-colors"
                    >
                      <span>Inquire about this package</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Client Results / Projects */}
        <section id="results" className="space-y-6 sm:space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1 sm:space-y-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 font-semibold">Proof of Work</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Proven Results Delivered</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 hover:shadow-xl transition-all space-y-3 sm:space-y-4"
              >
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">{proj.title}</h3>
                {proj.tagline && <p className="text-xs font-medium text-emerald-700">{proj.tagline}</p>}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{proj.description}</p>

                {proj.metrics && (
                  <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs font-medium text-emerald-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{proj.metrics}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.technologies.map((t, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] sm:text-[11px] bg-slate-100 text-slate-600 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="p-6 sm:p-14 rounded-2xl sm:rounded-3xl bg-slate-950 text-white text-center space-y-4 sm:space-y-6">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">Ready to scale?</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight max-w-lg mx-auto">
            Let&apos;s Discuss Your Next Build
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-xs sm:text-sm">
            Send an email with your timeline and goals, and I will get back to you within 24 hours.
          </p>
          <div className="pt-2">
            <a
              href={`mailto:${contact.email}?subject=Project%20Inquiry`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-xl font-bold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-all shadow-lg w-full sm:w-auto break-all"
            >
              <span>{contact.email}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 py-6 sm:py-8 text-center text-xs text-slate-600">
        <p>© {new Date().getFullYear()} {personal.fullName} • Independent Consultant</p>
      </footer>
    </div>
  );
}
