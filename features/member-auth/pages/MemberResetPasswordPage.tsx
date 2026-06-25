"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  createSessionFromParams,
  signOut,
  updateUserPassword,
} from "@/features/auth/api/session";
import { MemberAuthCard } from "@/features/member-auth/components/MemberAuthCard";
import { MemberAuthLayout } from "@/features/member-auth/components/MemberAuthLayout";
import {
  clearStoredMemberAuthParams,
  readStoredMemberAuthParams,
  validatePassword,
} from "@/features/member-auth/lib/authCallback";
import { Input } from "@/shared/components/ui/Input";
import { GradientButton } from "@/shared/components/ui/GradientButton";

export default function MemberResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = readStoredMemberAuthParams();
    if (!params.access_token && !params.refresh_token && !params.code) {
      setError("Your reset link has expired. Request a new one from the Summit app.");
      return;
    }

    void (async () => {
      try {
        await createSessionFromParams(params);
        setReady(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Could not verify reset link.");
      }
    })();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const validationError = validatePassword(password, confirmPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      await updateUserPassword(password);
      await signOut();
      clearStoredMemberAuthParams();
      router.replace("/auth/reset-success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MemberAuthLayout>
      <MemberAuthCard>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-ink">Choose a new password</h1>
            <p className="text-sm text-muted mt-2">
              Create a password for your Summit account, then return to the app to sign in.
            </p>
          </div>
          <Input
            label="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            disabled={!ready}
          />
          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            disabled={!ready}
          />
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <GradientButton
            type="submit"
            className="w-full"
            disabled={loading || !ready}
          >
            {loading ? "Updating…" : "Update password"}
          </GradientButton>
        </form>
      </MemberAuthCard>
    </MemberAuthLayout>
  );
}
