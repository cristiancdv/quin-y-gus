import { Clock, Gift, MapPin, Navigation, Shirt } from "lucide-react";
import { weddingContent } from "@/data/wedding";
import { SectionHeading } from "@/components/common/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { buildGoogleMapsUrl } from "@/lib/maps-link";

function DetailCard({
  icon: Icon,
  tone,
  label,
  children,
}: {
  icon: typeof Clock;
  tone: "primary" | "navy";
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="border-border">
      <CardContent className="flex flex-col gap-4 px-6">
        <div className="flex items-center gap-3">
          <span
            className={
              tone === "primary"
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
  const { venue, dressCode, giftRegistry, weddingDateLabel, ceremonyTime, receptionTime } =
    weddingContent;

  return (
    <section aria-label="Detalles del evento" className="bg-background px-6 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow="Detalles del evento" line1="Información del" line2="encuentro" />

        <div className="mt-10 space-y-5">
          <DetailCard icon={Clock} tone="primary" label="Cuándo">
            <div>
              <p className="text-foreground font-semibold">Sábado {weddingDateLabel}</p>
              <p className="text-muted-foreground mt-1 text-sm">Ceremonia: {ceremonyTime}</p>
              <p className="text-muted-foreground text-sm">Recepción: {receptionTime}</p>
              <p className="text-primary mt-2 text-sm font-medium">
                Puntualidad = match garantizado
              </p>
            </div>
          </DetailCard>

          <DetailCard icon={MapPin} tone="navy" label="Dónde">
            <div>
              <p className="text-foreground font-semibold">{venue.name}</p>
              <p className="text-muted-foreground mt-1 text-sm">{venue.addressLine}</p>
              <p className="text-muted-foreground text-sm">{venue.cityLine}</p>
              <a
                href={buildGoogleMapsUrl(venue.mapsQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 mt-4 inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors"
              >
                <Navigation className="size-4" aria-hidden />
                Cómo llegar
              </a>
            </div>
          </DetailCard>

          <DetailCard icon={Shirt} tone="primary" label="Dress code">
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

          <DetailCard icon={Gift} tone="navy" label="Mesa de regalos">
            <div>
              <p className="text-foreground font-semibold">El mejor match: tú</p>
              <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                {giftRegistry.intro}
              </p>
              <ul className="mt-2 space-y-1.5">
                {giftRegistry.links.map((link) => (
                  <li key={link.id} className="text-secondary flex items-center gap-2 text-sm font-medium">
                    <Gift className="size-4 shrink-0" aria-hidden />
                    {link.label}
                  </li>
                ))}
              </ul>
            </div>
          </DetailCard>
        </div>
      </div>
    </section>
  );
}
