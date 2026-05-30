import MembersPage from "@/features/members/pages/MembersPage";
import { PageSkeleton } from "@/shared/components/layout/PageSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <MembersPage />
    </Suspense>
  );
}
