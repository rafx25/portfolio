import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "border-border bg-surface-muted inline-flex items-center rounded border",
        "text-muted-foreground px-2 py-0.5 font-mono text-[0.7rem] tracking-tight",
        className,
      )}
      {...props}
    />
  );
}
