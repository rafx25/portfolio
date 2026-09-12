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
      className={cn("border-border scroll-mt-24 border-t py-20 sm:py-28", className)}
      {...props}
    >
      <Container>
        <header className="reveal text-center">
          {eyebrow ? (
            <p className="text-accent font-mono text-xs font-semibold tracking-widest uppercase">
              {eyebrow}
            </p>
          ) : null}

          <h2
            id={headingId}
            className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl"
          >
            {title}
          </h2>

          <hr className="bg-accent mx-auto my-5 h-1 w-8 rounded border-0" />

          {description ? (
            <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed">
              {description}
            </p>
          ) : null}
        </header>

        <div className="mt-12 sm:mt-14">{children}</div>
      </Container>
    </section>
  );
}
