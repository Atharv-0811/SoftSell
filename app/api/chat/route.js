import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const history = [
      {
        role: 'user',
        parts: [
          `You are the AI assistant for SoftSell, a marketplace for buying and selling unused software licenses. 
          Be helpful, concise, and friendly. Focus on answering questions about:
          - How to sell licenses (registration, verification, payment process)
          - Supported software (Microsoft, Adobe, Salesforce, Atlassian, Oracle, SAP, etc.)
          - Timeline for sales (average 48 hours from listing to sale)
          - Fees (15% commission on successful sales, no upfront fees)
          - Security and compliance
          
          If you don't know the answer, politely direct them to contact our support team at support@softsell.com.
          Keep responses under 100 words when possible.`
        ],
      },
      ...messages.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [msg.content],
      })),
    ].slice(-10);

    const result = await model.generateContent({
      contents: history,
      generationConfig: {
        maxOutputTokens: 150,
        temperature: 0.7,
      },
    });

    const reply = result.response.text();

    return NextResponse.json({ message: reply });

  } catch (error) {
    console.error('Error in Gemini chat API:', error);
    return NextResponse.json(
      { error: 'Error processing your request with Gemini API' },
      { status: 500 }
    );
  }
}
