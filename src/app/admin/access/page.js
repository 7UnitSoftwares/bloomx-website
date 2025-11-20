"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Container from '@/components/Container';

export default function AdminAccessGatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';
  const locked = searchParams.get('locked');

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState(locked ? 'Accesso revocato. Inserisci di nuovo il codice.' : '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setInfo('');

    if (!code.trim()) {
      setError('Inserisci il codice di accesso.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/gate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
        credentials: 'include',
      });

      const data = await response.json();
      if (!response.ok || !data?.success) {
        setError(data?.message ?? 'Impossibile verificare il codice.');
        return;
      }

      router.replace(from);
    } catch (err) {
      setError('Errore di rete. Riprova tra qualche secondo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] flex items-center py-12">
      <Container>
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-6">
            <p className="text-sm uppercase tracking-wide text-[#008C95] font-semibold">Area Riservata</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Codice di Accesso</h1>
            <p className="text-gray-600 mt-2 text-sm">
              Inserisci il codice condiviso solo con il team autorizzato. Questo passaggio non sostituisce
              un&apos;autenticazione completa ma evita accessi accidentali.
            </p>
          </div>

          {info && (
            <div className="mb-4 rounded-md bg-blue-50 px-4 py-3 text-sm text-blue-900 border border-blue-100">
              {info}
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-md bg-red-50 px-4 py-3 text-sm text-red-900 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-gate-code" className="block text-sm font-medium text-gray-700 mb-1">
                Codice
              </label>
              <input
                id="admin-gate-code"
                type="password"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#008C95]"
                placeholder="••••••••"
                autoComplete="off"
                disabled={isSubmitting}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#008C95] hover:bg-[#006A70] text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifica in corso…' : 'Sblocca l’area admin'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Torna al sito pubblico
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

