'use client';

import React, { useState } from 'react';
import { Sparkles, X, Loader2, Wand2, UploadCloud, Check } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { PortfolioData, TemplateId } from '@/types/portfolio';

interface ResumeUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerated: (data: PortfolioData) => void;
}

export default function ResumeUploadModal({ isOpen, onClose, onGenerated }: ResumeUploadModalProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'github'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profession, setProfession] = useState('Full Stack & AI Systems Engineer');
  const [templateId, setTemplateId] = useState<TemplateId>('developer-dark');
  const [githubUsername, setGithubUsername] = useState('annierajpoot');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setProfession(cleanName || 'Software Engineer');
    }
  };

  const handleGenerate = async () => {
    if (activeTab === 'github') {
      if (!githubUsername.trim()) {
        setError('Please enter a GitHub username');
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const ghRes = await fetch('/api/sync-github', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: githubUsername }),
        });
        const ghData = await ghRes.json();
        if (!ghRes.ok) throw new Error(ghData.error || 'Failed to sync GitHub');

        const promptFromGh = `Name: ${ghData.githubProfile.name}
Profession: ${profession || 'Software Engineer'}
GitHub: https://github.com/${githubUsername}
Bio: ${ghData.githubProfile.bio || 'Software engineer passionate about open source and distributed software architecture.'}
Location: ${ghData.githubProfile.location || 'Remote'}
Projects from GitHub Repositories:
${ghData.extractedProjects
  .map(
    (p: any) =>
      `- Title: ${p.title}\n  Description: ${p.description}\n  Tech: ${p.technologies.join(', ')}\n  Link: ${p.githubUrl}`
  )
  .join('\n')}
`;
        const genRes = await fetch('/api/generate-portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeText: promptFromGh,
            profession,
            templateId,
          }),
        });
        const genData = await genRes.json();
        if (!genRes.ok) throw new Error(genData.error || 'Failed to generate');

        if (typeof window !== 'undefined') {
          sessionStorage.setItem('current_portfolio', JSON.stringify(genData.portfolio));
          localStorage.setItem('portfolio_draft', JSON.stringify(genData.portfolio));
        }

        onGenerated(genData.portfolio);
        onClose();
      } catch (err: any) {
        setError(err.message || 'Error syncing from GitHub');
      } finally {
        setLoading(false);
      }
      return;
    }

    if (!resumeText.trim() && !selectedFile) {
      setError('Please provide a resume by pasting text, uploading a PDF file, or loading your sample.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let response: Response;

      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('profession', profession);
        formData.append('templateId', templateId);

        response = await fetch('/api/generate-portfolio', {
          method: 'POST',
          body: formData,
        });
      } else {
        response = await fetch('/api/generate-portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            resumeText,
            profession,
            templateId,
          }),
        });
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate portfolio');
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('current_portfolio', JSON.stringify(data.portfolio));
        localStorage.setItem('portfolio_draft', JSON.stringify(data.portfolio));
      }

      await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio: data.portfolio }),
      }).catch(() => {});

      onGenerated(data.portfolio);
      onClose();
    } catch (err: any) {
      setError(err?.message || 'Something went wrong while generating.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadSample = () => {
    setSelectedFile(null);
    setResumeText(`Annie Rajpoot
Full Stack & AI Systems Engineer
Email: annie.rajpoot@example.com | GitHub: github.com/annierajpoot | LinkedIn: linkedin.com/in/annierajpoot

SUMMARY:
Results-driven software engineer with 5+ years of experience in distributed systems, Next.js 16, Go, and generative AI. Designed low-latency search systems and scaled microservices to 250M+ requests/month.

EXPERIENCE:
ScaleAI Systems - Senior Software Engineer (2023 - Present)
- Architected inference caching engine reducing LLM API costs by 41%.
- Built real-time monitoring microservices handling 250M monthly requests with 99.98% uptime.
- Led technical design reviews and established CI/CD pipelines across 4 engineering pods.

CloudVector Labs - Full Stack Engineer (2021 - 2023)
- Shipped high-performance React/Next.js dashboard serving 60k active developers.
- Cut frontend bundle size by 32% and achieved perfect 100 Lighthouse performance scores.

SKILLS:
TypeScript, Next.js, React, Node.js, Go, Python, PostgreSQL, Redis, Docker, Kubernetes, AWS, Gemini API

EDUCATION:
B.S. in Computer Science & Software Engineering (2017 - 2021)`);
    setProfession('Full Stack & AI Systems Engineer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl p-4 sm:p-8 space-y-4 sm:space-y-6 text-white">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1 • Resume & Identity Extraction</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight">AI 60-Second Portfolio Launch</h2>
            <p className="text-xs sm:text-sm text-[#8b949e]">
              Extract your career experience via resume PDF, notes, or direct GitHub sync.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
            {error}
          </div>
        )}

        {/* Tab Toggle */}
        <div className="flex border-b border-[#30363d] text-xs">
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 px-3 sm:px-4 font-semibold border-b-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-[#8b949e] hover:text-white'
            }`}
          >
            Resume Upload / Text
          </button>
          <button
            onClick={() => setActiveTab('github')}
            className={`py-2 px-3 sm:px-4 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'github'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-[#8b949e] hover:text-white'
            }`}
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>Sync from GitHub</span>
          </button>
        </div>

        {activeTab === 'upload' ? (
          <div className="space-y-4">
            {/* File Upload Drop Zone */}
            <div className="relative border-2 border-dashed border-[#30363d] hover:border-blue-500/50 rounded-xl p-4 sm:p-5 text-center space-y-2 bg-[#0d1117] transition-colors">
              <input
                type="file"
                accept=".pdf,.txt,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-9 h-9 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/20">
                <UploadCloud className="w-4 h-4" />
              </div>
              {selectedFile ? (
                <div className="space-y-1">
                  <p className="text-xs font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="w-4 h-4" /> Selected: {selectedFile.name}
                  </p>
                  <p className="text-[10px] text-[#8b949e]">Click or drag another file to replace</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-white">
                    Drop your Resume PDF here or <span className="text-blue-400 underline">browse files</span>
                  </p>
                  <p className="text-[10px] text-[#8b949e]">Supports PDF, TXT up to 10MB</p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#8b949e]">
              <div className="h-px bg-[#30363d] flex-1" />
              <span className="text-[10px] font-mono">OR PASTE TEXT</span>
              <div className="h-px bg-[#30363d] flex-1" />
            </div>

            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <label className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                  Resume Notes
                </label>
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="text-xs font-mono text-blue-400 hover:text-blue-300 underline text-left sm:text-right"
                >
                  Insert Annie Rajpoot Resume
                </button>
              </div>

              <textarea
                rows={4}
                value={resumeText}
                onChange={(e) => {
                  setResumeText(e.target.value);
                  if (selectedFile) setSelectedFile(null);
                }}
                placeholder="Paste your resume text here (Work history, education, skills, projects)..."
                className="w-full rounded-xl bg-[#0d1117] border border-[#30363d] p-3 text-xs font-mono text-[#c9d1d9] focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 space-y-1">
              <span className="font-bold">Instant GitHub Portfolio Sync</span>
              <p className="text-[11px] text-[#8b949e]">
                We fetch your public repos, top languages, stargazers count, and bio to craft an engineering portfolio card set.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
                GitHub Username
              </label>
              <div className="flex items-center bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2 text-xs">
                <span className="text-[#8b949e] font-mono mr-1">github.com/</span>
                <input
                  type="text"
                  value={githubUsername}
                  onChange={(e) => setGithubUsername(e.target.value)}
                  placeholder="annierajpoot"
                  className="w-full bg-transparent text-white font-mono focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
              Target Title / Profession
            </label>
            <input
              type="text"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              placeholder="e.g. Full Stack & AI Systems Engineer"
              className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-[#8b949e]">
              Initial Template
            </label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value as TemplateId)}
              className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="developer-dark">Developer (Dark & Technical)</option>
              <option value="designer-creative">Designer (Creative Case Studies)</option>
              <option value="freelancer-services">Freelancer (Services & Proof)</option>
              <option value="minimal-recruiter">Minimalist (Clean & Recruiter Friendly)</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 pt-3 sm:pt-4 border-t border-[#30363d]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-[#8b949e] hover:text-white transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all disabled:opacity-50 shadow-md shadow-blue-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Launch in 60s</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
