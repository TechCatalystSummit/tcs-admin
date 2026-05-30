"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { formatPercent } from "@/shared/utils/formatters";
import { useAnalyticsStore } from "../store/useAnalyticsStore";

export function IntroConversionFunnel() {
  const funnel = useAnalyticsStore((s) => s.data.funnel);
  const maxCount = funnel[0]?.count ?? 1;

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Intro Conversion Funnel</SectionLabel>
      </CardHeader>
      <CardContent className="space-y-3">
        {funnel.map((step, index) => {
          const widthPct = (step.count / maxCount) * 100;
          const prevCount = index > 0 ? funnel[index - 1].count : step.count;
          const conversionRate = index > 0 ? step.count / prevCount : 1;

          return (
            <div key={step.label}>
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-medium text-ink">{step.label}</span>
                <span className="text-muted">
                  {step.count.toLocaleString()}
                  {index > 0 && (
                    <span className="text-hint ml-2">({formatPercent(conversionRate)})</span>
                  )}
                </span>
              </div>
              <div className="h-8 rounded-lg bg-surf overflow-hidden">
                <div
                  className="h-full rounded-lg transition-all"
                  style={{ width: `${widthPct}%`, backgroundColor: step.color }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
