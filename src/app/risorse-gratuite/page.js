"use client";

import SectionWithBackground from "@/components/SectionWithBackground";
import Image from "next/image";
import { useRouter } from "next/navigation";

const blogs = [
  {
    "slug": "il-metodo-bloom-crescere-in-armonia-tra-mente-corpo-ed-emozioni",
    "title": "Il Metodo Bloom: Crescere in armonia tra mente, corpo ed emozioni",
    "description": "Spesso lo studio diventa fonte di stress, il gioco passa in secondo piano, e le emozioni restano inascoltate. Noi di Bloom crediamo che l’apprendimento debba essere un’esperienza positiva e completa, che metta al centro il benessere dei bambini e dei ragazzi.",
    "author": "Noemi Orologio",
    "date": "29 ottobre 2025",
    "readTime": "4 min read",
    "category": "Learning",
    "image": "/blog/il-metodo-bloom-crescere-in-armonia-tra-mente-corpo-ed-emozioni.jpg",
  },
  {
    "slug": "pedagogia-e-psicologia-due-mondi-diversi-un-unico-obiettivo",
    "title": "Pedagogia e Psicologia: due mondi diversi, un unico obiettivo",
    "description": "A volte diamo per scontato che educare significhi solo insegnare nozioni o trasmettere regole di comportamento. Ma dietro ogni gesto educativo c’è molto di più: ci sono scelte, conoscenze, strumenti e soprattutto una profonda comprensione della persona.",
    "author": "Noemi Orologio",
    "date": "23 ottobre 2025",
    "readTime": "5 min read",
    "category": "Learning",
    "image": "/blog/pedagogia-e-psicologia-due-mondi-diversi-un-unico-obiettivo.jpg",
  }, 
  {
    "slug": "qual-il-tuo-stile-di-apprendimento-ideale",
    "title": "Qual è il tuo stile di apprendimento ideale? ",
    "description": "Ti sei mai chiesto se esiste un solo modo giusto per studiare? \nMagari ti sei sentito dire che basta applicarsi… che tutti devono studiare allo stesso modo… che ci sono tecniche già “conclamate” e universali.",
    "author": "Noemi Orologio",
    "date": "23 ottobre 2025",
    "readTime": "10 min read",
    "category": "Learning",
    "image": "/blog/qual-il-tuo-stile-di-apprendimento-ideale.jpg",
  },
  {
    "slug": "consulenza-psicopedagogica-un-sostegno-concreto-per-famiglie-bambini-e-scuole",
    "title": "Consulenza psicopedagogica: un sostegno concreto per famiglie, bambini e scuole",
    "description": "La consulenza psicopedagogica è uno strumento di supporto prezioso che mira a favorire la crescita e l’autonomia della persona, della famiglia e dei gruppi sociali ed educativi. Non si tratta solo di affrontare una difficoltà momentanea, ma di accompagnare il soggetto – bambino, adolescente o adulto – in un percorso di comprensione, consapevolezza e miglioramento del proprio sistema di vita e di apprendimento.",
    "author": "Noemi Orologio",
    "date": "23 ottobre 2025",
    "readTime": "3 min read",
    "category": "Learning",
    "image": "/blog/consulenza-psicopedagogica-un-sostegno-concreto-per-famiglie-bambini-e-scuole.jpg",
  },
  {
    slug: "metodo-studio-bloom",
    title: "Il Metodo di Studio Bloom: mente serena, apprendimento efficace",
    description:"Il metodo di studio Bloom è un approccio personalizzato per aiutare i ragazzi a raggiungere i loro obiettivi di studio. Questo metodo si basa su una serie di principi fondamentali che aiutano a creare un ambiente di apprendimento efficace e motivante.",
    author: "Noemi Orologio",
    date: "19 Luglio 2025",
    readTime: "3 min read",
    category: "Learning",
    image: "/blog/metodo-studio-bloom.jpg",
  },
  {
    slug: "pomodoro",
    title: "Stop distrazioni! Scopri la tecnica del pomodoro per studiare meglio senza stress",
    description:"La tecnica del Pomodoro è un metodo di gestione del tempo che aiuta a aumentare la produttività e a ridurre lo stress. Scopri come funziona e come puoi applicarla nel tuo studio.",
    author: "Noemi Orologio",
    date: "19 Luglio 2025",
    readTime: "3 min read",
    category: "Learning",
    image: "/blog/pomodoro.jpg",
  },
  {
    slug: "estate-che-fa-crescere",
    title: "Estate che fa crescere: partire con un vantaggio concreto per il prossimo anno scolastico",
    description:
      "L'estate è un periodo ideale per crescere e imparare. Ma come sfruttare questo tempo libero per crescere e imparare?",
    author: "Noemi Orologio",
    date: "10 Luglio 2025",
    readTime: "5 min read",
    category: "Learning",
    image: "/blog/estate-che-fa-crescere.jpg",
  },
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
  },
  {
    slug: "dsa-strategie-urgenti",
    title: "DSA: strategie urgenti per affrontare interrogazioni e scritti",
    description:
      "Studiare e affrontare interrogazioni o compiti scritti può trasformarsi in un momento di ansia e frustrazione per tanti studenti. Ma per chi convive con un Disturbo Specifico dell'Apprendimento (DSA), le sfide si moltiplicano. Comprensione lenta, difficoltà di esposizione, problemi organizzativi rendono la prestazione scolastica molto più complessa.",
    author: "Noemi Orologio",
    date: "17 Maggio 2025",
    readTime: "3 min read",
    category: "DSA",
    image: "/blog/dsa.jpg",
  },
  {
    slug: "esame-di-stato",
    title: "Esami e verifiche di fine anno? Ecco il metodo di studio che ti aiuta nell’ultimo periodo",
    description:
      "Maggio è il mese che per studenti di ogni età segna l'inizio della corsa finale. Le interrogazioni si moltiplicano, i debiti scolastici bussano alla porta, e per molti iniziano le notti insonni o i pomeriggi interminabili passati sui libri.",
    author: "Noemi Orologio",
    date: "17 Maggio 2025",
    readTime: "4 min read",
    category: "Learning",
    image: "/blog/esamie.jpg",
  }
];

export default function BlogPage() {
  const router = useRouter();
  
  const handleClick = (slug) => {
    router.push(`/risorse-gratuite/${slug}`);
  };

  return (
    <div className="bg-[#F2F2F2]">
      <SectionWithBackground
        title="Blog"
        description="Scopri i nostri ultimi post del blog"
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Ultimi Post del Blog</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleClick(post.slug)}
            >
              <div className="relative w-full h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                {post.category && (
                  <p className="text-[#008C95] uppercase text-xs font-bold mb-2">
                    {post.category}
                  </p>
                )}
                <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-700 text-sm line-clamp-3">{post.description}</p>
                <div className="flex items-center mt-4 text-gray-500 text-xs">
                  <p>{post.author}</p>
                  <span className="mx-2">•</span>
                  <p>{post.date}</p>
                  <span className="mx-2">•</span>
                  <p>{post.readTime}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
