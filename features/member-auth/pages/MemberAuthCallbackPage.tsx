"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { MemberAuthCard } from "@/features/member-auth/components/MemberAuthCard";
import { MemberAuthLayout } from "@/features/member-auth/components/MemberAuthLayout";
import {
  getAuthCallbackType,
  parseBrowserAuthParams,
  storeMemberAuthParams,
} from "@/features/member-auth/lib/authCallback";
import { Spinner } from "@/shared/components/ui/SectionLabel";

export default function MemberAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = parseBrowserAuthParams();

    if (params.error || params.error_description) {
      setError(params.error_description ?? params.error ?? "Something went wrong.");
      return;
    }

    if (!params.access_token && !params.refresh_token && !params.code) {
      setError("This link is missing sign-in details. Try opening the link from your email again.");
      return;
    }

    storeMemberAuthParams(params);
    const type = getAuthCallbackType(params);

    if (type === "recovery") {
      router.replace("/auth/reset-password");
      return;
    }

    router.replace("/auth/email-confirmed");
  }, [router]);

  return (
    <MemberAuthLayout>
      <MemberAuthCard className="text-center space-y-3">
        {error ? (
          <>
            <h1 className="text-xl font-bold text-ink">Could not complete sign-in</h1>
            <p className="text-sm text-muted">{error}</p>
            <p className="text-sm text-muted">
              Return to the Summit app and try again, or request a new email from the app.
            </p>
          </>
        ) : (
          <>
            <Spinner className="h-8 w-8 mx-auto" />
            <p className="text-sm text-muted">Confirming your email…</p>
          </>
        )}
      </MemberAuthCard>
    </MemberAuthLayout>
  );
}
