"use client";

import { QueryErrorState } from "@/shared/components/data-display/QueryErrorState";
import { useQRStore } from "../store/useQRStore";
import { useQRAnalytics } from "../api/queries";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel, Spinner } from "@/shared/components/ui/SectionLabel";
import { ScanLogTable } from "./ScanLogTable";

export function ScanLogPanel() {
  const selectedCodeId = useQRStore((s) => s.selectedCodeId);
  const { data: analytics, isLoading, isError, error, refetch } = useQRAnalytics(selectedCodeId);

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Recent scans</SectionLabel>
      </CardHeader>
      <CardContent>
        {!selectedCodeId ? (
          <p className="text-sm text-muted">Select a QR code to view scan history</p>
        ) : isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner className="h-6 w-6" />
          </div>
        ) : isError ? (
          <QueryErrorState error={error} onRetry={() => void refetch()} />
        ) : analytics && analytics.recentScans.length > 0 ? (
          <ScanLogTable scans={analytics.recentScans} />
        ) : (
          <p className="text-sm text-muted">No scans recorded yet</p>
        )}
      </CardContent>
    </Card>
  );
}
