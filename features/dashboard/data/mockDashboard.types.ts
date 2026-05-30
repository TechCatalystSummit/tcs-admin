export interface DashboardKPI {
  label: string;
  value: string | number;
  delta: string;
  deltaType: "positive" | "negative" | "neutral";
  topColor: string;
}

export interface ActivityItem {
  id: string;
  message: string;
  time: string;
  type: "member" | "event" | "intro" | "payment";
}

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
