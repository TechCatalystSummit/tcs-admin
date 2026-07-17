import { apiFetch } from "@/shared/lib/api/client";
import { supabase } from "@/shared/lib/supabase/client";

export type MediaKind =
  | "profile"
  | "event-cover"
  | "sponsor-logo"
  | "dinner-image"
  | "message-attachment"
  | "admin-asset";

export type MediaContentType =
  | "image/jpeg"
  | "image/png"
  | "image/webp"
  | "application/pdf";

type UploadUrlResponse = {
  uploadUrl: string;
  token: string;
  path: string;
  bucket: string;
  publicUrl: string | null;
  contentType: MediaContentType;
};

const ALLOWED_CONTENT_TYPES = new Set<MediaContentType>([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
]);

export function normalizeContentType(mimeType: string): MediaContentType {
  const normalized = mimeType === "image/jpg" ? "image/jpeg" : mimeType;
  if (ALLOWED_CONTENT_TYPES.has(normalized as MediaContentType)) {
    return normalized as MediaContentType;
  }
  if (mimeType.startsWith("image/")) return "image/jpeg";
  return "application/pdf";
}

export async function uploadMediaFile(options: {
  kind: MediaKind;
  file: File;
  entityId?: string;
}): Promise<string> {
  const contentType = normalizeContentType(options.file.type);
  const uploadKind =
    options.entityId || options.kind === "admin-asset"
      ? options.kind
      : "admin-asset";

  const { data } = await apiFetch<UploadUrlResponse>("/api/media/upload-url", {
    method: "POST",
    body: {
      kind: uploadKind,
      contentType,
      entityId: options.entityId,
    },
  });

  const { error } = await supabase.storage
    .from(data.bucket)
    .uploadToSignedUrl(data.path, data.token, options.file, {
      contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(error.message || "Upload failed");
  }

  if (!data.publicUrl) {
    throw new Error("Upload did not return a public URL");
  }

  return data.publicUrl;
}
