import Image from "next/image";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type AvatarProps = {
  /** Must set a width and height, e.g. "size-28 lg:size-40". */
  className?: string;
  /** Should match the widths in className so the right source gets fetched. */
  sizes?: string;
  /** Set on the one above the fold so it is not lazy-loaded. */
  priority?: boolean;
};

export function Avatar({
  className,
  sizes = "(min-width: 1024px) 160px, 112px",
  priority = false,
}: AvatarProps) {
  return (
    <span
      className={cn(
        "border-border bg-surface-muted relative inline-block shrink-0 overflow-hidden rounded-full border",
        className,
      )}
    >
      <Image
        src={site.avatarPath}
        alt={`${site.name}, ${site.role}`}
        fill
        sizes={sizes}
        priority={priority}
        // The portrait's crown sits ~7% down the frame, so a centred square crop
        // clips it. Biased upward to leave roughly 12px of headroom in the circle.
        className="object-cover object-[50%_12%]"
      />
    </span>
  );
}
