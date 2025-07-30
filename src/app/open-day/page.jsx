"use client";

import React from "react";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Banner from "@/components/Banner";

const OpenDayPage = () => {
  return (
    <section className="bg-[#F2F2F2] min-h-screen">
      <SectionWithBackground
        title="Summer Final Sprint"
        description="Rientra a scuola con energia e sicurezza:<br /> approfitta del nostro SUMMER FINAL SPRINT!"
      />
      <Container>
        <SummerSprintSection />
        <LaboratoriSection />
        <StudentsSection />
        <OpenDaySection />
        <WhyBloomSection />
      </Container>
      <Banner />
    </section>
  );
};

const SummerSprintSection = () => {
  return (
    <div className="mt-16 lg:mt-10 mb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#00A59B] mb-4">
            Lo Sprint dell'estate per iniziare l'anno scolastico da campioni!
          </h2>
          <p className="text-xl font-medium text-gray-600">Dal 25 agosto</p>
        </div>
        
        <div className="space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Trasformate gli ultimi giorni di vacanza in un'occasione d'oro per offrire ai vostri figli un solido vantaggio scolastico e personale che li accompagnerà tutto l'anno.
          </p>
          
          <div className="bg-gradient-to-r from-[#00A59B]/10 to-[#008C95]/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#00A59B] mb-4">Cosa offriamo:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#00A59B] text-xl">✔</span>
                <span className="text-gray-700">Ripasso strategico per colmare lacune e finire i compiti</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00A59B] text-xl">✔</span>
                <span className="text-gray-700">Tecniche di studio personalizzate per memorizzare e organizzarsi meglio</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#00A59B] text-xl">✔</span>
                <span className="text-gray-700">Metodo di gestione emotiva per affrontare verifiche e materie nuove con sicurezza</span>
              </li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-[#00A59B]/20 rounded-xl p-6">
              <h4 className="font-semibold text-[#00A59B] mb-2">Come lavoriamo:</h4>
              <p className="text-gray-700">Full immersion con docenti esperti, metodo personalizzato, supporto emotivo e risultati concreti.</p>
            </div>
            <div className="bg-white border border-[#00A59B]/20 rounded-xl p-6">
              <h4 className="font-semibold text-[#00A59B] mb-2">Cosa otterrete:</h4>
              <ul className="text-gray-700 space-y-1">
                <li>• Voti più alti e maggiore fiducia</li>
                <li>• Un rientro a scuola sereno e ben organizzato</li>
                <li>• Meno stress per voi genitori e per i vostri figli</li>
              </ul>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-[#00A59B] to-[#008C95] text-white rounded-xl p-6">
            <p className="text-lg font-semibold mb-2">Si riparte con il piede giusto… e una marcia in più verso il successo scolastico!</p>
            <p className="font-medium">Per maggiori info e iscrizioni chiamateci o scriveteci</p>
            <p className="text-xl font-bold">338 225 6056 - bloom@bloom-bi.it</p>
            <p className="text-red-200 font-bold mt-2">Posti limitati – Prenota ora</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const LaboratoriSection = () => {
  const laboratori = [
    {
      title: "Le Mie Mani Sono Magiche",
      description: "Colora, incolla, costruisci: le mani diventano bacchette magiche! Arte, pittura, riciclo creativo e materiali naturali per esprimersi sviluppando fantasia e manualità."
    },
    {
      title: "Il Mosaico delle Emozioni",
      description: "Un percorso per conoscere, accogliere e comprendere le emozioni, sviluppando consapevolezza di sé e intelligenza emotiva."
    },
    {
      title: "Scrittori in Erba",
      description: "Leggi, inventa, disegna e scrivi i tuoi racconti, per stimolare fantasia, capacità narrative e competenze linguistiche divertendoti!"
    },
    {
      title: "Yoga del Cuore",
      description: "Un viaggio dolce per unire corpo, mente ed emozioni. Per bambini, adulti e famiglie: yoga, arteterapia e mindfulness per ritrovare connessione e serenità."
    },
    {
      title: "La Navicella dei Bambini Curiosi",
      description: "Un viaggio appassionante tra storie incredibili per imparare divertendosi e sviluppare capacità cognitive, pensiero creativo e immaginazione."
    }
  ];

  return (
    <div className="mb-16 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#00A59B] mb-4">
          SCOPRI I NUOVI LABORATORI BLOOM
        </h2>
        <p className="text-xl text-[#00A59B] font-semibold">Fai sbocciare il tuo talento!</p>
        <p className="text-gray-600 mt-2">Dal 25 agosto - Per bambini dai 5 agli 11 anni</p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
        <div className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Pomeriggi per crescere, imparare e divertirsi! Laboratori per far sbocciare mente, cuore e creatività, rafforzando abilità scolastiche ed emotive.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <p className="text-yellow-800 font-semibold">Inglese integrato naturalmente in tutte le attività!</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {laboratori.map((lab, index) => (
            <div key={index} className="bg-gradient-to-br from-[#00A59B]/5 to-[#008C95]/5 rounded-xl p-6 border border-[#00A59B]/20 hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl font-bold text-[#00A59B] mb-3">{lab.title}</h3>
              <p className="text-gray-700 leading-relaxed">{lab.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gradient-to-r from-[#00A59B] to-[#008C95] text-white rounded-xl p-6 text-center">
          <p className="text-lg font-semibold">In più: Tutti i giorni compiti e potenziamento cognitivo!</p>
        </div>
      </div>
    </div>
  );
};

const StudentsSection = () => {
  return (
    <div className="mb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#00A59B] mb-6 text-center">
          PER STUDENTI DAGLI 11 AI 18 ANNI
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-[#00A59B]/10 to-[#008C95]/10 rounded-xl">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-[#00A59B] mb-3">Aula studio</h3>
            <p className="text-gray-700">Spazi accoglienti e supporto personalizzato durante tutto l'anno scolastico</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-[#00A59B]/10 to-[#008C95]/10 rounded-xl">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-[#00A59B] mb-3">Lezioni di gruppo e individuali</h3>
            <p className="text-gray-700">Potenziamento e approfondimenti mirati nelle diverse materie</p>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-br from-[#00A59B]/10 to-[#008C95]/10 rounded-xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-[#00A59B] mb-3">Strategie di apprendimento</h3>
            <p className="text-gray-700">Metodo di studio su misura per ogni studente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OpenDaySection = () => {
  return (
    <div className="mb-16 animate-fade-in">
      <div className="bg-gradient-to-br from-[#00A59B] to-[#008C95] text-white rounded-2xl shadow-lg p-8 lg:p-12 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">VIENI ALL'OPEN DAY!</h2>
        
        <div className="bg-white/10 rounded-xl p-6 mb-6">
          <h3 className="text-2xl font-bold mb-2">AperiBloom Open Day!</h3>
          <p className="text-xl">Martedì 3 Settembre - ore 17:30</p>
        </div>
        
        <p className="text-lg mb-6 leading-relaxed">
          Un pomeriggio speciale per divertirti, scoprire le nostre attività e lasciarti sorprendere dalle novità che abbiamo preparato per te!
        </p>
        
        <div className="bg-yellow-400 text-yellow-900 rounded-xl p-4 mb-6">
          <p className="font-bold text-lg">Partecipa all'Open Day e ricevi un buono sconto esclusivo da spendere sul tuo corso preferito!</p>
        </div>
        
        <p className="text-lg mb-6">
          Conferma la tua presenza scrivendoci nome e cognome via WhatsApp al 338 225 6056 oppure via email a bloom@bloom-bi.it
        </p>
        
        <p className="text-2xl font-bold">Ti aspettiamo!</p>
      </div>
    </div>
  );
};

const WhyBloomSection = () => {
  const services = [
    "Laboratori creativi",
    "Supporto e potenziamento nelle materie scolastiche per tutto l'anno",
    "Valutazioni e consulenze psicopedagogiche",
    "Metodo e supporto pedagogico per ADHD, DSA e BES",
    "Percorsi di mindfulness per adulti, individuali e di gruppo",
    "Progettazione di esperienze per scuole, associazioni e aziende"
  ];

  return (
    <div className="mb-16 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-[#00A59B] mb-6 text-center">
          PERCHÉ SCEGLIERE BLOOM?
        </h2>
        
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Cresciamo insieme con laboratori pensati per far sbocciare mente, cuore e creatività.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Spazi accoglienti dove studiare in autonomia, seguire lezioni di gruppo o percorsi personalizzati one-to-one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {services.map((service, index) => (
            <div key={index} className="group p-6 bg-white border-2 border-[#00A59B]/20 rounded-xl hover:border-[#00A59B]/40 transition-all duration-300 hover:shadow-lg flex items-center justify-center min-h-[120px]">
              <p className="text-gray-700 leading-relaxed font-medium text-center">{service}</p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-4">
          <p className="text-xl font-medium text-[#00A59B]">
            Vola con noi verso un nuovo anno pieno di energia e scoperte!
          </p>
          <p className="text-lg font-bold text-[#00A59B]">
            Bloom, Fiorire nel tuo Spazio, col tuo Tempo
          </p>
          <p className="text-gray-700">
            Per info: 338 225 6056 - bloom@bloom-bi.it
          </p>
        </div>
      </div>
    </div>
  );
};

export default OpenDayPage;
