"use client";

import { brand } from "@/core/constants/brand";
import { fadeUp, scaleIn, transition } from "@/core/constants/motion";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { Input } from "@/shared/components/ui/Input";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      void err;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <motion.div
        className="mb-8 lg:hidden text-center"
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={{ ...transition.luxe, delay: 0.15 }}
      >
        <h1 className="text-2xl font-bold text-ink tracking-tight">{brand.adminTitle}</h1>
        <p className="text-sm text-muted mt-2">{brand.authSubhead}</p>
      </motion.div>

      <motion.div
        className="mb-8 hidden lg:block"
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={{ ...transition.luxe, delay: 0.12 }}
      >
        <h1 className="text-2xl font-bold text-ink tracking-tight">{brand.authHeadline}</h1>
        <p className="text-sm text-muted mt-2">{brand.authSubhead}</p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white border border-border rounded-2xl p-6 space-y-4 shadow-sm ring-1 ring-dark1/[0.03]"
        initial={scaleIn.initial}
        animate={scaleIn.animate}
        transition={{ ...transition.luxe, delay: 0.22 }}
      >
        <Input
          label="Email address"
          type="email"
          placeholder="admin1@tcs.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        {error ? (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        ) : null}
        <GradientButton type="submit" className="w-full" disabled={submitting || isLoading}>
          {submitting ? "Signing in…" : "Sign in"}
        </GradientButton>
        <p className="text-center text-sm">
          <Link href="/forgot-password" className="text-blue1 font-medium">
            Forgot password?
          </Link>
        </p>
      </motion.form>

      <motion.p
        className="text-center text-xs text-hint mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...transition.luxe, delay: 0.38 }}
      >
        {brand.appName} · {brand.website}
      </motion.p>
    </div>
  );
}
