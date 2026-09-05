import { weddingContent } from "@/data/wedding";
import { SectionHeading } from "@/components/common/section-heading";
import { GalleryCarousel } from "@/components/gallery/gallery-carousel";

export function GallerySection() {
  return (
    <section aria-label="Galería" className="bg-background px-6 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow="Galería" line1="Desliza nuestros" line2="mejores momentos" />
        <p className="text-muted-foreground mt-3 text-center text-sm">
          ← Desliza horizontalmente →
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <GalleryCarousel photos={weddingContent.gallery} />
      </div>
    </section>
  );
}
