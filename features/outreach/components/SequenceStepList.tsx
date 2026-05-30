"use client";

import { Button } from "@/shared/components/ui/Button";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useOutreachStore } from "../store/useOutreachStore";
import type { SequenceStep } from "../types";

interface SequenceStepListProps {
  steps: SequenceStep[];
}

export function SequenceStepList({ steps }: SequenceStepListProps) {
  const templates = useOutreachStore((s) => s.templates);

  return (
    <div className="mt-4 pt-4 border-t border-border">
      <SectionLabel>Sequence Steps</SectionLabel>
      <div className="mt-3 space-y-3">
        {steps.map((step) => {
          const template = templates.find((t) => t.id === step.templateId);
          return (
            <div key={step.id} className="flex items-start gap-3 rounded-xl bg-surf p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-l text-xs font-bold text-blue1">
                D{step.dayOffset}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink">Day {step.dayOffset}</p>
                <p className="text-xs text-muted truncate">{step.subject ?? template?.subject}</p>
                <p className="text-[10px] text-hint mt-0.5">{template?.name ?? "Unknown template"}</p>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
          );
        })}
      </div>
      <Button variant="outline" size="sm" className="mt-3">Add Step</Button>
    </div>
  );
}
