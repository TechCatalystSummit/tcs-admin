"use client";

import { Input } from "@/shared/components/ui/Input";
import { uploadMediaFile, type MediaKind } from "@/shared/lib/storage";
import { cn } from "@/shared/utils/cn";
import Image from "next/image";
import { useId, useState } from "react";

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  kind: MediaKind;
  entityId?: string;
  accept?: string;
  className?: string;
  urlPlaceholder?: string;
}

export function ImageUploadField({
  label,
  value,
  onChange,
  kind,
  entityId,
  accept = "image/png,image/jpeg,image/webp",
  className,
  urlPlaceholder = "https://… or upload a file",
}: ImageUploadFieldProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const displayUrl = previewUrl || value || null;

  async function handleFileChange(file: File | null) {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      const publicUrl = await uploadMediaFile({ kind, file, entityId });
      onChange(publicUrl);
      setPreviewUrl(publicUrl);
    } catch (err) {
      setPreviewUrl(null);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={inputId} className="text-xs font-medium text-ink2">
        {label}
      </label>
      {displayUrl ? (
        <div className="relative h-32 w-full overflow-hidden rounded-xl border border-border bg-surf">
          <Image
            src={displayUrl}
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ) : null}
      <input
        id={inputId}
        type="file"
        accept={accept}
        className="block w-full text-sm text-ink2 file:mr-3 file:rounded-lg file:border-0 file:bg-blue1/10 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue1"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          void handleFileChange(file);
          e.target.value = "";
        }}
      />
      <Input
        label="Or paste URL"
        value={value}
        onChange={(e) => {
          setPreviewUrl(null);
          onChange(e.target.value);
        }}
        placeholder={urlPlaceholder}
      />
      {uploading ? <p className="text-xs text-muted">Uploading…</p> : null}
      {error ? <p className="text-xs text-red">{error}</p> : null}
    </div>
  );
}

interface FileUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  className?: string;
}

export function FileUploadField({
  label,
  value,
  onChange,
  accept = "application/pdf,image/png,image/jpeg,image/webp",
  className,
}: FileUploadFieldProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(file: File | null) {
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const publicUrl = await uploadMediaFile({ kind: "admin-asset", file });
      onChange(publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={inputId} className="text-xs font-medium text-ink2">
        {label}
      </label>
      <input
        id={inputId}
        type="file"
        accept={accept}
        className="block w-full text-sm text-ink2 file:mr-3 file:rounded-lg file:border-0 file:bg-blue1/10 file:px-3 file:py-2 file:text-sm file:font-medium file:text-blue1"
        disabled={uploading}
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          void handleFileChange(file);
          e.target.value = "";
        }}
      />
      <Input
        label="Or paste file URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://…"
      />
      {uploading ? <p className="text-xs text-muted">Uploading…</p> : null}
      {error ? <p className="text-xs text-red">{error}</p> : null}
    </div>
  );
}
