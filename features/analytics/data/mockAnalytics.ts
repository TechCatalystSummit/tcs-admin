import type { AnalyticsChartSeries, AnalyticsKPIs } from "../types";

export const mockAnalyticsKPIs: AnalyticsKPIs = {
  connectionsMade: 847,
  introsAccepted: 312,
  meetingsCompleted: 189,
  revenueInfluenced: 2400000,
};

export const mockAnalyticsData: AnalyticsChartSeries = {
  weeklyGrowth: [
    { week: "Apr 7", community: 12, builder: 8, executive: 3, partner: 1 },
    { week: "Apr 14", community: 15, builder: 6, executive: 2, partner: 0 },
    { week: "Apr 21", community: 18, builder: 10, executive: 4, partner: 2 },
    { week: "Apr 28", community: 14, builder: 9, executive: 3, partner: 1 },
    { week: "May 5", community: 20, builder: 12, executive: 5, partner: 1 },
    { week: "May 12", community: 22, builder: 11, executive: 4, partner: 2 },
    { week: "May 19", community: 19, builder: 14, executive: 6, partner: 1 },
    { week: "May 26", community: 25, builder: 13, executive: 5, partner: 3 },
  ],
  funnel: [
    { label: "Requested", count: 420, color: "#888899" },
    { label: "Approved", count: 312, color: "#1A73E8" },
    { label: "Connected", count: 247, color: "#0DCAF0" },
    { label: "Outcome Logged", count: 189, color: "#0D9E75" },
    { label: "Deal Made", count: 67, color: "#D0A84A" },
  ],
  revenueByTier: [
    { tier: "community", label: "Community", value: 0, color: "#888899" },
    { tier: "builder", label: "Builder", value: 24500, color: "#1A73E8" },
    { tier: "executive", label: "Executive", value: 83300, color: "#D0A84A" },
    { tier: "partner", label: "Partner", value: 12000, color: "#6B3AC9" },
    { tier: "legacy", label: "Legacy", value: 0, color: "#0D9E75" },
  ],
  topEvents: [
    { id: "te_1", event: "TCS Summit 2026", date: "2026-03-15", attendance: 342, intros: 89, deals: 23, estimatedRoi: 480000 },
    { id: "te_2", event: "TCS Miami 2026", date: "2026-04-20", attendance: 218, intros: 56, deals: 14, estimatedRoi: 290000 },
    { id: "te_3", event: "TCS Austin 2026", date: "2026-05-10", attendance: 187, intros: 42, deals: 11, estimatedRoi: 210000 },
    { id: "te_4", event: "Executive Dinner — SF", date: "2026-05-22", attendance: 24, intros: 18, deals: 8, estimatedRoi: 950000 },
    { id: "te_5", event: "TCS NYC 2026", date: "2026-04-05", attendance: 156, intros: 38, deals: 9, estimatedRoi: 175000 },
    { id: "te_6", event: "TCS Denver 2026", date: "2026-05-18", attendance: 134, intros: 31, deals: 7, estimatedRoi: 140000 },
  ],
  outcomes: [
    { id: "oc_1", connection: "Sarah Chen ↔ Nexus Ventures", date: "2026-05-28", outcomeType: "Investment", estimatedValue: 500000, notes: "Seed round intro" },
    { id: "oc_2", connection: "Marcus Webb ↔ Apex Capital", date: "2026-05-27", outcomeType: "Partnership", estimatedValue: 250000, notes: "Co-marketing agreement" },
    { id: "oc_3", connection: "Priya Sharma ↔ CloudStack", date: "2026-05-26", outcomeType: "Sponsorship", estimatedValue: 75000 },
    { id: "oc_4", connection: "James Okonkwo ↔ VentureBridge", date: "2026-05-25", outcomeType: "Advisory", estimatedValue: 30000 },
    { id: "oc_5", connection: "Elena Vasquez ↔ HealthPulse", date: "2026-05-24", outcomeType: "Customer Intro", estimatedValue: 120000 },
    { id: "oc_6", connection: "David Chen ↔ GlobalPay", date: "2026-05-23", outcomeType: "Sponsorship", estimatedValue: 150000, notes: "Platinum tier signed" },
    { id: "oc_7", connection: "Lisa Nguyen ↔ NexGen Labs", date: "2026-05-22", outcomeType: "Partnership", estimatedValue: 80000 },
    { id: "oc_8", connection: "Kevin O'Brien ↔ SecureNet", date: "2026-05-21", outcomeType: "Sponsorship", estimatedValue: 95000 },
    { id: "oc_9", connection: "Daniel Wu ↔ Quantum AI", date: "2026-05-20", outcomeType: "Investment", estimatedValue: 2000000, notes: "Series A lead intro" },
    { id: "oc_10", connection: "Grace Thompson ↔ EnergyFuture", date: "2026-05-19", outcomeType: "Sponsorship", estimatedValue: 65000 },
    { id: "oc_11", connection: "Tom Bradley ↔ RetailForge", date: "2026-05-18", outcomeType: "Vendor Deal", estimatedValue: 45000 },
    { id: "oc_12", connection: "Nina Patel ↔ BioLink Health", date: "2026-05-17", outcomeType: "Partnership", estimatedValue: 55000 },
  ],
};
