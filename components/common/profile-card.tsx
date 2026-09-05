import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

/**
 * A photo styled like a dating-app profile card: rounded corners and a
 * small centered "notch" cut out of the top edge, echoing a phone screen.
 * Purely decorative — built with layered divs instead of an SVG mask so it
 * stays crisp at any size.
 */
export function ProfileCard({ src, alt, priority, className }: ProfileCardProps) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-black/10",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 640px) 240px, 45vw"
        className="object-cover"
      />
      {/* Phone-speaker notch */}
      <div
        aria-hidden
        className="bg-background absolute top-0 left-1/2 h-4 w-20 -translate-x-1/2 rounded-b-full"
      />
    </div>
  );
}
