"use client";

import { StatCard } from "@/shared/components/data-display/StatCard";
import { formatCurrency } from "@/shared/utils/formatters";
import { deltaTypeFromPct, formatDeltaPct } from "../api/mappers";
import { useAnalyticsContext } from "./AnalyticsProvider";

export function AnalyticsKPIRow() {
  const { kpis } = useAnalyticsContext();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Connections Made"
        value={kpis.connectionsMade}
        topColor="#0D9E75"
        delta={formatDeltaPct(kpis.deltas.connectionsMade)}
        deltaType={deltaTypeFromPct(kpis.deltas.connectionsMade)}
      />
      <StatCard
        label="Intros Accepted"
        value={kpis.introsAccepted}
        topColor="#1A73E8"
        delta={formatDeltaPct(kpis.deltas.introsAccepted)}
        deltaType={deltaTypeFromPct(kpis.deltas.introsAccepted)}
      />
      <StatCard
        label="Meetings Completed"
        value={kpis.meetingsCompleted}
        topColor="#6B3AC9"
        delta={formatDeltaPct(kpis.deltas.meetingsCompleted)}
        deltaType={deltaTypeFromPct(kpis.deltas.meetingsCompleted)}
      />
      <StatCard
        label="Revenue Influenced"
        value={formatCurrency(kpis.revenueInfluenced)}
        topColor="#D0A84A"
        delta={formatDeltaPct(kpis.deltas.revenueInfluenced)}
        deltaType={deltaTypeFromPct(kpis.deltas.revenueInfluenced)}
      />
    </div>
  );
}
