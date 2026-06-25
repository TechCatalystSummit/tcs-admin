"use client";

import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { Copy, Download } from "lucide-react";
import { useCallback, useState } from "react";
import type { QRCode } from "../types";
import { QR_TYPE_LABELS } from "../types";
import { BrandedQRCode } from "./BrandedQRCode";

export function QRCodeDisplay({ code }: { code: QRCode }) {
  const [copied, setCopied] = useState(false);
  const [downloadPng, setDownloadPng] = useState<(() => void) | null>(null);

  const handleDownloadReady = useCallback((fn: () => void) => {
    setDownloadPng(() => fn);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.shortCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-4">
          <BrandedQRCode value={code.shortCode} size={192} onDownloadReady={handleDownloadReady} />
          <div className="text-center">
            <p className="font-semibold text-ink">{code.shortCode}</p>
            <p className="text-xs text-muted mt-1">{QR_TYPE_LABELS[code.type]}</p>
            <p className="text-sm text-blue1 mt-2 break-all">{code.displayUrl}</p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => void handleCopy()}>
              <Copy className="h-3.5 w-3.5 mr-1.5" />
              {copied ? "Copied!" : "Copy code"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => downloadPng?.()} disabled={!downloadPng}>
              <Download className="h-3.5 w-3.5 mr-1.5" />
              PNG
            </Button>
          </div>
          <dl className="grid grid-cols-2 gap-4 w-full text-sm mt-2">
            <div className="text-center">
              <dt className="text-hint text-xs">Scans</dt>
              <dd className="font-bold text-lg">{code.scans}</dd>
            </div>
            <div className="text-center">
              <dt className="text-hint text-xs">Conversions</dt>
              <dd className="font-bold text-lg">{code.conversions}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
