export type LeadStatus =
  | "new"
  | "contacted"
  | "opened"
  | "clicked"
  | "replied"
  | "booked"
  | "confirmed";

export type LeadStage = "hot" | "warm" | "new" | "contacted";

export type TemplateType =
  | "initial-outreach"
  | "follow-up"
  | "event-invite"
  | "deck-send"
  | "meeting-request"
  | "thank-you"
  | "re-engagement"
  | "sponsor-pitch"
  | "vendor-intro"
  | "custom";

export type DeckType = "sponsor" | "vendor" | "investor" | "partner";

export type SequenceStatus = "active" | "paused";

export interface LeadActivity {
  id: string;
  type: "sent" | "opened" | "clicked" | "replied" | "note";
  description: string;
  occurredAt: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  title: string;
  phone: string;
  industry: string;
  source: string;
  sponsorType?: string;
  status: LeadStatus;
  stage: LeadStage;
  eventInterest?: string;
  notes?: string;
  lastContacted: string;
  nextFollowUp?: string;
  opens: number;
  clicks: number;
  replies: number;
  meetingBooked: boolean;
  activity: LeadActivity[];
}

export interface LeadFilters {
  stage: string;
  status: string;
  source: string;
  industry: string;
  search: string;
}

export interface SequenceStep {
  id: string;
  dayOffset: number;
  templateId: string;
  subject?: string;
}

export interface Sequence {
  id: string;
  name: string;
  description: string;
  status: SequenceStatus;
  contactCount: number;
  steps: SequenceStep[];
}

export interface Template {
  id: string;
  name: string;
  type: TemplateType;
  subject: string;
  body: string;
  lastUsed?: string;
  variables: string[];
}

export interface Deck {
  id: string;
  title: string;
  type: DeckType;
  version: string;
  fileUrl: string;
  eventAssociation?: string;
  isActive: boolean;
  isDefault: boolean;
  lastUpdated: string;
}

export interface QuickSendState {
  email: string;
  name: string;
  company: string;
  eventId: string;
  deckId: string;
  templateId: string;
}

export interface OutreachStats {
  sentToday: number;
  opensToday: number;
  clicksToday: number;
  repliesToday: number;
}

export interface OutreachChartPoint {
  date: string;
  sent: number;
  openRate: number;
}

export interface AddLeadInput {
  name: string;
  email: string;
  company: string;
  title: string;
  phone: string;
  industry: string;
  source: string;
  sponsorType?: string;
  eventInterest?: string;
  status: LeadStatus;
  notes?: string;
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  opened: "Opened",
  clicked: "Clicked",
  replied: "Replied",
  booked: "Booked",
  confirmed: "Confirmed",
};

export const LEAD_STAGE_LABELS: Record<LeadStage, string> = {
  hot: "Hot",
  warm: "Warm",
  new: "New",
  contacted: "Contacted",
};

export const TEMPLATE_TYPE_LABELS: Record<TemplateType, string> = {
  "initial-outreach": "Initial Outreach",
  "follow-up": "Follow-up",
  "event-invite": "Event Invite",
  "deck-send": "Deck Send",
  "meeting-request": "Meeting Request",
  "thank-you": "Thank You",
  "re-engagement": "Re-engagement",
  "sponsor-pitch": "Sponsor Pitch",
  "vendor-intro": "Vendor Intro",
  custom: "Custom",
};

export const DECK_TYPE_LABELS: Record<DeckType, string> = {
  sponsor: "Sponsor",
  vendor: "Vendor",
  investor: "Investor",
  partner: "Partner",
};

export const TEMPLATE_VARIABLES = [
  "{{first_name}}",
  "{{company}}",
  "{{event_name}}",
  "{{deck_link}}",
  "{{sender_name}}",
  "{{meeting_link}}",
];
