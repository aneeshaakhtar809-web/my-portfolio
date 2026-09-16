import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ExperienceEducation } from './components/ExperienceEducation';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { AiLabSection } from './components/AiLabSection';
import { ConnectSection } from './components/ConnectSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';
import { InternshipLetterModal } from './components/InternshipLetterModal';

export default function App() {
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isInternshipLetterOpen, setIsInternshipLetterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Navigation */}
      <Navbar
        onOpenCv={() => setIsCvOpen(true)}
        onOpenInternshipLetter={() => setIsInternshipLetterOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenCv={() => setIsCvOpen(true)}
          onOpenInternshipLetter={() => setIsInternshipLetterOpen(true)}
        />

        {/* About Section */}
        <About />

        {/* Experience & Education Section */}
        <ExperienceEducation
          onOpenInternshipLetter={() => setIsInternshipLetterOpen(true)}
        />

        {/* Skills Section */}
        <SkillsSection />

        {/* Featured Projects with Flagship Sahaara AI */}
        <ProjectsSection />

        {/* AI Lab Section */}
        <AiLabSection />

        {/* Connect & Profiles Section (GitHub, LinkedIn, Resume, Internship Letter) */}
        <ConnectSection
          onOpenCv={() => setIsCvOpen(true)}
          onOpenInternshipLetter={() => setIsInternshipLetterOpen(true)}
        />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenCv={() => setIsCvOpen(true)}
        onOpenInternshipLetter={() => setIsInternshipLetterOpen(true)}
      />

      {/* Curriculum Vitae Modal */}
      <CvModal
        isOpen={isCvOpen}
        onClose={() => setIsCvOpen(false)}
        onOpenInternshipLetter={() => setIsInternshipLetterOpen(true)}
      />

      {/* Official CodeAlpha Internship Offer Letter Modal */}
      <InternshipLetterModal
        isOpen={isInternshipLetterOpen}
        onClose={() => setIsInternshipLetterOpen(false)}
      />
    </div>
  );
}
