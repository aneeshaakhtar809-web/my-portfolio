'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  ExternalLink,
  Edit3,
  BarChart3,
  Sparkles,
  ShieldCheck,
  Plus,
  ArrowUpRight,
  Clock,
  Eye,
  Download,
  Users,
  Settings,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import { sampleDeveloperPortfolio } from '@/lib/sample-data';

export default function DashboardPage() {
  const [user, setUser] = useState({
    name: 'Annie Rajpoot',
    email: 'annie.rajpoot@example.com',
    plan: 'Pro Lifetime',
    activeDomain: 'annierajpoot.platform.com',
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans antialiased overflow-x-hidden">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#161b22]/90 backdrop-blur-md border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
                AI
              </div>
              <span className="font-extrabold text-white text-sm sm:text-base tracking-tight">
                Portfolio<span className="text-blue-400">OS</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-4 text-xs font-medium text-[#8b949e]">
              <Link href="/dashboard" className="text-white border-b-2 border-blue-500 py-5">
                Overview
              </Link>
              <Link href="/builder" className="hover:text-white transition-colors py-5">
                Live Builder
              </Link>
              <Link href="/annierajpoot" target="_blank" className="hover:text-white transition-colors py-5 flex items-center gap-1">
                <span>View Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[#21262d] border border-[#30363d]">
              <div className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">
                AR
              </div>
              <span className="text-xs font-medium text-white truncate max-w-[80px] sm:max-w-none">{user.name}</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-400 font-mono">
                PRO
              </span>
            </div>

            <Link
              href="/builder"
              className="px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5 shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Builder</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-10">
        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-[#161b22] border border-blue-500/30">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Personal Branding Console</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs text-[#8b949e]">
              Your portfolio is active and indexing. Recruiter scannability score is optimized at 97%.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Link
              href="/annierajpoot"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>View Site</span>
              <ExternalLink className="w-3 h-3 text-[#8b949e]" />
            </Link>

            <Link
              href="/builder"
              className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-500/20"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit in Builder</span>
            </Link>
          </div>
        </div>

        {/* 4 Core Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between text-[#8b949e]">
              <span className="text-[10px] sm:text-xs font-mono uppercase">Visitors</span>
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">1,480</div>
            <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span>+24%</span> <span className="text-[#8b949e] hidden sm:inline">30 days</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between text-[#8b949e]">
              <span className="text-[10px] sm:text-xs font-mono uppercase">Impressions</span>
              <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">3,890</div>
            <div className="text-[10px] sm:text-[11px] font-mono text-indigo-400 flex items-center gap-1">
              <span>48.6%</span> <span className="text-[#8b949e] hidden sm:inline">CTR</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between text-[#8b949e]">
              <span className="text-[10px] sm:text-xs font-mono uppercase">PDF Downloads</span>
              <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">114</div>
            <div className="text-[10px] sm:text-[11px] font-mono text-purple-400 flex items-center gap-1">
              <span>18 recruiters</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-1.5 sm:space-y-2">
            <div className="flex items-center justify-between text-[#8b949e]">
              <span className="text-[10px] sm:text-xs font-mono uppercase">Readiness</span>
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">97%</div>
            <div className="text-[10px] sm:text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> <span>Top 3%</span>
            </div>
          </div>
        </div>

        {/* Published Websites Section */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Published Portfolio Properties</h2>
              <p className="text-xs text-[#8b949e]">Manage your subdomains, custom domains, and styling templates.</p>
            </div>
            <Link
              href="/builder"
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-white transition-colors border border-[#30363d]"
            >
              <Plus className="w-3.5 h-3.5 text-blue-400" />
              <span>Create New Persona</span>
            </Link>
          </div>

          <div className="rounded-2xl bg-[#161b22] border border-[#30363d] overflow-hidden divide-y divide-[#30363d]">
            <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 hover:bg-[#1c2128] transition-colors">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Globe className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-white">Annie Rajpoot • Primary Engineering Site</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>

                  <p className="text-xs font-mono text-blue-400 break-all">
                    http://localhost:3000/annierajpoot
                  </p>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs text-[#8b949e] pt-0.5">
                    <span>Developer Dark</span>
                    <span>•</span>
                    <span>3 Shipped Projects</span>
                    <span>•</span>
                    <span>Updated 2 mins ago</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                <Link
                  href="/annierajpoot"
                  target="_blank"
                  className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] transition-colors flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5 text-blue-400" />
                  <span>View</span>
                </Link>

                <Link
                  href="/builder"
                  className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                <span>Recruiter & Visitor Traffic</span>
              </h3>
              <span className="text-[11px] font-mono text-[#8b949e]">Past 7 Days</span>
            </div>

            <div className="space-y-3 pt-1">
              {[
                { source: 'LinkedIn Profile Link', count: 780, pct: '53%' },
                { source: 'GitHub Repositories', count: 420, pct: '28%' },
                { source: 'Job Applications', count: 190, pct: '13%' },
                { source: 'Direct / Network', count: 90, pct: '6%' },
              ].map((row, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#c9d1d9]">{row.source}</span>
                    <span className="text-white font-mono">{row.count} ({row.pct})</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#0d1117] overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                      style={{ width: row.pct }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Career Score Intelligence</span>
            </h3>

            <div className="space-y-2.5 pt-1">
              <div className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <span className="text-[#8b949e]">Recruiter Readability</span>
                <span className="font-bold text-emerald-400 font-mono">98%</span>
              </div>
              <div className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <span className="text-[#8b949e]">Quantifiable Metrics</span>
                <span className="font-bold text-blue-400 font-mono">95%</span>
              </div>
              <div className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-[#0d1117] border border-[#30363d]">
                <span className="text-[#8b949e]">SEO & Tech Keywords</span>
                <span className="font-bold text-purple-400 font-mono">96%</span>
              </div>
            </div>

            <Link
              href="/builder"
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Run Job Match Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#30363d] py-6 sm:py-8 text-center text-[11px] sm:text-xs text-[#8b949e]">
        <p>© {new Date().getFullYear()} PortfolioOS SaaS Platform • Logged in as Annie Rajpoot</p>
      </footer>
    </div>
  );
}
