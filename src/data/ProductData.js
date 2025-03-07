
// This is an example of how you might structure your product data
// to work with the filtering system

export const products = [
  {
    id: 1,
    name: "Creative Journal",
    tagline: "Unlock your creative potential",
    description:
      "Our best-selling journal designed to help you explore your creativity through daily prompts and exercises.",
    image: "/products/image1.png",
    discoverLink: "/products/journal",
    buyLink: "/shop/journal",
    price: 24.99,
    ageGroups: ["Ages 11+", "Adults"],
    resourceTypes: ["Journals"],
  },
  {
    id: 2,
    name: "Mindfulness Cards",
    tagline: "Practice mindfulness anywhere",
    description:
      "A deck of 50 beautifully designed cards with mindfulness exercises for all ages.",
    image: "/products/image2.png",
    discoverLink: "/products/cards",
    buyLink: "/shop/cards",
    price: 19.99,
    ageGroups: ["All ages", "Ages 7-10", "Ages 11+", "Adults"],
    resourceTypes: ["Cards"],
  },
  {
    id: 3,
    name: "Parent's Guide",
    tagline: "Supporting your child's creativity",
    description:
      "A comprehensive guide for parents to nurture creativity and emotional intelligence in children.",
    image: "/products/image2.png",
    discoverLink: "/products/guide",
    buyLink: "/shop/guide",
    price: 29.99,
    ageGroups: ["Adults"],
    resourceTypes: ["Parenting", "Teaching Guides"],
  },
  {
    id: 4,
    name: "Kids Activity Set",
    tagline: "Learning through play",
    description:
      "A collection of fun activities designed to develop problem-solving skills and creativity in young children.",
    image: "/products/image1.png",
    discoverLink: "/products/kids-set",
    buyLink: "/shop/kids-set",
    price: 34.99,
    ageGroups: ["Ages 4-6", "Ages 7-10"],
    resourceTypes: ["Printables", "Teaching Guides"],
  },
  {
    id: 5,
    name: "Meditation Audio Series",
    tagline: "Find your inner calm",
    description:
      "A series of guided meditations to help reduce stress and improve focus.",
    image: "/products/image2.png",
    discoverLink: "/products/audio",
    buyLink: "/shop/audio",
    price: 17.99,
    ageGroups: ["Ages 11+", "Adults"],
    resourceTypes: ["Videos & Audio"],
  },
];