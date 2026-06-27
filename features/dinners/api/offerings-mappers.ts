import type { DinnerOffering } from "../types";

export interface ApiOffering {
  id: string;
  title: string;
  subtitle: string;
  description?: string | null;
  imageUrl?: string | null;
  tagLabel: string;
  tagVariant: string;
  tierRequirement: string;
  seatsTotal: number;
  seatsAvailable: number;
  eventDate?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
}

export function mapApiOffering(o: ApiOffering): DinnerOffering {
  return {
    id: o.id,
    title: o.title,
    subtitle: o.subtitle,
    description: o.description ?? undefined,
    imageUrl: o.imageUrl ?? undefined,
    tagLabel: o.tagLabel,
    tagVariant: o.tagVariant as DinnerOffering["tagVariant"],
    tierRequirement: o.tierRequirement,
    seatsTotal: o.seatsTotal,
    seatsAvailable: o.seatsAvailable,
    eventDate: o.eventDate ?? undefined,
    isFeatured: o.isFeatured,
    isActive: o.isActive,
    sortOrder: o.sortOrder,
  };
}

export function offeringToCreateBody(data: Partial<DinnerOffering> & { title: string }) {
  return {
    title: data.title,
    subtitle: data.subtitle ?? "",
    description: data.description,
    imageUrl: data.imageUrl,
    tagLabel: data.tagLabel ?? "",
    tagVariant: data.tagVariant ?? "blue",
    tierRequirement: data.tierRequirement ?? "builder",
    seatsTotal: data.seatsTotal ?? 8,
    seatsAvailable: data.seatsAvailable ?? data.seatsTotal ?? 8,
    eventDate: data.eventDate,
    isFeatured: data.isFeatured ?? false,
    sortOrder: data.sortOrder ?? 0,
    isActive: data.isActive ?? true,
  };
}

export function offeringToPatchBody(data: Partial<DinnerOffering>) {
  const body: Record<string, unknown> = {};
  if (data.title !== undefined) body.title = data.title;
  if (data.subtitle !== undefined) body.subtitle = data.subtitle;
  if (data.description !== undefined) body.description = data.description ?? null;
  if (data.imageUrl !== undefined) body.imageUrl = data.imageUrl ?? "";
  if (data.tagLabel !== undefined) body.tagLabel = data.tagLabel;
  if (data.tagVariant !== undefined) body.tagVariant = data.tagVariant;
  if (data.tierRequirement !== undefined) body.tierRequirement = data.tierRequirement;
  if (data.seatsTotal !== undefined) body.seatsTotal = data.seatsTotal;
  if (data.seatsAvailable !== undefined) body.seatsAvailable = data.seatsAvailable;
  if (data.eventDate !== undefined) body.eventDate = data.eventDate ?? null;
  if (data.isFeatured !== undefined) body.isFeatured = data.isFeatured;
  if (data.sortOrder !== undefined) body.sortOrder = data.sortOrder;
  if (data.isActive !== undefined) body.isActive = data.isActive;
  return body;
}
