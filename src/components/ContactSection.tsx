import { useState, FormEvent } from 'react';
import { Mail, Copy, Check, Send, Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formProject, setFormProject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formEmail || !formMessage) return;

    // Compose mailto
    const subject = encodeURIComponent(
      `AI Project Inquiry from ${formName || 'Website Visitor'}: ${formProject || 'General'}`
    );
    const body = encodeURIComponent(
      `Hi Aneesha,\n\nName: ${formName}\nEmail: ${formEmail}\nProject Type: ${formProject}\n\nMessage:\n${formMessage}\n\nSent via Portfolio Website`
    );

    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setSubmittedStatus('Inquiry ready! Your email client was opened, or you can email directly.');
  };

  return (
    <section id="contact" className="py-20 bg-neutral-900/40 border-t border-neutral-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A CONVERSATION</span>
          </div>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact
          </h2>
          <h3 id="contact-subheading" className="text-2xl sm:text-3xl font-bold text-emerald-400">
            Let's Build Intelligent AI Solutions
          </h3>
          <p id="contact-tagline" className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Have an AI idea or automation challenge? Let's create a practical solution together.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold block">
                Direct Email
              </span>
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <div className="flex items-center gap-2.5 truncate">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-sm font-mono text-neutral-200 truncate select-all">
                    {PERSONAL_INFO.email}
                  </span>
                </div>
                <button
                  type="button"
                  id="btn-copy-email"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-neutral-400">
                Direct mailto link:{' '}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-emerald-400 hover:underline"
                >
                  Click here to email directly
                </a>
              </p>
            </div>

            {/* Location & Availability Card */}
            <div className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold block">
                Location & Availability
              </span>
              <div className="space-y-2 text-xs text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{PERSONAL_INFO.location} (Open to Global Remote Projects)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Typically responds within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Services Highlight */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-2">
              <h5 className="text-sm font-bold text-emerald-300">
                Specialized In:
              </h5>
              <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-inside">
                <li>Custom AI Agents & Workflow Automation (n8n, Zapier)</li>
                <li>Customer Chat & Growth Assistants (WhatsApp/Instagram)</li>
                <li>RAG Knowledge Bases & Internal Doc Assistants</li>
                <li>Rapid No-Code Web & Commerce MVP Prototyping</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl space-y-5">
            <div className="border-b border-neutral-800 pb-3">
              <h4 className="text-lg font-bold text-white tracking-tight">
                Send a Message or Project Brief
              </h4>
              <p className="text-xs text-neutral-400 mt-1">
                Fill in your details below and we can explore creating a practical AI solution.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="text-xs font-mono text-neutral-300">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Ayesha Khan"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="text-xs font-mono text-neutral-300">
                    Your Email <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-project" className="text-xs font-mono text-neutral-300">
                  Project or Automation Type
                </label>
                <select
                  id="contact-project"
                  value={formProject}
                  onChange={(e) => setFormProject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-neutral-200 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50"
                >
                  <option value="AI Agent Workflow">AI Agent Workflow</option>
                  <option value="Customer Assistant / Sahaara AI Integration">Customer Assistant / WhatsApp Automation</option>
                  <option value="Generative AI & RAG Knowledge System">Generative AI & RAG Knowledge System</option>
                  <option value="No-Code Web Solution (Bubble/Framer)">No-Code Web Solution (Bubble/Framer)</option>
                  <option value="Other AI Consulting">Other AI Consulting</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="text-xs font-mono text-neutral-300">
                  Message / Goal <span className="text-emerald-400">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Tell me about your business challenge, desired workflow automation, or idea..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/50"
                />
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-sm shadow-emerald-500/20"
              >
                <span>Send Project Inquiry</span>
                <Send className="w-4 h-4" />
              </button>

              {submittedStatus && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-xs text-emerald-300 text-center font-mono">
                  {submittedStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
