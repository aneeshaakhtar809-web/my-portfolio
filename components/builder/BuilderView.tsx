'use client';

import React, { useState, useEffect } from 'react';
import { PortfolioData, TemplateId } from '@/types/portfolio';
import TemplateRenderer from '../templates/TemplateRenderer';
import IframePreview from './IframePreview';
import ResumeUploadModal from './ResumeUploadModal';
import CareerAssistantModal from './CareerAssistantModal';
import PublishModal from './PublishModal';
import {
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Wand2,
  Share2,
  FileText,
  Sliders,
  Layers,
  Send,
  Loader2,
  CheckCircle,
  BarChart2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Globe,
  Plus,
  Trash2,
  Eye,
  Activity,
  Palette,
  Briefcase,
  GraduationCap,
  Code2,
  Edit3,
  ExternalLink,
} from 'lucide-react';

interface BuilderViewProps {
  initialPortfolio: PortfolioData;
}

type TabType = 'template' | 'ai' | 'design' | 'projects' | 'experience' | 'content' | 'analytics';
type ViewportType = 'desktop' | 'tablet' | 'mobile';

const ACCENT_COLORS = [
  { name: 'Electric Blue', hex: '#3b82f6' },
  { name: 'Emerald Glow', hex: '#10b981' },
  { name: 'Royal Violet', hex: '#8b5cf6' },
  { name: 'Rose Pink', hex: '#ec4899' },
  { name: 'Amber Gold', hex: '#f59e0b' },
  { name: 'Cyber Slate', hex: '#64748b' },
];

export default function BuilderView({ initialPortfolio }: BuilderViewProps) {
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialPortfolio);
  const [activeTab, setActiveTab] = useState<TabType>('template');
  const [viewport, setViewport] = useState<ViewportType>('mobile');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileScreenMode, setMobileScreenMode] = useState<'editor' | 'preview'>('preview');

  // Modals
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // AI Refinement State
  const [aiPrompt, setAiPrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const [refineFeedback, setRefineFeedback] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('current_portfolio') || localStorage.getItem('portfolio_draft');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.username) {
          setPortfolio(parsed);
          fetch('/api/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ portfolio: parsed }),
          }).catch(() => {});
        }
      }
    } catch (e) {
      console.warn('Could not read stored portfolio draft', e);
    }
  }, []);

  const updatePortfolio = (newPortfolio: PortfolioData) => {
    setPortfolio(newPortfolio);
    try {
      localStorage.setItem('portfolio_draft', JSON.stringify(newPortfolio));
      sessionStorage.setItem('current_portfolio', JSON.stringify(newPortfolio));
    } catch (e) {}

    setIsSaving(true);
    fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ portfolio: newPortfolio }),
    }).finally(() => setIsSaving(false));
  };

  const handleRefine = async (customInstruction?: string) => {
    const instruction = customInstruction || aiPrompt;
    if (!instruction.trim()) return;

    setIsRefining(true);
    setRefineFeedback(null);

    try {
      const res = await fetch('/api/refine-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio, instruction }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to refine content');

      updatePortfolio(data.portfolio);
      setRefineFeedback(`Applied: "${instruction}"`);
      setAiPrompt('');
    } catch (err: any) {
      setRefineFeedback(`Error: ${err.message || 'Could not refine'}`);
    } finally {
      setIsRefining(false);
    }
  };

  const handleTemplateChange = (templateId: TemplateId) => {
    updatePortfolio({
      ...portfolio,
      theme: {
        ...portfolio.theme,
        templateId,
      },
    });
  };

  const handleAddProject = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      title: 'New High-Impact Project',
      tagline: 'System description or key achievement',
      description: 'Describe what you engineered, the challenges overcome, and the architecture used.',
      metrics: 'Delivered 35% performance boost and reduced errors.',
      technologies: ['TypeScript', 'Next.js', 'Distributed Systems'],
      featured: true,
    };
    updatePortfolio({
      ...portfolio,
      projects: [newProject, ...portfolio.projects],
    });
  };

  const handleDeleteProject = (id: string) => {
    updatePortfolio({
      ...portfolio,
      projects: portfolio.projects.filter((p) => p.id !== id),
    });
  };

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: 'Senior Software Engineer',
      company: 'Tech Innovators Corp',
      location: 'Remote',
      period: '2024 - Present',
      highlights: ['Spearheaded microservice architecture and accelerated deployment pipelines.'],
    };
    updatePortfolio({
      ...portfolio,
      experiences: [newExp, ...portfolio.experiences],
    });
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0d1117] text-[#c9d1d9] overflow-hidden">
      {/* Top Application Bar with Integrated Sequential Stepper */}
      <header className="h-14 sm:h-16 border-b border-[#30363d] bg-[#161b22] px-3 sm:px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-2 sm:gap-3">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
              AI
            </div>
            <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white hidden sm:inline">
              Portfolio<span className="text-blue-400">OS</span>
            </span>
          </a>

          <div className="h-4 w-px bg-[#30363d] mx-1 hidden lg:block" />

          {/* Desktop Sequential Process Pipeline */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-medium">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#21262d] text-emerald-400 border border-emerald-500/20 hover:bg-[#30363d] transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>1. Extracted</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-[#484f58]" />

            <button
              onClick={() => setActiveTab('template')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'template'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-[#8b949e] hover:text-white'
              }`}
            >
              <span>2. Persona</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-[#484f58]" />

            <button
              onClick={() => setActiveTab('ai')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-colors ${
                activeTab === 'ai'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-[#8b949e] hover:text-white'
              }`}
            >
              <span>3. AI Polish</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-[#484f58]" />

            <button
              onClick={() => setIsCareerModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-purple-400 hover:bg-purple-500/10 transition-colors"
            >
              <span>4. Audit ({portfolio.scoring?.overallScore || 97}%)</span>
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-[#484f58]" />

            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md text-emerald-400 hover:bg-emerald-500/10 transition-colors font-bold"
            >
              <span>5. Publish</span>
            </button>
          </div>
        </div>

        {/* Viewport & Mobile Tab Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Screen Toggle (Editor vs Preview) */}
          <div className="flex md:hidden bg-[#0d1117] p-0.5 rounded-lg border border-[#30363d]">
            <button
              onClick={() => setMobileScreenMode('editor')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                mobileScreenMode === 'editor' ? 'bg-[#21262d] text-white' : 'text-[#8b949e]'
              }`}
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setMobileScreenMode('preview')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                mobileScreenMode === 'preview' ? 'bg-blue-600 text-white' : 'text-[#8b949e]'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Preview</span>
            </button>
          </div>

          {/* Device Frames Toggle */}
          <div className="hidden sm:flex items-center bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === 'desktop' ? 'bg-[#21262d] text-white shadow-xs' : 'text-[#8b949e] hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === 'tablet' ? 'bg-[#21262d] text-white shadow-xs' : 'text-[#8b949e] hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded-md transition-colors ${
                viewport === 'mobile' ? 'bg-[#21262d] text-white shadow-xs' : 'text-[#8b949e] hover:text-white'
              }`}
              title="Mobile Smartphone View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsCareerModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30"
            >
              <BarChart2 className="w-3.5 h-3.5 text-purple-400" />
              <span>Audit</span>
            </button>

            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/20"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Publish</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar Controls */}
        <aside
          className={`${
            // On mobile screen mode, if preview is active, hide sidebar; if editor active, full width!
            mobileScreenMode === 'preview' ? 'hidden md:flex' : 'flex w-full md:w-80 lg:w-96'
          } ${
            sidebarCollapsed ? 'md:w-14' : 'md:w-80 lg:w-96'
          } border-r border-[#30363d] bg-[#161b22] flex-col transition-all duration-300 shrink-0 z-20 overflow-hidden`}
        >
          {/* Scrollable Tabs Navigation */}
          <div className="flex items-center border-b border-[#30363d] bg-[#0d1117] overflow-x-auto scrollbar-none text-xs">
            <button
              onClick={() => { setActiveTab('template'); setSidebarCollapsed(false); }}
              className={`py-3 px-3 font-semibold flex items-center gap-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'template'
                  ? 'border-blue-500 text-blue-400 bg-[#161b22]'
                  : 'border-transparent text-[#8b949e] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>Templates</span>}
            </button>

            <button
              onClick={() => { setActiveTab('ai'); setSidebarCollapsed(false); }}
              className={`py-3 px-3 font-semibold flex items-center gap-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'ai'
                  ? 'border-blue-500 text-blue-400 bg-[#161b22]'
                  : 'border-transparent text-[#8b949e] hover:text-white'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>AI Copilot</span>}
            </button>

            <button
              onClick={() => { setActiveTab('design'); setSidebarCollapsed(false); }}
              className={`py-3 px-3 font-semibold flex items-center gap-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'design'
                  ? 'border-blue-500 text-blue-400 bg-[#161b22]'
                  : 'border-transparent text-[#8b949e] hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>Design</span>}
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setSidebarCollapsed(false); }}
              className={`py-3 px-3 font-semibold flex items-center gap-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-400 bg-[#161b22]'
                  : 'border-transparent text-[#8b949e] hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>Projects</span>}
            </button>

            <button
              onClick={() => { setActiveTab('experience'); setSidebarCollapsed(false); }}
              className={`py-3 px-3 font-semibold flex items-center gap-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'experience'
                  ? 'border-blue-500 text-blue-400 bg-[#161b22]'
                  : 'border-transparent text-[#8b949e] hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>Work</span>}
            </button>

            <button
              onClick={() => { setActiveTab('content'); setSidebarCollapsed(false); }}
              className={`py-3 px-3 font-semibold flex items-center gap-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'content'
                  ? 'border-blue-500 text-blue-400 bg-[#161b22]'
                  : 'border-transparent text-[#8b949e] hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>Profile</span>}
            </button>

            <button
              onClick={() => { setActiveTab('analytics'); setSidebarCollapsed(false); }}
              className={`py-3 px-3 font-semibold flex items-center gap-1 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-400 bg-[#161b22]'
                  : 'border-transparent text-[#8b949e] hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>Stats</span>}
            </button>
          </div>

          {/* Sidebar Body */}
          {!sidebarCollapsed && (
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Quick switch to preview on mobile */}
              <div className="md:hidden flex justify-between items-center p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
                <span>Done editing?</span>
                <button
                  onClick={() => setMobileScreenMode('preview')}
                  className="font-bold text-white bg-blue-600 px-3 py-1 rounded-lg flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" /> See Live Preview
                </button>
              </div>

              {/* TAB: TEMPLATES */}
              {activeTab === 'template' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                      Visual Archetypes
                    </span>
                    <span className="text-[10px] text-blue-400 font-mono">Live Hot-Swap</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      {
                        id: 'developer-dark' as TemplateId,
                        name: 'Developer Dark',
                        desc: 'Terminal aesthetics, GitHub integrations, code badges, tech-stack matrix.',
                        accent: 'bg-blue-500',
                      },
                      {
                        id: 'designer-creative' as TemplateId,
                        name: 'Designer & Creative',
                        desc: 'Editorial typography, high-res visual case studies, human-centered layout.',
                        accent: 'bg-pink-500',
                      },
                      {
                        id: 'freelancer-services' as TemplateId,
                        name: 'Freelancer / Consultant',
                        desc: 'Service packages, client reviews, proof of ROI, booking conversions.',
                        accent: 'bg-emerald-500',
                      },
                      {
                        id: 'minimal-recruiter' as TemplateId,
                        name: 'Executive Minimalist',
                        desc: 'Clean, recruiter-friendly, quick scanning, crisp monochrome layout.',
                        accent: 'bg-neutral-400',
                      },
                    ].map((tpl) => (
                      <button
                        key={tpl.id}
                        onClick={() => handleTemplateChange(tpl.id)}
                        className={`text-left p-3.5 rounded-xl border transition-all ${
                          portfolio.theme.templateId === tpl.id
                            ? 'bg-[#21262d] border-blue-500 shadow-sm ring-1 ring-blue-500/40'
                            : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold text-white">{tpl.name}</span>
                          <span className={`w-2.5 h-2.5 rounded-full ${tpl.accent}`} />
                        </div>
                        <p className="text-[11px] text-[#8b949e] leading-relaxed">{tpl.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: AI COPILOT */}
              {activeTab === 'ai' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 space-y-1">
                    <div className="font-semibold flex items-center gap-1.5 text-blue-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Natural Language Commands</span>
                    </div>
                    <p className="text-[11px] text-[#8b949e]">
                      Instruct the AI to rewrite your copy, elevate project impact, or optimize for recruiters.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                      Instant Refinements
                    </span>
                    <div className="flex flex-col gap-1.5">
                      {[
                        'Make this recruiter friendly & metric-heavy',
                        'Write a punchy executive elevator bio',
                        'Strengthen project impact descriptions',
                        'Optimize keywords for AI & cloud engineering',
                      ].map((preset, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRefine(preset)}
                          disabled={isRefining}
                          className="text-left p-2.5 rounded-lg bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] text-xs text-[#c9d1d9] hover:text-white transition-colors flex items-center justify-between group disabled:opacity-50"
                        >
                          <span>{preset}</span>
                          <Wand2 className="w-3.5 h-3.5 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                      Custom Command
                    </span>
                    <div className="relative">
                      <textarea
                        rows={3}
                        value={aiPrompt}
                        onChange={(e) => setAiPrompt(e.target.value)}
                        placeholder="e.g. Highlight distributed systems and scale metrics in Annie's bio..."
                        className="w-full rounded-xl bg-[#0d1117] border border-[#30363d] p-3 text-xs text-[#c9d1d9] focus:outline-none focus:border-blue-500 pr-10 resize-none"
                      />
                      <button
                        onClick={() => handleRefine()}
                        disabled={isRefining || !aiPrompt.trim()}
                        className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 transition-colors"
                      >
                        {isRefining ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {refineFeedback && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>{refineFeedback}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => setIsCareerModalOpen(true)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/20"
                    >
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>Run Recruiter Score Audit</span>
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: DESIGN & STYLING */}
              {activeTab === 'design' && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                      Accent Color Theme
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {ACCENT_COLORS.map((col) => (
                        <button
                          key={col.hex}
                          onClick={() =>
                            updatePortfolio({
                              ...portfolio,
                              theme: { ...portfolio.theme, primaryColor: col.hex },
                            })
                          }
                          className={`p-2 rounded-xl border flex items-center gap-2 transition-all ${
                            portfolio.theme.primaryColor === col.hex
                              ? 'border-white bg-[#21262d]'
                              : 'border-[#30363d] bg-[#0d1117] hover:border-[#8b949e]'
                          }`}
                        >
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: col.hex }} />
                          <span className="text-[10px] text-white font-medium truncate">{col.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                      Typography Family
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {[
                        { id: 'sans', label: 'Modern Sans' },
                        { id: 'mono', label: 'Developer Mono' },
                        { id: 'serif', label: 'Editorial Serif' },
                      ].map((font) => (
                        <button
                          key={font.id}
                          onClick={() =>
                            updatePortfolio({
                              ...portfolio,
                              theme: { ...portfolio.theme, fontFamily: font.id as any },
                            })
                          }
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            portfolio.theme.fontFamily === font.id
                              ? 'border-blue-500 bg-[#21262d] text-white font-bold'
                              : 'border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:text-white'
                          }`}
                        >
                          {font.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: PROJECTS (CRUD) */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                      Projects ({portfolio.projects.length})
                    </span>
                    <button
                      onClick={handleAddProject}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {portfolio.projects.map((proj, idx) => (
                      <div
                        key={proj.id}
                        className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-2.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={proj.title}
                            onChange={(e) => {
                              const updated = [...portfolio.projects];
                              updated[idx].title = e.target.value;
                              updatePortfolio({ ...portfolio, projects: updated });
                            }}
                            className="bg-transparent font-bold text-xs text-white focus:outline-none w-full"
                          />
                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="text-[#8b949e] hover:text-red-400 transition-colors p-1"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <input
                          type="text"
                          value={proj.tagline || ''}
                          placeholder="Tagline / Short Hook"
                          onChange={(e) => {
                            const updated = [...portfolio.projects];
                            updated[idx].tagline = e.target.value;
                            updatePortfolio({ ...portfolio, projects: updated });
                          }}
                          className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-[11px] text-[#8b949e] focus:outline-none focus:border-blue-500"
                        />

                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => {
                            const updated = [...portfolio.projects];
                            updated[idx].description = e.target.value;
                            updatePortfolio({ ...portfolio, projects: updated });
                          }}
                          className="w-full bg-[#161b22] border border-[#30363d] rounded p-2 text-[11px] text-[#c9d1d9] focus:outline-none focus:border-blue-500 resize-none"
                        />

                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-blue-400 font-mono">Metric:</span>
                          <input
                            type="text"
                            value={proj.metrics || ''}
                            placeholder="e.g. Reduced latency by 45%"
                            onChange={(e) => {
                              const updated = [...portfolio.projects];
                              updated[idx].metrics = e.target.value;
                              updatePortfolio({ ...portfolio, projects: updated });
                            }}
                            className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-[11px] text-blue-300 font-mono focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: WORK EXPERIENCE (CRUD) */}
              {activeTab === 'experience' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                      Work Experience ({portfolio.experiences.length})
                    </span>
                    <button
                      onClick={handleAddExperience}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {portfolio.experiences.map((exp, idx) => (
                      <div
                        key={exp.id}
                        className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-2"
                      >
                        <div className="flex justify-between items-center gap-2">
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...portfolio.experiences];
                              updated[idx].role = e.target.value;
                              updatePortfolio({ ...portfolio, experiences: updated });
                            }}
                            className="bg-transparent font-bold text-xs text-white focus:outline-none w-full"
                          />
                          <button
                            onClick={() => {
                              updatePortfolio({
                                ...portfolio,
                                experiences: portfolio.experiences.filter((e) => e.id !== exp.id),
                              });
                            }}
                            className="text-[#8b949e] hover:text-red-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px]">
                          <input
                            type="text"
                            value={exp.company}
                            placeholder="Company"
                            onChange={(e) => {
                              const updated = [...portfolio.experiences];
                              updated[idx].company = e.target.value;
                              updatePortfolio({ ...portfolio, experiences: updated });
                            }}
                            className="bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-white"
                          />
                          <input
                            type="text"
                            value={exp.period}
                            placeholder="Period (e.g. 2023 - Present)"
                            onChange={(e) => {
                              const updated = [...portfolio.experiences];
                              updated[idx].period = e.target.value;
                              updatePortfolio({ ...portfolio, experiences: updated });
                            }}
                            className="bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-white font-mono"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PROFILE DETAILS */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                    Profile Information
                  </span>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8b949e]">Full Name</label>
                      <input
                        type="text"
                        value={portfolio.personal.fullName}
                        onChange={(e) =>
                          updatePortfolio({
                            ...portfolio,
                            personal: { ...portfolio.personal, fullName: e.target.value },
                          })
                        }
                        className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8b949e]">Profession / Headline Title</label>
                      <input
                        type="text"
                        value={portfolio.personal.profession}
                        onChange={(e) =>
                          updatePortfolio({
                            ...portfolio,
                            personal: { ...portfolio.personal, profession: e.target.value },
                          })
                        }
                        className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8b949e]">Headline Hook</label>
                      <input
                        type="text"
                        value={portfolio.personal.headline}
                        onChange={(e) =>
                          updatePortfolio({
                            ...portfolio,
                            personal: { ...portfolio.personal, headline: e.target.value },
                          })
                        }
                        className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8b949e]">Bio / Pitch</label>
                      <textarea
                        rows={4}
                        value={portfolio.personal.bio}
                        onChange={(e) =>
                          updatePortfolio({
                            ...portfolio,
                            personal: { ...portfolio.personal, bio: e.target.value },
                          })
                        }
                        className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] p-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8b949e]">Contact Email</label>
                      <input
                        type="email"
                        value={portfolio.contact.email}
                        onChange={(e) =>
                          updatePortfolio({
                            ...portfolio,
                            contact: { ...portfolio.contact, email: e.target.value },
                          })
                        }
                        className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-[#8b949e]">Public Username / Subdomain</label>
                      <div className="flex items-center rounded-lg bg-[#0d1117] border border-[#30363d] px-3 py-1.5">
                        <span className="text-xs text-[#8b949e] font-mono">/</span>
                        <input
                          type="text"
                          value={portfolio.username}
                          onChange={(e) =>
                            updatePortfolio({
                              ...portfolio,
                              username: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''),
                            })
                          }
                          className="w-full bg-transparent text-xs font-mono text-blue-400 focus:outline-none pl-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: STATS */}
              {activeTab === 'analytics' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                      Live Portfolio Metrics
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Tracking
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1">
                      <span className="text-[10px] font-mono text-[#8b949e] uppercase">Unique Visitors</span>
                      <div className="text-2xl font-bold text-white">1,482</div>
                      <span className="text-[10px] text-emerald-400 font-mono">+24% this month</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1">
                      <span className="text-[10px] font-mono text-[#8b949e] uppercase">Project Clicks</span>
                      <div className="text-2xl font-bold text-blue-400">520</div>
                      <span className="text-[10px] text-blue-400 font-mono">35.1% CTR</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1">
                      <span className="text-[10px] font-mono text-[#8b949e] uppercase">Resume Downloads</span>
                      <div className="text-2xl font-bold text-purple-400">114</div>
                      <span className="text-[10px] text-purple-400 font-mono">18 recruiters</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d] space-y-1">
                      <span className="text-[10px] font-mono text-[#8b949e] uppercase">Contact Inquiries</span>
                      <div className="text-2xl font-bold text-emerald-400">19</div>
                      <span className="text-[10px] text-emerald-400 font-mono">Direct pipeline</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-2 border-t border-[#30363d] hidden md:flex items-center justify-between">
            <span className="text-[10px] font-mono text-[#8b949e] pl-2">
              {isSaving ? 'Saving...' : 'Auto-saved'}
            </span>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-colors"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* Right Preview Frame Area */}
        <section
          className={`${
            // On mobile screen, if editor is active, hide preview; if preview is active, show full screen!
            mobileScreenMode === 'editor' ? 'hidden md:flex' : 'flex'
          } flex-1 bg-[#010409] flex-col items-center justify-center p-0 sm:p-6 overflow-hidden w-full relative`}
        >
          {/* Mobile In-Preview Quick Action Bar (Visible only on mobile screens when in preview mode) */}
          <div className="md:hidden w-full px-3 py-2 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between shrink-0 z-30">
            <button
              onClick={() => setMobileScreenMode('editor')}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-[#21262d] text-white hover:bg-[#30363d] border border-[#30363d] transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-400" />
              <span>Back to Editor</span>
            </button>

            <div className="flex items-center gap-2">
              <a
                href={`/${portfolio.username}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20"
              >
                <span>Live Site</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => setIsPublishModalOpen(true)}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-lg shadow-sm"
              >
                <Share2 className="w-3 h-3" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {viewport === 'mobile' ? (
            /* Authentic Smartphone Chassis: On mobile devices edge-to-edge; on desktop authentic iPhone chassis */
            <div className="w-full max-w-full sm:max-w-[390px] h-full sm:max-h-[820px] rounded-none sm:rounded-[48px] border-0 sm:border-[12px] border-[#22272e] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col relative overflow-hidden sm:ring-1 sm:ring-white/10 shrink-0 bg-[#0d1117]">
              {/* Dynamic Island Pill Notch - desktop chassis only */}
              <div className="hidden sm:flex w-28 h-5 bg-black rounded-full mx-auto mt-2 items-center justify-end px-3 z-30 shrink-0 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#161b22] border border-[#30363d]" />
              </div>

              {/* Live Isolated Screen Area */}
              <div className="w-full flex-1 overflow-hidden relative bg-transparent">
                <IframePreview title="Mobile View" className="w-full h-full border-none">
                  <TemplateRenderer portfolio={portfolio} />
                </IframePreview>
              </div>

              {/* Home Indicator Bar - desktop chassis only */}
              <div className="hidden sm:block w-32 h-1 bg-white/40 rounded-full mx-auto my-1.5 z-30 shrink-0" />
            </div>
          ) : viewport === 'tablet' ? (
            /* Authentic Tablet Chassis */
            <div className="w-full max-w-full sm:max-w-[768px] h-full sm:max-h-[92vh] rounded-none sm:rounded-[36px] border-0 sm:border-[12px] border-[#22272e] shadow-2xl flex flex-col relative overflow-hidden sm:ring-1 sm:ring-white/10 shrink-0 bg-[#0d1117]">
              <div className="hidden sm:block w-2 h-2 rounded-full bg-[#30363d] mx-auto mt-2 z-30 shrink-0" />

              <div className="w-full flex-1 overflow-hidden relative bg-transparent">
                <IframePreview title="Tablet View" className="w-full h-full border-none">
                  <TemplateRenderer portfolio={portfolio} />
                </IframePreview>
              </div>

              <div className="hidden sm:block w-36 h-1 bg-white/30 rounded-full mx-auto my-2 z-30 shrink-0" />
            </div>
          ) : (
            /* Desktop Canvas */
            <div className="w-full max-w-7xl h-full rounded-none sm:rounded-2xl border-0 sm:border border-[#30363d] shadow-2xl overflow-hidden bg-transparent">
              <IframePreview title="Desktop View" className="w-full h-full border-none">
                <TemplateRenderer portfolio={portfolio} />
              </IframePreview>
            </div>
          )}
        </section>
      </div>

      {/* Modals */}
      <ResumeUploadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onGenerated={(newPortfolio) => {
          updatePortfolio(newPortfolio);
          setActiveTab('template');
          setMobileScreenMode('preview');
        }}
      />

      <CareerAssistantModal
        isOpen={isCareerModalOpen}
        onClose={() => setIsCareerModalOpen(false)}
        portfolio={portfolio}
        onApplyImprovements={(boosted) => updatePortfolio(boosted)}
      />

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        portfolio={portfolio}
      />
    </div>
  );
}
