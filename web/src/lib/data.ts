export type Sector = { icon: string; name: string; slug: string; desc: string };

export const SECTORS: Sector[] = [
  { icon: "🏛", name: "Real Estate", slug: "real-estate", desc: "Developing premium properties and sustainable communities across prime locations." },
  { icon: "⚡", name: "Tech Start-Ups", slug: "tech-startups", desc: "Investing in innovative technology ventures shaping the future." },
  { icon: "🏭", name: "Manufacturing", slug: "manufacturing", desc: "Backing cutting-edge production facilities built for scalable growth." },
  { icon: "📈", name: "Crypto & Stocks", slug: "crypto-stocks", desc: "Strategic positions in digital assets and traditional markets." },
  { icon: "⛏", name: "Mining & Exploration", slug: "mining-exploration", desc: "Exploring rare earth elements and precious stones for future value." },
  { icon: "👗", name: "Fashion & Clothing", slug: "fashion-clothing", desc: "Backing innovative designs and sustainable fashion brands." },
  { icon: "🚚", name: "Logistics & Transport", slug: "logistics-transport", desc: "Optimizing supply chains and transportation networks." },
  { icon: "📜", name: "Franchising & Licensing", slug: "franchising-licensing", desc: "Negotiating franchising, licensing and permits across private and public sectors." },
];

export type PortfolioItem = { logo: string; sector: string; name: string; desc: string; stage: string; geo: string };

// Illustrative placeholders — replace with real portfolio companies.
export const PORTFOLIO: PortfolioItem[] = [
  { logo: "SR", sector: "Real Estate", name: "Savannah Ridge", desc: "Mixed-use sustainable community development in Nairobi's growth corridor.", stage: "Series A", geo: "🇰🇪 Kenya" },
  { logo: "HX", sector: "Tech Start-Ups", name: "Helix Labs", desc: "AI-driven logistics optimization platform for emerging markets.", stage: "Seed", geo: "🇦🇺 Australia" },
  { logo: "AU", sector: "Mining & Exploration", name: "Aurelia Minerals", desc: "Rare-earth and precious-stone exploration across East Africa.", stage: "Growth", geo: "🇰🇪 Kenya" },
  { logo: "FW", sector: "Fashion & Clothing", name: "Forge & Weave", desc: "Sustainable heritage-textile fashion house with global ambitions.", stage: "Seed", geo: "🇦🇺 Australia" },
  { logo: "MC", sector: "Manufacturing", name: "Meridian Components", desc: "Precision manufacturing facility serving regional supply chains.", stage: "Series B", geo: "🇰🇪 Kenya" },
  { logo: "VT", sector: "Logistics & Transport", name: "Velocity Transit", desc: "Cross-border freight and last-mile delivery network.", stage: "Growth", geo: "🇦🇺 Australia" },
];
