"use client";

import { PageHeader } from "@/shared/components/layout/PageHeader";
import { SequenceCard } from "../components/SequenceCard";
import { useOutreachStore } from "../store/useOutreachStore";

export default function SequencesPage() {
  const sequences = useOutreachStore((s) => s.sequences);
  const toggleSequence = useOutreachStore((s) => s.toggleSequence);

  return (
    <>
      <PageHeader
        title="Follow-up Sequences"
        subtitle="Automated email sequences with step delays"
      />
      <div className="space-y-4">
        {sequences.map((seq) => (
          <SequenceCard
            key={seq.id}
            sequence={seq}
            onToggle={() => toggleSequence(seq.id)}
            expanded
          />
        ))}
      </div>
    </>
  );
}
