import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { brand, logo } from "@/core/constants/brand";
import { Toaster } from "sonner";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${brand.adminTitle} — ${brand.appName}`,
  description: brand.tagline,
  icons: {
    icon: logo.src,
    apple: logo.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
