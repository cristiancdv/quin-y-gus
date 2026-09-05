"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { GalleryPhoto } from "@/types/wedding";

function GalleryControls({ total }: { total: number }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } = useCarousel();

  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Foto anterior"
        className="border-border bg-card text-foreground hover:bg-muted flex size-11 items-center justify-center rounded-full border shadow-sm transition-colors disabled:opacity-40"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Siguiente foto"
        className="border-border bg-card text-foreground hover:bg-muted flex size-11 items-center justify-center rounded-full border shadow-sm transition-colors disabled:opacity-40"
      >
        <ChevronRight className="size-5" />
      </button>
      <span className="sr-only">{total} fotos en la galería</span>
    </div>
  );
}

interface GalleryCarouselProps {
  photos: GalleryPhoto[];
}

/**
 * Client Component: embla-carousel needs drag/scroll listeners and
 * imperative scroll control, which only exist in the browser.
 */
export function GalleryCarousel({ photos }: GalleryCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    // Deferred initial sync (see carousel.tsx for why): avoids a
    // synchronous setState call in the effect body itself.
    queueMicrotask(() => setCurrent(api.selectedScrollSnap()));
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  return (
    <Carousel setApi={setApi} opts={{ align: "start", loop: false }}>
      <CarouselContent>
        {photos.map((photo, index) => (
          <CarouselItem key={photo.id} className="basis-4/5 sm:basis-3/5">
            <div className="border-border relative aspect-[4/5] overflow-hidden rounded-2xl border">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 360px, 80vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0"
              />
              <span className="text-primary-foreground bg-primary/90 absolute top-3 left-3 rounded-full px-2.5 py-1 text-xs font-semibold tabular-nums">
                {String(index + 1).padStart(2, "0")}/{String(photos.length).padStart(2, "0")}
              </span>
              <p className="absolute bottom-3 left-3 text-base font-medium text-white">
                {photo.caption}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <GalleryControls total={photos.length} />
      <span className="sr-only" aria-live="polite">
        Mostrando foto {current + 1} de {photos.length}
      </span>
    </Carousel>
  );
}
