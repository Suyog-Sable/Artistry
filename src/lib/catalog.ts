export type Category = "Portraits" | "Lippan art" | "Sacred art";
export type Product = {
  slug: string;
  name: string;
  category: Category;
  price: number;
  people?: number;
  size?: string;
  image: string;
  tone: string;
  description: string;
  detail: string;
};
export const products: Product[] = [
  {
    slug: "two-person-portrait",
    name: "A moment, for two",
    category: "Portraits",
    price: 499,
    people: 2,
    image: "/art/portrait.svg",
    tone: "rose",
    description: "Two-person personalized portrait",
    detail:
      "A shared memory, turned into a personal piece of art. Share your favourite photograph and discuss your portrait with Artistry.",
  },
  {
    slug: "four-person-portrait",
    name: "Your favourite people",
    category: "Portraits",
    price: 899,
    people: 4,
    image: "/art/family.svg",
    tone: "sand",
    description: "Four-person personalized portrait",
    detail:
      "Keep your people close with a personalized four-person portrait, created from the reference photographs you share.",
  },
  {
    slug: "family-portrait",
    name: "Together, always",
    category: "Portraits",
    price: 1999,
    people: 6,
    image: "/art/family.svg",
    tone: "sage",
    description: "Personalized portrait · 6 or more people",
    detail:
      "A place for everyone in the picture. Start a conversation about a personalized portrait for six or more people.",
  },
  {
    slug: "handmade-lippan",
    name: "Little mirrors of light",
    category: "Lippan art",
    price: 800,
    size: "6 inches",
    image: "/art/lippan.svg",
    tone: "sand",
    description: "Handmade Lippan art · 6 inches",
    detail:
      "Texture, pattern and little moments of reflection. A six-inch handmade Lippan artwork for a thoughtful corner of your home.",
  },
  {
    slug: "god-themed-lippan",
    name: "A little bit of divine",
    category: "Sacred art",
    price: 1000,
    image: "/art/sacred.svg",
    tone: "clay",
    description: "God-themed Lippan art",
    detail:
      "A meaningful expression of devotion through handmade Lippan art. Discuss your preferred God-themed design directly with the artist.",
  },
];
export const categories = [
  "All artwork",
  "Portraits",
  "Lippan art",
  "Sacred art",
] as const;
export const money = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
export const faqs = [
  {
    q: "How do I place an order?",
    a: "Choose an artwork, select your preferences and tap “Discuss on WhatsApp”. Your choices and the listed artwork price will be included in a message. Confirm the design, any additional charges and delivery details with Artistry before placing your order.",
  },
  {
    q: "How do I share my reference photographs?",
    a: "Open the WhatsApp conversation from your portrait page, then attach your photographs directly in WhatsApp. This website does not upload or store your photos. The artist can help you choose a suitable reference.",
  },
  {
    q: "What do the portrait prices include?",
    a: "The listed artwork prices are ₹499 for two people, ₹899 for four people and ₹1,999 for six or more people. Frame charges are additional. A2, A3 and A4 sizes are available; confirm the final quote for your chosen size and frame with the artist. Other group sizes require a quote.",
  },
  {
    q: "Can I customize a Lippan artwork?",
    a: "You can share colour and design requests through the customization form. Availability, feasibility and any additional charges must be confirmed with the artist. The listed six-inch Lippan artwork is ₹800; God-themed Lippan art is ₹1,000.",
  },
  {
    q: "How long will my artwork take, and where do you deliver?",
    a: "Production timelines, shipping availability, delivery charges and packaging details have not yet been published. Please confirm these with Artistry on WhatsApp before ordering, especially for a gift with a particular date.",
  },
  {
    q: "What are the payment, cancellation and return policies?",
    a: "Please ask Artistry to confirm payment arrangements and cancellation, revision and return terms before placing your custom order. These policies have not yet been supplied. There is no online payment collection on this website.",
  },
];
