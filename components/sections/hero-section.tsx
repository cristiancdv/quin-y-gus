"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";
import { weddingContent } from "@/data/wedding";
import { VerticalCarrousel } from "@/components/vertical-match/vertical-carrousel";

const leftProfileImages = [
  {
    id: "left-1",
    src: "/images/profiles/img-carrousel-profile-left-1.webp",
    alt: "Perfil de la novia",
    caption: "Novia",
  },
  {
    id: "left-2",
    src: "/images/profiles/img-carrousel-profile-left-2.webp",
    alt: "Perfil de la novia",
    caption: "Novia",
  },
  {
    id: "left-3",
    src: "/images/profiles/img-carrousel-profile-left-3.webp",
    alt: "Perfil de la novia",
    caption: "Novia",
  },
];

const rightProfileImages = [
  {
    id: "right-1",
    src: "/images/profiles/img-carrousel-profile-rigth-1.webp",
    alt: "Perfil del novio",
    caption: "Novio",
  },
  {
    id: "right-2",
    src: "/images/profiles/img-carrousel-profile-rigth-2.webp",
    alt: "Perfil del novio",
    caption: "Novio",
  },
  {
    id: "right-3",
    src: "/images/profiles/img-carrousel-profile-rigth-3.webp",
    alt: "Perfil del novio",
    caption: "Novio",
  },
];


/**
 * Server Component — purely presentational, no interactivity needed here.
 */
export function HeroSection() {
  const { coupleNames, weddingDateLabel } = weddingContent;
  const [carouselProgress, setCarouselProgress] = useState([0, 0]);
  const revealProgress = Math.min(1, Math.max(0, (Math.min(...carouselProgress) - 0.68) / 0.32));

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
      aria-label="Portada"
      className="bg-background relative px-6 pt-16 pb-20 sm:pt-24"
    >
      <div className="mx-auto max-w-lg text-center">
        <p className="eyebrow text-[10px] sm:text-xs">El Match Definitivo</p>
        <p className="text-muted-foreground mx-auto mt-2 max-w-xs text-xs/5 tracking-[0.16em] sm:text-sm">
          Desliza para unir a los novios
        </p>

      </div>

      <div className="relative mx-auto my-14 w-full max-w-[23rem] sm:max-w-md">
        <div className="grid w-full grid-cols-2 items-start justify-items-center gap-3 sm:gap-4">
          <div className="w-full">
            <VerticalCarrousel
              items={leftProfileImages}
              onProgress={updateCarouselProgress(0)}
            />
          </div>
          <div className="w-full">
            <VerticalCarrousel
              items={rightProfileImages}
              invertDirection={true}
              onProgress={updateCarouselProgress(1)}
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
              <p className="eyebrow">99% compatibilidad</p>

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
