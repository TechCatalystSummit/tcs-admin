"use client";

import { QRCodeCanvas } from "qrcode.react";
import { useCallback, useEffect, useRef } from "react";

type Props = {
  value: string;
  size?: number;
  onDownloadReady?: (download: () => void) => void;
};

export function BrandedQRCode({ value, size = 160, onDownloadReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadPng = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `qr-${value}.png`;
    link.href = url;
    link.click();
  }, [value]);

  useEffect(() => {
    onDownloadReady?.(downloadPng);
  }, [onDownloadReady, downloadPng]);

  return (
    <div className="rounded-xl border border-border bg-white p-3 inline-flex">
      <QRCodeCanvas
        ref={canvasRef}
        value={value}
        size={size}
        level="M"
        includeMargin
        bgColor="#ffffff"
        fgColor="#0a0a0a"
      />
    </div>
  );
}
