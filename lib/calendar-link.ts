interface CalendarEventInput {
  title: string;
  description: string;
  location: string;
  /** ISO 8601 start date-time. */
  start: string;
  /** Duration of the event in hours, used to compute the end time. */
  durationHours: number;
}

function toGoogleCalendarDate(iso: string): string {
  // Google Calendar's `dates` param wants UTC basic format: YYYYMMDDTHHmmssZ
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

/**
 * Builds a "Google Calendar — add event" URL. This only reads static,
 * non-sensitive wedding details, so it's safe to call from server or
 * client code — no credentials or user data involved.
 */
export function buildGoogleCalendarUrl(event: CalendarEventInput): string {
  const start = new Date(event.start);
  const end = new Date(start.getTime() + event.durationHours * 60 * 60 * 1000);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    details: event.description,
    location: event.location,
    dates: `${toGoogleCalendarDate(start.toISOString())}/${toGoogleCalendarDate(end.toISOString())}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
