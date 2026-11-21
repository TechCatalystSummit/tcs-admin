import type { Deck, DeckType, Lead, LeadStage, LeadStatus, Sequence, Template, TemplateType } from "../types";

export interface ApiContact {
  id: string;
  name: string;
  email: string;
  company: string | null;
  title: string | null;
  phone: string | null;
  industry: string | null;
  source: string | null;
  eventInterest: string | null;
  sponsorType: string | null;
  status: string;
  notes: string | null;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  opens: number;
  clicks: number;
  replies: number;
  createdAt: string;
}

export interface ApiTemplate {
  id: string;
  name: string;
  templateType: string;
  subject: string;
  bodyHtml: string;
  variables: string[];
  updatedAt: string;
}

export interface ApiDeck {
  id: string;
  title: string;
  deckType: DeckType;
  fileUrl: string | null;
  shortLink: string | null;
  eventId: string | null;
  version: string | null;
  isDefault: boolean;
  isActive: boolean;
  lastUpdatedAt: string;
}

export interface ApiSequence {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  steps: { id: string; stepOrder: number; delayDays: number; templateId: string; subjectOverride: string | null }[];
}

export interface ApiOutreachAnalytics {
  today: { sent: number; opens: number; clicks: number; replies: number };
  totals: { sent: number; meetingsBooked: number; dealsClosed: number };
  chart: { date: string; sent: number; openRate: number }[];
}

const STATUS_FROM_API: Record<string, LeadStatus> = {
  new: "new",
  contacted: "contacted",
  opened: "opened",
  clicked_deck: "clicked",
  replied: "replied",
  meeting_booked: "booked",
  sponsor_confirmed: "confirmed",
  proposal_sent: "proposal_sent",
  negotiating: "negotiating",
  not_interested: "not_interested",
  follow_up_later: "follow_up_later",
};

const STATUS_TO_API: Record<LeadStatus, string> = {
  new: "new",
  contacted: "contacted",
  opened: "opened",
  clicked: "clicked_deck",
  replied: "replied",
  booked: "meeting_booked",
  confirmed: "sponsor_confirmed",
  proposal_sent: "proposal_sent",
  negotiating: "negotiating",
  not_interested: "not_interested",
  follow_up_later: "follow_up_later",
};

export const leadStatusToApi = (s: LeadStatus) => STATUS_TO_API[s];

function stageFor(status: LeadStatus): LeadStage {
  if (["replied", "booked", "confirmed", "clicked", "negotiating", "proposal_sent"].includes(status)) return "hot";
  if (status === "opened") return "warm";
  if (status === "contacted") return "contacted";
  return "new";
}

export function mapContact(c: ApiContact): Lead {
  const status = STATUS_FROM_API[c.status] ?? "new";
  return {
    id: c.id,
    name: c.name,
    email: c.email,
    company: c.company ?? "",
    title: c.title ?? "",
    phone: c.phone ?? "",
    industry: c.industry ?? "",
    source: c.source ?? "",
    sponsorType: c.sponsorType ?? undefined,
    status,
    stage: stageFor(status),
    eventInterest: c.eventInterest ?? undefined,
    notes: c.notes ?? undefined,
    lastContacted: (c.lastContactedAt ?? c.createdAt).slice(0, 10),
    nextFollowUp: c.nextFollowUpAt?.slice(0, 10),
    opens: c.opens,
    clicks: c.clicks,
    replies: c.replies,
    meetingBooked: status === "booked" || status === "confirmed",
    activity: [],
  };
}

export function mapTemplate(t: ApiTemplate): Template {
  return {
    id: t.id,
    name: t.name,
    type: t.templateType as TemplateType,
    subject: t.subject,
    body: t.bodyHtml,
    variables: t.variables,
  };
}

export function mapDeck(d: ApiDeck): Deck {
  return {
    id: d.id,
    title: d.title,
    type: d.deckType,
    version: d.version ?? "1.0",
    fileUrl: d.fileUrl ?? d.shortLink ?? "",
    eventAssociation: d.eventId ?? undefined,
    isActive: d.isActive,
    isDefault: d.isDefault,
    lastUpdated: d.lastUpdatedAt.slice(0, 10),
  };
}

export function mapSequence(s: ApiSequence): Sequence {
  return {
    id: s.id,
    name: s.name,
    description: s.description ?? "",
    status: s.isActive ? "active" : "paused",
    contactCount: 0,
    steps: s.steps.map((st) => ({
      id: st.id,
      dayOffset: st.delayDays,
      templateId: st.templateId,
      subject: st.subjectOverride ?? undefined,
    })),
  };
}
