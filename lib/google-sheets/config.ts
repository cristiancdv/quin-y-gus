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
  },
  ranges: {
    rsvps: "Hoja 1!A:F",
  },
} as const;
