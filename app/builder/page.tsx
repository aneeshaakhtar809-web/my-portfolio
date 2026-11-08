import React from 'react';
import BuilderView from '@/components/builder/BuilderView';
import { sampleDeveloperPortfolio } from '@/lib/sample-data';

export const metadata = {
  title: 'AI Portfolio Builder | Personal Branding OS',
  description: 'Customize, edit, and publish your AI-generated portfolio website in real time.',
};

export default function BuilderPage() {
  return <BuilderView initialPortfolio={sampleDeveloperPortfolio} />;
}

