"use client";

import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { useState } from "react";
import { useOutreachStore } from "../store/useOutreachStore";
import { LEAD_STATUS_LABELS, type LeadStatus } from "../types";

export function AddLeadModal() {
  const addLeadModalOpen = useOutreachStore((s) => s.addLeadModalOpen);
  const closeAddLeadModal = useOutreachStore((s) => s.closeAddLeadModal);
  const addLead = useOutreachStore((s) => s.addLead);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [industry, setIndustry] = useState("");
  const [source, setSource] = useState("");
  const [sponsorType, setSponsorType] = useState("");
  const [eventInterest, setEventInterest] = useState("");
  const [status, setStatus] = useState<LeadStatus>("new");
  const [notes, setNotes] = useState("");

  const resetForm = () => {
    setName(""); setEmail(""); setCompany(""); setTitle(""); setPhone("");
    setIndustry(""); setSource(""); setSponsorType(""); setEventInterest("");
    setStatus("new"); setNotes("");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) { closeAddLeadModal(); resetForm(); }
  };

  const canSubmit = name.trim() && email.trim() && company.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    addLead({
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      title: title.trim(),
      phone: phone.trim(),
      industry: industry.trim() || "Other",
      source: source.trim() || "Manual Entry",
      sponsorType: sponsorType.trim() || undefined,
      eventInterest: eventInterest.trim() || undefined,
      status,
      notes: notes.trim() || undefined,
    });
    resetForm();
  };

  return (
    <Dialog open={addLeadModalOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Lead</DialogTitle>
          <DialogDescription>Create a new CRM contact.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input label="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />
            <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input label="Industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
            <Input label="Source" value={source} onChange={(e) => setSource(e.target.value)} />
            <Input label="Sponsor Type" value={sponsorType} onChange={(e) => setSponsorType(e.target.value)} />
            <Input label="Event Interest" value={eventInterest} onChange={(e) => setEventInterest(e.target.value)} className="col-span-2" />
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink2">Status</label>
              <select
                className="flex h-11 w-full rounded-xl border border-border bg-white px-4 text-sm"
                value={status}
                onChange={(e) => setStatus(e.target.value as LeadStatus)}
              >
                {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <Textarea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={!canSubmit}>Add Lead</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
