import { NextRequest, NextResponse } from 'next/server';
import { refinePortfolioContent } from '@/lib/gemini';
import { PortfolioData } from '@/types/portfolio';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { portfolio, instruction } = body as { portfolio: PortfolioData; instruction: string };

    if (!portfolio || !instruction) {
      return NextResponse.json(
        { error: 'Portfolio data and instruction are required' },
        { status: 400 }
      );
    }

    const updatedPortfolio = await refinePortfolioContent(portfolio, instruction);

    return NextResponse.json({ success: true, portfolio: updatedPortfolio });
  } catch (error: any) {
    console.error('Refine content error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to refine portfolio content' },
      { status: 500 }
    );
  }
}

