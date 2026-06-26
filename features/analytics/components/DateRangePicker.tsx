"use client";

import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";
import type { DateRange } from "../types";
import { useAnalyticsContext } from "./AnalyticsProvider";

const ranges: { value: DateRange; label: string }[] = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "custom", label: "Custom" },
];

export function DateRangePicker() {
  const { dateRange, setDateRange } = useAnalyticsContext();

  return (
    <div className="flex flex-wrap gap-2">
      {ranges.map((range) => (
        <Button
          key={range.value}
          variant={dateRange === range.value ? "primary" : "outline"}
          size="sm"
          disabled={range.value === "custom"}
          onClick={() => setDateRange(range.value)}
          className={cn(dateRange !== range.value && "font-normal")}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}
