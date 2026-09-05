/**
 * Centralized Google Sheets configuration: spreadsheet ID, tab names and
 * ranges. Column order here must stay in sync with the header row of each
 * tab in the actual spreadsheet, and with the row-building code in the
 * adapters that write to them.
 */
export const googleSheetsConfig = {
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  tabs: {
    rsvps: "RSVPs",
    photoWall: "MuroDeFotos",
  },
  ranges: {
    // Columns: Fecha | Nombre | Asiste | Acompañantes | Restricciones | Mensaje
    rsvps: "RSVPs!A:F",
    // Columns: Fecha | Nombre | Mensaje | Archivo
    photoWall: "MuroDeFotos!A:D",
  },
} as const;
