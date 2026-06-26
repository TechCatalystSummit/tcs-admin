export interface DashboardKPI {
  label: string;
  value: string | number;
  delta: string;
  deltaType: "positive" | "negative" | "neutral";
  topColor: string;
}

export type { ActivityItem } from "@/shared/types/activity";

export interface ChartPoint {
  label: string;
  value: number;
  tier?: string;
}

export interface PendingApproval {
  id: string;
  name: string;
  company: string;
  tier: string;
  submittedAt: string;
}
