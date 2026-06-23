"use client";

import type { QRCode } from "../types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";

export function ScanLogPanel({ codes }: { codes: QRCode[] }) {
  return (
    <Card>
      <CardHeader>
        <SectionLabel>Recent scans</SectionLabel>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted">
          {codes.length
            ? `${codes.reduce((sum, c) => sum + c.scans, 0)} total scans across ${codes.length} codes`
            : "No scan data yet"}
        </p>
      </CardContent>
    </Card>
  );
}
