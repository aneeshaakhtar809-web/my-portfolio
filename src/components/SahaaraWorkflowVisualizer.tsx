import { useState } from 'react';
import {
  MessageSquare,
  Cpu,
  Send,
  BellRing,
  History,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export function SahaaraWorkflowVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: 'Customer Inquiry',
      subtitle: 'Inbound Multi-Channel Message',
      icon: MessageSquare,
      summary: 'Seller receives an inquiry on WhatsApp or Instagram from an interested buyer.',
      sampleData: {
        channel: 'WhatsApp Inbound',
        sender: 'Fatima K. (Lahore)',
        message: '"Salam! Is the embroidered chiffon dress in Emerald Green available in Medium? What is the price and delivery time to Gulberg?"',
        time: 'Today, 2:14 PM',
      },
      agentAction: 'Captured by Webhook → Sent to Sahaara AI Orchestrator',
    },
    {
      title: 'AI Understanding',
      subtitle: 'Intent & Entity Extraction',
      icon: Cpu,
      summary: 'Sahaara AI parses the text, extracts SKU, size, location, and recognizes customer urgency.',
      sampleData: {
        intent: 'Inventory Availability & Pricing Request',
        entities: {
          item: 'Embroidered Chiffon Dress',
          color: 'Emerald Green',
          size: 'Medium (M)',
          location: 'Gulberg, Lahore',
        },
        confidence: '98.6%',
        sentiment: 'High Purchase Intent',
      },
      agentAction: 'Cross-references seller inventory sheet & shipping table',
    },
    {
      title: 'Suggested Reply',
      subtitle: 'Context-Aware Instant Draft',
      icon: Send,
      summary: 'Generates a polite, natural reply in roman Urdu/English with exact price, sizing, and delivery.',
      sampleData: {
        draft: '"Walaikum Assalam Fatima! Yes, Emerald Green in size Medium is currently in stock (PKR 4,850 with free delivery across Lahore). Delivery to Gulberg takes 24 hours. Would you like me to reserve it for you with Cash on Delivery?"',
        readiness: '1-Click Approve or Quick Edit',
      },
      agentAction: 'Seller clicks "Send" — saves 5 minutes of manual retyping',
    },
    {
      title: 'Follow-up',
      subtitle: 'Automated Friendly Reminder',
      icon: BellRing,
      summary: 'If buyer does not complete checkout within 24h, Sahaara prompts a gentle follow-up reminder.',
      sampleData: {
        trigger: '24 Hours Inactivity Alert',
        automatedNudge: '"Hi Fatima, hope your day is going well! Just checking if you still needed the Emerald Green dress reserved before stock runs out?"',
        outcome: 'Buyer responds: "Yes please! Here is my address..."',
      },
      agentAction: 'Recovers up to 35% of previously abandoned inquiries',
    },
    {
      title: 'Customer History',
      subtitle: 'Unified CRM Profile Creation',
      icon: History,
      summary: 'Auto-logs customer preferences, delivery city, sizes, and order records into simple profile.',
      sampleData: {
        customerProfile: 'Fatima K. (ID #4092)',
        city: 'Lahore (Gulberg)',
        sizePreference: 'Medium',
        totalOrders: '1 completed (PKR 4,850)',
        deliveryPreference: 'Cash on Delivery (Courier: TCS/Leopards)',
      },
      agentAction: 'No manual spreadsheet entry needed by the seller',
    },
    {
      title: 'Repeat Opportunity',
      subtitle: 'Smart Seasonal Re-Engagement',
      icon: TrendingUp,
      summary: 'Identifies repeat purchase opportunities when new seasonal or matching collections launch.',
      sampleData: {
        campaignTrigger: 'Eid Festive Drop / Lawn Collection',
        tailoredRecommendation: '"Special preview for returning customers: New matching shawl collection in Emerald Green now available with 10% loyalty discount."',
        result: 'Repeat purchase secured with zero advertising cost',
      },
      agentAction: 'Maximizes customer lifetime value for small home sellers',
    },
  ];

  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <div id="sahaara-workflow-simulator" className="p-6 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Interactive Workflow Pipeline
            </span>
          </div>
          <h4 className="text-lg font-bold text-white mt-1">
            How Sahaara AI Operates Step-by-Step
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-neutral-400">
            Step {activeStep + 1} of {steps.length}
          </span>
          <button
            type="button"
            onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 transition-colors"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Workflow Step Indicator Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = activeStep === idx;
          const isPassed = activeStep > idx;

          return (
            <button
              key={idx}
              id={`workflow-step-btn-${idx}`}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 relative ${
                isActive
                  ? 'bg-neutral-900 border-emerald-500/70 shadow-md ring-1 ring-emerald-500/30'
                  : isPassed
                  ? 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'
                  : 'bg-neutral-950/60 border-neutral-800/60 hover:border-neutral-700 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-mono font-bold ${
                  isActive ? 'bg-emerald-400 text-neutral-950' : 'bg-neutral-800 text-neutral-400'
                }`}>
                  0{idx + 1}
                </span>
                <StepIcon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
              </div>
              <div className="text-xs font-semibold text-white tracking-tight truncate">
                {step.title}
              </div>
              <div className="text-[10px] text-neutral-400 font-mono truncate">
                {step.subtitle}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Dive Card */}
      <div className="p-5 sm:p-6 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-emerald-400 shadow-sm">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-base font-bold text-white flex items-center gap-2">
                {current.title}
                <span className="text-xs font-mono text-emerald-400 font-normal">
                  — {current.subtitle}
                </span>
              </h5>
              <p className="text-xs text-neutral-300 mt-0.5">
                {current.summary}
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-[11px] font-mono text-emerald-300">
            Node Active
          </span>
        </div>

        {/* Live Payload Visualizer */}
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 font-mono text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-neutral-400 pb-2 border-b border-neutral-800/70">
            <span>SIMULATED WORKFLOW PAYLOAD</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>Automated</span>
            </span>
          </div>

          <pre className="text-neutral-300 overflow-x-auto text-[11px] leading-relaxed whitespace-pre-wrap font-mono">
            {JSON.stringify(current.sampleData, null, 2)}
          </pre>

          <div className="pt-2 border-t border-neutral-800/70 text-[11px] text-emerald-300/90 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Operational Benefit: {current.agentAction}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
