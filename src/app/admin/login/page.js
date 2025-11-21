"use client";

import Link from 'next/link';
import Container from '@/components/Container';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center py-12">
      <Container>
        <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-[#008C95] mb-2">Accesso non necessario</h1>
          <p className="text-gray-600">
            Il pannello di amministrazione di Bloom è ora sempre disponibile senza autenticazione.
            Apri direttamente la dashboard per gestire utenti, post e contenuti.
          </p>
          <Link
            href="/admin"
            className="inline-flex justify-center mt-6 w-full bg-[#008C95] hover:bg-[#006A70] text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Apri il pannello admin
          </Link>
        </div>
      </Container>
    </div>
  );
}
