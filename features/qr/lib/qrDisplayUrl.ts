const DEFAULT_BASE = "https://techcatalystsummit.com/q";

export function qrDisplayUrl(shortCode: string): string {
  const base = (process.env.NEXT_PUBLIC_QR_DISPLAY_BASE ?? DEFAULT_BASE).replace(/\/$/, "");
  return `${base}/${shortCode}`;
}
