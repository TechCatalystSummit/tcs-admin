"use client";

import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/Tabs";
import { useMembersStore } from "../store/useMembersStore";

const tabs = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "declined", label: "Declined" },
] as const;

export function ApprovalFilterTabs() {
  const tab = useMembersStore((s) => s.approvalTab);
  const setTab = useMembersStore((s) => s.setApprovalTab);

  return (
    <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
      <TabsList>
        {tabs.map((t) => (
          <TabsTrigger key={t.value} value={t.value}>
            {t.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
