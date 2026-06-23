"use client";

import { MockDataBanner } from "@/shared/components/MockDataBanner";
import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import Link from "next/link";
import { OutreachAnalyticsChart } from "../components/OutreachAnalyticsChart";
import { OutreachStatsStrip } from "../components/OutreachStatsStrip";
import { QuickSendCard } from "../components/QuickSendCard";
import { SequenceCard } from "../components/SequenceCard";
import { useOutreachStore } from "../store/useOutreachStore";

export default function OutreachPage() {
  const getActiveSequences = useOutreachStore((s) => s.getActiveSequences);
  const toggleSequence = useOutreachStore((s) => s.toggleSequence);
  const activeSequences = getActiveSequences();

  return (
    <>
      <PageHeader
        title="Outreach Command Center"
        subtitle="Quick send, stats, and active sequences"
      />
      <MockDataBanner module="Outreach" apiSprint="tcs-api S18–S19" />
      <div className="space-y-8">
        <QuickSendCard />
        <OutreachStatsStrip />
        <OutreachAnalyticsChart />
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <SectionLabel>Active Sequences</SectionLabel>
            <Link href="/outreach/sequences" className="text-xs text-blue1 hover:underline">
              View all sequences
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSequences.map((seq) => (
              <SequenceCard key={seq.id} sequence={seq} onToggle={() => toggleSequence(seq.id)} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
