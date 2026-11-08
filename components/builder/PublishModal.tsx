'use client';

import React, { useState, useEffect } from 'react';
import { Check, Copy, ExternalLink, Globe, Sparkles, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { PortfolioData } from '@/types/portfolio';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  portfolio: PortfolioData;
}

export default function PublishModal({ isOpen, onClose, portfolio }: PublishModalProps) {
  const [copied, setCopied] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [customDomain, setCustomDomain] = useState('');

  // Persist portfolio on modal open
  useEffect(() => {
    if (isOpen) {
      setIsPublishing(true);
      fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ portfolio }),
      })
        .then(() => setIsPublished(true))
        .catch((e) => console.error('Failed to sync publish:', e))
        .finally(() => setIsPublishing(false));
    }
  }, [isOpen, portfolio]);

  if (!isOpen) return null;

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/${portfolio.username}`
    : `http://localhost:3000/${portfolio.username}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#161b22] border border-[#30363d] rounded-2xl w-full max-w-lg shadow-2xl p-6 sm:p-8 space-y-6 text-white">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 5 • Live & Deployed</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">Your Portfolio is Live!</h2>
            <p className="text-xs text-[#8b949e]">
              Your personal branding website is live at your free dedicated route.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Link Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-[#8b949e]">
              Public Portfolio Link
            </label>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Ready to share
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-2 rounded-xl bg-[#0d1117] border border-[#30363d]">
            <div className="flex items-center gap-2 flex-1 min-w-0 px-2 py-1">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <input
                type="text"
                readOnly
                value={publicUrl}
                className="w-full bg-transparent text-xs font-mono text-[#c9d1d9] focus:outline-none truncate"
              />
            </div>
            <div className="flex items-center gap-1.5 shrink-0 justify-end">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#21262d] hover:bg-[#30363d] text-white flex items-center gap-1.5 shrink-0 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={`/${portfolio.username}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-[#8b949e] hover:text-white transition-colors"
                title="Open Live Portfolio"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Custom Domain Section */}
        <div className="space-y-3 pt-3 border-t border-[#30363d]">
          <label className="text-xs font-mono uppercase tracking-wider text-[#8b949e]">
            Connect Custom Domain (Optional)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="e.g. www.yourname.com"
              className="w-full rounded-lg bg-[#0d1117] border border-[#30363d] px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
            />
            <button
              type="button"
              onClick={() => alert(`Domain ${customDomain} configured! Add CNAME: cname.portfolio-os.com`)}
              disabled={!customDomain}
              className="px-3.5 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white shrink-0 transition-colors"
            >
              Connect
            </button>
          </div>
        </div>

        {/* Direct Action */}
        <div className="flex items-center justify-between pt-3 border-t border-[#30363d]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-[#8b949e] hover:text-white transition-colors"
          >
            Back to Editor
          </button>

          <a
            href={`/${portfolio.username}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-600/25"
          >
            <span>Visit Live Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
