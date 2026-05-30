import type { MemberTier } from "@/features/members/types";

export type EventStatus = "draft" | "published" | "live" | "past";
export type EventType = "summit" | "workshop" | "networking" | "dinner" | "webinar" | "masterclass";
export type RsvpStatus = "confirmed" | "waitlist" | "cancelled" | "no-show";

export interface Speaker {
  id: string;
  name: string;
  title: string;
  company: string;
  bio: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  speakerId?: string;
}

export interface EventAttendee {
  id: string;
  memberId: string;
  name: string;
  email: string;
  tier: MemberTier;
  rsvpStatus: RsvpStatus;
  checkedInAt?: string;
  isVip: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  status: EventStatus;
  location: string;
  venue: string;
  startDate: string;
  endDate: string;
  capacity: number;
  rsvpCount: number;
  checkedInCount: number;
  vipCount: number;
  noShowCount: number;
  sponsors: string[];
  speakers: Speaker[];
  agenda: AgendaItem[];
  attendees: EventAttendee[];
  recap?: string;
}

export interface EventFilters {
  status: string;
  type: string;
  dateFrom: string;
  dateTo: string;
  search: string;
}

export interface EventFormData {
  title: string;
  description: string;
  type: EventType;
  location: string;
  venue: string;
  startDate: string;
  endDate: string;
  capacity: number;
  status: "draft" | "published";
}
