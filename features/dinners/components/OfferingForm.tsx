"use client";

import { Button } from "@/shared/components/ui/Button";
import { ImageUploadField } from "@/shared/components/ui/ImageUploadField";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { cn } from "@/shared/utils/cn";
import { formatDate } from "@/shared/utils/formatters";
import { useEffect, useState } from "react";
import { useCreateOffering, useUpdateOffering } from "../api/offerings-mutations";
import { useOffering } from "../api/offerings-queries";
import { useDinnersStore } from "../store/useDinnersStore";
import type { DinnerOffering } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";

const TAG_VARIANTS = ["blue", "gold", "green"] as const;

export function OfferingFormModal() {
  const open = useDinnersStore((s) => s.offeringFormOpen);
  const editingId = useDinnersStore((s) => s.editingOfferingId);
  const closeOfferingForm = useDinnersStore((s) => s.closeOfferingForm);
  const { data: existing } = useOffering(editingId);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && closeOfferingForm()}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingId ? "Edit offering" : "New offering"}</DialogTitle>
          <DialogDescription>
            Catalog entries appear in the Summit mobile dinners browse screen.
          </DialogDescription>
        </DialogHeader>
        <OfferingForm
          key={editingId ?? "new"}
          initial={existing}
          onClose={closeOfferingForm}
        />
      </DialogContent>
    </Dialog>
  );
}

function OfferingForm({
  initial,
  onClose,
}: {
  initial?: DinnerOffering;
  onClose: () => void;
}) {
  const createOffering = useCreateOffering();
  const updateOffering = useUpdateOffering();
  const isEdit = Boolean(initial?.id);

  const [title, setTitle] = useState(initial?.title ?? "");
  const [subtitle, setSubtitle] = useState(initial?.subtitle ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [tagLabel, setTagLabel] = useState(initial?.tagLabel ?? "");
  const [tagVariant, setTagVariant] = useState<DinnerOffering["tagVariant"]>(
    initial?.tagVariant ?? "blue",
  );
  const [tierRequirement, setTierRequirement] = useState(
    initial?.tierRequirement ?? "builder",
  );
  const [seatsTotal, setSeatsTotal] = useState(initial?.seatsTotal ?? 8);
  const [seatsAvailable, setSeatsAvailable] = useState(initial?.seatsAvailable ?? 8);
  const [eventDate, setEventDate] = useState(initial?.eventDate ?? "");
  const [isFeatured, setIsFeatured] = useState(initial?.isFeatured ?? false);
  const [sortOrder, setSortOrder] = useState(initial?.sortOrder ?? 0);
  const [isActive, setIsActive] = useState(initial?.isActive ?? true);

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setSubtitle(initial.subtitle);
      setDescription(initial.description ?? "");
      setImageUrl(initial.imageUrl ?? "");
      setTagLabel(initial.tagLabel);
      setTagVariant(initial.tagVariant);
      setTierRequirement(initial.tierRequirement);
      setSeatsTotal(initial.seatsTotal);
      setSeatsAvailable(initial.seatsAvailable);
      setEventDate(initial.eventDate ?? "");
      setIsFeatured(initial.isFeatured);
      setSortOrder(initial.sortOrder);
      setIsActive(initial.isActive);
    }
  }, [initial]);

  const payload: Partial<DinnerOffering> & { title: string } = {
    title,
    subtitle,
    description: description || undefined,
    imageUrl: imageUrl || undefined,
    tagLabel,
    tagVariant,
    tierRequirement,
    seatsTotal,
    seatsAvailable,
    eventDate: eventDate || undefined,
    isFeatured,
    sortOrder,
    isActive,
  };

  const handleSubmit = () => {
    if (!title.trim()) return;
    if (isEdit && initial) {
      updateOffering.mutate({ id: initial.id, data: payload }, { onSuccess: onClose });
    } else {
      createOffering.mutate(payload, { onSuccess: onClose });
    }
  };

  const pending = createOffering.isPending || updateOffering.isPending;

  return (
    <div className="space-y-4">
      <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Input label="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />
      <ImageUploadField
        label="Image"
        value={imageUrl}
        onChange={setImageUrl}
        kind="dinner-image"
        entityId={initial?.id}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input label="Tag label" value={tagLabel} onChange={(e) => setTagLabel(e.target.value)} />
        <div className="space-y-1.5">
          <label htmlFor="tag-variant" className="text-xs font-medium text-ink2">
            Tag variant
          </label>
          <select
            id="tag-variant"
            value={tagVariant}
            onChange={(e) => setTagVariant(e.target.value as DinnerOffering["tagVariant"])}
            className={selectClass}
          >
            {TAG_VARIANTS.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Input
        label="Tier requirement"
        value={tierRequirement}
        onChange={(e) => setTierRequirement(e.target.value)}
        placeholder="builder, executive, …"
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Seats total"
          type="number"
          min={0}
          value={seatsTotal}
          onChange={(e) => setSeatsTotal(Number(e.target.value) || 0)}
        />
        <Input
          label="Seats available"
          type="number"
          min={0}
          value={seatsAvailable}
          onChange={(e) => setSeatsAvailable(Number(e.target.value) || 0)}
        />
      </div>
      <Input
        label="Event date"
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Sort order"
          type="number"
          min={0}
          value={sortOrder}
          onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
        />
        <div className="flex flex-col justify-end gap-2 pb-1">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
            Active
          </label>
        </div>
      </div>
      {isEdit && (
        <p className="text-xs text-muted">
          Event date preview: {eventDate ? formatDate(eventDate) : "—"}
        </p>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" onClick={handleSubmit} disabled={!title.trim() || pending}>
          {isEdit ? "Save changes" : "Create offering"}
        </Button>
      </div>
    </div>
  );
}

const selectClass = cn(
  "flex h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink",
  "focus:outline-none focus:ring-2 focus:ring-blue1/20 focus:border-blue1",
);
