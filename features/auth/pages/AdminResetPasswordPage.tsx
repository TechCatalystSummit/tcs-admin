"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { updateUserPassword } from "@/features/auth/api/session";
import { AuthBrandHero } from "@/features/auth/components/AuthBrandHero";
import { Input } from "@/shared/components/ui/Input";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { validatePassword } from "@/features/member-auth/lib/authCallback";

export default function AdminResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      router.replace("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AuthBrandHero className="lg:w-[45%] xl:w-[42%]" />
      <div className="flex flex-1 items-center justify-center bg-surf px-4 py-10 lg:py-0">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white border border-border rounded-2xl p-6 space-y-4 shadow-sm"
        >
          <div>
            <h1 className="text-2xl font-bold text-ink">Choose a new password</h1>
            <p className="text-sm text-muted mt-2">Update your admin account password.</p>
          </div>
          <Input
            label="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Input
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <GradientButton type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating…" : "Update password"}
          </GradientButton>
        </form>
      </div>
    </div>
  );
}
