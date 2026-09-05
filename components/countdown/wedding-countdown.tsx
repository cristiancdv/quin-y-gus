"use client";

import Countdown, { type CountdownRenderProps, zeroPad } from "react-countdown";

interface WeddingCountdownProps {
  targetDate: string;
}

const UNITS: Array<{ key: keyof Pick<CountdownRenderProps, "days" | "hours" | "minutes" | "seconds">; label: string }> = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
];

function renderer(props: CountdownRenderProps) {
  if (props.completed) {
    return (
      <p className="text-secondary font-display text-2xl">¡Hoy es el gran día!</p>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {UNITS.map((unit, index) => (
        <div key={unit.key} className="flex items-center gap-2 sm:gap-4">
          <div className="bg-card border-border flex min-w-16 flex-col items-center rounded-2xl border py-3 shadow-sm sm:min-w-20 sm:py-4">
            <span className="text-secondary font-display text-3xl font-bold tabular-nums sm:text-4xl">
              {zeroPad(unit.key === "days" ? props.days : props[unit.key])}
            </span>
            <span className="text-muted-foreground mt-1 text-[0.65rem] font-medium tracking-[0.15em] uppercase">
              {unit.label}
            </span>
          </div>
          {index < UNITS.length - 1 ? (
            <span className="text-primary text-2xl font-semibold" aria-hidden>
              :
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/**
 * Client Component: react-countdown ticks every second on the client,
 * which needs browser timers — this can't be a Server Component.
 */
export function WeddingCountdown({ targetDate }: WeddingCountdownProps) {
  return <Countdown date={targetDate} renderer={renderer} />;
}
