import Container from "@/components/Container";
import SectionWithBackground from "@/components/SectionWithBackground";
import Banner from "@/components/Banner";
import Image from "next/image";

export const metadata = {
  title: "Perché Scegliere Bloom | Centro Pedagogico",
  description: "Con Bloom intraprendi un percorso formativo e trasformativo che mette al centro la tua unicità",
};

export default function PercheScegliereBloom() {
  return (
    <section className="bg-[#F2F2F2] min-h-screen">
      <SectionWithBackground
        title="Perché Scegliere Bloom"
        description="Con Bloom intraprendi un percorso formativo e trasformativo<br /> che mette al centro la tua unicità"
      />
      <Container>
        {/* Section Title and Subtitle */}
        <div className="mb-10 mt-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#008C95] mb-2">
            Un approccio personalizzato
          </h2>
          <p className="text-gray-700 max-w-2xl">
            basato sulle neuroscienze, un supporto costante da parte di un team di esperti, e l'integrazione armoniosa di pedagogia e discipline olistiche. Un metodo pensato per guidarti verso una crescita consapevole, duratura e autentica.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <div className="w-full h-80 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/service/service_1.jpg"
                alt="Metodo su misura che integra le neuroscienze"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-[#008C95] font-bold mb-1">
              Un metodo su misura che integra le neuroscienze
            </h3>
            <p className="text-gray-700 text-sm">
              per comprendere al meglio le tue esigenze, favorendo apprendimento e crescita consapevole attraverso strategie scientificamente validate.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <div className="w-full h-80 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/service/service_2.jpg"
                alt="Team di esperti qualificati"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-[#008C95] font-bold mb-1">
              Un team di esperti qualificati,
            </h3>
            <p className="text-gray-700 text-sm">
              pronti a offrire competenze specializzate e un supporto mirato per guidarti con professionalità e dedizione nel tuo percorso di crescita.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <div className="w-full h-80 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/service/service_3.jpg"
                alt="Supporto continuo nel percorso di apprendimento"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-[#008C95] font-bold mb-1">
              Supporto continuo nel percorso di apprendimento
            </h3>
            <p className="text-gray-700 text-sm">
              Un accompagnamento costante con guide esperte e risorse dedicate per sostenerti in ogni fase del tuo percorso di apprendimento, garantendo crescita e sviluppo continuo.
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col">
            <div className="w-full h-80 relative rounded-lg overflow-hidden mb-4">
              <Image
                src="/service/service_3.jpg"
                alt="Discipline olistiche e pedagogia"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-[#008C95] font-bold mb-1">
              Le discipline olistiche, infuse di pedagogia, come strumenti di crescita consapevole.
            </h3>
            <p className="text-gray-700 text-sm">
              Un approccio che unisce discipline olistiche e pedagogia per favorire una crescita consapevole, armonizzando mente e corpo attraverso strumenti educativi e pratiche mirate.
            </p>
          </div>
        </div>
      </Container>
      {/* Full-width white background section */}
      <div className="w-full bg-white py-16 mt-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#008C95] mb-8 text-center">
            Percorsi di Studio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col items-center">
              <div className="w-full h-64 relative rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/service/service_1.jpg"
                  alt="Metodo di Studio Individuale"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[#008C95] font-bold mb-1 text-base text-center">
                Metodo di Studio Individuale
              </h3>
              <p className="text-gray-700 text-sm text-center">
                Percorso personalizzato one-to-one per sviluppare il proprio metodo di studio efficace.
              </p>
            </div>
            {/* Card 2 */}
            <div className="flex flex-col items-center">
              <div className="w-full h-64 relative rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/service/service_1.jpg"
                  alt="Metodo di Studio in Gruppo"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[#008C95] font-bold mb-1 text-base text-center">
                Metodo di Studio in Gruppo
              </h3>
              <p className="text-gray-700 text-sm text-center">
                Sessioni collaborative dove l'apprendimento si arricchisce attraverso il confronto.
              </p>
            </div>
            {/* Card 3 */}
            <div className="flex flex-col items-center">
              <div className="w-full h-64 relative rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/service/service_1.jpg"
                  alt="Lezioni Individuali"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[#008C95] font-bold mb-1 text-base text-center">
                Lezioni Individuali
              </h3>
              <p className="text-gray-700 text-sm text-center">
                Supporto mirato nelle materie specifiche, con approccio personalizzato.
              </p>
            </div>
            {/* Card 4 */}
            <div className="flex flex-col items-center">
              <div className="w-full h-64 relative rounded-2xl overflow-hidden mb-4">
                <Image
                  src="/service/service_1.jpg"
                  alt="Gruppi di Studio per Studenti"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-[#008C95] font-bold mb-1 text-base">
                Gruppi di Studio per Studenti
              </h3>
              <p className="text-gray-700 text-sm text-center">
                Spazi di apprendimento condiviso con tutor specializzati.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Banner />
    </section>
  );
} 