'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  Zap,
  CheckCircle2,
  Shield,
  Layers,
  BarChart3,
  Globe,
  UploadCloud,
  Code2,
  Palette,
  Briefcase,
  ExternalLink,
  ChevronRight,
  Check,
  Star,
  Terminal,
  FileText,
  Lock,
  ArrowUpRight,
  Award,
  Users,
  Search,
  Sliders,
  Menu,
  X,
} from 'lucide-react';
import ResumeUploadModal from '@/components/builder/ResumeUploadModal';
import AuthModal from '@/components/auth/AuthModal';
import { PortfolioData, TemplateId } from '@/types/portfolio';
import { sampleDeveloperPortfolio } from '@/lib/sample-data';

export default function HomePage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activeTemplateTab, setActiveTemplateTab] = useState<TemplateId>('developer-dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Hero Quick-Launch State
  const [heroResumeText, setHeroResumeText] = useState('');
  const [heroProfession, setHeroProfession] = useState('Full Stack & AI Systems Engineer');
  const [heroLoading, setHeroLoading] = useState(false);

  const handleGenerated = (data: PortfolioData) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('current_portfolio', JSON.stringify(data));
      localStorage.setItem('portfolio_draft', JSON.stringify(data));
    }
    router.push('/builder');
  };

  const handleQuickGenerate = async () => {
    setHeroLoading(true);
    try {
      const response = await fetch('/api/generate-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: heroResumeText || `Annie Rajpoot
Full Stack & AI Systems Engineer
Building high-throughput distributed systems and Next.js applications. 5+ years experience.`,
          profession: heroProfession,
          templateId: activeTemplateTab,
        }),
      });

      const data = await response.json();
      if (data.portfolio) {
        handleGenerated(data.portfolio);
      } else {
        handleGenerated(sampleDeveloperPortfolio);
      }
    } catch (e) {
      handleGenerated(sampleDeveloperPortfolio);
    } finally {
      setHeroLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[640px] bg-gradient-to-b from-blue-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none" />

      {/* SaaS Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0d1117]/90 border-b border-[#30363d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-6 sm:gap-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/25">
                AI
              </div>
              <span className="font-extrabold text-white text-sm sm:text-base tracking-tight">
                Portfolio<span className="text-blue-400">OS</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#8b949e]">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#templates" className="hover:text-white transition-colors">Templates</a>
              <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              <a href="#career-assistant" className="hover:text-white transition-colors">Career AI</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
              <Link href="/annierajpoot" target="_blank" className="hover:text-white transition-colors flex items-center gap-1 text-blue-400 font-semibold">
                <span>Annie&apos;s Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex text-xs font-semibold text-[#c9d1d9] hover:text-white transition-colors px-2.5 py-1.5"
            >
              Dashboard
            </Link>

            <button
              onClick={() => { setAuthMode('login'); setIsAuthOpen(true); }}
              className="hidden xs:inline-flex text-xs font-semibold text-[#c9d1d9] hover:text-white transition-colors px-2.5 py-1.5"
            >
              Sign In
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-500/25 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch in 60s</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#30363d] bg-[#161b22] px-4 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2 text-xs font-medium text-[#c9d1d9]">
              <Link
                href="/annierajpoot"
                target="_blank"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20"
              >
                <span>Preview Annie Rajpoot Live Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/builder"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[#21262d] text-white"
              >
                Open Live Interactive Builder
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[#21262d]"
              >
                Customer Dashboard
              </Link>
              <a
                href="#templates"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[#21262d]"
              >
                Executive Templates
              </a>
              <a
                href="#career-assistant"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[#21262d]"
              >
                Recruiter Scannability Audit
              </a>
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-[#21262d]"
              >
                Transparent Pricing
              </a>
              <button
                onClick={() => { setMobileMenuOpen(false); setAuthMode('login'); setIsAuthOpen(true); }}
                className="p-2 rounded-lg hover:bg-[#21262d] text-left text-blue-400"
              >
                Sign In to PortfolioOS
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="space-y-32 py-16 sm:py-24">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10 text-center relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Personal Branding Platform • Complete SaaS Suite</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Build, Customize & Publish Your Portfolio in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300">
              Under 60 Seconds
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-[#8b949e] max-w-2xl mx-auto leading-relaxed font-light">
            Upload your resume or enter your details. Our AI writes metric-driven project case studies, extracts technical capabilities, optimizes for recruiters, and deploys your custom domain website automatically.
          </p>

          {/* Embedded Interactive 60-Second Launch Console */}
          <div className="max-w-3xl mx-auto rounded-2xl sm:rounded-3xl bg-[#161b22] border border-[#30363d] p-4 sm:p-8 shadow-2xl text-left space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30363d] pb-4">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Instant AI Portfolio Generator</span>
                </span>
                <p className="text-[11px] text-[#8b949e]">Paste resume text or click Annie Rajpoot to test immediately.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setHeroResumeText(`Annie Rajpoot
Full Stack & AI Systems Engineer
San Francisco, CA (Remote) • annie.rajpoot@example.com
5+ years experience in distributed systems, Next.js, and generative AI. Shipped NeuralSearch and scaled microservices to 250M requests/month.`);
                    setHeroProfession('Full Stack & AI Systems Engineer');
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[#21262d] hover:bg-[#30363d] text-blue-400 border border-blue-500/30 transition-colors"
                >
                  ⚡ Load Annie Rajpoot Profile
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <textarea
                rows={3}
                value={heroResumeText}
                onChange={(e) => setHeroResumeText(e.target.value)}
                placeholder="Paste resume text or notes here (experience, skills, projects)..."
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl p-3 text-xs font-mono text-[#c9d1d9] focus:outline-none focus:border-blue-500 resize-none"
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={heroProfession}
                    onChange={(e) => setHeroProfession(e.target.value)}
                    placeholder="Your Target Title (e.g. Full Stack Engineer)"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  onClick={handleQuickGenerate}
                  disabled={heroLoading}
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {heroLoading ? (
                    <span>Generating in 60s...</span>
                  ) : (
                    <>
                      <span>Generate Portfolio</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-[#8b949e]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero manual formatting needed</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free subdomain & live hosting</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Custom domain ready</span>
              </span>
            </div>
          </div>

          {/* Social Proof Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-8 text-xs text-[#8b949e]">
            <span className="font-semibold text-white">Featured Portfolios:</span>
            <Link href="/annierajpoot" target="_blank" className="hover:text-blue-400 transition-colors flex items-center gap-1">
              <span>Annie Rajpoot (Engineering)</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link href="/elenarossi" target="_blank" className="hover:text-pink-400 transition-colors flex items-center gap-1">
              <span>Elena Rossi (Product Design)</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <Link href="/marcusvance" target="_blank" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <span>Marcus Vance (Consulting)</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">The 60-Second Sequence</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How PortfolioOS Works</h2>
            <p className="text-sm text-[#8b949e]">
              From raw resume to an executive website indexed on the web in 3 seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4 relative">
              <div className="text-3xl font-extrabold text-blue-500/30 font-mono">01</div>
              <h3 className="text-lg font-bold text-white">Resume Intelligence</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Drop your PDF or paste experience notes. Gemini AI parses your achievements, extracts technical skills, and detects quantifiable impact metrics.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4 relative">
              <div className="text-3xl font-extrabold text-indigo-500/30 font-mono">02</div>
              <h3 className="text-lg font-bold text-white">AI Content & Copilot</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                Generate high-converting project case studies, an executive bio, and refine sections with natural prompts like &ldquo;Make this recruiter friendly&rdquo;.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-4 relative">
              <div className="text-3xl font-extrabold text-emerald-500/30 font-mono">03</div>
              <h3 className="text-lg font-bold text-white">Subdomain & Live Publishing</h3>
              <p className="text-xs text-[#8b949e] leading-relaxed">
                One click publishes your website to a dedicated subdomain (`username.platform.com`) or custom domain with real-time visitor analytics.
              </p>
            </div>
          </div>
        </section>

        {/* TEMPLATES SHOWCASE */}
        <section id="templates" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#30363d] pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Tailored Archetypes</span>
              <h2 className="text-3xl font-extrabold text-white mt-1">Four Executive Templates</h2>
            </div>

            <Link
              href="/builder"
              className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>Test all in live builder</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Developer Dark */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-blue-500/40 space-y-4 flex flex-col justify-between shadow-lg shadow-blue-500/5">
              <div className="space-y-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">Dark Mode</span>
                <h3 className="text-base font-bold text-white">Developer Dark</h3>
                <p className="text-xs text-[#8b949e]">
                  Terminal aesthetics, GitHub statistics, technical skill tags, and system architecture metrics.
                </p>
              </div>
              <Link
                href="/annierajpoot"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300"
              >
                <span>Preview Annie&apos;s Site</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Designer Creative */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4 flex flex-col justify-between hover:border-pink-500/40 transition-colors">
              <div className="space-y-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-400">Editorial</span>
                <h3 className="text-base font-bold text-white">Designer Creative</h3>
                <p className="text-xs text-[#8b949e]">
                  Vibrant layouts, visual project cards, case-study storytelling, and typography focus.
                </p>
              </div>
              <Link
                href="/elenarossi"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-400 hover:text-pink-300"
              >
                <span>Preview Case Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Freelancer Services */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
              <div className="space-y-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Conversion</span>
                <h3 className="text-base font-bold text-white">Freelancer Services</h3>
                <p className="text-xs text-[#8b949e]">
                  Service tiers, client reviews, proof of impact, and direct booking CTA conversion.
                </p>
              </div>
              <Link
                href="/marcusvance"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              >
                <span>Preview Consultant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Executive Minimalist */}
            <div className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] space-y-4 flex flex-col justify-between hover:border-neutral-400/40 transition-colors">
              <div className="space-y-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-500/10 text-neutral-300">Clean</span>
                <h3 className="text-base font-bold text-white">Executive Minimalist</h3>
                <p className="text-xs text-[#8b949e]">
                  Clean typography, fast recruiter scanning, crisp executive layout, and clear achievements.
                </p>
              </div>
              <Link
                href="/builder"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-white"
              >
                <span>Open in Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* CAREER ASSISTANT & SCORING */}
        <section id="career-assistant" className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="p-5 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900/30 via-[#161b22] to-[#161b22] border border-purple-500/30 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <Award className="w-3.5 h-3.5" />
                <span>Career Outcome Intelligence</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Benchmark Your Portfolio Against Hiring Standards
              </h2>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                Most portfolios fail because they lack quantifiable metrics or keyword density. PortfolioOS analyzes your content across 4 key hiring dimensions and pinpoints exactly what to improve.
              </p>
              <div className="pt-2">
                <Link
                  href="/builder"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all shadow-md shadow-purple-600/20"
                >
                  <span>Audit Your Score Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
              <div className="flex justify-between items-center border-b border-[#30363d] pb-3">
                <span className="text-xs font-bold text-white">Annie Rajpoot • Audit Snapshot</span>
                <span className="text-xs font-mono font-bold text-emerald-400">97/100 Overall</span>
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8b949e]">Recruiter Scannability</span>
                    <span className="text-white font-mono">98%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#161b22]">
                    <div className="w-[98%] h-full bg-emerald-400 rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8b949e]">Quantifiable Impact Metrics</span>
                    <span className="text-white font-mono">95%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#161b22]">
                    <div className="w-[95%] h-full bg-blue-400 rounded-full" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#8b949e]">SEO & Technical Terminology</span>
                    <span className="text-white font-mono">96%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#161b22]">
                    <div className="w-[96%] h-full bg-purple-400 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section id="pricing" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400">Simple Transparent Pricing</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Invest in Your Career Presence</h2>
            <p className="text-sm text-[#8b949e]">
              Start free forever. Upgrade when you need custom domains, AI job matching, and recruiter analytics.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 p-1 rounded-full bg-[#161b22] border border-[#30363d] mt-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  billingCycle === 'monthly' ? 'bg-[#21262d] text-white' : 'text-[#8b949e]'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1.5 ${
                  billingCycle === 'annual' ? 'bg-blue-600 text-white' : 'text-[#8b949e]'
                }`}
              >
                <span>Annual</span>
                <span className="text-[10px] bg-emerald-400 text-slate-950 font-bold px-1.5 py-0.2 rounded-full">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Starter */}
            <div className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-[#8b949e]">Starter Free</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-xs text-[#8b949e]">/ forever</span>
                </div>
                <p className="text-xs text-[#8b949e]">Everything you need to launch your first portfolio website.</p>
                <ul className="space-y-2 text-xs text-[#c9d1d9] pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> 1 AI Generated Portfolio
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Free Subdomain (username.platform.com)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> All 4 Professional Templates
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" /> Basic Visitor Analytics
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] transition-colors"
              >
                Start Free
              </button>
            </div>

            {/* Pro Career */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#1c2128] to-[#161b22] border-2 border-blue-500 space-y-6 flex flex-col justify-between shadow-xl shadow-blue-500/10 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider">
                Most Popular
              </div>

              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-blue-400 font-bold">Pro Career</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    {billingCycle === 'annual' ? '$15' : '$19'}
                  </span>
                  <span className="text-xs text-[#8b949e]">/ month</span>
                </div>
                <p className="text-xs text-[#8b949e]">For job seekers and professionals wanting top recruiter visibility.</p>
                <ul className="space-y-2 text-xs text-[#c9d1d9] pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400" /> <strong>Custom Domain Support</strong> (yourname.com)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400" /> Unlimited AI Content Refinements
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400" /> Job Description Matcher & Missing Skills
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400" /> Detailed Recruiter Scannability Audit
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-blue-400" /> Remove PortfolioOS Branding
                  </li>
                </ul>
              </div>

              <button
                onClick={() => { setAuthMode('signup'); setIsAuthOpen(true); }}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md shadow-blue-500/20"
              >
                Get Pro Career
              </button>
            </div>

            {/* Executive & Team */}
            <div className="p-8 rounded-3xl bg-[#161b22] border border-[#30363d] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-purple-400">Executive</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">
                    {billingCycle === 'annual' ? '$39' : '$49'}
                  </span>
                  <span className="text-xs text-[#8b949e]">/ month</span>
                </div>
                <p className="text-xs text-[#8b949e]">For consultants, founders, and multi-disciplinary creators.</p>
                <ul className="space-y-2 text-xs text-[#c9d1d9] pt-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" /> Up to 5 Active Portfolios & Domains
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" /> Priority Gemini 2.5 Pro Inference
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" /> Custom CSS & Advanced Analytics API
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-purple-400" /> 1-on-1 Portfolio & Bio Strategy Review
                  </li>
                </ul>
              </div>

              <button
                onClick={() => { setAuthMode('signup'); setIsAuthOpen(true); }}
                className="w-full py-2.5 rounded-xl text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-white border border-[#30363d] transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="p-6 sm:p-14 rounded-3xl bg-gradient-to-tr from-blue-900/40 via-indigo-900/30 to-[#161b22] border border-blue-500/30 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to claim your executive presence?
            </h2>
            <p className="text-sm text-[#8b949e] max-w-xl mx-auto">
              Join developers, designers, and creators who launch their portfolio websites with AI in under a minute.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Build My Portfolio Now</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#30363d] py-10 sm:py-12 text-xs text-[#8b949e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-[10px]">
              AI
            </div>
            <span className="font-bold text-white text-sm">PortfolioOS</span>
            <span>• Engineered for Annie Rajpoot</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/annierajpoot" target="_blank" className="hover:text-white transition-colors">
              Annie Rajpoot Profile
            </Link>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/builder" className="hover:text-white transition-colors">
              Builder
            </Link>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
          </div>

          <p>© {new Date().getFullYear()} PortfolioOS Inc. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      <ResumeUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerated={handleGenerated}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultMode={authMode}
        onSuccess={() => router.push('/dashboard')}
      />
    </div>
  );
}
