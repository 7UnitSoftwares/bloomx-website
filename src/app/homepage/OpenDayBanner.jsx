import React from "react";
import Link from "next/link";

const OpenDayBanner = () => {
  return (
    <section className="relative py-16 bg-gradient-to-br from-[#F2F2F2] to-white">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300A59B' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10 p-8 lg:p-12">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00A59B] to-[#008C95] text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span className="text-lg">🎯</span>
                  <span>Evento Speciale - 3 Settembre</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Open Day Bloom
                </h2>
                
                {/* Subtitle */}
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Scopri i nostri laboratori e servizi educativi in un pomeriggio di esperienze uniche
                </p>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#00A59B] rounded-full"></div>
                    <span>Laboratori creativi per bambini</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#00A59B] rounded-full"></div>
                    <span>Supporto scolastico personalizzato</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#00A59B] rounded-full"></div>
                    <span>Metodo di studio innovativo</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-[#00A59B] rounded-full"></div>
                    <span>Buono sconto esclusivo</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/open-day">
                    <button className="w-full sm:w-auto bg-gradient-to-r from-[#00A59B] to-[#008C95] text-white font-semibold px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Scopri il programma completo
                    </button>
                  </Link>
                  <a 
                    href="https://wa.me/3382256056?text=Ciao! Vorrei partecipare all'Open Day del 3 Settembre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-white border-2 border-[#00A59B] text-[#00A59B] font-semibold px-8 py-4 rounded-xl hover:bg-[#00A59B] hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <span>Prenota la tua presenza</span>
                  </a>
                </div>
              </div>

              {/* Right Side - Event Details */}
              <div className="lg:w-80">
                <div className="bg-gradient-to-br from-[#00A59B]/10 to-[#008C95]/10 rounded-2xl p-6 border border-[#00A59B]/20">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#00A59B] to-[#008C95] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl text-white">📅</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Martedì 3 Settembre
                    </h3>
                    <p className="text-lg text-[#00A59B] font-semibold mb-4">
                      Ore 17:30
                    </p>
                    
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-[#00A59B]">📍</span>
                        <span>Centro Bloom, Biella</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Per bambini e famiglie</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>Buono sconto incluso</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpenDayBanner; 