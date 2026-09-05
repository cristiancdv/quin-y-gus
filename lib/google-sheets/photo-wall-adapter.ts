import "server-only";
import { getSheetsClient, isGoogleSheetsConfigured } from "./client";
import { googleSheetsConfig } from "./config";

export interface PhotoWallEntry {
  guestName: string;
  caption?: string;
  fileName: string;
}

export type AppendPhotoWallResult = { ok: true } | { ok: false; error: string };

/**
 * Records a guest photo-wall submission in the "MuroDeFotos" tab.
 *
 * IMPORTANT — storage is not wired up yet: Google Sheets cannot hold binary
 * data, so this adapter only logs the *metadata* (name, caption, original
 * file name). The actual photo file is validated in the Server Action but
 * is not uploaded anywhere in this base project.
 *
 * Before launch, connect a real file store (Google Drive via this same
 * service account, S3, Cloudinary, etc.), upload the file there first, and
 * pass the resulting URL into this adapter's row instead of `fileName`.
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
        values: [[new Date().toISOString(), entry.guestName, entry.caption ?? "", entry.fileName]],
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
