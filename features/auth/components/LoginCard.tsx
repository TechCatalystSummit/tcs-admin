"use client";

import { GradientButton } from "@/shared/components/ui/GradientButton";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const login = useAuthStore((s) => s.login);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "admin@techcatalystsummit.com");
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-brand-gradient" />
        <h1 className="text-2xl font-bold text-ink">TCS Admin</h1>
        <p className="text-sm text-muted mt-2">Sign in to manage TechCatalyst Summit</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-6 space-y-4">
        <Input
          label="Email address"
          type="email"
          placeholder="admin@techcatalystsummit.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <GradientButton type="submit" className="w-full">
          Send magic link
        </GradientButton>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-hint">or</span>
          </div>
        </div>
        <Button type="button" variant="outline" className="w-full" onClick={handleSubmit}>
          Continue with Google
        </Button>
      </form>

      <p className="text-center text-xs text-hint mt-6">
        Phase 1 — static auth. Any email will sign you in.
      </p>
    </div>
  );
}
