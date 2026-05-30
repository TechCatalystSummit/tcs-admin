"use client";

import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { Input } from "@/shared/components/ui/Input";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { useOutreachStore } from "../store/useOutreachStore";

export function QuickSendCard() {
  const quickSend = useOutreachStore((s) => s.quickSend);
  const setQuickSendField = useOutreachStore((s) => s.setQuickSendField);
  const sendQuickEmail = useOutreachStore((s) => s.sendQuickEmail);
  const events = useOutreachStore((s) => s.events);
  const decks = useOutreachStore((s) => s.decks);
  const templates = useOutreachStore((s) => s.templates);

  const activeDecks = decks.filter((d) => d.isActive);

  return (
    <Card>
      <CardHeader>
        <SectionLabel>Quick Send</SectionLabel>
        <p className="text-sm text-muted mt-1">One-click outreach with auto-linked deck and template</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="contact@company.com"
            value={quickSend.email}
            onChange={(e) => setQuickSendField("email", e.target.value)}
          />
          <Input
            label="Name (optional)"
            placeholder="First name"
            value={quickSend.name}
            onChange={(e) => setQuickSendField("name", e.target.value)}
          />
          <Input
            label="Company (optional)"
            placeholder="Company name"
            value={quickSend.company}
            onChange={(e) => setQuickSendField("company", e.target.value)}
          />
          <div className="space-y-1.5">
            <label htmlFor="quick-event" className="text-xs font-medium text-ink2">Event</label>
            <select
              id="quick-event"
              className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
              value={quickSend.eventId}
              onChange={(e) => setQuickSendField("eventId", e.target.value)}
            >
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>{evt.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="quick-deck" className="text-xs font-medium text-ink2">Deck</label>
            <select
              id="quick-deck"
              className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
              value={quickSend.deckId}
              onChange={(e) => setQuickSendField("deckId", e.target.value)}
            >
              {activeDecks.map((deck) => (
                <option key={deck.id} value={deck.id}>{deck.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="quick-template" className="text-xs font-medium text-ink2">Template</label>
            <select
              id="quick-template"
              className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm text-ink"
              value={quickSend.templateId}
              onChange={(e) => setQuickSendField("templateId", e.target.value)}
            >
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>{tpl.name}</option>
              ))}
            </select>
          </div>
        </div>
        <GradientButton
          onClick={sendQuickEmail}
          disabled={!quickSend.email.trim()}
          className="w-full md:w-auto"
        >
          Send Now
        </GradientButton>
      </CardContent>
    </Card>
  );
}
