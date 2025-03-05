import SectionWithBackground from "@/components/SectionWithBackground";
import Image from "next/image";

const blogs = [
  {
    title: "Minimum Viable Product (MVP): Minimum non è una metafora.",
    description:
      "Invece che costruire l’idea gigantornica che abbiamo in mente, facciamo una versione semplificata che ci permetta...",
    author: "Matteo di Pascale",
    date: "Nov 30, 2017",
    readTime: "2 min read",
    category: "Conoscenza Generale",
    image: "/blog/icon1.png",
  },
  {
    title: "Qual è il miglior strumento per lo UX/UI Designer",
    description:
      "Photoshop, Illustrator, Sketch, Figma, Adobe Xd, Gimp, e chi più ne ha più ne metta. Qual è il software migliore per la User Experience?",
    author: "Matteo di Pascale",
    date: "Dec 11, 2017",
    readTime: "2 min read",
    category: "Strumenti",
    image: "/blog/icon2.png",
  },
  {
    title: "Minimum Viable Product (MVP): Minimum non è una metafora.",
    description:
      "Invece che costruire l’idea gigantornica che abbiamo in mente, facciamo una versione semplificata che ci permetta...",
    author: "Matteo di Pascale",
    date: "Nov 30, 2017",
    readTime: "2 min read",
    category: "Conoscenza Generale",
    image: "/blog/icon3.png",
  },
  {
    title:
      "Pensare come uno UX Designer può salvare il compleanno di un bambino",
    description:
      "Capita spesso che mi chiedano cosa voglia dire fare lo UX Designer. In genere è sufficiente rispondere...",
    author: "Matteo di Pascale",
    date: "Nov 30, 2017",
    readTime: "2 min read",
    category: "Conoscenza Generale",
    image: "/blog/icon4.png",
  },
  {
    title: "Minimum Viable Product (MVP): Minimum non è una metafora.",
    description:
      "Invece che costruire l’idea gigantornica che abbiamo in mente, facciamo una versione semplificata che ci permetta...",
    author: "Matteo di Pascale",
    date: "Nov 30, 2017",
    readTime: "2 min read",
    category: "Conoscenza Generale",
    image: "/blog/icon3.png",
  },
  {
    title:
      "Pensare come uno UX Designer può salvare il compleanno di un bambino",
    description:
      "Capita spesso che mi chiedano cosa voglia dire fare lo UX Designer. In genere è sufficiente rispondere...",
    author: "Matteo di Pascale",
    date: "Nov 30, 2017",
    readTime: "2 min read",
    category: "Conoscenza Generale",
    image: "/blog/icon4.png",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-[#F2F2F2]">
      <SectionWithBackground
        title="Blog"
        description="Discover our latest blog posts."
      />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((post, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            >
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                {post.category && (
                  <p className="text-red-500 uppercase text-xs font-bold mb-2">
                    {post.category}
                  </p>
                )}
                <h3 className="text-lg font-bold">{post.title}</h3>
                <p className="text-gray-700 text-sm mt-1">{post.description}</p>
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
