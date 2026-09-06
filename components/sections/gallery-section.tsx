import { weddingContent } from "@/data/wedding";
import { gallerySectionContent } from "@/data/sections";
import { SectionHeading } from "@/components/common/section-heading";
import { GalleryCarousel } from "@/components/gallery/gallery-carousel";

export function GallerySection() {
  return (
    <section aria-label={gallerySectionContent.ariaLabel} className="bg-background px-6 py-20">
      <div className="mx-auto max-w-lg">
        <SectionHeading eyebrow={gallerySectionContent.eyebrow} line1={gallerySectionContent.titleLine1} line2={gallerySectionContent.titleLine2} />
        <p className="text-muted-foreground mt-3 text-center text-sm">{gallerySectionContent.instruction}</p>
      </div>

      <div className="mx-auto mt-10 max-w-[32rem]">
        <GalleryCarousel photos={weddingContent.gallery} />
      </div>
    </section>
  );
}
