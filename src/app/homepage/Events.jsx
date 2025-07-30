import Container from "@/components/Container";
import Eventcard from "@/components/Eventcard";
import SpecialEventCard from "@/components/SpecialEventCard";
import TestimonialCard from "@/components/Testimonial";
import { EventData } from "@/data/EventData";
import { SpecialEventData } from "@/data/SpecialEventData";
import { TestimonialData } from "@/data/Testimonial";

function Events() {
  return (
    <div>
      {/* Special Events Section */}
      <div className="bg-[#f0f9f8] py-16">
        <Container>
          <h1 className="typography text-center mb-4">
            Programmi Estivi 2025
          </h1>
          <p className="text-center lg:text-xl font-normal text-[#808080] mb-12">
            Scopri i nostri programmi estivi dedicati alla crescita e al benessere di bambini e ragazzi
          </p>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {SpecialEventData.map((event, index) => (
              <SpecialEventCard key={index} event={event} />
            ))}
          </div>
        </Container>
      </div>

      {/* Regular Events Section */}
      <Container>
        <h1 className="typography mt-10 lg:mt-16">
          Prossimi Eventi: Bloom Days
        </h1>
        <p className="text-center lg:mt-10  lg:text-xl font-normal text-[#808080]  ">
          Partecipa a workshop trasformativi, incontri di comunità e sessioni creative pensate per aiutarti a rilassarti e crescere. Ogni serata da Bloom è un'opportunità per connettersi, imparare e rigenerarsi in un ambiente accogliente.
        </p>
        <div className="mt-10 grid justify-center items-center xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-16">
          {EventData.map((item, index) => (
            <Eventcard key={index} item={item} />
          ))}
        </div>
      </Container>
      <div className="bg-[#F2F2F2] mt-10 lg:mt-10">
        <Container>
          <h1 className="typography pt-5 lg:pt-16">Le voci di chi ci ha scelto</h1>
           <div className="grid lg:grid-cols-3 gap-10 lg:mt-16 p-4 pb-16">
            {TestimonialData.map((data, index) => {
              return <TestimonialCard data={data} key={index} />;
            })}
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Events;
