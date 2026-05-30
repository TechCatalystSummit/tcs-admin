"use client";

import { Button } from "@/shared/components/ui/Button";
import { SectionLabel } from "@/shared/components/ui/SectionLabel";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/shared/components/ui/Sheet";
import { formatDateTime } from "@/shared/utils/formatters";
import { useOutreachStore } from "../store/useOutreachStore";
import { LEAD_STATUS_LABELS, type LeadStatus } from "../types";
import { LeadStatusBadge } from "./LeadStatusBadge";
import { StageBadge } from "./StageBadge";

export function LeadDetailPanel() {
  const leadDetailOpen = useOutreachStore((s) => s.leadDetailOpen);
  const closeLeadDetail = useOutreachStore((s) => s.closeLeadDetail);
  const getActiveLead = useOutreachStore((s) => s.getActiveLead);
  const updateLeadStatus = useOutreachStore((s) => s.updateLeadStatus);
  const lead = getActiveLead();

  return (
    <Sheet open={leadDetailOpen} onOpenChange={(open) => !open && closeLeadDetail()}>
      <SheetContent>
        {lead && (
          <>
            <SheetHeader>
              <SheetTitle>{lead.name}</SheetTitle>
              <p className="text-sm text-muted mt-1">{lead.title} at {lead.company}</p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex gap-2">
                <StageBadge stage={lead.stage} />
                <LeadStatusBadge status={lead.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-hint uppercase">Email</p>
                  <p className="text-ink">{lead.email}</p>
                </div>
                <div>
                  <p className="text-xs text-hint uppercase">Phone</p>
                  <p className="text-ink">{lead.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-hint uppercase">Industry</p>
                  <p className="text-ink">{lead.industry}</p>
                </div>
                <div>
                  <p className="text-xs text-hint uppercase">Source</p>
                  <p className="text-ink">{lead.source}</p>
                </div>
                {lead.eventInterest && (
                  <div className="col-span-2">
                    <p className="text-xs text-hint uppercase">Event Interest</p>
                    <p className="text-ink">{lead.eventInterest}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-surf p-3">
                  <p className="text-lg font-bold text-ink">{lead.opens}</p>
                  <p className="text-[10px] text-muted">Opens</p>
                </div>
                <div className="rounded-xl bg-surf p-3">
                  <p className="text-lg font-bold text-ink">{lead.clicks}</p>
                  <p className="text-[10px] text-muted">Clicks</p>
                </div>
                <div className="rounded-xl bg-surf p-3">
                  <p className="text-lg font-bold text-ink">{lead.replies}</p>
                  <p className="text-[10px] text-muted">Replies</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink2">Change Status</label>
                <select
                  className="flex h-10 w-full rounded-xl border border-border bg-white px-3 text-sm"
                  value={lead.status}
                  onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                >
                  {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </div>

              {lead.notes && (
                <div>
                  <SectionLabel>Notes</SectionLabel>
                  <p className="text-sm text-ink2 mt-2">{lead.notes}</p>
                </div>
              )}

              <div>
                <SectionLabel>Activity History</SectionLabel>
                <div className="mt-3 space-y-3">
                  {lead.activity.length === 0 ? (
                    <p className="text-sm text-muted">No activity yet</p>
                  ) : (
                    lead.activity.map((item) => (
                      <div key={item.id} className="flex gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-brand-gradient mt-1.5 shrink-0" />
                        <div>
                          <p className="text-ink">{item.description}</p>
                          <p className="text-xs text-muted">{formatDateTime(item.occurredAt)}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <Button variant="outline" className="w-full">Add to Sequence</Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
