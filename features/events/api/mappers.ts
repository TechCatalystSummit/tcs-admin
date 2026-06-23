import type { MemberTier } from "@/features/members/types";
import type { Event, EventAttendee, EventStatus, EventType, RsvpStatus } from "../types";

export interface ApiEventAttendee {
  rsvpId: string;
  status: string;
  isVip?: boolean;
  rsvpCreatedAt?: string;
  checkedInAt?: string | null;
  user: {
    id: string;
    name: string;
    email?: string | null;
    title?: string | null;
    company?: string | null;
    tier?: string | null;
  };
}

export interface ApiEvent {
  id: string;
  title: string;
  slug?: string;
  description?: string | null;
  eventType?: string;
  status?: string;
  startsAt: string;
  endsAt?: string | null;
  venueName?: string | null;
  venueAddress?: string | null;
  city?: string | null;
  capacity?: number;
  isVip?: boolean;
  sponsorIds?: string[];
  speakers?: unknown[];
  agenda?: unknown[];
}

export function mapApiEvent(e: ApiEvent): Event {
  const statusMap: Record<string, EventStatus> = {
    draft: "draft",
    published: "published",
    live: "live",
    past: "past",
    canceled: "past",
  };
  const typeMap: Record<string, EventType> = {
    summit: "summit",
    workshop: "workshop",
    networking: "networking",
    dinner: "dinner",
    roundtable: "workshop",
  };

  return {
    id: e.id,
    title: e.title,
    description: e.description ?? "",
    type: typeMap[e.eventType ?? "summit"] ?? "summit",
    status: statusMap[e.status ?? "draft"] ?? "draft",
    location: e.city ?? "",
    venue: e.venueName ?? "",
    startDate: e.startsAt,
    endDate: e.endsAt ?? e.startsAt,
    capacity: e.capacity ?? 0,
    rsvpCount: 0,
    checkedInCount: 0,
    vipCount: 0,
    noShowCount: 0,
    sponsors: e.sponsorIds ?? [],
    speakers: [],
    agenda: [],
    attendees: [],
  };
}

export function mapApiAttendee(a: ApiEventAttendee): EventAttendee {
  const rsvpMap: Record<string, RsvpStatus> = {
    confirmed: "confirmed",
    waitlist: "waitlist",
    cancelled: "cancelled",
    canceled: "cancelled",
    "no-show": "no-show",
    no_show: "no-show",
  };
  const validTiers: MemberTier[] = ["community", "builder", "executive", "partner", "legacy"];
  const tier = validTiers.includes(a.user.tier as MemberTier)
    ? (a.user.tier as MemberTier)
    : "community";

  return {
    id: a.rsvpId,
    memberId: a.user.id,
    name: a.user.name,
    email: a.user.email ?? "",
    tier,
    rsvpStatus: rsvpMap[a.status] ?? "confirmed",
    checkedInAt: a.checkedInAt ?? undefined,
    isVip: a.isVip ?? false,
  };
}

export function uiStatusToApi(status: EventStatus): string {
  return status;
}

export function formToCreateBody(data: {
  title: string;
  description: string;
  type: string;
  location: string;
  venue: string;
  startDate: string;
  endDate: string;
  capacity: number;
  status: string;
}) {
  const slug = data.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return {
    title: data.title,
    slug: slug || `event-${Date.now()}`,
    description: data.description,
    eventType: data.type === "webinar" || data.type === "masterclass" ? "workshop" : data.type,
    status: data.status,
    startsAt: new Date(data.startDate).toISOString(),
    endsAt: data.endDate ? new Date(data.endDate).toISOString() : undefined,
    city: data.location,
    venueName: data.venue,
    capacity: data.capacity,
  };
}
