import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  /** First heading line, rendered in the default foreground color. */
  line1: string;
  /** Second heading line, rendered in the navy accent color. */
  line2?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * The "EYEBROW LABEL" + two-tone serif title pattern repeated at the top
 * of every section in the reference design (e.g. "NUESTRA HISTORIA" /
 * "El algoritmo del" / "amor verdadero").
 */
export function SectionHeading({
  eyebrow,
  line1,
  line2,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-heading mt-3 text-foreground">
        {line1}
        {line2 ? (
          <>
            <br />
            <span className="text-secondary">{line2}</span>
          </>
        ) : null}
      </h2>
    </div>
  );
}
