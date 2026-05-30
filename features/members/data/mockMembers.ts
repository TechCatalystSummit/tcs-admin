import type { AdminMember, MemberTier } from "../types";

const tiers: MemberTier[] = ["community", "builder", "executive", "partner", "legacy"];
const cities = ["San Francisco, CA", "New York, NY", "Miami, FL", "Austin, TX", "Seattle, WA", "Boston, MA"];
const roles = ["CEO", "CTO", "Founder", "VP Engineering", "Investor", "Product Lead"];
const companies = ["Nexus Ventures", "Apex Capital", "CloudScale", "DataForge", "Pulse AI", "Meridian Health", "Stellar Labs", "Horizon Bio"];

function makeMember(i: number): AdminMember {
  const tier = tiers[i % tiers.length];
  return {
    id: `usr_${String(i + 1).padStart(3, "0")}`,
    name: ["Sarah Chen", "Marcus Webb", "Elena Rodriguez", "James Park", "Aisha Patel", "David Kim", "Lisa Thompson", "Ryan O'Brien", "Nina Foster", "Chris Martinez", "Amy Liu", "Tom Bradley", "Priya Sharma", "Alex Turner", "Morgan Lee", "Jordan Ellis", "Kate Wilson", "Ben Carter", "Sophie Martin", "Daniel Cho", "Rachel Green", "Kevin Wu", "Olivia Brown", "Sam Hughes", "Emma Davis"][i] ?? `Member ${i + 1}`,
    email: `member${i + 1}@example.com`,
    phone: `+1 415 555 ${String(1000 + i).slice(-4)}`,
    title: roles[i % roles.length],
    company: companies[i % companies.length],
    city: cities[i % cities.length],
    tier,
    role: roles[i % roles.length],
    status: i < 22 ? "active" : i < 24 ? "pending" : "suspended",
    isVerified: i % 3 !== 0,
    linkedinUrl: `https://linkedin.com/in/member${i + 1}`,
    bio: "Building innovative solutions at the intersection of technology and community.",
    lookingFor: ["investors", "partners"],
    canOffer: ["technical-expertise", "mentorship"],
    joinedAt: `2026-${String((i % 12) + 1).padStart(2, "0")}-${String((i % 28) + 1).padStart(2, "0")}`,
    eventsAttended: (i % 8) + 1,
    introsRequested: (i % 10) + 1,
    introsReceived: (i % 15) + 1,
    mrr: tier === "executive" ? 833 : tier === "builder" ? 49 : 0,
    adminNotes: i % 5 === 0 ? "High-value member — prioritize intro requests." : undefined,
  };
}

export const mockMembers: AdminMember[] = Array.from({ length: 25 }, (_, i) => makeMember(i));
