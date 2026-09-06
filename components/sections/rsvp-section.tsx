"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/common/section-heading";
import { SwipeCard, type RsvpDecision } from "@/components/rsvp/swipe-card";
import { RsvpForm } from "@/components/rsvp/rsvp-form";
import { rsvpSectionContent } from "@/data/sections";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Client Component: coordinates local UI state between the swipe gesture
 * and the follow-up form. The actual data submission is still a Server
 * Action (see RsvpForm) — this component only tracks which step to show.
 */
export function RsvpSection() {
  const [decision, setDecision] = useState<RsvpDecision | null>(null);

  return (
    <section aria-label={rsvpSectionContent.ariaLabel} className="bg-surface-alt px-6 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow={rsvpSectionContent.eyebrow} line1={rsvpSectionContent.titleLine1} line2={rsvpSectionContent.titleLine2} />

        <div className="mt-10">
          {decision === null ? (
            <div className="flex flex-row items-center justify-center gap-6">
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-secondary mt-3 flex justify-center"
                aria-hidden
              >   <ArrowLeft className="mb-20 size-6" strokeWidth={1} />
              </motion.div>

              <SwipeCard onDecide={setDecision} />
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-secondary mt-3 flex justify-center"
                aria-hidden
              >   <ArrowRight className="mb-20 size-6" strokeWidth={1} />
              </motion.div>
            </div>
          ) : (
            <RsvpForm decision={decision} onBack={() => setDecision(null)} />
          )}
        </div>
      </div>
    </section>
  );
}
