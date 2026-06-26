"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { formatCurrency } from "@/shared/utils/formatters";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useAnalyticsContext } from "./AnalyticsProvider";

export function RevenueByTierChart() {
  const { data } = useAnalyticsContext();
  const chartData = data.revenueByTier.filter((d) => d.value > 0);

  return (
    <Card>
      <CardHeader>
        <SectionLabel>MRR by Tier</SectionLabel>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {chartData.map((entry) => (
                <Cell key={entry.tier} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: 8, border: "1px solid #E8E8EB", fontSize: 12 }}
              formatter={(value) => formatCurrency(Number(value))}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          {chartData.map((entry) => (
            <div key={entry.tier} className="flex items-center gap-1.5 text-xs text-muted">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
              {entry.label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
