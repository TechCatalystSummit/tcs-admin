"use client";

import { Button } from "@/shared/components/ui/Button";
import { useQRStore } from "../store/useQRStore";
import type { QRCode } from "../types";
import { QR_TYPE_LABELS } from "../types";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { BrandedQRCode } from "./BrandedQRCode";
import { Copy, Download } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

export function QRCodeDisplayPanel({ codes }: { codes: QRCode[] }) {
  const selectedCodeId = useQRStore((s) => s.selectedCodeId);
  const code = codes.find((c) => c.id === selectedCodeId) ?? codes[0];
  const [copied, setCopied] = useState(false);
  const [downloadPng, setDownloadPng] = useState<(() => void) | null>(null);

  const handleDownloadRef = useCallback((fn: () => void) => {
    setDownloadPng(() => fn);
  }, []);

  if (!code) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted">No QR codes yet</CardContent>
      </Card>
    );
  }

  const copyPayload = async () => {
    await navigator.clipboard.writeText(code.shortCode);
    setCopied(true);
    toast.success("Short code copied — encodes in QR image");
    setTimeout(() => setCopied(false), 2000);
  };

  const copyDisplayUrl = async () => {
    await navigator.clipboard.writeText(code.displayUrl);
    toast.success("Display URL copied");
  };

  return (
    <Card>
      <CardHeader>
        <SectionLabel>{code.shortCode}</SectionLabel>
        <p className="text-xs text-muted mt-1">{QR_TYPE_LABELS[code.type]}</p>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col items-center">
        <BrandedQRCode
          key={code.id}
          value={code.shortCode}
          size={168}
          onDownloadReady={handleDownloadRef}
        />
        <p className="text-xs text-hint text-center">
          Scans as <span className="font-mono text-ink">{code.shortCode}</span> in Summit
        </p>
        <p className="text-sm font-mono text-blue1 break-all text-center">{code.displayUrl}</p>
        <div className="flex flex-wrap gap-2 justify-center w-full">
          <Button variant="outline" size="sm" onClick={() => void copyPayload()}>
            <Copy className="h-3.5 w-3.5 mr-1.5" />
            {copied ? "Copied" : "Copy code"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => void copyDisplayUrl()}>
            Copy URL
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadPng?.()}
            disabled={!downloadPng}
          >
            <Download className="h-3.5 w-3.5 mr-1.5" />
            PNG
          </Button>
        </div>
        <dl className="grid grid-cols-2 gap-2 text-sm w-full">
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
