import { NextRequest, NextResponse } from 'next/server';
import { analyzePortfolioScore } from '@/lib/gemini';
import { PortfolioData } from '@/types/portfolio';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { portfolio, jobDescription } = body as { portfolio: PortfolioData; jobDescription?: string };

    if (!portfolio) {
      return NextResponse.json(
        { error: 'Portfolio data is required' },
        { status: 400 }
      );
    }

    const scoreResult = await analyzePortfolioScore(portfolio, jobDescription);

    return NextResponse.json({ success: true, analysis: scoreResult });
  } catch (error: any) {
    console.error('Career assistant error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to analyze portfolio' },
      { status: 500 }
    );
  }
}

