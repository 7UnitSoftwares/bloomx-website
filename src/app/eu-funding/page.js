"use client";

import React from "react";
import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Banner from "@/components/Banner";
import Link from "next/link";
import Image from "next/image";

export default function EUFundingPage() {
  return (
    <section className="bg-[#F2F2F2] min-h-screen">
      <SectionWithBackground
        title="Finanziamento Europeo"
        description="Bloom è finanziato dall'Unione Europea attraverso il programma NextGenerationEU"
      />
      
      <Container>
        <div className="max-w-4xl mx-auto py-16">
          {/* Back to Home Link */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-[#008C95] hover:text-[#006A70] transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Torna alla Home
            </Link>
          </div>

          {/* EU Funding Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Header with EU Flag and Title */}
            <div className="flex items-start gap-6 mb-8">
              <div className="flex-shrink-0">
                <Image 
                  src="/eu-logo.png" 
                  alt="Logo Unione Europea" 
                  width={80}
                  height={80}
                  className="h-20 w-auto"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-[#1B1B1B] mb-2">
                  Finanziato dall'Unione europea
                </h2>
                <p className="text-lg font-semibold text-[#1B1B1B] mb-1">
                  NextGenerationEU
                </p>
              </div>
            </div>

            {/* Beneficiary Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#1B1B1B] mb-3">
                Nome del beneficiario
              </h3>
              <p className="text-2xl font-bold text-[#1B1B1B] mb-4">
                Giada Bono
              </p>
              
              <div className="mb-4">
                <p className="text-sm text-[#1B1B1B] mb-1">
                  <strong>Codice progetto:</strong> IFS0000002-0000419
                </p>
                <p className="text-sm text-[#1B1B1B] mb-1">
                  <strong>Bloom | Centro per l'apprendimento e la crescita</strong>
                </p>
                <p className="text-sm text-[#1B1B1B]">
                  <strong>Titolo del progetto:</strong> Fondo Impresa Femminile
                </p>
              </div>
            </div>

            {/* Project Objective */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#1B1B1B] mb-4">
                Obiettivo principale dell'operazione
              </h3>
              <p className="text-[#1B1B1B] leading-relaxed">
                Promuovere la crescita e lo sviluppo di Bloom come centro di formazione e sostegno alla genitorialità, attraverso un sistema integrato di supporto digitale e fisico che accompagni i genitori nella crescita e nello sviluppo dei figli, potenziando l'impatto educativo e sociale mediante percorsi di formazione, mindfulness e supporto alla comunità.
              </p>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#1B1B1B] mb-4">
                Informazioni sul finanziamento
              </h3>
              <div className="bg-[#F8F9FA] p-6 rounded-lg">
                <p className="text-[#1B1B1B] leading-relaxed mb-4">
                  Questo progetto è stato selezionato e finanziato nell'ambito del programma NextGenerationEU, 
                  l'iniziativa dell'Unione Europea per la ripresa e la resilienza post-pandemia.
                </p>
                <p className="text-[#1B1B1B] leading-relaxed">
                  Il sostegno dell'Unione Europea permette a Bloom di sviluppare e implementare soluzioni innovative 
                  per l'educazione e la formazione, contribuendo alla crescita sociale ed economica del territorio.
                </p>
              </div>
            </div>

            {/* Document Download */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-[#1B1B1B] mb-4">
                Documentazione
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="/xstampadigitale.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-[#008C95] text-white rounded-lg hover:bg-[#006A70] transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Scarica documento ufficiale
                </a>
                <Link 
                  href="/siamo#nextgenerationeu" 
                  className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vedi nella sezione Chi Siamo
                </Link>
              </div>
            </div>

            {/* European Commission Footer */}
            <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
              <Image 
                src="/EuropeanCommission.jpg" 
                alt="European Commission" 
                width={200}
                height={80}
                className="h-20 w-auto"
              />
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold text-[#008C95] mb-4">
              Scopri di più su Bloom
            </h3>
            <p className="text-gray-600 mb-6">
              Conosci la nostra missione e i nostri servizi per la crescita e l'apprendimento
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/siamo" 
                className="inline-flex items-center px-6 py-3 bg-[#008C95] text-white rounded-lg hover:bg-[#006A70] transition-colors"
              >
                Chi Siamo
              </Link>
              <Link 
                href="/servizi" 
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-[#008C95] text-[#008C95] rounded-lg hover:bg-[#008C95] hover:text-white transition-colors"
              >
                I Nostri Servizi
              </Link>
            </div>
          </div>
        </div>
      </Container>
      
      <Banner />
    </section>
  );
}
