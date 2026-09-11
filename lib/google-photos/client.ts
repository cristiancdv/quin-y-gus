import "server-only";
import { google } from "googleapis";

const GOOGLE_PHOTOS_SCOPE = "https://www.googleapis.com/auth/photoslibrary.appendonly";

interface GooglePhotosCredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  albumId?: string;
}

export type GooglePhotosUploadResult =
  | { ok: true; mediaItemId: string; productUrl?: string }
  | { ok: false; error: string };

function readCredentials(): GooglePhotosCredentials | null {
  const clientId = process.env.GOOGLE_PHOTOS_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_PHOTOS_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_PHOTOS_REFRESH_TOKEN;
  const albumId = process.env.GOOGLE_PHOTOS_ALBUM_ID;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  return { clientId, clientSecret, refreshToken, albumId };
}

function getErrorMessage(response: Response): string {
  return `Google Photos respondió con estado ${response.status}.`;
}

async function getAccessToken(credentials: GooglePhotosCredentials): Promise<string | null | undefined> {
  const oauthClient = new google.auth.OAuth2(credentials.clientId, credentials.clientSecret);
  oauthClient.setCredentials({ refresh_token: credentials.refreshToken });

  const { token } = await oauthClient.getAccessToken();
  return token;
}

/**
 * Uploads an image to the Google Photos library authorized by the server-side
 * refresh token. Guests never receive or authorize with the Google account.
 */
export async function uploadPhotoToGooglePhotos(photo: File): Promise<GooglePhotosUploadResult> {
  const credentials = readCredentials();

  if (!credentials) {
    return {
      ok: false,
      error: "La galería de fotos no está configurada. Probá de nuevo más tarde.",
    };
  }

  try {
    const accessToken = await getAccessToken(credentials);

    if (!accessToken) {
      return {
        ok: false,
        error: "No pudimos conectar con la galería de fotos. Probá de nuevo más tarde.",
      };
    }
    const arrayBuffer = await photo.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await fetch("https://photoslibrary.googleapis.com/v1/uploads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/octet-stream",
        "X-Goog-Upload-Content-Type": photo.type,
        "X-Goog-Upload-Protocol": "raw",
      },
      body: buffer,
    });
    if (!uploadResponse.ok) {
      console.error("[google-photos] No se pudieron cargar los bytes:", getErrorMessage(uploadResponse));
      return {
        ok: false,
        error: "No pudimos subir tu foto a la galería. Probá de nuevo más tarde.",
      };
    }

    const uploadToken = await uploadResponse.text();

    if (!uploadToken) {
      return {
        ok: false,
        error: "No pudimos preparar tu foto para la galería. Probá de nuevo más tarde.",
      };
    }

    const createResponse = await fetch(
      "https://photoslibrary.googleapis.com/v1/mediaItems:batchCreate",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          albumId: credentials.albumId,
          newMediaItems: [
            {
              simpleMediaItem: {
                fileName: photo.name,
                uploadToken,
              },
            },
          ],
        }),
      }
    );

    if (!createResponse.ok) {
      console.error("[google-photos] No se pudo crear el elemento:", getErrorMessage(createResponse));
      return {
        ok: false,
        error: "No pudimos guardar tu foto en la galería. Probá de nuevo más tarde.",
      };
    }

    const payload: {
      newMediaItemResults?: Array<{
        mediaItem?: { id?: string; productUrl?: string };
        status?: { message?: string };
      }>;
    } = await createResponse.json();
    const result = payload.newMediaItemResults?.[0];

    if (!result?.mediaItem?.id) {
      console.error("[google-photos] Google no creó el elemento:", result?.status?.message);
      return {
        ok: false,
        error: "No pudimos guardar tu foto en la galería. Probá de nuevo más tarde.",
      };
    }

    return {
      ok: true,
      mediaItemId: result.mediaItem.id,
      productUrl: result.mediaItem.productUrl,
    };
  } catch (error) {
    console.log(error)
    const message = error instanceof Error ? error.message : "Error desconocido";
    console.error("[google-photos] Error de carga:", message);
    return {
      ok: false,
      error: "No pudimos conectar con la galería de fotos. Probá de nuevo más tarde.",
    };
  }
}
