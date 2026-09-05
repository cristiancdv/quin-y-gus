import { Camera } from "lucide-react";
import { weddingContent } from "@/data/wedding";
import { PhotoUploadForm } from "@/components/photo-wall/photo-upload-form";

export function PhotoWallSection() {
  const { first, second } = weddingContent.coupleNames;

  return (
    <section aria-label="Muro de fotos" className="bg-surface-alt px-6 py-20">
      <div className="mx-auto max-w-md text-center">
        <span className="bg-accent text-accent-foreground mx-auto flex size-16 items-center justify-center rounded-full">
          <Camera className="size-7" aria-hidden />
        </span>

        <p className="eyebrow mt-5">Tu foto con los novios</p>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-balance">
          Sube la foto que te tomaste con {first} &amp; {second} y forma parte de nuestro
          muro de recuerdos.
        </p>

        <PhotoUploadForm />
      </div>
    </section>
  );
}
