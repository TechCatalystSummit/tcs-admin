"use client";

import { cn } from "@/shared/utils/cn";
import {
  buildSummitDeepLink,
  readStoredMemberAuthParams,
} from "@/features/member-auth/lib/authCallback";
import { useMemo } from "react";

export function OpenSummitButton({ label = "Open TechCatalyst Summit" }: { label?: string }) {
  const href = useMemo(() => {
    const params = readStoredMemberAuthParams();
    return buildSummitDeepLink(params);
  }, []);

  return (
    <a
      href={href}
      className={cn(
        "block w-full text-center bg-brand-gradient text-white font-semibold rounded-full px-6 h-11 leading-[44px]",
        "hover:opacity-90 hover:shadow-md hover:shadow-blue1/20 active:scale-[0.98] transition-all duration-300",
      )}
    >
      {label}
    </a>
  );
}
