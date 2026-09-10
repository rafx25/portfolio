import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Anchor target used by the header navigation. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
};

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  ...props
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("border-border scroll-mt-24 border-t py-16 sm:py-24", className)}
      {...props}
    >
      <Container>
        <header className="reveal max-w-2xl">
          {eyebrow ? (
            <p className="text-accent font-mono text-xs tracking-widest uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="text-muted-foreground mt-4 text-base leading-relaxed">
              {description}
            </p>
          ) : null}
        </header>
        <div className="mt-10 sm:mt-12">{children}</div>
      </Container>
    </section>
  );
}
