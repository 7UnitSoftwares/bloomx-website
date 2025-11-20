# Guida all'Area Amministrativa Bloom

Benvenuto nella guida all'area amministrativa del sito Bloom! Questa guida ti spiegherà come utilizzare tutte le funzionalità disponibili per gestire i contenuti del sito web.

---

## Come Accedere all'Area Amministrativa

> **Novità:** l'area `/admin` è protetta da un **codice rapido** condiviso
> internamente. Non è una vera autenticazione, ma evita accessi
> accidentali di chi non conosce il passcode.  
> Codice predefinito: `bloom-team-2025` (puoi cambiarlo nello
> script `src/lib/admin-gate.js`).

### Accesso Diretto

1. Apri il browser e vai all'indirizzo `/admin` (esempio: `https://bloom-bi.it/admin`)
2. Se non hai ancora sbloccato la sessione, verrai reindirizzato alla pagina `Codice di Accesso`
3. Inserisci il codice condiviso con il team autorizzato
4. Dopo la verifica si apre automaticamente la dashboard e puoi navigare tra `Blog Editor`, `Blog Manager` o `Utenti`

### Note sulla Sicurezza

- Il codice è definito nell'ambiente server (`ADMIN_ACCESS_CODE`)
- Il cookie di accesso dura 6 ore e può essere azzerato con il pulsante **Blocca area** nella navbar
- Chi non conosce il codice verrà sempre reindirizzato alla pagina di blocco
- Se serve una protezione più forte sarà necessario ripristinare il sistema di autenticazione completo

---

## Dashboard Principale

La dashboard è la tua "centrale di controllo" dove puoi vedere a colpo d'occhio:

### Statistiche Rapide

- **Totale Post del Blog**: Quanti articoli hai pubblicato
- **Ultimo Aggiornamento**: Quando hai modificato l'ultima volta il database
- **Dimensione Database**: Quanto spazio stai utilizzando

### Accesso Rapido alle Funzioni

Dalla dashboard puoi accedere rapidamente a:
- **Crea Nuovo Post**: Per scrivere un nuovo articolo
- **Gestisci Post Esistenti**: Per modificare o eliminare articoli già pubblicati
- **Gestisci Utenti**: Per amministrare gli account degli amministratori

---

## Gestione del Blog

### Creare un Nuovo Post

1. **Vai all'Editor Blog**: Clicca su "Editor Blog" nel menu di navigazione o "Crea Nuovo Post" dalla dashboard

2. **Compila le Informazioni Base**:
   - **Titolo** (obbligatorio): Il titolo del tuo articolo
   - **Categoria**: Scegli tra Learning, ADHD, DSA, o Educazione
   - **Data di Pubblicazione** (obbligatorio): La data che apparirà sull'articolo
   - **Autore**: Il nome dell'autore (predefinito: "Noemi Orologio")
   - **Descrizione**: Un breve riassunto dell'articolo che apparirà nella lista

3. **Scrivi il Contenuto**:
   
   Hai due opzioni per inserire il contenuto:
   
   **Opzione A - Editor Rich Text (Consigliato)**:
   - Clicca su "Editor Rich Text"
   - Usa la barra degli strumenti per formattare il testo (grassetto, corsivo, elenchi, ecc.)
   - Puoi incollare direttamente contenuti da Word cliccando "Incolla da Word"
   - Oppure importare un file Word (.docx) cliccando "Importa .docx"
   
   **Opzione B - Editor Testo Semplice**:
   - Scrivi o incolla il testo direttamente nell'area di testo
   - Il sistema convertirà automaticamente la formattazione

4. **Aggiungi un'Immagine di Copertina**:
   - **Carica un'immagine**: Clicca "Carica Immagine" e seleziona un file (max 5MB)
   - **Oppure usa un URL**: Inserisci l'indirizzo web dell'immagine (es: `/blog/mia-immagine.jpg`)

5. **Programmazione della Pubblicazione (Opzionale)**:
   
   Questa è una funzionalità molto utile! Puoi creare un articolo oggi ma farlo apparire sul sito solo in una data futura.
   
   - **Lascia vuoto**: L'articolo sarà pubblicato immediatamente
   - **Seleziona una data futura**: L'articolo sarà nascosto al pubblico fino a quella data
   - **Esempio**: Crei un articolo oggi (15 gennaio) ma lo programmi per il 1 febbraio. L'articolo sarà visibile solo a te nell'area admin fino al 1 febbraio, quando apparirà automaticamente sul sito

6. **Configurazione Commenti Forum** (Opzionale):
   - Spunta "Mostra pulsante commenti" se vuoi aggiungere un link al forum
   - Inserisci il link del forum quando richiesto

7. **Salva il Post**: Clicca su "Genera Post del Blog" per salvare

### Modificare un Post Esistente

1. **Vai alla Gestione Blog**: Clicca su "Gestione Blog" nel menu
2. **Trova il post** che vuoi modificare nella lista
3. **Clicca su "Modifica"** accanto al post
4. **Modifica i campi** che desideri cambiare
5. **Salva le modifiche**: Clicca su "Aggiorna Post del Blog"

**Nota Importante**: Quando modifichi un post, la "Data di Pubblicazione" originale rimane invariata. Solo la "Data di Pubblicazione Programmata" può essere modificata.

### Eliminare un Post

1. **Vai alla Gestione Blog**: Clicca su "Gestione Blog" nel menu
2. **Trova il post** che vuoi eliminare
3. **Clicca su "Elimina"**
4. **Conferma l'eliminazione**: Ti verrà chiesto di confermare. Una volta eliminato, il post non può essere recuperato!

### Visualizzare un Post sul Sito

1. **Vai alla Gestione Blog**
2. **Clicca su "Visualizza"** accanto al post
3. Si aprirà una nuova scheda del browser mostrando come appare l'articolo sul sito pubblico

### Tag "Programmato" nei Post

Quando crei un post con una data di pubblicazione futura, vedrai un **tag giallo "Programmato"** nella lista dei post con la data di pubblicazione. Questo ti aiuta a identificare rapidamente quali articoli sono ancora in attesa di essere pubblicati.

**Come funziona**:
- I post programmati sono **visibili solo a te** nell'area admin
- Non appaiono sul sito pubblico fino alla data selezionata
- Una volta arrivata la data, il post diventa automaticamente visibile a tutti
- Il tag giallo scompare quando il post è stato pubblicato

---

## Gestione Utenti

L'area di gestione utenti ti permette di amministrare chi può accedere all'area amministrativa.

### Visualizzare gli Utenti

1. **Vai a "Utenti"** nel menu di navigazione
2. Vedrai una lista di tutti gli utenti amministratori con:
   - Nome completo
   - Username
   - Email
   - Ultimo accesso
   - Ruolo (se applicabile)

### Aggiungere un Nuovo Utente

1. **Clicca su "Aggiungi Nuovo Utente"**
2. **Compila il modulo**:
   - **Nome completo**: Il nome della persona
   - **Username**: Un nome utente univoco (senza spazi)
   - **Email**: L'indirizzo email dell'utente
   - **Password**: Una password sicura (minimo 6 caratteri)
3. **Clicca su "Crea Utente"**

**Suggerimento**: Scegli password sicure e uniche per ogni utente. Non condividere mai le password via email o messaggi non sicuri.

### Eliminare un Utente

1. **Trova l'utente** nella lista
2. **Clicca su "Elimina"** accanto all'utente
3. **Conferma l'eliminazione**

**Nota**: L'account "root" (amministratore principale) non può essere eliminato per motivi di sicurezza.

### Reimpostare la Password di un Utente

1. **Trova l'utente** nella lista
2. **Clicca su "Reimposta Password"**
3. **Inserisci la nuova password**
4. **Clicca su "Salva"**

**Importante**: Dopo aver reimpostato una password, informa l'utente in modo sicuro (meglio di persona o telefonicamente, non via email).

---

## Sicurezza e Best Practices

### Password Sicure

- Usa password di almeno 8 caratteri
- Combina lettere maiuscole, minuscole, numeri e simboli
- Non usare password ovvie come "password123" o "admin"
- Cambia le password regolarmente

### Sessioni

- **Non condividere mai** il tuo account con altri
- **Fai sempre logout** quando usi un computer condiviso
- Se sospetti che qualcuno abbia accesso al tuo account, cambia immediatamente la password

### Backup

- I tuoi post sono salvati automaticamente nel database
- È consigliabile fare backup regolari (contatta il tuo sviluppatore per i dettagli)

---

## Domande Frequenti

### Come faccio a sapere se un post è programmato?

Nella lista dei post nella sezione "Gestione Blog", i post programmati hanno un **tag giallo** con scritto "Programmato" seguito dalla data. I post già pubblicati non hanno questo tag.

### Posso modificare un post dopo che è stato pubblicato?

Sì! Puoi modificare qualsiasi post in qualsiasi momento. Le modifiche saranno visibili immediatamente sul sito.

### Cosa succede se programmo un post per oggi?

Se selezioni la data di oggi come data di pubblicazione programmata, il post sarà pubblicato immediatamente (o quasi, a seconda dell'ora).

### Posso cancellare un post programmato prima che venga pubblicato?

Sì, puoi eliminare qualsiasi post, anche quelli programmati, in qualsiasi momento dalla sezione "Gestione Blog".

### Quanti utenti amministratori posso avere?

Non c'è un limite al numero di utenti amministratori che puoi creare. Tuttavia, è consigliabile avere solo le persone che hanno realmente bisogno di accesso.

### Cosa succede se dimentico la password?

Contatta l'amministratore principale (account root) che può reimpostare la tua password.

### Posso modificare la mia password?

Sì, se c'è una funzione "Cambia Password" disponibile nel menu. Altrimenti, chiedi a un altro amministratore di reimpostarla per te.

---

## Supporto

Se hai problemi o domande:

1. **Controlla questa guida** per vedere se la risposta è già qui
2. **Contatta il tuo sviluppatore** o l'amministratore tecnico
3. **Fai uno screenshot** dell'errore se ne vedi uno, così sarà più facile aiutarti

---

## Note Finali

- **Salva spesso**: Quando stai scrivendo un post lungo, è una buona idea salvare periodicamente
- **Anteprima**: Usa sempre il pulsante "Visualizza" per vedere come apparirà il post prima di pubblicarlo
- **Immagini**: Assicurati che le immagini siano di buona qualità ma non troppo pesanti (max 5MB)
- **Contenuti**: Rileggi sempre i tuoi post prima di pubblicarli per controllare errori di battitura

---

**Ultimo aggiornamento**: Novembre 2025

Buon lavoro con la gestione del sito Bloom!

