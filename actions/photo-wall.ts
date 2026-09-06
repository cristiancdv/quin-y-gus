"use server";

import { photoWallSchema } from "@/lib/validations/photo-wall-schema";
import { appendPhotoWallRow } from "@/lib/google-sheets/photo-wall-adapter";
import { uploadPhotoToGooglePhotos } from "@/lib/google-photos/client";
import type { PhotoWallActionState } from "@/types/form-actions";

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

  const uploadOutcome = await uploadPhotoToGooglePhotos(result.data.photo);

  if (!uploadOutcome.ok) {
    return { status: "error", message: uploadOutcome.error };
  }

  // The Google Photos upload is the guest-facing operation. Keep the Sheets
  // row as best-effort operational metadata so a missing optional tab does
  // not incorrectly tell the guest their photo was lost.
  const sheetOutcome = await appendPhotoWallRow({
    fileName: result.data.photo.name,
    googlePhotosUrl: uploadOutcome.productUrl,
  });

  if (!sheetOutcome.ok) {
    console.error("[google-sheets] No se pudo registrar la foto en Sheets.");
  }

  return { status: "success" };
}
