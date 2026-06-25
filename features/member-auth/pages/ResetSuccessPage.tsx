"use client";

import { MemberAuthCard } from "@/features/member-auth/components/MemberAuthCard";
import { MemberAuthLayout } from "@/features/member-auth/components/MemberAuthLayout";
import { OpenSummitButton } from "@/features/member-auth/components/OpenSummitButton";

export default function ResetSuccessPage() {
  return (
    <MemberAuthLayout>
      <MemberAuthCard className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-ink">Password updated</h1>
        <p className="text-sm text-muted leading-relaxed">
          Your password has been saved. Open Summit and sign in with your email and new password.
        </p>
        <OpenSummitButton label="Open Summit and sign in" />
      </MemberAuthCard>
    </MemberAuthLayout>
  );
}
