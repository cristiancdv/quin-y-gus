"use client";

import { motion } from "framer-motion";
import { ArrowDown, Heart } from "lucide-react";
import { useRef, useState } from "react";
import { weddingContent } from "@/data/wedding";
import {
  leftProfileImages,
  rightProfileImages,
  VERTICAL_CAROUSEL_REVEAL_RANGE,
  VERTICAL_CAROUSEL_REVEAL_START,
} from "@/data/vertical-match";
import { heroSectionContent } from "@/data/sections";
import { VerticalCarrousel } from "@/components/vertical-match/vertical-carrousel";


export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const { coupleNames, weddingDateLabel } = weddingContent;
  const [carouselProgress, setCarouselProgress] = useState([0, 0]);
  const revealProgress = Math.min(
    1,
    Math.max(
      0,
      (Math.min(...carouselProgress) - VERTICAL_CAROUSEL_REVEAL_START) /
      VERTICAL_CAROUSEL_REVEAL_RANGE,
    ),
  );

  const updateCarouselProgress = (column: number) => (progress: number) => {
    setCarouselProgress((current) => {
      if (Math.abs(current[column] - progress) < 0.01) return current;
      const next = [...current] as [number, number];
      next[column] = progress;
      return next;
    });
  };

  return (
    <section
      ref={heroRef}
      aria-label={heroSectionContent.ariaLabel}
      className="bg-background relative px-6 pb-20 "
    >

      <div className="relative mx-auto w-full max-w-[23rem] sm:max-w-md">
        <motion.div
          animate={{ opacity: 1 - revealProgress, y: revealProgress * -16 }}
          transition={{ duration: 0.12, ease: "linear" }}
          className="pointer-events-none fixed top-16 left-1/2 z-10 flex w-full -translate-x-1/2 flex-col items-center gap-2 text-center"
        >
          <p className="eyebrow text-[10px] sm:text-xs">{heroSectionContent.eyebrow}</p>
          <p className="text-muted-foreground mx-auto mt-2 max-w-xs text-xs/5 tracking-[0.16em] sm:text-sm">
            {heroSectionContent.instruction}
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="text-secondary mt-3 flex justify-center"
            aria-hidden
          >
            <ArrowDown className="size-6" strokeWidth={1} />
          </motion.div>
        </motion.div>
        <div className="grid w-full grid-cols-2 items-start justify-items-center gap-3 sm:gap-4">
          <div className="w-full">
            <VerticalCarrousel
              items={leftProfileImages}
              onProgress={updateCarouselProgress(0)}
              scrollTarget={heroRef}
            />
          </div>
          <div className="w-full">
            <VerticalCarrousel
              items={rightProfileImages}
              invertDirection
              onProgress={updateCarouselProgress(1)}
              scrollTarget={heroRef}
            />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-20">
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <motion.div
              animate={{ opacity: revealProgress, scale: 0.78 + revealProgress * 0.22 }}
              transition={{ duration: 0.12, ease: "linear" }}
              aria-hidden
            >
              <Heart className="text-primary size-14" fill="white" strokeWidth={4} />
            </motion.div>

            <motion.div
              animate={{ opacity: revealProgress, y: (1 - revealProgress) * 16 }}
              transition={{ duration: 0.12, ease: "linear" }}
              className="absolute inset-x-0 bottom-6 mx-auto max-w-lg translate-y-12 text-center"
              aria-live="polite"
            >
              <p className="eyebrow">{heroSectionContent.compatibility}</p>

              <h1 className="mt-4 leading-none">
                <span className="font-script text-foreground block text-6xl sm:text-7xl">
                  {coupleNames.first}
                </span>
                <span className="font-script text-secondary mt-2 block text-6xl sm:text-7xl">
                  &amp; {coupleNames.second}
                </span>
              </h1>

              <p className="text-muted-foreground mt-6 text-sm tracking-[0.2em] uppercase">
                {weddingDateLabel}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
