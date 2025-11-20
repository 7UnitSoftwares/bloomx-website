import { NextResponse } from 'next/server';
import {
  ADMIN_GATE_COOKIE,
  ADMIN_GATE_MAX_AGE,
  getAdminGateCode,
  isAdminGateEnabled,
  verifyAdminGateCode,
} from '@/lib/admin-gate';

export async function POST(request) {
  if (!isAdminGateEnabled()) {
    return NextResponse.json(
      {
        success: false,
        message: 'Protezione non configurata. Imposta ADMIN_ACCESS_CODE.',
      },
      { status: 500 },
    );
  }

  let payload = {};
  try {
    payload = await request.json();
  } catch (error) {
    // ignore malformed JSON, handled below
  }

  const code = payload?.code;
  if (!code) {
    return NextResponse.json(
      {
        success: false,
        message: 'Inserisci il codice di accesso.',
      },
      { status: 400 },
    );
  }

  if (!verifyAdminGateCode(code)) {
    return NextResponse.json(
      {
        success: false,
        message: 'Codice non valido. Riprova.',
      },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_GATE_COOKIE, getAdminGateCode(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ADMIN_GATE_MAX_AGE,
    path: '/',
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_GATE_COOKIE, '', {
    path: '/',
    maxAge: 0,
  });
  return response;
}

