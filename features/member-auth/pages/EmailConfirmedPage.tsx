"use client";

import { MemberAuthCard } from "@/features/member-auth/components/MemberAuthCard";
import { MemberAuthLayout } from "@/features/member-auth/components/MemberAuthLayout";
import { OpenSummitButton } from "@/features/member-auth/components/OpenSummitButton";

export default function EmailConfirmedPage() {
  return (
    <MemberAuthLayout>
      <MemberAuthCard className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-ink">Email confirmed</h1>
        <p className="text-sm text-muted leading-relaxed">
          Your email address is verified. Open the Summit app on this device to set your password
          and finish your profile.
        </p>
        <OpenSummitButton />
        <p className="text-xs text-hint">
          If the app does not open, install TechCatalyst Summit and sign in from the email link
          again.
        </p>
      </MemberAuthCard>
    </MemberAuthLayout>
  );
}
