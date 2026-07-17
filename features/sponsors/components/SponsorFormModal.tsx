"use client";

import { Button } from "@/shared/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/Dialog";
import { ImageUploadField } from "@/shared/components/ui/ImageUploadField";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { cn } from "@/shared/utils/cn";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSponsor, useUpdateSponsor } from "../api/mutations";
import { useSponsor } from "../api/queries";
import type { SponsorStatus, SponsorTier } from "../types";

const sponsorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  website: z.string().optional(),
  industry: z.string().optional(),
  tier: z.enum(["platinum", "gold", "silver", "bronze", "partner"]),
  description: z.string().optional(),
  logoUrl: z.string().optional(),
  ctaLabel: z.string().optional(),
  ctaUrl: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]).optional(),
});

type SponsorFormValues = z.infer<typeof sponsorSchema>;

interface SponsorFormModalProps {
  mode: "create" | "edit";
  sponsorId?: string | null;
  open: boolean;
  onClose: () => void;
}

export function SponsorFormModal({ mode, sponsorId, open, onClose }: SponsorFormModalProps) {
  const { data: sponsor } = useSponsor(mode === "edit" ? sponsorId : null);
  const createSponsor = useCreateSponsor();
  const updateSponsor = useUpdateSponsor();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SponsorFormValues>({
    resolver: zodResolver(sponsorSchema),
    values:
      mode === "edit" && sponsor
        ? {
            name: sponsor.name,
            website: sponsor.website,
            industry: sponsor.industry,
            tier: sponsor.tier,
            description: sponsor.description,
            logoUrl: sponsor.logoUrl ?? "",
            ctaLabel: sponsor.ctaLabel ?? "",
            ctaUrl: sponsor.ctaUrl ?? "",
            status: sponsor.status,
          }
        : {
            name: "",
            website: "",
            industry: "",
            tier: "silver",
            description: "",
            logoUrl: "",
            ctaLabel: "",
            ctaUrl: "",
            status: "active",
          },
  });

  const logoUrl = watch("logoUrl") ?? "";

  const onSubmit = (data: SponsorFormValues) => {
    const payload = {
      name: data.name,
      website: data.website,
      industry: data.industry,
      tier: data.tier as SponsorTier,
      description: data.description,
      logoUrl: data.logoUrl || undefined,
      ctaLabel: data.ctaLabel,
      ctaUrl: data.ctaUrl,
      status: data.status as SponsorStatus | undefined,
    };

    if (mode === "create") {
      createSponsor.mutate(payload, {
        onSuccess: () => {
          reset();
          onClose();
        },
      });
      return;
    }

    if (!sponsorId) return;
    updateSponsor.mutate(
      { id: sponsorId, ...payload },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      },
    );
  };

  const isPending = createSponsor.isPending || updateSponsor.isPending;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Add sponsor" : "Edit sponsor"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Company name" {...register("name")} error={errors.name?.message} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Website" {...register("website")} placeholder="https://" />
            <Input label="Industry" {...register("industry")} placeholder="SaaS" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-ink2">Tier</label>
            <select
              {...register("tier")}
              className={cn(
                "flex h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink",
                "focus:outline-none focus:ring-2 focus:ring-blue1/20 focus:border-blue1",
              )}
            >
              <option value="platinum">Platinum</option>
              <option value="gold">Gold</option>
              <option value="silver">Silver</option>
              <option value="bronze">Bronze</option>
              <option value="partner">Partner</option>
            </select>
          </div>
          {mode === "edit" ? (
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-ink2">Status</label>
              <select
                {...register("status")}
                className={cn(
                  "flex h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink",
                  "focus:outline-none focus:ring-2 focus:ring-blue1/20 focus:border-blue1",
                )}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          ) : null}
          <Textarea label="Description" {...register("description")} rows={3} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="CTA label" {...register("ctaLabel")} placeholder="Learn more" />
            <Input label="CTA URL" {...register("ctaUrl")} placeholder="https://" />
          </div>
          <ImageUploadField
            label="Logo"
            value={logoUrl}
            onChange={(url) => setValue("logoUrl", url, { shouldDirty: true })}
            kind="sponsor-logo"
            entityId={mode === "edit" ? sponsorId ?? undefined : undefined}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {mode === "create" ? "Create sponsor" : "Save changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
