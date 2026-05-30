export type NotificationType = "announcement" | "event" | "intro" | "reminder" | "promotion";

export type NotificationAudience =
  | "all"
  | "tier"
  | "event"
  | "member";

export type NotificationStatus = "sent" | "scheduled" | "draft" | "failed";

export interface NotificationRecord {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  audience: NotificationAudience;
  audienceDetail?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  status: NotificationStatus;
  sentAt?: string;
  recipientCount: number;
  openRate?: number;
}

export interface SendNotificationInput {
  type: NotificationType;
  title: string;
  message: string;
  audience: NotificationAudience;
  audienceDetail?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  announcement: "Announcement",
  event: "Event",
  intro: "Intro",
  reminder: "Reminder",
  promotion: "Promotion",
};

export const AUDIENCE_LABELS: Record<NotificationAudience, string> = {
  all: "All Members",
  tier: "By Tier",
  event: "By Event",
  member: "Specific Member",
};
