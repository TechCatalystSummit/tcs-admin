"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { fetchMe } from "@/features/auth/api/me";
import {
  createSessionFromParams,
  signOut,
} from "@/features/auth/api/session";
import { AuthBrandHero } from "@/features/auth/components/AuthBrandHero";
import { parseBrowserAuthParams } from "@/features/member-auth/lib/authCallback";
import { Spinner } from "@/shared/components/ui/SectionLabel";

export default function AdminAuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const params = parseBrowserAuthParams();

      if (params.error || params.error_description) {
        setError(params.error_description ?? params.error ?? "Auth failed");
        return;
      }

      if (params.type !== "recovery") {
        setError("This link is not valid for admin password reset.");
        return;
      }

      try {
        const session = await createSessionFromParams(params);
        if (!session) {
          setError("Could not establish a session from this link.");
          return;
        }

        await fetchMe(session.access_token);
        router.replace("/admin/reset-password");
      } catch {
        await signOut();
        setError("Access denied. This reset link is not for an admin account.");
      }
    })();
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AuthBrandHero className="lg:w-[45%] xl:w-[42%]" />
      <div className="flex flex-1 items-center justify-center bg-surf px-4 py-10">
        <div className="w-full max-w-md bg-white border border-border rounded-2xl p-6 text-center space-y-3">
          {error ? (
            <>
              <h1 className="text-xl font-bold text-ink">Reset link invalid</h1>
              <p className="text-sm text-muted">{error}</p>
              <Link href="/login" className="text-sm text-blue1 font-medium">
                Return to admin sign in
              </Link>
            </>
          ) : (
            <>
              <Spinner className="h-8 w-8 mx-auto" />
              <p className="text-sm text-muted">Verifying reset link…</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
