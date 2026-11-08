import { NextRequest, NextResponse } from 'next/server';
import { recordAnalyticsEvent, getAnalyticsRecord } from '@/lib/portfolio-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, type, source } = body;

    if (!username || !type) {
      return NextResponse.json({ error: 'Username and event type are required' }, { status: 400 });
    }

    const updated = recordAnalyticsEvent(username, type, source);
    return NextResponse.json({ success: true, stats: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to record event' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username') || 'annierajpoot';

  const stats = getAnalyticsRecord(username);
  return NextResponse.json({ success: true, stats });
}

