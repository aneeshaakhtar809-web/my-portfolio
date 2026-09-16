import { useState } from 'react';
import { X, Printer, Download, Check, Copy, Award, ShieldCheck, ExternalLink, Calendar, User, Hash, Mail, Phone, MapPin } from 'lucide-react';
import { INTERNSHIP_LETTER } from '../data/portfolioData';

interface InternshipLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InternshipLetterModal({ isOpen, onClose }: InternshipLetterModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `CODEALPHA - INTERNSHIP OFFER LETTER
Date: ${INTERNSHIP_LETTER.date}
Student ID: ${INTERNSHIP_LETTER.studentId}
Candidate Name: ${INTERNSHIP_LETTER.candidateName}
Position: ${INTERNSHIP_LETTER.position}
Duration: ${INTERNSHIP_LETTER.startDate} to ${INTERNSHIP_LETTER.endDate}
Mode: ${INTERNSHIP_LETTER.mode}

Selection confirmation for Virtual Artificial Intelligence Internship at CodeAlpha.
Signed by: ${INTERNSHIP_LETTER.signatory.name}, ${INTERNSHIP_LETTER.signatory.title}
Verification: ${INTERNSHIP_LETTER.contact.email} | ${INTERNSHIP_LETTER.contact.phone}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      id="internship-letter-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[94vh] flex flex-col">
        {/* Modal Top Action Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 bg-neutral-950 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-white font-mono block">
                Official Internship Offer Letter
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400">
                CodeAlpha • ID: {INTERNSHIP_LETTER.studentId}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              id="letter-copy-btn"
              onClick={handleCopyText}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 transition-colors"
              title="Copy verification details"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <button
              type="button"
              id="letter-print-btn"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-neutral-950 text-xs font-bold font-mono transition-colors shadow-sm"
              title="Print or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              id="letter-close-btn"
              onClick={onClose}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors ml-1"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Offer Letter Document Sheet (Faithful to the original document) */}
        <div
          id="internship-letter-sheet"
          className="p-6 sm:p-10 md:p-12 overflow-y-auto bg-white text-neutral-900 font-sans shadow-inner selection:bg-blue-100 print:p-0 print:m-0 print:shadow-none"
        >
          {/* Organization Header */}
          <div className="flex flex-col items-center justify-center text-center pb-6 border-b-2 border-neutral-900">
            {/* CodeAlpha Brand Emblem */}
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-700 to-cyan-500 flex items-center justify-center shadow-md text-white font-bold text-xl">
                C
              </div>
              <div className="text-left">
                <span className="text-2xl sm:text-3xl font-black tracking-wider text-blue-900 leading-none block font-sans">
                  CODE<span className="text-cyan-600">ALPHA</span>
                </span>
                <span className="text-[10px] tracking-[0.25em] text-neutral-600 font-semibold uppercase block mt-0.5">
                  YOUR DREAM OUR PASSION
                </span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-neutral-900 tracking-tight uppercase mt-4">
              INTERNSHIP OFFER LETTER
            </h1>
          </div>

          {/* Letter Metadata Strip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-4 border-b border-neutral-300 text-xs sm:text-sm font-semibold text-neutral-800">
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-500">Date:</span>
              <span className="font-mono text-neutral-950 font-bold">{INTERNSHIP_LETTER.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-neutral-500">Student ID:</span>
              <span className="font-mono text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200 font-bold">
                {INTERNSHIP_LETTER.studentId}
              </span>
            </div>
          </div>

          {/* Candidate Salutation */}
          <div className="pt-5 space-y-3">
            <div className="text-sm sm:text-base font-bold text-neutral-950">
              Name: <span className="text-blue-950 text-lg sm:text-xl font-extrabold">{INTERNSHIP_LETTER.candidateName}</span>
            </div>
            <p className="text-sm sm:text-base text-neutral-800 font-medium">
              Welcome to CodeAlpha.
            </p>
          </div>

          {/* Formal Body Paragraphs */}
          <div className="space-y-4 pt-3 text-xs sm:text-sm text-neutral-800 leading-relaxed text-justify">
            <p>
              <strong className="text-neutral-950">Congratulations!</strong> We are happy to offer you the position of{' '}
              <strong className="text-blue-900 font-bold">Artificial Intelligence Intern</strong> at CodeAlpha. This letter confirms your selection for our{' '}
              <strong>Virtual Artificial Intelligence Internship</strong>, starting from{' '}
              <span className="font-bold underline decoration-blue-500 decoration-2">{INTERNSHIP_LETTER.startDate}</span> to{' '}
              <span className="font-bold underline decoration-blue-500 decoration-2">{INTERNSHIP_LETTER.endDate}</span>.
            </p>

            <p>
              The internship will be conducted completely online and will give you an opportunity to work on practical assignments and projects related to Artificial Intelligence. You will be able to apply what you already know, improve your technical skills and gain hands-on experience.
            </p>

            <p>
              Throughout the internship, you are expected to participate actively, complete the assigned tasks on time and follow the guidelines shared by CodeAlpha. We also expect you to maintain professional conduct and communicate responsibly during the internship.
            </p>

            <p className="bg-neutral-50 p-3 rounded-lg border border-neutral-200 text-[11px] sm:text-xs italic text-neutral-700">
              A performance-based stipend may be provided depending on your performance, participation, contribution and completion of assigned work, as per the applicable terms of the internship program.
            </p>

            <p>
              We are pleased to have you join us and look forward to your participation. We hope this internship will be a valuable and enjoyable experience for you.
            </p>

            <p className="font-medium text-neutral-900">
              We wish you all the best for your internship with CodeAlpha.
            </p>

            <p className="pt-2 font-medium">
              Best regards,
            </p>
          </div>

          {/* Official Signatures & Verification Seals */}
          <div className="pt-8 pb-6 border-b border-neutral-300">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
              {/* Signatory Column */}
              <div className="space-y-1">
                {/* Stylized Swati Srivastava signature */}
                <div className="h-12 flex items-center">
                  <span className="font-serif italic text-2xl text-blue-950 font-bold tracking-tight select-none">
                    Swati Sri
                  </span>
                </div>
                <div className="border-t border-neutral-900 pt-1.5">
                  <h4 className="font-bold text-neutral-950 text-sm">
                    {INTERNSHIP_LETTER.signatory.name}
                  </h4>
                  <p className="text-xs text-neutral-600 font-medium">
                    {INTERNSHIP_LETTER.signatory.title}
                  </p>
                </div>
              </div>

              {/* CodeAlpha Seal */}
              <div className="flex justify-center sm:justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-700 flex flex-col items-center justify-center text-center p-1 text-blue-900 shadow-sm bg-blue-50/50 rotate-[-4deg]">
                  <span className="text-[7px] font-mono uppercase font-bold tracking-widest text-blue-800">
                    SOFTWARE DEV
                  </span>
                  <div className="my-0.5 px-1.5 py-0.5 bg-blue-700 text-white font-black text-[9px] rounded-sm uppercase tracking-wider">
                    CODE ALPHA
                  </div>
                  <span className="text-[7px] font-mono font-bold text-blue-800">
                    VERIFIED SEAL
                  </span>
                </div>
              </div>

              {/* Ministry of Corporate Affairs / Govt of India acknowledgement badge */}
              <div className="flex flex-col items-start sm:items-end justify-end text-left sm:text-right space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-100 border border-neutral-300 text-[10px] font-bold text-neutral-800 uppercase">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Govt. Recognized Program</span>
                </div>
                <p className="text-[10px] font-mono text-neutral-500 max-w-[200px]">
                  Ministry of Corporate Affairs Registration Compliant
                </p>
              </div>
            </div>
          </div>

          {/* Official Document Footer Contact Strip */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-neutral-600">
            <div className="flex items-center gap-1.5">
              <Phone className="w-3 h-3 text-neutral-700" />
              <span>{INTERNSHIP_LETTER.contact.phone}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-neutral-700" />
              <a href={`mailto:${INTERNSHIP_LETTER.contact.email}`} className="text-blue-700 hover:underline">
                {INTERNSHIP_LETTER.contact.email}
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-neutral-700" />
              <span>Address: {INTERNSHIP_LETTER.contact.address}</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Verification Summary */}
        <div className="px-6 py-3 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-300">Verified Selection Document • CodeAlpha Virtual Internship</span>
          </div>
          <span className="text-neutral-500 text-[11px]">
            Candidate: Aneesha Akhtar ({INTERNSHIP_LETTER.studentId})
          </span>
        </div>
      </div>
    </div>
  );
}
