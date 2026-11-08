'use client';

import { useEffect } from 'react';

interface AnalyticsTrackerProps {
  username: string;
}

export default function AnalyticsTracker({ username }: AnalyticsTrackerProps) {
  useEffect(() => {
    // Record page view on mount
    try {
      const referrer = typeof document !== 'undefined' ? document.referrer : '';
      let source = 'Direct Visit';
      if (referrer.includes('linkedin.com')) source = 'LinkedIn Profile Link';
      else if (referrer.includes('github.com')) source = 'GitHub Bio';
      else if (referrer.includes('google.com')) source = 'Google Search';
      else if (referrer) source = 'External Referral';

      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          type: 'pageview',
          source,
        }),
      }).catch(() => {});
    } catch (e) {}
  }, [username]);

  return null;
}

export function trackEvent(
  username: string,
  type: 'project_click' | 'resume_download' | 'contact_inquiry',
  source?: string
) {
  try {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        type,
        source,
      }),
    }).catch(() => {});
  } catch (e) {}
}

