import type { AdminMember, ApprovalRequest, MemberStatus, MemberTier } from "../types";
import type { ApiProfile } from "./types";

function toTier(tier?: string): MemberTier {
  const valid: MemberTier[] = ["community", "builder", "executive", "partner", "legacy"];
  if (tier && valid.includes(tier as MemberTier)) return tier as MemberTier;
  return "community";
}

export function deriveStatus(profile: ApiProfile): MemberStatus {
  if (profile.isApproved === false) return "pending";
  if (profile.membership?.status === "canceled") return "suspended";
  if (profile.membership?.status === "past_due") return "suspended";
  return "active";
}

export function mapProfileToAdminMember(profile: ApiProfile): AdminMember {
  const tier = toTier(profile.tier ?? profile.membership?.tier?.name);
  const annualPrice = profile.membership?.tier?.annualPrice ?? 0;

  return {
    id: profile.id,
    name: profile.name,
    email: profile.email ?? "",
    phone: profile.phone ?? "",
    title: profile.title ?? "",
    company: profile.company ?? "",
    city: profile.city ?? "",
    tier,
    role: profile.roleCategory ?? profile.role ?? "member",
    status: deriveStatus(profile),
    isVerified: profile.isVerified ?? false,
    linkedinUrl: profile.linkedinUrl ?? undefined,
    bio: profile.bio ?? "",
    lookingFor: profile.lookingFor ?? [],
    canOffer: profile.canOffer ?? [],
    joinedAt: profile.createdAt ?? new Date().toISOString(),
    eventsAttended: 0,
    introsRequested: 0,
    introsReceived: 0,
    mrr: annualPrice > 0 ? Math.round(annualPrice / 12 / 100) : 0,
    adminNotes: profile.approvalNotes ?? undefined,
  };
}

export function mapPendingToApproval(profile: ApiProfile): ApprovalRequest {
  return {
    id: profile.id,
    memberId: profile.id,
    name: profile.name,
    email: profile.email ?? "",
    company: profile.company ?? "",
    title: profile.title ?? "",
    city: profile.city ?? "",
    tier: toTier(profile.tier ?? profile.membership?.tier?.name),
    bio: profile.bio ?? "",
    status: "pending",
    submittedAt: profile.createdAt ?? new Date().toISOString(),
  };
}

export function statusToApiPatch(status: MemberStatus): { isApproved?: boolean } {
  switch (status) {
    case "active":
      return { isApproved: true };
    case "pending":
    case "declined":
      return { isApproved: false };
    case "suspended":
      return { isApproved: true };
    default:
      return {};
  }
}
