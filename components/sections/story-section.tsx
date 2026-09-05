import { Coffee, Plane, Sparkles, type LucideIcon } from "lucide-react";
import { weddingContent } from "@/data/wedding";
import { SectionHeading } from "@/components/common/section-heading";
import type { TimelineIcon } from "@/types/wedding";

const ICONS: Record<TimelineIcon, LucideIcon> = {
  coffee: Coffee,
  plane: Plane,
  sparkles: Sparkles,
};

export function StorySection() {
  const { timeline } = weddingContent;

  return (
    <section aria-label="Nuestra historia" className="bg-surface-alt px-6 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow="Nuestra historia" line1="El algoritmo del" line2="amor verdadero" />

        <ol className="mt-14 space-y-10">
          {timeline.map((milestone, index) => {
            const Icon = ICONS[milestone.icon];
            const isLast = index === timeline.length - 1;

            return (
              <li key={milestone.id} className="relative flex gap-5">
                <div className="flex flex-col items-center">
                  <span className="border-primary/30 bg-accent text-primary flex size-14 shrink-0 items-center justify-center rounded-full border">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  {!isLast ? <span className="bg-border mt-2 w-px flex-1" aria-hidden /> : null}
                </div>

                <div className="pb-2">
                  <p className="text-primary text-sm font-semibold">{milestone.year}</p>
                  <h3 className="font-display mt-1 text-xl text-foreground">{milestone.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
