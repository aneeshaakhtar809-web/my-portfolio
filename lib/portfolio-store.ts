import { PortfolioData } from '@/types/portfolio';
import {
  sampleDeveloperPortfolio,
  sampleDesignerPortfolio,
  sampleFreelancerPortfolio,
} from './sample-data';
import fs from 'fs';
import path from 'path';

// Local storage file for persisted published portfolios
const DATA_FILE = path.join(process.cwd(), '.portfolio-cache.json');
const ANALYTICS_FILE = path.join(process.cwd(), '.analytics-cache.json');

// In-memory cache seeded with Annie Rajpoot as primary
const memoryStore = new Map<string, PortfolioData>([
  ['annierajpoot', sampleDeveloperPortfolio],
  ['annie', sampleDeveloperPortfolio],
  ['elenarossi', sampleDesignerPortfolio],
  ['marcusvance', sampleFreelancerPortfolio],
]);

export interface AnalyticsRecord {
  pageViews: number;
  projectClicks: number;
  resumeDownloads: number;
  contactInquiries: number;
  lastVisited?: string;
  sources: { source: string; count: number }[];
}

const analyticsStore = new Map<string, AnalyticsRecord>([
  [
    'annierajpoot',
    {
      pageViews: 1482,
      projectClicks: 520,
      resumeDownloads: 114,
      contactInquiries: 19,
      lastVisited: new Date().toISOString(),
      sources: [
        { source: 'LinkedIn Profile Link', count: 780 },
        { source: 'GitHub Repositories', count: 420 },
        { source: 'Job Applications', count: 190 },
        { source: 'Direct / Network', count: 92 },
      ],
    },
  ],
]);

function loadFromDisk() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
      for (const [key, val] of Object.entries(data)) {
        memoryStore.set(key.toLowerCase(), val as PortfolioData);
      }
    }
    if (fs.existsSync(ANALYTICS_FILE)) {
      const data = JSON.parse(fs.readFileSync(ANALYTICS_FILE, 'utf-8'));
      for (const [key, val] of Object.entries(data)) {
        analyticsStore.set(key.toLowerCase(), val as AnalyticsRecord);
      }
    }
  } catch (e) {
    console.error('Failed to load portfolio cache from disk:', e);
  }
}

function saveToDisk() {
  try {
    const obj: Record<string, PortfolioData> = {};
    for (const [key, val] of memoryStore.entries()) {
      obj[key] = val;
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(obj, null, 2), 'utf-8');

    const aObj: Record<string, AnalyticsRecord> = {};
    for (const [key, val] of analyticsStore.entries()) {
      aObj[key] = val;
    }
    fs.writeFileSync(ANALYTICS_FILE, JSON.stringify(aObj, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to save portfolio cache to disk:', e);
  }
}

loadFromDisk();

export function savePortfolio(portfolio: PortfolioData): void {
  if (!portfolio.username) return;
  const key = portfolio.username.toLowerCase();
  memoryStore.set(key, portfolio);
  saveToDisk();
}

export function getPortfolio(username: string): PortfolioData | null {
  const key = username.toLowerCase();
  if (memoryStore.has(key)) {
    return memoryStore.get(key)!;
  }

  if (key === 'annie' || key === 'annierajpoot') return memoryStore.get('annierajpoot') || null;
  if (key === 'elena') return memoryStore.get('elenarossi') || null;
  if (key === 'marcus') return memoryStore.get('marcusvance') || null;

  return null;
}

export function recordAnalyticsEvent(
  username: string,
  type: 'pageview' | 'project_click' | 'resume_download' | 'contact_inquiry',
  source?: string
): AnalyticsRecord {
  const key = username.toLowerCase();
  const current: AnalyticsRecord = analyticsStore.get(key) || {
    pageViews: 1,
    projectClicks: 0,
    resumeDownloads: 0,
    contactInquiries: 0,
    sources: [],
  };

  if (type === 'pageview') current.pageViews += 1;
  if (type === 'project_click') current.projectClicks += 1;
  if (type === 'resume_download') current.resumeDownloads += 1;
  if (type === 'contact_inquiry') current.contactInquiries += 1;

  current.lastVisited = new Date().toISOString();

  if (source) {
    const existingSource = current.sources.find((s) => s.source === source);
    if (existingSource) {
      existingSource.count += 1;
    } else {
      current.sources.push({ source, count: 1 });
    }
  }

  analyticsStore.set(key, current);
  saveToDisk();
  return current;
}

export function getAnalyticsRecord(username: string): AnalyticsRecord {
  const key = username.toLowerCase();
  return (
    analyticsStore.get(key) || {
      pageViews: 1,
      projectClicks: 0,
      resumeDownloads: 0,
      contactInquiries: 0,
      sources: [
        { source: 'Direct Visit', count: 1 },
      ],
    }
  );
}
