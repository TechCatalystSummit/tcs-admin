"use client";

import { brand } from "@/core/constants/brand";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Button } from "@/shared/components/ui/Button";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { Input } from "@/shared/components/ui/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginCard() {
  const [email, setEmail] = useState("");
  const login = useAuthStore((s) => s.login);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) router.replace("/dashboard");
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email || "admin@techcatalystsummit.com");
    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 lg:hidden text-center">
        <h1 className="text-2xl font-bold text-ink">{brand.adminTitle}</h1>
        <p className="text-sm text-muted mt-2">{brand.authSubhead}</p>
      </div>

      <div className="mb-8 hidden lg:block">
        <h1 className="text-2xl font-bold text-ink">{brand.authHeadline}</h1>
        <p className="text-sm text-muted mt-2">{brand.authSubhead}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-border rounded-2xl p-6 space-y-4 shadow-sm">
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
        {brand.appName} · {brand.website}
      </p>
    </div>
  );
}
