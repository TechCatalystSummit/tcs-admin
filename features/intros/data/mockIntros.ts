import type { IntroMember, IntroReason, IntroRequest, IntroStatus } from "../types";

export const mockIntroMembers: IntroMember[] = [
  { id: "usr_001", name: "Sarah Chen", company: "Nexus Ventures", title: "CTO" },
  { id: "usr_002", name: "Marcus Webb", company: "Apex Capital", title: "CEO" },
  { id: "usr_003", name: "Elena Rodriguez", company: "CloudScale", title: "Founder" },
  { id: "usr_004", name: "James Park", company: "DataForge", title: "VP Engineering" },
  { id: "usr_005", name: "Aisha Patel", company: "Pulse AI", title: "Investor" },
  { id: "usr_006", name: "David Kim", company: "Meridian Health", title: "Product Lead" },
  { id: "usr_007", name: "Lisa Thompson", company: "Stellar Labs", title: "CEO" },
  { id: "usr_008", name: "Ryan O'Brien", company: "Horizon Bio", title: "CTO" },
  { id: "usr_009", name: "Nina Foster", company: "Nexus Ventures", title: "Founder" },
  { id: "usr_010", name: "Chris Martinez", company: "Apex Capital", title: "VP Engineering" },
  { id: "usr_011", name: "Amy Liu", company: "CloudScale", title: "Investor" },
  { id: "usr_012", name: "Tom Bradley", company: "DataForge", title: "CEO" },
  { id: "usr_013", name: "Priya Sharma", company: "Pulse AI", title: "Founder" },
  { id: "usr_014", name: "Alex Turner", company: "Meridian Health", title: "CTO" },
  { id: "usr_015", name: "Morgan Lee", company: "Stellar Labs", title: "Product Lead" },
];

const statuses: IntroStatus[] = ["pending", "approved", "declined", "completed", "follow_up"];
const reasons: IntroReason[] = [
  "investment",
  "partnership",
  "mentorship",
  "hiring",
  "customer-intro",
  "advisory",
  "other",
];

const reasonDetails = [
  "Looking for seed-stage investors with enterprise SaaS experience.",
  "Potential co-marketing partnership for Q3 summit.",
  "Seeking mentorship on scaling engineering teams past 50 people.",
  "Hiring a senior ML engineer — warm intro preferred.",
  "Enterprise buyer intro for healthcare vertical.",
  "Advisory board candidate with fintech background.",
  "General networking — both members expressed mutual interest.",
  "Follow-up from TCS Miami event conversation.",
  "Investor intro for Series A raise targeting $8M.",
  "Strategic partnership for API integration.",
];

const outcomes = [
  "Meeting scheduled for next week.",
  "Both parties connected via email.",
  "Deal in progress — term sheet under review.",
  "Intro completed — no further action needed.",
  "Follow-up call booked for June 5.",
  undefined,
];

function member(i: number): IntroMember {
  return mockIntroMembers[i % mockIntroMembers.length];
}

function makeIntro(i: number): IntroRequest {
  const status = statuses[i % statuses.length];
  const from = member(i);
  const to = member(i + 3);
  return {
    id: `intro_${String(i + 1).padStart(3, "0")}`,
    fromMember: from,
    toMember: to.id === from.id ? member(i + 1) : to,
    reason: reasons[i % reasons.length],
    reasonDetail: reasonDetails[i % reasonDetails.length],
    status,
    requestedAt: `2026-${String((i % 5) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    outcome: status === "completed" || status === "follow_up" ? outcomes[i % outcomes.length] : undefined,
    adminNotes: i % 4 === 0 ? "High-priority intro — executive tier members." : undefined,
    assignedTo: i % 3 === 0 ? "Admin Team" : undefined,
    completedAt: status === "completed" ? `2026-05-${String((i % 20) + 1).padStart(2, "0")}` : undefined,
  };
}

export const mockIntros: IntroRequest[] = Array.from({ length: 18 }, (_, i) => makeIntro(i));
