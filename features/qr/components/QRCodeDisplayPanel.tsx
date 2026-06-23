"use client";

import { useQRStore } from "../store/useQRStore";
import type { QRCode } from "../types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";

export function QRCodeDisplayPanel({ codes }: { codes: QRCode[] }) {
  const selectedCodeId = useQRStore((s) => s.selectedCodeId);
  const code = codes.find((c) => c.id === selectedCodeId) ?? codes[0];

  if (!code) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted">No QR codes yet</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <SectionLabel>{code.name}</SectionLabel>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm font-mono text-blue1 break-all">{code.shortUrl}</p>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <dt className="text-hint text-xs">Scans</dt>
            <dd className="font-semibold">{code.scans}</dd>
          </div>
          <div>
            <dt className="text-hint text-xs">Conversions</dt>
            <dd className="font-semibold">{code.conversions}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
