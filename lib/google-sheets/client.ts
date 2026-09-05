import "server-only";
import { google, sheets_v4 } from "googleapis";
import { googleSheetsConfig } from "./config";

/**
 * Server-only adapter boundary for Google Sheets. Nothing in this module
 * may be imported from a Client Component — the `server-only` import above
 * makes that a build-time error instead of a leaked-credential bug.
 *
 * Auth is a Google service account (JWT). Share the target spreadsheet
 * with the service account's email as an Editor for writes to succeed.
 */

interface ServiceAccountCredentials {
  clientEmail: string;
  privateKey: string;
}

function readCredentials(): ServiceAccountCredentials | null {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY;

  if (!clientEmail || !rawPrivateKey) {
    return null;
  }

  // Service account keys are usually stored as a single-line env var with
  // literal "\n" escapes; restore real newlines before handing it to the JWT client.
  const privateKey = rawPrivateKey.replace(/\\n/g, "\n");

  return { clientEmail, privateKey };
}

export function isGoogleSheetsConfigured(): boolean {
  return Boolean(readCredentials() && googleSheetsConfig.spreadsheetId);
}

let cachedClient: sheets_v4.Sheets | null = null;

/**
 * Returns a memoized Sheets API client authenticated as the service account.
 * Throws if credentials are missing — callers (the adapters) decide how to
 * degrade for that case rather than this module silently returning null.
 */
export function getSheetsClient(): sheets_v4.Sheets {
  if (cachedClient) {
    return cachedClient;
  }

  const credentials = readCredentials();
  if (!credentials) {
    throw new Error(
      "Google Sheets no está configurado: definí GOOGLE_SHEETS_CLIENT_EMAIL y " +
        "GOOGLE_SHEETS_PRIVATE_KEY en tu archivo .env.local (ver .env.example)."
    );
  }

  const auth = new google.auth.JWT({
    email: credentials.clientEmail,
    key: credentials.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  cachedClient = google.sheets({ version: "v4", auth });
  return cachedClient;
}
