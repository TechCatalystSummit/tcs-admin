"use client";

import { format, parseISO, subMonths, startOfMonth } from "date-fns";
import type { ActivityItem, ChartPoint } from "../data/mockDashboard.types";
import type { AdminMember } from "@/features/members/types";
import type { Payment } from "@/features/payments/types";
import { mapOutcomeToActivity } from "@/features/outcomes/api/mappers";
import type { ApiOutcome } from "@/features/outcomes/api/mappers";
import { formatRelative } from "@/shared/utils/formatters";

export function bucketPaymentsByMonth(payments: Payment[]): ChartPoint[] {
  const now = new Date();
  const months: ChartPoint[] = [];

  for (let i = 5; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(now, i));
    const label = format(monthStart, "MMM");
    const monthKey = format(monthStart, "yyyy-MM");
    const value = payments
      .filter((p) => p.status === "paid" && p.paidAt.startsWith(monthKey))
      .reduce((sum, p) => sum + p.amount, 0);
    months.push({ label, value });
  }

  return months;
}

export function bucketMembersByWeek(members: AdminMember[]): ChartPoint[] {
  const weeks: ChartPoint[] = [];
  const now = new Date();

  for (let i = 5; i >= 0; i--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - i * 7);
    const label = format(weekStart, "MMM d");
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 7);

    const value = members.filter((m) => {
      const joined = parseISO(m.joinedAt);
      return joined >= weekStart && joined < weekEnd;
    }).length;

    weeks.push({ label, value });
  }

  return weeks;
}

export function buildActivityFeed(input: {
  members: AdminMember[];
  outcomes: ApiOutcome[];
  pendingCount: number;
}): ActivityItem[] {
  const items: ActivityItem[] = [];

  for (const outcome of input.outcomes.slice(0, 5)) {
    items.push(mapOutcomeToActivity(outcome));
  }

  for (const member of [...input.members]
    .sort((a, b) => b.joinedAt.localeCompare(a.joinedAt))
    .slice(0, 3)) {
    items.push({
      id: `member-${member.id}`,
      message: `${member.name} joined (${member.company})`,
      time: formatRelative(member.joinedAt),
      type: "member",
    });
  }

  if (input.pendingCount > 0) {
    items.push({
      id: "pending-approvals",
      message: `${input.pendingCount} member${input.pendingCount === 1 ? "" : "s"} awaiting approval`,
      time: "Now",
      type: "member",
    });
  }

  return items.slice(0, 8);
}
