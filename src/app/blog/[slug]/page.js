import Image from "next/image";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Banner from "@/components/Banner";
import { generateBlogMetadata, generateStructuredData } from '@/utils/seo';
import BlogPostContent from './BlogPostContent';

// This would typically come from an API or database
const blogs = [
    {
        slug: "adhd-a-scuola",
        title: "ADHD a scuola: meno ansia, più risultati con queste strategie efficaci",
        description:
            "Questo blog offre strategie pratiche ed empatiche per aiutare gli studenti con ADHD a gestire l'ansia scolastica e migliorare il rendimento durante verifiche e interrogazioni. Vengono presentati strumenti utili come la pianificazione visiva, lo studio a piccoli passi, l'integrazione sensoriale e il rinforzo positivo, con l'obiettivo di creare un ambiente di apprendimento più inclusivo e motivante. Pensato per genitori ed educatori, il blog presenta anche il supporto personalizzato offerto dal Centro Pedagogico Bloom per bambini e ragazzi con ADHD.",
        author: "Noemi Orologio",
        date: "17 Maggio 2025",
        readTime: "2 min read",
        category: "ADHD",
        image: "/blog/adhd.jpg",
        content: `
      <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Per molti studenti, i momenti delle verifiche e delle interrogazioni sono tra i più stressanti dell'esperienza scolastica. Ma per chi convive con l'ADHD (Disturbo da Deficit di Attenzione e Iperattività), si aggiungono ostacoli specifici che spesso compromettono non solo il rendimento, ma anche la motivazione.</p>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Difficoltà a mantenere l'attenzione, fatica a organizzarsi, impazienza e impulsività non sono comportamenti volontari: sono espressione concreta di un funzionamento cerebrale diverso. È fondamentale riconoscerlo per poter costruire un percorso scolastico efficace, rispettoso e realmente inclusivo.</p>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Questo blog è pensato per studenti con ADHD e per i loro genitori, alla ricerca di soluzioni pratiche per affrontare al meglio interrogazioni e prove scritte. Le strategie che seguono non pretendono di risolvere ogni difficoltà, ma possono rendere l'ambiente di apprendimento più accessibile e l'esperienza scolastica più sostenibile.</p>

  <h2 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">Interrogazioni e compiti scritti: cosa può fare la differenza con l'ADHD?</h2>
  <ol style="padding-left: 1.5em; margin-bottom: 1.2em;">
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Definire una sequenza visiva della giornata:</span> l'imprevedibilità genera ansia e confusione. Usare agende grafiche o planning settimanali aiuta a visualizzare il tempo e ad anticipare gli impegni.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Sbloccare l'inizio:</span> l'avvio dell'attività è spesso il momento più critico. Un piccolo rituale di preparazione (accendere una lampada, scegliere una canzone, respirare profondamente) può diventare un segnale interno di "inizio".</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Studiare a piccoli passi:</span> spezzare il carico in micro-attività con obiettivi precisi e pause previste aumenta il senso di controllo e riduce il rischio di rinuncia.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Favorire la comprensione:</span> meglio una spiegazione breve e concreta, magari accompagnata da un esempio pratico. Far ripetere al ragazzo ciò che ha capito rafforza la memorizzazione.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Creare uno spazio su misura:</span> il disordine visivo può aumentare il caos mentale. Una postazione semplice, essenziale, con pochi stimoli sensoriali e tutto il necessario a portata di mano, è già un passo avanti.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Allenare le interrogazioni come giochi di ruolo:</span> inscenare la situazione d'esame, alternando le parti tra genitore e figlio, permette di costruire familiarità con la prova e imparare a gestire l'emotività.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Dare movimento allo studio:</span> alcuni ragazzi imparano meglio mentre camminano, altri trovano utile disegnare o manipolare oggetti mentre ascoltano. Integrare il corpo nel processo cognitivo può fare la differenza.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Coinvolgere più sensi:</span> ascoltare l'audio della lezione, usare mappe colorate, associare parole a immagini: più canali si attivano, più facile sarà fissare le informazioni.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Valorizzare i progressi più che i risultati:</span> invece di evidenziare gli errori, è utile sottolineare ciò che è stato fatto meglio rispetto alla volta precedente. Questo stimola la motivazione e costruisce fiducia.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Cercare supporto quando serve:</span> nessuno deve affrontare tutto da solo. Un percorso con un professionista esperto in ADHD può trasformare il modo di affrontare la scuola, ridurre la fatica quotidiana e restituire serenità a tutta la famiglia.</li>
  </ol>

  <div style="margin-top: 2rem; padding: 1rem; background: #e6f4ea; border-left: 5px solid #34a853;">
    <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;"><strong>Riconosci questi sintomi in tuo figlio? Hai un figlio con ADHD e non sai da dove partire?</strong><br>
    Nel nostro Centro Pedagogico Bloom affianchiamo bambini e ragazzi con ADHD in percorsi educativi personalizzati. I nostri esperti aiutano a costruire un metodo su misura, che tiene conto delle caratteristiche individuali e valorizza i punti di forza. Attraverso strategie mirate, tecniche di autoregolazione e supporto empatico, accompagniamo studenti e famiglie verso una scuola più serena.</p>
    <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem; font-weight: bold;">Ogni ragazzo merita di imparare nel modo che gli è più adatto. Noi siamo qui per aiutarvi a scoprirlo.</p>
    <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem; font-weight: bold;">Contattaci per una consulenza.</p>
  </div>
    `
    },
    {
        slug: "dsa-strategie-urgenti",
        title: "DSA: strategie urgenti per affrontare interrogazioni e scritti",
        description:
            "Studiare e affrontare interrogazioni o compiti scritti può trasformarsi in un momento di ansia e frustrazione per tanti studenti. Ma per chi convive con un Disturbo Specifico dell'Apprendimento (DSA), le sfide si moltiplicano. Comprensione lenta, difficoltà di esposizione, problemi organizzativi rendono la prestazione scolastica molto più complessa.",
        author: "Noemi Orologio",
        date: "17 Maggio 2025",
        readTime: "2 min read",
        category: "DSA",
        image: "/blog/dsa.jpg",
        content: `
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Studiare e affrontare interrogazioni o compiti scritti può trasformarsi in un momento di ansia e frustrazione per tanti studenti. Ma per chi convive con un Disturbo Specifico dell'Apprendimento (DSA), le sfide si moltiplicano. Comprensione lenta, difficoltà di esposizione, problemi organizzativi rendono la prestazione scolastica molto più complessa.</p>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Questo articolo vuole offrire uno strumento concreto a studenti con DSA e ai loro genitori: una raccolta di strategie urgenti e pratiche, immediatamente applicabili, per prepararsi in modo efficace ad interrogazioni e verifiche scritte, aumentando le possibilità di successo e diminuendo lo stress.</p>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Gli studenti con DSA non sono meno intelligenti o capaci: semplicemente hanno bisogno di un metodo che funzioni per loro. Ed è proprio da qui che partiamo: dalla personalizzazione del metodo e dalla valorizzazione dei punti di forza.</p>

  <h2 style="color: #008C95; font-weight: bold; font-size: 1.5rem; margin: 1.5em 0 1em;">Strategia è libertà: 9 suggerimenti da applicare subito</h2>
  <ol style="padding-left: 1.5em; margin-bottom: 1.2em; list-style-type: decimal;">
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Studia con una struttura precisa:</span> usa un planning settimanale chiaro e visivo (magari a colori). Ogni giorno va suddiviso in "blocchi" con obiettivi realistici. Questo aiuta a non sentirsi sopraffatti e a distribuire lo studio.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Evita il sovraccarico prima delle interrogazioni:</span> prepara piccole esposizioni orali ogni giorno, come se fossero prove, anche solo davanti allo specchio o registrandoti. Allenarsi in anticipo riduce l'ansia.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Trasforma il testo in mappe:</span> per ogni argomento, crea schemi visivi o mappe concettuali. Puoi anche usare simboli, disegni o colori per stimolare la memoria visiva.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Prevedi pause frequenti:</span> studiare senza interruzioni è controproducente. Ogni 20-30 minuti, fai una pausa di 5 minuti, muoviti, bevi, respira. Poi ricomincia.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Prepara domande e risposte:</span> costruisci un gioco di "domande a pescaggio" scritte su foglietti (una tecnica molto utile anche per genitori e tutor): stimola l'attivazione mentale e rende più facile il ripasso.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Usa il canale sensoriale dominante:</span> chi è più visivo, studi con immagini; chi è più auditivo, legga ad alta voce o ascolti audio-lezioni; chi è cinestetico, studi camminando o associando gesti.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Allenati a sintetizzare:</span> se scrivere un testo è difficile, allenati prima a scrivere frasi brevi. Parti da elenchi di parole chiave, poi sviluppale in frasi e infine in brevi paragrafi.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Focalizzati sul cosa e non sul come:</span> è più importante sapere e saper spiegare i concetti che scriverli in forma impeccabile. Se l'insegnante valuta anche l'orale, preparalo bene.</li>
    <li style="margin-bottom: 0.6em;"><span style="font-weight: bold;">Crea un ambiente "facilitante":</span> il contesto in cui si studia ha un impatto diretto sulla concentrazione e sull'efficacia dell'apprendimento. Prediligi ambienti silenziosi o con suoni neutri (come il rumore bianco), e cura l'illuminazione: c'è chi si trova meglio con la luce naturale e chi preferisce una lampada da scrivania ben orientata. L'importante è che favorisca uno stato di calma e attenzione. Assicurati di avere una seduta comoda, elimina il disordine e tieni a portata solo il materiale necessario. Anche piccoli accorgimenti – come una pianta, una borraccia d'acqua o una musica strumentale in sottofondo – possono fare una grande differenza nella resa.</li>
  </ol>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Un approccio consapevole e strategico allo studio può fare la differenza nei casi di DSA. Non si tratta di "semplificare" il percorso scolastico, ma di renderlo più adatto alle caratteristiche individuali, offrendo a ogni studente la possibilità di esprimere il proprio potenziale.</p>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Ricorda: non è solo una questione di impegno, ma di metodo. E un buon metodo è come una chiave: apre porte prima considerate invalicabili.</p>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;"><strong>Parola d'ordine? Adattare per valorizzare.</strong></p>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Se tuo figlio ha una diagnosi di DSA o pensi che potrebbe averla, e senti che ha bisogno di essere seguito con un metodo su misura, noi di Bloom possiamo affiancarvi nel percorso. </p>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">I nostri pedagogisti ed esperti dell'apprendimento lavorano ogni giorno con bambini e ragazzi con DSA, offrendo supporto personalizzato, strategie mirate e tanta umanità. Creiamo insieme a voi e alla scuola un progetto educativo efficace, che mette al centro i punti di forza di ogni ragazzo e lo aiuta a sviluppare fiducia e autonomia.</p>
  <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;"><strong>"Ogni bamnino/a può trovare il suo modo per brillare: noi siamo qui per aiutarvi a scoprirlo."</strong></p>
        `
    },
    {
        slug: "esame-di-stato",
        title: "Esami e verifiche di fine anno? Ecco il metodo di studio che ti aiuta nell'ultimo periodo",
        description:
            "Maggio è il mese che per studenti di ogni età segna l'inizio della corsa finale. Le interrogazioni si moltiplicano, i debiti scolastici bussano alla porta, e per molti iniziano le notti insonni o i pomeriggi interminabili passati sui libri.",
        author: "Noemi Orologio",
        date: "17 Maggio 2025",
        readTime: "4 min read",
        category: "Learning",
        image: "/blog/esamie.jpg",
        content: `
        <h2 style="font-weight: bold; font-size: 1.2rem; margin: 1.5em 0 1em;">Maggio: un mese da affrontare con metodo</h2>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Maggio è il mese che per studenti di ogni età segna l'inizio della corsa finale. Le interrogazioni si moltiplicano, i debiti scolastici bussano alla porta, e per molti iniziano le notti insonni o i pomeriggi interminabili passati sui libri.</p>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Se anche tu ti trovi in questa situazione – che tu sia un adolescente in difficoltà con la matematica, un genitore che cerca di aiutare un figlio smarrito, o uno studente adulto che ha ripreso a studiare – la prima cosa da fare è <strong>fermarsi e respirare.</strong></p>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Studiare non è solo una questione di volontà: servono lucidità mentale, organizzazione e strategia. E anche quando tutto sembra da recuperare all'ultimo minuto, una buona pianificazione e alcune tecniche mirate possono fare davvero la differenza.</p>
        <h2 style="font-weight: bold; font-size: 1.2rem; margin: 1.5em 0 1em;">Studiare all'ultimo minuto: si può fare bene?</h2>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Contrariamente a quanto si pensa, non è sempre troppo tardi per rimettersi in carreggiata. La chiave è cambiare approccio: smettere di inseguire i contenuti in modo caotico e iniziare a <strong>gestire il tempo con intelligenza.</strong></p>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Un metodo di studio efficace non deve essere complicato: deve essere sostenibile, realistico, e soprattutto <strong>adatto al tempo che hai a disposizione.</strong></p>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">La pedagogia ci insegna che il cervello apprende meglio quando è coinvolto attivamente. Anche in una fase d'emergenza, è utile privilegiare uno <strong>studio dinamico</strong>: usa schemi e mappe mentali, prova a riformulare con parole tue, alterna la lettura ad esercizi pratici, quiz o simulazioni.</p>
        <p>E se il tempo scarseggia? Non tutto deve essere approfondito allo stesso modo. Parte del lavoro consiste proprio nel <strong>selezionare cosa è davvero essenziale</strong> e stabilire una gerarchia di importanza delle nozioni.</p>

        <h2 style="font-weight: bold; font-size: 1.2rem; margin: 1.5em 0 1em;">Recuperare non significa solo "studiare di più"</h2>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Lo stress da recupero spesso nasce da un malinteso: pensare che per superare un esame basti semplicemente aumentare le ore di studio. In realtà, <strong>il recupero richiede un approccio più strategico.</strong></p>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Un'ora ben spesa, con concentrazione e consapevolezza, vale più di tre passate davanti ai libri distrattamente, magari col cellulare in mano.</p>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">In questo periodo dell'anno è fondamentale conoscere i propri ritmi: c'è chi rende di più al mattino, chi trova la massima concentrazione nel pomeriggio. Riconosci il tuo momento e <strong>difendilo dalle distrazioni</strong></p>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Se sei un genitore, il tuo aiuto non si limita a ricordare di studiare. Puoi offrire supporto costruendo con tuo figlio una <strong>routine stabile</strong>, favorendo pause rigeneranti e aiutandolo a gestire le emozioni.</p>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Se sei uno studente adulto, concediti di <strong>non essere perfetto</strong>. Sii gentile con te stesso, ma resta determinato: la motivazione è una fiamma che si può riaccendere, anche a pochi giorni dall'esame.</p>

        <h2 style="font-weight: bold; font-size: 1.2rem; margin: 1.5em 0 1em;">E ora? Pianifica, agisci, usa la checklist</h2>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">Per rendere questa fase più semplice e produttiva, abbiamo preparato una <strong>checklist operativa</strong>. Puoi seguirla ogni giorno per tenere sotto controllo lo studio e mantenere un buon equilibrio tra doveri e benessere.</p>
        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;"><strong>Checklist: Organizza le tue giornate prima degli esami</strong></p>
        <ul style="padding-left: 1.5em; margin-bottom: 1.2em; list-style-type: disc;">
            <li style="margin-bottom: 0.6em;">Dedica 10 minuti ogni mattina alla pianificazione della giornata.</li>
            <li style="margin-bottom: 0.6em;">Dividi lo studio in blocchi da 50 minuti, intervallati da 10 minuti di pausa.</li>
            <li style="margin-bottom: 0.6em;">Parti sempre dagli argomenti più urgenti o difficili.</li>
            <li style="margin-bottom: 0.6em;">Alla fine di ogni giornata, scrivi un breve riepilogo di ciò che hai imparato.</li>
            <li style="margin-bottom: 0.6em;">Tieni lontano il telefono durante lo studio: mettilo in modalità aereo o in un'altra stanza.</li>
            <li style="margin-bottom: 0.6em;">Concediti almeno un momento rigenerante al giorno (passeggiata, musica, meditazione).</li>
            <li style="margin-bottom: 0.6em;">Dormi almeno 7 ore a notte: il sonno consolida ciò che studi e aiuta la memoria.</li>
        </ul>

        <h2 style="font-weight: bold; font-size: 1.2rem; margin: 1.5em 0 1em;">Anche se sei in ritardo, puoi ancora costruire un percorso efficace.</h2>

        <p style="margin-bottom: 1.2em; line-height: 1.6; font-size: 1rem;">La chiave è smettere di farsi travolgere dal panico e iniziare a usare il tempo come un alleato. <strong>Imparare a imparare</strong> non è solo una soluzione d'emergenza: è una competenza preziosa, che ti accompagnerà <strong>per tutta la vita</strong>.</p>


        `
    }
];

// Generate metadata for each blog post
export async function generateMetadata({ params }) {
    const post = blogs.find(blog => blog.slug === params.slug);
    
    if (!post) {
        return {
            title: 'Post non trovato | Bloom',
            description: 'Il post che stai cercando non esiste o è stato rimosso.',
        };
    }

    return generateBlogMetadata(post);
}

export default function BlogPost({ params }) {
    const post = blogs.find(blog => blog.slug === params.slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
                <Container>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-[#008C95] mb-4">Post non trovato</h1>
                        <p className="text-gray-600 mb-6">Il post che stai cercando non esiste o è stato rimosso.</p>
                    </div>
                </Container>
            </div>
        );
    }

    const articleSchema = generateStructuredData('article', post);
    const breadcrumbSchema = generateStructuredData('breadcrumb', [
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: post.title, path: `/blog/${post.slug}` },
    ]);

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(articleSchema),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbSchema),
                }}
            />
            
            <BlogPostContent post={post} blogs={blogs} />
        </>
    );
}
