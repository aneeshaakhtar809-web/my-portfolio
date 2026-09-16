import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { EXPERIENCES, EDUCATION_LIST, CERTIFICATIONS, INTERNSHIP_LETTER } from '../data/portfolioData';

interface ExperienceEducationProps {
  onOpenInternshipLetter?: () => void;
}

export function ExperienceEducation({ onOpenInternshipLetter }: ExperienceEducationProps) {
  return (
    <section id="experience" className="py-20 bg-neutral-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
          {/* Left Column: Experience & Internship */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium text-emerald-400">
                <Briefcase className="w-3.5 h-3.5" />
                <span>PRACTICAL WORK & INTERNSHIP</span>
              </div>
              <h2 id="experience-heading" className="text-3xl font-extrabold text-white tracking-tight">
                Experience
              </h2>
            </div>

            <div className="space-y-6" id="experience-list">
              {EXPERIENCES.map((item) => {
                const isCodeAlpha = item.id.includes('codealpha');
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={`p-6 rounded-2xl border transition-all duration-200 relative group ${
                      isCodeAlpha
                        ? 'bg-neutral-900/90 border-blue-900/50 hover:border-blue-700/70 shadow-lg shadow-blue-950/20'
                        : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    {/* Card Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`inline-block text-[11px] font-mono uppercase font-semibold tracking-wider ${
                            isCodeAlpha ? 'text-blue-400' : 'text-emerald-400'
                          }`}>
                            {item.type === 'freelance' ? 'Independent Practice' : 'Virtual Internship'}
                          </span>
                          {isCodeAlpha && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-[10px] font-mono font-semibold text-blue-300">
                              VERIFIED CREDENTIAL
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                          {item.role}
                        </h3>
                        {item.company && (
                          <p className="text-sm font-medium text-neutral-300">
                            {item.company}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Summary / Description */}
                    {item.description && (
                      <p className="text-sm text-neutral-300 mb-4 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {/* Responsibilities list if present */}
                    {item.responsibilities && (
                      <div className="space-y-2 pt-2 border-t border-neutral-800/80">
                        <span className="text-xs uppercase font-mono tracking-wider text-neutral-400 font-semibold block">
                          Key Work:
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {item.responsibilities.map((resp, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2.5 text-xs text-neutral-300"
                            >
                              <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                isCodeAlpha ? 'text-blue-400' : 'text-emerald-400'
                              }`} />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action button specifically for CodeAlpha internship letter */}
                    {isCodeAlpha && onOpenInternshipLetter && (
                      <div className="mt-5 pt-4 border-t border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-[11px] font-mono text-neutral-400">
                          Student ID: <span className="text-blue-300 font-semibold">{INTERNSHIP_LETTER.studentId}</span>
                        </div>
                        <button
                          type="button"
                          id="exp-open-letter-btn"
                          onClick={onOpenInternshipLetter}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 border border-blue-700/60 text-xs font-semibold font-mono text-blue-200 transition-colors shadow-sm"
                        >
                          <ShieldCheck className="w-4 h-4 text-blue-400" />
                          <span>View Official Offer Letter</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Education & Professional Training */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-mono font-medium text-emerald-400">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>ACADEMICS & CERTIFICATION</span>
              </div>
              <h2 id="education-heading" className="text-3xl font-extrabold text-white tracking-tight">
                Education
              </h2>
            </div>

            <div className="space-y-6" id="education-list">
              {EDUCATION_LIST.map((item) => (
                <div
                  key={item.id}
                  id={item.id}
                  className={`p-6 rounded-2xl border transition-all duration-200 ${
                    item.type === 'training'
                      ? 'bg-neutral-900/90 border-emerald-800/40 shadow-sm'
                      : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="inline-block text-[11px] font-mono uppercase font-semibold text-emerald-400 tracking-wider mb-1">
                        {item.type === 'training'
                          ? 'Professional Training'
                          : item.type === 'degree'
                          ? 'Graduation'
                          : 'Secondary Education'}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {item.degree}
                      </h3>
                      <p className="text-sm font-semibold text-neutral-300 mt-0.5">
                        {item.institution}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-center text-emerald-400 shrink-0">
                      {item.type === 'training' ? (
                        <Award className="w-4 h-4" />
                      ) : (
                        <GraduationCap className="w-4 h-4" />
                      )}
                    </div>
                  </div>

                  {item.detail && (
                    <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                      {item.detail}
                    </p>
                  )}

                  {/* Topics covered for training */}
                  {item.topics && (
                    <div className="mt-4 pt-3 border-t border-neutral-800/80">
                      <span className="text-[11px] uppercase font-mono tracking-wider text-neutral-400 font-semibold block mb-2">
                        Training Focused On:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {item.topics.map((topic, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-2 rounded-lg bg-neutral-950/80 border border-neutral-800/80 text-xs text-neutral-200 font-medium"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Certifications Grid */}
        <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                <Award className="w-4 h-4" />
                <span>CERTIFICATIONS & CREDENTIALS</span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Recognized Certifications & Professional Programs
              </h3>
            </div>
            <span className="text-xs font-serif italic text-neutral-400">
              "Continuous Learning a Brighter Tomorrow"
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                id={cert.id}
                className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                      {cert.year}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">
                      {cert.issuer}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-normal">
                    {cert.description}
                  </p>
                </div>

                {cert.id === 'cert-codealpha' && onOpenInternshipLetter && (
                  <button
                    type="button"
                    onClick={onOpenInternshipLetter}
                    className="w-full text-center text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 pt-2 border-t border-neutral-800 flex items-center justify-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>View Letter</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
