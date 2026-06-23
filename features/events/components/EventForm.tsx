"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AgendaBuilder } from "../components/AgendaBuilder";
import { SpeakerManager } from "../components/SpeakerManager";
import { Button } from "@/shared/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/Card";
import { GradientButton } from "@/shared/components/ui/GradientButton";
import { Input } from "@/shared/components/ui/Input";
import { Textarea } from "@/shared/components/ui/Textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EVENT_TYPES } from "../data/mockEvents";
import type { AgendaItem, EventFormData, Speaker } from "../types";

const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  type: z.enum(["summit", "workshop", "networking", "dinner", "webinar", "masterclass"]),
  location: z.string().min(2, "Location is required"),
  venue: z.string().min(2, "Venue is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  status: z.enum(["draft", "published"]),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export function EventForm({ onSubmit, onCancel, isSubmitting }: EventFormProps) {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [agenda, setAgenda] = useState<AgendaItem[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "summit",
      location: "",
      venue: "",
      startDate: "",
      endDate: "",
      capacity: 100,
      status: "draft",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit({ ...data, speakers, agenda }))}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold text-ink">Basic Information</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Event Title" error={errors.title?.message} {...register("title")} />
          <Textarea label="Description" error={errors.description?.message} {...register("description")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="type" className="text-xs font-medium text-ink2">Event Type</label>
              <select
                id="type"
                className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
                {...register("type")}
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
              </select>
            </div>
            <Input
              label="Capacity"
              type="number"
              min={1}
              error={errors.capacity?.message}
              {...register("capacity", { valueAsNumber: true })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold text-ink">Date & Venue</h2>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Start Date" type="date" error={errors.startDate?.message} {...register("startDate")} />
            <Input label="End Date" type="date" error={errors.endDate?.message} {...register("endDate")} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Location (City)" error={errors.location?.message} {...register("location")} />
            <Input label="Venue" error={errors.venue?.message} {...register("venue")} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <SpeakerManager speakers={speakers} onChange={setSpeakers} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <AgendaBuilder items={agenda} onChange={setAgenda} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-sm font-semibold text-ink">Publish</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            <label htmlFor="status" className="text-xs font-medium text-ink2">Status</label>
            <select
              id="status"
              className="h-11 w-full rounded-xl border border-border bg-white px-3 text-sm text-ink"
              {...register("status")}
            >
              <option value="draft">Save as Draft</option>
              <option value="published">Publish Immediately</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center gap-3 justify-end">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <GradientButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating…" : "Create Event"}
        </GradientButton>
      </div>
    </form>
  );
}
