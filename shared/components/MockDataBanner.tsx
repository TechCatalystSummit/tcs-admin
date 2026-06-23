import { AlertTriangle } from "lucide-react";

interface MockDataBannerProps {
  module: string;
  apiSprint?: string;
}

export function MockDataBanner({ module, apiSprint }: MockDataBannerProps) {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold">Mock data — API not yet available</p>
        <p className="text-amber-800 mt-0.5">
          The <strong>{module}</strong> module is showing Phase 1 mock data.
          {apiSprint ? ` Backend endpoints are planned for ${apiSprint}.` : null}
          {" "}See <code className="text-xs">docs/PHASE2_DEFERRED.md</code> for details.
        </p>
      </div>
    </div>
  );
}
