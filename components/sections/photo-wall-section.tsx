import { weddingContent } from "@/data/wedding";
import { photoWallSectionContent } from "@/data/sections";
import { PhotoUploadForm } from "@/components/photo-wall/photo-upload-form";
import { CameraIcon } from "@/components/icons/wedding-icons";

export function PhotoWallSection() {
  const { first, second } = weddingContent.coupleNames;
  return (
    <section aria-label={photoWallSectionContent.ariaLabel} className="bg-surface-alt px-6 py-20">
      <div className="mx-auto max-w-md text-center">
        <span className="bg-accent text-accent-foreground mx-auto flex size-16 items-center justify-center rounded-full">
          <CameraIcon className="size-7" aria-hidden />
        </span>

        <p className="eyebrow mt-5">{photoWallSectionContent.eyebrow}</p>
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed text-balance">
          {photoWallSectionContent.description.replace("{first}", first).replace("{second}", second)}
        </p>

        <PhotoUploadForm />
      </div>
    </section>
  );
}
