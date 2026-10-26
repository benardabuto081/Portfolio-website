export type Experience = {
  organization: string;
  role: string;
  dates: string;
  description: string[];
  link?: { label: string; href: string };
};

export const experience: Experience[] = [
  {
    organization: "Sauti Labs",
    role: "Founder, CEO & Chief Research Officer",
    dates: "June 2026 — Present",
    description: [
      "I founded Sauti Labs, an AI research and products company building speech and language intelligence for Africa, and lead it as CEO and Chief Research Officer. I direct the company’s research agenda, strategy, and long-term development, working with a leadership team across operations, technology, machine learning, and legal and responsible-AI governance.",
      "My own technical focus is machine learning research and AI systems engineering for speech and language technology: the models, datasets, and systems needed to develop, optimise, and deploy them across African languages. The company’s first product, Sauti Cloud, is in early access.",
    ],
    link: { label: "sautilabs.co.ke", href: "https://sautilabs.co.ke" },
  },
  {
    organization: "Google Developer Groups, Chuka",
    role: "Digital Media & Marketing Lead",
    dates: "November 2025 — April 2026",
    description: [
      "Supported the visibility and documentation of the developer community's activities, including workshops, hackathons, and community learning initiatives. The role involved digital media, event documentation, and communicating technical community activities to a wider audience.",
    ],
  },
];
