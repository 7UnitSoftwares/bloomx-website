"use client";

import Link from 'next/link';
import Container from '@/components/Container';

export default function ChangePassword() {
  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center py-12">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-[#008C95]">Gestione password disattivata</h1>
          <p className="text-gray-600 mt-3">
            Il pannello amministratore non richiede più autenticazione. Non è necessario
            aggiornare o cambiare password: accedi direttamente alle pagine di gestione
            dei contenuti quando ne hai bisogno.
          </p>
          <Link
            href="/admin"
            className="inline-flex justify-center mt-6 bg-[#008C95] text-white px-4 py-2 rounded-md hover:bg-[#007a82] transition-colors"
          >
            Vai al pannello admin
          </Link>
        </div>
      </Container>
    </div>
  );
}

