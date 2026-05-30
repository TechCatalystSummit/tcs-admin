import type { Deck } from "../types";

export const mockDecks: Deck[] = [
  {
    id: "deck_001",
    title: "TCS Summit 2026 — Sponsor Package",
    type: "sponsor",
    version: "3.2",
    fileUrl: "https://tcs.io/decks/sponsor-summit-2026.pdf",
    eventAssociation: "TCS Summit 2026",
    isActive: true,
    isDefault: true,
    lastUpdated: "2026-05-28",
  },
  {
    id: "deck_002",
    title: "Vendor Showcase Program",
    type: "vendor",
    version: "2.1",
    fileUrl: "https://tcs.io/decks/vendor-showcase.pdf",
    eventAssociation: "TCS Summit 2026",
    isActive: true,
    isDefault: false,
    lastUpdated: "2026-05-20",
  },
  {
    id: "deck_003",
    title: "Investor Overview — Q2 2026",
    type: "investor",
    version: "1.4",
    fileUrl: "https://tcs.io/decks/investor-q2-2026.pdf",
    isActive: true,
    isDefault: true,
    lastUpdated: "2026-05-15",
  },
  {
    id: "deck_004",
    title: "Strategic Partner Program",
    type: "partner",
    version: "2.0",
    fileUrl: "https://tcs.io/decks/partner-program.pdf",
    isActive: false,
    isDefault: false,
    lastUpdated: "2026-04-10",
  },
  {
    id: "deck_005",
    title: "TCS Miami 2026 — Local Sponsors",
    type: "sponsor",
    version: "1.0",
    fileUrl: "https://tcs.io/decks/sponsor-miami-2026.pdf",
    eventAssociation: "TCS Miami 2026",
    isActive: true,
    isDefault: false,
    lastUpdated: "2026-05-25",
  },
];

export const mockOutreachEvents = [
  { id: "evt_summit", label: "TCS Summit 2026" },
  { id: "evt_miami", label: "TCS Miami 2026" },
  { id: "evt_austin", label: "TCS Austin 2026" },
  { id: "evt_denver", label: "TCS Denver 2026" },
];

export const mockOutreachChartData = [
  { date: "May 1", sent: 12, openRate: 0.42 },
  { date: "May 5", sent: 18, openRate: 0.38 },
  { date: "May 9", sent: 24, openRate: 0.45 },
  { date: "May 13", sent: 15, openRate: 0.51 },
  { date: "May 17", sent: 31, openRate: 0.47 },
  { date: "May 21", sent: 28, openRate: 0.44 },
  { date: "May 25", sent: 35, openRate: 0.52 },
  { date: "May 29", sent: 22, openRate: 0.49 },
];

export const mockOutreachStats = {
  sentToday: 22,
  opensToday: 14,
  clicksToday: 8,
  repliesToday: 3,
};
