"use server";

import { photoWallSchema } from "@/lib/validations/photo-wall-schema";
import { uploadPhotoToGooglePhotos } from "@/lib/google-photos/client";
import { PhotoWallActionState } from "@/lib/types/photo-wall";

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
  try {
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


    return { status: "success" };
  } catch (error) {
    console.error("Error en submitPhotoWallEntry:", error);
    return { status: "error", message: "Ocurrió un error inesperado. Por favor, intentá nuevamente." };
  }
}