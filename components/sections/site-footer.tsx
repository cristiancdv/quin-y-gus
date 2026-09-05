import { CalendarPlus, Heart } from "lucide-react";
import { weddingContent } from "@/data/wedding";
import { buildGoogleCalendarUrl } from "@/lib/calendar-link";

export function SiteFooter() {
  const { coupleNames, weddingDate, weddingDateLabel, venue } = weddingContent;

  const calendarUrl = buildGoogleCalendarUrl({
    title: `Casamiento de ${coupleNames.first} & ${coupleNames.second}`,
    description: "El match que cambió todo. ¡Nos vemos ahí!",
    location: `${venue.name}, ${venue.addressLine}, ${venue.cityLine}`,
    start: weddingDate,
    durationHours: 6,
  });

  return (
    <footer className="bg-background border-border border-t px-6 py-16 text-center">
      <Heart className="text-primary mx-auto size-6" fill="currentColor" aria-hidden />

      <p className="font-script text-foreground mt-4 text-4xl">
        {coupleNames.first} &amp; {coupleNames.second}
      </p>

      <p className="text-secondary mt-2 text-xs font-semibold tracking-[0.2em] uppercase">
        {weddingDateLabel} · {venue.cityLine}
      </p>

      <p className="text-muted-foreground mx-auto mt-4 max-w-xs text-sm text-balance">
        El match que cambió todo. Gracias por ser parte de nuestra historia.
      </p>

      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-6 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors"
      >
        <CalendarPlus className="size-4" aria-hidden />
        Guardar fecha en Google Calendar
      </a>
    </footer>
  );
}
