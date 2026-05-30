"use client";

import { Badge } from "@/shared/components/ui/Badge";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { cn } from "@/shared/utils/cn";
import type { Sequence } from "../types";
import { SequenceStepList } from "./SequenceStepList";

interface SequenceCardProps {
  sequence: Sequence;
  onToggle: () => void;
  expanded?: boolean;
}

export function SequenceCard({ sequence, onToggle, expanded = false }: SequenceCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-ink">{sequence.name}</h3>
              <Badge variant={sequence.status === "active" ? "status" : "default"}>
                {sequence.status === "active" ? "Active" : "Paused"}
              </Badge>
            </div>
            <p className="text-sm text-muted mt-1">{sequence.description}</p>
            <div className="flex items-center gap-4 mt-3 text-xs text-muted">
              <span>{sequence.contactCount} contacts</span>
              <span>{sequence.steps.length} steps</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3">
              {sequence.steps.map((step, i) => (
                <div
                  key={step.id}
                  className={cn(
                    "h-2 w-2 rounded-full",
                    sequence.status === "active" ? "bg-blue1" : "bg-hint",
                    i === 0 && "w-4",
                  )}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={sequence.status === "active"}
            onClick={onToggle}
            className={cn(
              "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors",
              sequence.status === "active" ? "bg-green" : "bg-hint",
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform",
                sequence.status === "active" ? "translate-x-5" : "translate-x-0",
              )}
            />
          </button>
        </div>
        {expanded && <SequenceStepList steps={sequence.steps} />}
      </CardContent>
    </Card>
  );
}
