import { NextRequest, NextResponse } from 'next/server';
import { generatePortfolioFromResume, generatePortfolioFromPdf } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    // Handle JSON payload
    if (contentType.includes('application/json')) {
      const body = await request.json();
      const { resumeText, pdfBase64, profession, templateId } = body;

      if (pdfBase64) {
        const portfolio = await generatePortfolioFromPdf(
          pdfBase64,
          profession,
          templateId || 'developer-dark'
        );
        return NextResponse.json({ success: true, portfolio });
      }

      if (!resumeText || typeof resumeText !== 'string' || resumeText.trim().length === 0) {
        return NextResponse.json(
          { error: 'Resume text or PDF upload is required.' },
          { status: 400 }
        );
      }

      const portfolio = await generatePortfolioFromResume(
        resumeText,
        profession,
        templateId || 'developer-dark'
      );

      return NextResponse.json({ success: true, portfolio });
    }

    // Handle Multipart Form Data (direct file upload)
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File | null;
      const profession = (formData.get('profession') as string) || undefined;
      const templateId = (formData.get('templateId') as any) || 'developer-dark';

      if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        const base64Data = buffer.toString('base64');
        const portfolio = await generatePortfolioFromPdf(base64Data, profession, templateId);
        return NextResponse.json({ success: true, portfolio });
      } else {
        // Plain text or markdown file
        const text = buffer.toString('utf-8');
        const portfolio = await generatePortfolioFromResume(text, profession, templateId);
        return NextResponse.json({ success: true, portfolio });
      }
    }

    return NextResponse.json({ error: 'Unsupported Content-Type' }, { status: 400 });
  } catch (error: any) {
    console.error('Portfolio generation error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to generate portfolio' },
      { status: 500 }
    );
  }
}
