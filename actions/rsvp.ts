"use server";

import { rsvpSchema } from "@/lib/validations/rsvp-schema";
import { appendRsvpRow } from "@/lib/google-sheets/rsvp-adapter";

export type RsvpActionState =
  | { status: "idle" }
  | { status: "success"; attending: boolean }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[]> };

export const initialRsvpActionState: RsvpActionState = { status: "idle" };

/**
 * Server Action backing the RSVP form. Treated as a public attack surface:
 * every field is re-validated here regardless of what the client-side form
 * already checked, and nothing about the submitter is trusted beyond what's
 * in this FormData.
 */
export async function submitRsvp(
  _prevState: RsvpActionState,
  formData: FormData
): Promise<RsvpActionState> {
  const raw = {
    fullName: formData.get("fullName"),
    attending: formData.get("attending"),
    guestCount: formData.get("guestCount") || undefined,
    dietaryNotes: formData.get("dietaryNotes") || undefined,
    message: formData.get("message") || undefined,
  };

  const result = rsvpSchema.safeParse(raw);

  if (!result.success) {
    return {
      status: "error",
      message: "Revisá los datos del formulario.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  const outcome = await appendRsvpRow(result.data);

  if (!outcome.ok) {
    return { status: "error", message: outcome.error };
  }

  return { status: "success", attending: result.data.attending === "yes" };
}
