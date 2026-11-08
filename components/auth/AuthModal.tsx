'use client';

import React, { useState } from 'react';
import { X, Mail, Lock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
  onSuccess?: (user: { name: string; email: string }) => void;
}

export default function AuthModal({ isOpen, onClose, defaultMode = 'signup', onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(defaultMode);
  const [email, setEmail] = useState('annie.rajpoot@example.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Annie Rajpoot');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onSuccess) {
        onSuccess({ name, email });
      }
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#161b22] border border-[#30363d] rounded-3xl w-full max-w-md p-6 sm:p-8 space-y-6 text-white shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PortfolioOS Cloud</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">
            {mode === 'signup' ? 'Create your SaaS account' : 'Welcome back to PortfolioOS'}
          </h2>
          <p className="text-xs text-[#8b949e]">
            {mode === 'signup'
              ? 'Launch your professional personal branding site in under 60 seconds.'
              : 'Sign in to manage your published portfolios and view analytics.'}
          </p>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleSubmit({ preventDefault: () => {} } as any)}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] text-white flex items-center justify-center gap-2.5 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <div className="flex items-center gap-3 text-xs text-[#8b949e]">
          <div className="h-px bg-[#30363d] flex-1" />
          <span>or with email</span>
          <div className="h-px bg-[#30363d] flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-[11px] font-mono text-[#8b949e] uppercase">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Annie Rajpoot"
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-[#8b949e] uppercase">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="annie.rajpoot@example.com"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono text-[#8b949e] uppercase">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
          >
            <span>{mode === 'signup' ? 'Start Free — Launch Portfolio' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#8b949e]">
          {mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-blue-400 hover:underline font-semibold"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don&apos;t have an account yet?{' '}
              <button
                type="button"
                onClick={() => setMode('signup')}
                className="text-blue-400 hover:underline font-semibold"
              >
                Sign Up Free
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

