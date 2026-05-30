"use client";

import { Badge } from "@/shared/components/ui/Badge";
import { Card, CardContent } from "@/shared/components/ui/Card";
import { cn } from "@/shared/utils/cn";
import { formatDate } from "@/shared/utils/formatters";
import { ExternalLink } from "lucide-react";
import { useOutreachStore } from "../store/useOutreachStore";
import type { Deck } from "../types";
import { DECK_TYPE_LABELS } from "../types";

interface DeckCardProps {
  deck: Deck;
}

export function DeckCard({ deck }: DeckCardProps) {
  const toggleDeckActive = useOutreachStore((s) => s.toggleDeckActive);
  const toggleDeckDefault = useOutreachStore((s) => s.toggleDeckDefault);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-ink">{deck.title}</h3>
              <Badge variant="gradient">{DECK_TYPE_LABELS[deck.type]}</Badge>
              {deck.isDefault && <Badge variant="gold">Default</Badge>}
              {!deck.isActive && <Badge variant="default">Inactive</Badge>}
            </div>
            <div className="flex items-center gap-3 mt-2 text-xs text-muted">
              <span>v{deck.version}</span>
              <span>Updated {formatDate(deck.lastUpdated)}</span>
              {deck.eventAssociation && <span>{deck.eventAssociation}</span>}
            </div>
            <a
              href={deck.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue1 mt-2 hover:underline"
            >
              View deck <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted">Active</span>
              <button
                type="button"
                role="switch"
                aria-checked={deck.isActive}
                onClick={() => toggleDeckActive(deck.id)}
                className={cn(
                  "relative inline-flex h-6 w-11 cursor-pointer rounded-full transition-colors",
                  deck.isActive ? "bg-green" : "bg-hint",
                )}
              >
                <span
                  className={cn(
                    "inline-block h-5 w-5 rounded-full bg-white shadow transition-transform mt-0.5",
                    deck.isActive ? "translate-x-5" : "translate-x-0.5",
                  )}
                />
              </button>
            </div>
            <button
              type="button"
              onClick={() => toggleDeckDefault(deck.id)}
              className="text-xs text-blue1 hover:underline"
            >
              Set as default
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
