/**
 * Domain types for static wedding content (couple info, timeline, gallery,
 * event details). These are authored by the couple, not user input, so they
 * live here as plain types rather than Zod schemas — runtime validation is
 * reserved for data crossing a trust boundary (see src/lib/validations).
 */

export type TimelineIcon = "coffee" | "plane" | "sparkles"| "scale" | "parasol" | "userGroup";

export interface TimelineMilestone {
  id: string;
  year: string;
  icon: TimelineIcon;
  title: string;
  description: string;
}

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

export interface VerticalCarouselItem {
  id: string;
  src: string;
  alt: string;
}

export interface CoupleProfile {
  name: string;
  photoSrc: string;
  photoAlt: string;
}

export interface BankingDetails {
  alias: string;
  cvu: string;
}

export interface EventCardContent {
  icon?: string;
  title: string;
  paragraph: string;
  paragraphSpan?: string;
  qrUrl: string;
}

export interface WeddingContent {
  coupleNames: {
    first: string;
    second: string;
  };
  profiles: {
    first: CoupleProfile;
    second: CoupleProfile;
  };
  weddingDate: string; // ISO 8601, used for the countdown target and calendar link
  weddingDateLabel: string; // human readable, e.g. "10 · Abril · 2027"
  ceremonyTime: string;
  receptionTime: string;
  notFoundCards: EventCardContent;
  venue: {
    name: string;
    addressLine: string;
    cityLine: string;
    mapsQuery: string;
  };
  dressCode: {
    title: string;
    description: string;
    paletteNote: string;
  };
  giftRegistry: {
    intro: string;
    banking: BankingDetails;
  };
  timeline: TimelineMilestone[];
  gallery: GalleryPhoto[];
}
