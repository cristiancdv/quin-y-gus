import { weddingContent } from "@/data/wedding";
import { countdownSectionContent } from "@/data/sections";
import { SectionHeading } from "@/components/common/section-heading";
import { WeddingCountdown } from "@/components/countdown/wedding-countdown";

export function CountdownSection() {
  return (
    <section aria-label={countdownSectionContent.ariaLabel} className="bg-background px-6 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow={countdownSectionContent.eyebrow} line1={countdownSectionContent.titleLine1} line2={countdownSectionContent.titleLine2} />

        <p className="text-muted-foreground mx-auto mt-4 max-w-sm text-center text-sm text-balance">
          {countdownSectionContent.description}
        </p>

        <div className="mt-10">
          <WeddingCountdown targetDate={weddingContent.weddingDate} />
        </div>
      </div>
    </section>
  );
}
