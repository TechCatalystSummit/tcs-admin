"use client";

import { useOutreachStore } from "@/features/outreach/store/useOutreachStore";
import { useEffect } from "react";

export default function OutreachLayout({ children }: { children: React.ReactNode }) {
  const load = useOutreachStore((s) => s.load);
  const loadError = useOutreachStore((s) => s.loadError);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <>
      {loadError ? (
        <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {loadError}{" "}
          <button type="button" className="underline" onClick={() => void load()}>
            Retry
          </button>
        </div>
      ) : null}
      {children}
    </>
  );
}
