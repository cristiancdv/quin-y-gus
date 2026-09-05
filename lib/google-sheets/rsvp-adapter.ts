import "server-only";
import { getSheetsClient, isGoogleSheetsConfigured } from "./client";
import { googleSheetsConfig } from "./config";
import type { RsvpInput } from "@/lib/validations/rsvp-schema";

export type AppendRsvpResult = { ok: true } | { ok: false; error: string };

/**
 * Appends one validated RSVP response as a row in the "RSVPs" tab.
 *
 * This is the adapter boundary described in the project's Google Sheets
 * rules: callers pass already-validated application data, and this module
 * is the only place that knows about the provider's row/range shape.
 */
export async function appendRsvpRow(data: RsvpInput): Promise<AppendRsvpResult> {
  if (!isGoogleSheetsConfigured()) {
    if (process.env.NODE_ENV === "production") {
      // Do not pretend to succeed in production: the guest would believe
      // their RSVP was saved when nothing was actually persisted.
      console.error(
        "[google-sheets] RSVP recibido pero Google Sheets no está configurado en producción."
      );
      return {
        ok: false,
        error: "No pudimos guardar tu confirmación en este momento. Escribinos directamente.",
      };
    }

    // In local development, let the base project be demo-able before the
    // developer has wired real credentials — clearly logged, never silent.
    console.info(
      "[google-sheets] (modo desarrollo, sin credenciales) RSVP simulado:",
      data
    );
    return { ok: true };
  }

  try {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: googleSheetsConfig.spreadsheetId,
      range: googleSheetsConfig.ranges.rsvps,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            new Date().toISOString(),
            data.fullName,
            data.attending === "yes" ? "Sí" : "No",
            data.attending === "yes" ? String(data.guestCount ?? 1) : "0",
            data.dietaryNotes ?? "",
            data.message ?? "",
          ],
        ],
      },
    });
    return { ok: true };
  } catch (error) {
    console.error("[google-sheets] Error al escribir el RSVP:", error);
    return {
      ok: false,
      error: "No pudimos guardar tu confirmación. Probá de nuevo en un momento.",
    };
  }
}
