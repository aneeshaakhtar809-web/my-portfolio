import React from 'react';
import { Metadata } from 'next';
import TemplateRenderer from '@/components/templates/TemplateRenderer';
import AnalyticsTracker from '@/components/analytics/AnalyticsTracker';
import { getPortfolio } from '@/lib/portfolio-store';
import { sampleDeveloperPortfolio } from '@/lib/sample-data';
import { PortfolioData } from '@/types/portfolio';

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

function resolvePortfolio(username: string): PortfolioData {
  const existing = getPortfolio(username);
  if (existing) {
    return existing;
  }

  const clean = username.toLowerCase();
  const formattedName = clean
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    ...sampleDeveloperPortfolio,
    username: clean,
    personal: {
      ...sampleDeveloperPortfolio.personal,
      fullName: formattedName,
      profession: 'Software Engineer & Builder',
    },
    seo: {
      metaTitle: `${formattedName} | Professional Portfolio`,
      metaDescription: `Engineering projects, skills, and background of ${formattedName}.`,
      keywords: ['Portfolio', formattedName, 'Developer', 'Engineer'],
    },
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const portfolio = resolvePortfolio(username);

  return {
    title: portfolio.seo?.metaTitle || `${portfolio.personal.fullName} | Portfolio`,
    description: portfolio.seo?.metaDescription || portfolio.personal.bio,
    keywords: portfolio.seo?.keywords,
  };
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const portfolio = resolvePortfolio(username);

  return (
    <>
      <AnalyticsTracker username={portfolio.username} />
      <TemplateRenderer portfolio={portfolio} />
    </>
  );
}
