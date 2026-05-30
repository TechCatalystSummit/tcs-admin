export const TIERS = [
  {
    id: "community",
    label: "Community",
    price: 0,
    annualPrice: 0,
    features: ["Event access", "Member directory", "Basic intros"],
  },
  {
    id: "builder",
    label: "Builder",
    price: 49,
    annualPrice: 490,
    features: ["Priority RSVPs", "5 intros/month", "Workshop access"],
  },
  {
    id: "executive",
    label: "Executive",
    price: 833,
    annualPrice: 10000,
    features: ["VIP events", "Unlimited intros", "Executive dinners", "Concierge"],
  },
  {
    id: "partner",
    label: "Partner",
    price: 0,
    annualPrice: 0,
    features: ["Sponsor portal", "Lead capture", "Event branding"],
  },
  {
    id: "legacy",
    label: "Legacy",
    price: 0,
    annualPrice: 0,
    features: ["Founding member benefits", "Lifetime access"],
  },
] as const;

export type TierId = (typeof TIERS)[number]["id"];
