import { NextRequest, NextResponse } from 'next/server';
import { savePortfolio, getPortfolio } from '@/lib/portfolio-store';
import { PortfolioData } from '@/types/portfolio';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const portfolio = body.portfolio as PortfolioData;

    if (!portfolio || !portfolio.username) {
      return NextResponse.json({ error: 'Valid portfolio with username is required' }, { status: 400 });
    }

    savePortfolio(portfolio);
    return NextResponse.json({ success: true, username: portfolio.username });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Failed to save portfolio' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  const portfolio = getPortfolio(username);
  if (!portfolio) {
    return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, portfolio });
}

