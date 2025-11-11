import { NextResponse } from 'next/server';

const DEFAULT_MODEL = process.env.HEYBLOOM_OPENAI_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini';
const OPENAI_API_KEY = process.env.HEYBLOOM_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const OPENAI_API_URL = process.env.HEYBLOOM_OPENAI_ENDPOINT || 'https://api.openai.com/v1/chat/completions';

const DEFAULT_SYSTEM_PROMPT = `You are HeyBloom, the friendly AI guide for Bloom Centro Pedagogico. Provide supportive, practical and actionable advice for students, parents and educators in Italian. When relevant, explain how Bloom's services can help, but avoid sounding overly commercial. Use an encouraging, positive tone and keep responses concise and well structured.`;

const MAX_USER_MESSAGE_LENGTH = 8000;

function sanitizeMessages(messages = []) {
  return messages
    .filter((message) =>
      message &&
      typeof message.role === 'string' &&
      typeof message.content === 'string' &&
      message.content.trim().length > 0
    )
    .map((message) => ({
      role: message.role === 'assistant' ? 'assistant' : 'user',
      content: message.content.trim().slice(0, MAX_USER_MESSAGE_LENGTH),
    }));
}

export async function POST(request) {
  try {
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'AI chat is temporarily unavailable. Please contact Bloom support.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { messages, systemPrompt, temperature = 0.7 } = body || {};

    const sanitizedMessages = sanitizeMessages(messages);

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one message to start the chat.' },
        { status: 400 }
      );
    }

    const prompt = typeof systemPrompt === 'string' && systemPrompt.trim().length > 0
      ? systemPrompt.trim()
      : DEFAULT_SYSTEM_PROMPT;

    const payload = {
      model: DEFAULT_MODEL,
      temperature: Math.min(Math.max(temperature, 0), 2),
      messages: [
        { role: 'system', content: prompt },
        ...sanitizedMessages,
      ],
    };

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[HeyBloom] OpenAI API error:', data);
      return NextResponse.json(
        { error: data?.error?.message || 'Unable to generate a response at the moment.' },
        { status: response.status }
      );
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      console.error('[HeyBloom] Missing reply content from OpenAI response.', data);
      return NextResponse.json(
        { error: 'The assistant did not return any content.' },
        { status: 502 }
      );
    }

    const result = NextResponse.json({
      reply,
      model: data?.model || DEFAULT_MODEL,
      usage: data?.usage || null,
    });

    result.headers.set('Cache-Control', 'no-store');

    return result;
  } catch (error) {
    console.error('[HeyBloom] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while talking with HeyBloom. Please try again.' },
      { status: 500 }
    );
  }
}

