import { weddingContent } from "@/data/wedding";
import { SectionHeading } from "@/components/common/section-heading";
import { WeddingCountdown } from "@/components/countdown/wedding-countdown";

export function CountdownSection() {
  return (
    <section aria-label="Cuenta regresiva" className="bg-background px-6 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow="Cuenta regresiva" line1="La cuenta regresiva" line2="para el match" />

        <p className="text-muted-foreground mx-auto mt-4 max-w-sm text-center text-sm text-balance">
          El algoritmo está calculando el tiempo exacto hasta que digamos &quot;sí&quot;.
          Faltan:
        </p>

        <div className="mt-10">
          <WeddingCountdown targetDate={weddingContent.weddingDate} />
        </div>
      </div>
    </section>
  );
}
