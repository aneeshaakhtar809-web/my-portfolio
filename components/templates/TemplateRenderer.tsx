'use client';

import React from 'react';
import { PortfolioData } from '@/types/portfolio';
import DeveloperTemplate from './developer/DeveloperTemplate';
import DesignerTemplate from './designer/DesignerTemplate';
import FreelancerTemplate from './freelancer/FreelancerTemplate';
import MinimalTemplate from './minimal/MinimalTemplate';

interface TemplateRendererProps {
  portfolio: PortfolioData;
}

export default function TemplateRenderer({ portfolio }: TemplateRendererProps) {
  const templateId = portfolio?.theme?.templateId || 'developer-dark';

  switch (templateId) {
    case 'developer-dark':
      return <DeveloperTemplate portfolio={portfolio} />;
    case 'designer-creative':
      return <DesignerTemplate portfolio={portfolio} />;
    case 'freelancer-services':
      return <FreelancerTemplate portfolio={portfolio} />;
    case 'minimal-recruiter':
      return <MinimalTemplate portfolio={portfolio} />;
    default:
      return <DeveloperTemplate portfolio={portfolio} />;
  }
}

