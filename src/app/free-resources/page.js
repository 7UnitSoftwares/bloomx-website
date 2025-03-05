import SectionWithBackground from "@/components/SectionWithBackground";
import Image from "next/image";

const resources = [
  {
    title: "Nebula",
    description: "our tool to spot and analyse Fake News.",
    link: "https://example.com/nebula",
    linkText: "Download it now",
    image: "/free-resources/icon1.png",
  },
  {
    title: "Sefirot’s Vademecum for presenting a creative project",
    description:
      "an effective framework that you can use to propose an idea to investors, accelerators (and even other Publishers!)",
    link: "https://example.com/sefirot",
    linkText: "Google Doc version",
    image: "/free-resources/icon2.png",
  },
  {
    title: "The Complete Manual of Intùiti",
    description:
      "in PDF format: it's very useful for inspiring your creativity even if you don't own the cards",
    link: "https://example.com/manual",
    linkText: "Read the manual",
    image: "/free-resources/icon3.png",
  },
  {
    title: "UXBox",
    description:
      "Il corso online di UX design gratuito più completo in Italia. Per chiunque voglia ampliare le proprie conoscenze in ambito di User Experience Design.",
    link: "https://example.com/uxbox",
    linkText: "Il sito ufficiale del corso",
    image: "/free-resources/icon1.png",
  },
];

export default function Resources() {
  return (
    <div className="bg-[#F2F2F2]">
      <SectionWithBackground
        title="Free Resources"
        description="Discover our products for your creative growth."
      />
      <div className="max-w-5xl mx-auto px-4 mt-5 sm:px-8 md:px-16 lg:px-28 xl:px-36 py-12">
        <h2 className="text-xl font-semibold mb-6">
          This is what we came up till now:
        </h2>
        <div className="space-y-8">
          {resources.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-32 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={220}
                  height={220}
                  className="rounded-lg border border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  👉 {item.linkText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
