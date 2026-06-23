"use client";

import { usePendingMembers } from "@/features/members/api/queries";
import { useMembersList } from "@/features/members/api/queries";
import { useAdminEvents } from "@/features/events/api/queries";
import { useIntrosList } from "@/features/intros/api/queries";
import { usePaymentsList } from "@/features/payments/api/queries";
import { useApproveMember, useDeclineMember } from "@/features/members/api/mutations";
import type { DashboardKPI, PendingApproval } from "../data/mockDashboard.types";

const KPI_COLORS = ["#3B82F6", "#F59E0B", "#10B981", "#8B5CF6", "#EC4899"];

export function useDashboardData() {
  const members = useMembersList();
  const pending = usePendingMembers();
  const events = useAdminEvents();
  const intros = useIntrosList({ status: "pending" });
  const payments = usePaymentsList({ status: "paid" });
  const approveMember = useApproveMember();
  const declineMember = useDeclineMember();

  const isLoading =
    members.isLoading ||
    pending.isLoading ||
    events.isLoading ||
    intros.isLoading ||
    payments.isLoading;

  const kpiValues: DashboardKPI[] = [
    {
      label: "Total Members",
      value: (members.data?.meta as { total?: number } | undefined)?.total ?? members.data?.members.length ?? 0,
      delta: "Live",
      deltaType: "positive",
      topColor: KPI_COLORS[0],
    },
    {
      label: "Pending Approvals",
      value: (pending.data?.meta as { total?: number } | undefined)?.total ?? pending.data?.approvals.length ?? 0,
      delta: "Queue",
      deltaType: "neutral",
      topColor: KPI_COLORS[1],
    },
    {
      label: "Events",
      value: (events.data?.meta as { total?: number } | undefined)?.total ?? events.data?.events.length ?? 0,
      delta: "All",
      deltaType: "positive",
      topColor: KPI_COLORS[2],
    },
    {
      label: "Pending Intros",
      value: (intros.data?.meta as { total?: number } | undefined)?.total ?? intros.data?.intros.length ?? 0,
      delta: "Queue",
      deltaType: "neutral",
      topColor: KPI_COLORS[3],
    },
    {
      label: "Revenue (paid)",
      value: `$${Math.round(
        (payments.data?.payments ?? []).reduce((sum, p) => sum + p.amount, 0),
      ).toLocaleString()}`,
      delta: "Paid",
      deltaType: "positive",
      topColor: KPI_COLORS[4],
    },
  ];

  const pendingApprovals: PendingApproval[] = (pending.data?.approvals ?? [])
    .slice(0, 5)
    .map((a) => ({
      id: a.id,
      name: a.name,
      company: a.company,
      tier: a.tier,
      submittedAt: a.submittedAt,
    }));

  return {
    isLoading,
    kpis: kpiValues,
    pendingApprovals,
    revenueData: [],
    growthData: [],
    activity: [],
    approvePending: (id: string) => approveMember.mutate({ id }),
    declinePending: (id: string) => declineMember.mutate({ id }),
  };
}
