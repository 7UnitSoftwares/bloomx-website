# 🔓 Admin Authentication (Discontinued)

As of **20 Novembre 2025** l'area `/admin` non è più protetta da autenticazione.  
Le pagine di gestione sono sempre accessibili e i vecchi flussi di login sono
stati eliminati per evitare blocchi durante l'utilizzo quotidiano.

## 🕵️‍♀️ Access Gate Minimal

Per evitare accessi casuali è stato introdotto un **codice di sblocco leggero**:

- Middleware (`middleware.js`) controlla ogni richiesta a `/admin`
- Se manca il cookie `bloom-admin-gate`, l'utente viene reindirizzato a `/admin/access`
- Il passcode è definito tramite variabile d'ambiente `ADMIN_ACCESS_CODE` oppure, in mancanza, dal valore hardcoded (`bloom-team-2025`) in `src/lib/admin-gate.js`
- L'API `POST /api/admin/gate` verifica il codice e imposta il cookie per 6 ore
- Il pulsante "Blocca area" nella navbar elimina il cookie (`DELETE /api/admin/gate`)

> Questo meccanismo non sostituisce l'autenticazione completa: serve solo a
> tenere lontani curiosi o link condivisi inavvertitamente.

## ✂️ Cosa è stato rimosso

- Middleware di protezione (`src/middleware.js` e `src/middleware/auth.js`)
- Pagina di login tradizionale e cambio password obbligatorio
- API dedicate ad accesso, logout, verifica sessione e cambio password:
  - `src/app/api/auth/login/route.js`
  - `src/app/api/auth/logout/route.js`
  - `src/app/api/auth/verify/route.js`
  - `src/app/api/auth/change-password/route.js`
- Hook client-side `useAdminAuth` e pulsante di logout nella navbar
- Cookie `admin-session` e qualsiasi logica di sessione

## ✅ Cosa rimane

- L'archivio utenti (`src/data/auth.json`) e le utility in `src/lib/auth-db.js`
  continuano a gestire l'elenco degli amministratori, utile come rubrica interna.
- Gli endpoint `/api/auth/users` e `/api/auth/users/[userId]` restano operativi
  ma **non richiedono più** alcun controllo di sessione.
- Tutte le pagine admin (`/admin`, `/admin/blog-editor`, `/admin/blog-manager`,
  `/admin/users`) sono accessibili direttamente.

## 🔐 Se in futuro servirà di nuovo l'autenticazione

1. Recupera dal controllo di versione una revisione precedente al 20/11/2025
   (prima della rimozione dell'auth).
2. Ripristina i file elencati nella sezione "Cosa è stato rimosso".
3. Riattiva il middleware e verifica che gli endpoint tornino a richiedere il cookie `admin-session`.

Finché non verrà reintrodotto un sistema di autenticazione, considera le pagine
admin come pubbliche: condividere gli URL equivale a concedere l'accesso completo.
