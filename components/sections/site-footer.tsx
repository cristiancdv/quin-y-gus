import Image from "next/image";
import { CalendarPlus, Heart } from "lucide-react";
import { weddingContent } from "@/data/wedding";
import { buildGoogleCalendarUrl } from "@/lib/calendar-link";
import { footerContent } from "@/data/sections";

const footerIcons = { "calendar-plus": CalendarPlus, heart: Heart } as const;

export function SiteFooter() {
  const { coupleNames, weddingDate, weddingDateLabel, venue } = weddingContent;

  const calendarUrl = buildGoogleCalendarUrl({
    title: `Casamiento de ${coupleNames.first} & ${coupleNames.second}`,
    description: footerContent.description,
    location: `${venue.name}, ${venue.addressLine}, ${venue.cityLine}`,
    start: weddingDate,
    durationHours: 6,
  });
  const HeartIcon = footerIcons[footerContent.heartIcon];
  const CalendarIcon = footerIcons[footerContent.calendarIcon];

  return (
    <footer className="bg-background border-border border-t px-6 py-16 text-center">
      <HeartIcon className="text-primary mx-auto size-6" fill="currentColor" aria-hidden />

      <p className="font-script text-foreground mt-4 text-4xl">
        {coupleNames.first} &amp; {coupleNames.second}
      </p>
      <Image
        src={footerContent.image}
        alt={footerContent.imageAlt}
        width={1444}
        height={984}
        sizes="(max-width: 640px) 100vw, 32rem"
        className="mx-auto my-6 h-auto w-1/2 sm:w-1/3 max-w-lg rounded-2xl object-cover"
      />

      <p className="text-secondary mt-2 text-xs font-semibold tracking-[0.2em] uppercase">
        {weddingDateLabel} · {venue.cityLine}
      </p>

      <p className="text-muted-foreground mx-auto mt-4 max-w-xs text-sm text-balance">
        {footerContent.closing}
      </p>

      <p className="text-primary  mx-auto mt-4 max-w-xs text-2xl text-balance">
        {footerContent.seeYou}
      </p>
      <a
        href={calendarUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-6 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors"
      >
        <CalendarIcon className="size-4" aria-hidden />
        {footerContent.saveDate}
      </a>
    </footer>
  );
}
