"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  getAdminAuthRedirectUrl,
  resetPasswordForEmail,
} from "@/features/auth/api/session";
import { AuthBrandHero } from "@/features/auth/components/AuthBrandHero";
import { Input } from "@/shared/components/ui/Input";
import { GradientButton } from "@/shared/components/ui/GradientButton";

export default function AdminForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const trimmed = email.trim();
    if (!trimmed) {
      setError("Enter your email address.");
      return;
    }

    setLoading(true);
    try {
      await resetPasswordForEmail(trimmed, getAdminAuthRedirectUrl());
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send reset link.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AuthBrandHero className="lg:w-[45%] xl:w-[42%]" />
      <div className="flex flex-1 items-center justify-center bg-surf px-4 py-10 lg:py-0">
        <div className="w-full max-w-md">
          {sent ? (
            <div className="bg-white border border-border rounded-2xl p-6 space-y-4 shadow-sm">
              <h1 className="text-2xl font-bold text-ink">Check your email</h1>
              <p className="text-sm text-muted">
                If an admin account exists for {email.trim()}, you will receive a password reset
                link shortly.
              </p>
              <GradientButton type="button" className="w-full" onClick={() => router.push("/login")}>
                Back to sign in
              </GradientButton>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-border rounded-2xl p-6 space-y-4 shadow-sm"
            >
              <div>
                <h1 className="text-2xl font-bold text-ink">Reset admin password</h1>
                <p className="text-sm text-muted mt-2">
                  Enter the email on your admin account.
                </p>
              </div>
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              {error ? (
                <p className="text-sm text-red-600" role="alert">
                  {error}
                </p>
              ) : null}
              <GradientButton type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending…" : "Send reset link"}
              </GradientButton>
              <p className="text-center text-sm">
                <Link href="/login" className="text-blue1 font-medium">
                  Back to sign in
                </Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
