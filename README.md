## Overview

Bloom è un progetto Next.js 14 che presenta l'offerta educativa di Bloom Centro Pedagogico. Il sito include percorsi, eventi, risorse gratuite e un'area admin per la gestione di blog e utenti.

## Getting Started

Install the dependencies and launch the development server:

```bash
npm install
npm run dev
# oppure
yarn install
yarn dev
```

Il sito sarà disponibile su [http://localhost:3000](http://localhost:3000).

## HeyBloom AI Chat

L'endpoint pubblico `/heybloom` espone HeyBloom, l'assistente AI in stile ChatGPT per studenti, genitori ed educatori.

### Configurazione Ambiente

Per abilitare le risposte AI è necessario impostare almeno una delle variabili seguenti nel file `.env.local` o nell'ambiente di deploy:

```bash
# chiave primaria consigliata
HEYBLOOM_OPENAI_API_KEY=sk-...

# opzionali (dispongono di fallback)
HEYBLOOM_OPENAI_MODEL=gpt-4o-mini
HEYBLOOM_OPENAI_ENDPOINT=https://api.openai.com/v1/chat/completions
```

Se queste variabili non sono presenti, il sistema utilizzerà i fallback `OPENAI_API_KEY` e `OPENAI_MODEL` se disponibili. Senza chiave valida, l'endpoint restituirà un errore 503.

### API interna

Il frontend richiama `POST /api/heybloom` con la lista di messaggi `[ { role: 'user' | 'assistant', content: string } ]`. Il server aggiunge automaticamente un prompt di sistema e inoltra la richiesta al provider AI configurato.

## Available Scripts

```bash
npm run dev       # avvia il server di sviluppo
npm run build     # crea la build di produzione
npm run start     # avvia la build di produzione
npm run lint      # esegue ESLint
```

Consulta anche `AUTH_SETUP.md` e `DEPLOYMENT_NOTES.md` per dettagli su autenticazione e gestione dati.
