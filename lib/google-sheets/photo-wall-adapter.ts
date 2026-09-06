import "server-only";
import { getSheetsClient, isGoogleSheetsConfigured } from "./client";
import { googleSheetsConfig } from "./config";

export interface PhotoWallEntry {
  fileName: string;
  googlePhotosUrl?: string;
}

export type AppendPhotoWallResult = { ok: true } | { ok: false; error: string };

/**
 * Records a guest photo-wall submission in the "MuroDeFotos" tab.
 *
 * Google Sheets stores operational metadata only; binary photo storage is
 * handled by the Google Photos adapter before this function is called.
 */
export async function appendPhotoWallRow(entry: PhotoWallEntry): Promise<AppendPhotoWallResult> {
  if (!isGoogleSheetsConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error(
        "[google-sheets] Foto recibida pero Google Sheets no está configurado en producción."
      );
      return {
        ok: false,
        error: "No pudimos guardar tu foto en este momento. Probá más tarde.",
      };
    }

    console.info(
      "[google-sheets] (modo desarrollo, sin credenciales) Entrada de muro de fotos simulada:",
      entry
    );
    return { ok: true };
  }

  try {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: googleSheetsConfig.spreadsheetId,
      range: googleSheetsConfig.ranges.photoWall,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[new Date().toISOString(), entry.fileName, entry.googlePhotosUrl ?? ""]],
      },
    });
    return { ok: true };
  } catch (error) {
    console.error("[google-sheets] Error al escribir en el muro de fotos:", error);
    return {
      ok: false,
      error: "No pudimos guardar tu foto. Probá de nuevo en un momento.",
    };
  }
}
