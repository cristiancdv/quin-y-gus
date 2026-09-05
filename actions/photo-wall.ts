"use server";

import { photoWallSchema } from "@/lib/validations/photo-wall-schema";
import { appendPhotoWallRow } from "@/lib/google-sheets/photo-wall-adapter";

export type PhotoWallActionState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

export const initialPhotoWallActionState: PhotoWallActionState = { status: "idle" };

/**
 * Server Action backing the guest photo-upload form. Re-validates the file
 * (size + declared MIME type) server-side — the client-side `accept`
 * attribute on the input is a UX hint only, never a security boundary.
 */
export async function submitPhotoWallEntry(
  _prevState: PhotoWallActionState,
  formData: FormData
): Promise<PhotoWallActionState> {
  const raw = {
    guestName: formData.get("guestName"),
    caption: formData.get("caption") || undefined,
    photo: formData.get("photo"),
  };

  const result = photoWallSchema.safeParse(raw);

  if (!result.success) {
    return {
      status: "error",
      message: "Revisá los datos del formulario.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const outcome = await appendPhotoWallRow({
    guestName: result.data.guestName,
    caption: result.data.caption,
    fileName: result.data.photo.name,
  });

  if (!outcome.ok) {
    return { status: "error", message: outcome.error };
  }

  return { status: "success" };
}
