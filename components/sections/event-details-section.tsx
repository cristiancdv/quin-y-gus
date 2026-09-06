"use client";

import { useState } from "react";
import { Check, Copy, Gift, Navigation } from "lucide-react";
import { weddingContent } from "@/data/wedding";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { buildGoogleMapsUrl } from "@/lib/maps-link";
import { eventDetailsSectionContent } from "@/data/sections";
import { DressCodeIcon, GiftsIcon, GlassesIcon } from "@/components/icons/wedding-icons";

const detailIcons = {
  glasses: GlassesIcon,
  "dress-code": DressCodeIcon,
  gifts: GiftsIcon,
  navigation: Navigation,
} as const;

function DetailCard({
  icon,
  tone,
  label,
  children,
}: {
  icon: keyof typeof detailIcons;
  tone: "primary" | "navy";
  label: string;
  children: React.ReactNode;
}) {
  const Icon = detailIcons[icon];
  return (
    <Card className="border-border">
      <CardContent className="flex flex-col gap-4 px-6">
        <div className="flex items-center gap-3">
          <span
            className={
              icon === "dress-code"
                ? "bg-accent text-accent-foreground flex size-10 shrink-0 items-center justify-center rounded-full"
                : tone === "primary"
                  ? "bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-full"
                  : "bg-accent-navy text-accent-navy-foreground flex size-10 items-center justify-center rounded-full"
            }
          >
            <Icon className="size-5" aria-hidden />
          </span>
          <span
            className={
              tone === "primary"
                ? "text-primary text-xs font-semibold tracking-[0.15em] uppercase"
                : "text-secondary text-xs font-semibold tracking-[0.15em] uppercase"
            }
          >
            {label}
          </span>
        </div>
        {children}
      </CardContent>
    </Card>
  );
}

export function EventDetailsSection() {
  const { venue, dressCode, giftRegistry, weddingDateLabel, receptionTime } = weddingContent;
  const [showBankingDetails, setShowBankingDetails] = useState(false);
  const [copiedField, setCopiedField] = useState<"alias" | "cvu" | null>(null);
  const NavigationIcon = detailIcons[eventDetailsSectionContent.icons.directions];

  const copyBankingValue = async (field: "alias" | "cvu", value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(field);
    window.setTimeout(() => setCopiedField(null), 1600);
  };

  return (
    <section aria-label={eventDetailsSectionContent.ariaLabel} className="bg-background px-6 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow={eventDetailsSectionContent.eyebrow} line1={eventDetailsSectionContent.titleLine1} line2={eventDetailsSectionContent.titleLine2} />

        <div className="mt-10 space-y-5">
          <DetailCard icon={eventDetailsSectionContent.icons.celebration} tone="primary" label={eventDetailsSectionContent.celebrationLabel}>
            <div>
              <p className="text-foreground font-semibold">{eventDetailsSectionContent.datePrefix} {weddingDateLabel}</p>
              <p className="text-muted-foreground mt-1 text-sm">{eventDetailsSectionContent.reception}: {receptionTime}</p>
              <p className="text-foreground mt-4 font-semibold">{venue.name}</p>
              <p className="text-muted-foreground mt-1 text-sm">{venue.addressLine}</p>
              <p className="text-muted-foreground text-sm">{venue.cityLine}</p>
              <p className="text-primary mt-3 text-sm font-medium">
                {eventDetailsSectionContent.punctuality}
              </p>
              <a
                href={buildGoogleMapsUrl(venue.mapsQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-4 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors"
              >
                <NavigationIcon className="size-4" aria-hidden />
                {eventDetailsSectionContent.directions}
              </a>
            </div>
          </DetailCard>

          <DetailCard icon={eventDetailsSectionContent.icons.dressCode} tone="primary" label={eventDetailsSectionContent.dressCodeLabel}>
            <div>
              <p className="text-foreground font-semibold">{dressCode.title}</p>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {dressCode.description}
              </p>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {dressCode.paletteNote}
              </p>
            </div>
          </DetailCard>

          <DetailCard icon={eventDetailsSectionContent.icons.gifts} tone="navy" label={eventDetailsSectionContent.giftsLabel}>
            <div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {giftRegistry.intro}
              </p>
              <Button
                type="button"
                variant="secondary"
                className="mt-4"
                onClick={() => setShowBankingDetails((visible) => !visible)}
                aria-expanded={showBankingDetails}
              >
                <Gift aria-hidden />
                {eventDetailsSectionContent.banking}
              </Button>
              {showBankingDetails ? (
                <div className="mt-4 space-y-2">
                  {(["alias", "cvu"] as const).map((field) => (
                    <button
                      key={field}
                      type="button"
                      onClick={() => copyBankingValue(field, giftRegistry.banking[field])}
                      className="border-border bg-background hover:bg-muted flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left transition-colors"
                    >
                      <span>
                        <span className="text-muted-foreground block text-xs uppercase">{field === "alias" ? eventDetailsSectionContent.alias : eventDetailsSectionContent.cvu}</span>
                        <span className="text-foreground text-sm font-medium">{giftRegistry.banking[field]}</span>
                      </span>
                      {copiedField === field ? <Check className="text-primary size-4" /> : <Copy className="text-muted-foreground size-4" />}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </DetailCard>
        </div>
      </div>
    </section>
  );
}
