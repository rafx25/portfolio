import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium " +
  "transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 " +
  "whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm shadow-accent/20",
  secondary:
    "border border-border-strong bg-surface text-foreground hover:bg-surface-muted",
  ghost: "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm sm:text-base",
};

// Styles only, so links and buttons can look the same without a polymorphic
// component.
export function buttonStyles(
  opts: { variant?: Variant; size?: Size; className?: string } = {},
) {
  const { variant = "primary", size = "md", className } = opts;
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonStyles({ variant, size, className })} {...props} />;
}
