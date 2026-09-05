import { z } from "zod";

const MAX_PHOTO_BYTES = 8 * 1024 * 1024; // 8MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

/**
 * Validates a guest photo-wall submission at the Server Action boundary.
 * `photo` arrives as a File through FormData — never trust its size or
 * declared MIME type without checking it here first.
 */
export const photoWallSchema = z.object({
  guestName: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre.")
    .max(80, "El nombre es demasiado largo."),
  caption: z.string().trim().max(140, "Máximo 140 caracteres.").optional(),
  photo: z
    .file()
    .max(MAX_PHOTO_BYTES, "La foto no puede pesar más de 8MB.")
    .mime(ACCEPTED_TYPES, "Formato no soportado. Usá JPG, PNG o WEBP."),
});

export type PhotoWallInput = z.infer<typeof photoWallSchema>;
