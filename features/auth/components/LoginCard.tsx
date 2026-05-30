"use client";

import { brand } from "@/core/constants/brand";
import { fadeUp, scaleIn, transition } from "@/core/constants/motion";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Button } from "@/shared/components/ui/Button";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { Input } from "@/shared/components/ui/Input";
import { motion } from "motion/react";
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
