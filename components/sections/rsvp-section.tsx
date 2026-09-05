"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/common/section-heading";
import { SwipeCard, type RsvpDecision } from "@/components/rsvp/swipe-card";
import { RsvpForm } from "@/components/rsvp/rsvp-form";

/**
 * Client Component: coordinates local UI state between the swipe gesture
 * and the follow-up form. The actual data submission is still a Server
 * Action (see RsvpForm) — this component only tracks which step to show.
 */
export function RsvpSection() {
  const [decision, setDecision] = useState<RsvpDecision | null>(null);

  return (
    <section aria-label="Confirmación de asistencia" className="bg-surface-alt px-6 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow="Confirma tu match" line1="Desliza para" line2="confirmar" />

        <div className="mt-10">
          {decision === null ? (
            <SwipeCard onDecide={setDecision} />
          ) : (
            <RsvpForm decision={decision} onBack={() => setDecision(null)} />
          )}
        </div>
      </div>
    </section>
  );
}
