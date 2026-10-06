import Image from "next/image";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type AvatarProps = {
  /** Must set a width, e.g. "w-40 lg:w-80". The 4:5 frame sets the height. */
  className?: string;
  /** Should be ~1.25x the widths in className, to cover the zoom below. */
  sizes?: string;
  /** Set on the one above the fold so it is not lazy-loaded. */
  priority?: boolean;
};

export function Avatar({
  className,
  sizes = "(min-width: 640px) 200px, 160px",
  priority = false,
}: AvatarProps) {
  return (
    <span
      className={cn(
        "border-border bg-surface-muted shadow-accent/10 relative block aspect-[4/5] shrink-0 overflow-hidden rounded-2xl border shadow-xl",
        className,
      )}
    >
      <Image
        src={site.avatarPath}
        alt={`${site.name}, ${site.role}`}
        fill
        sizes={sizes}
        priority={priority}
        // The photo is 3:4 with the head ~42% down and sky above it. Zoomed
        // 1.25x from the bottom edge, so the frame keeps the shoulders, centres
        // the face and still shows the string lights to the right.
        className="origin-[64%_100%] scale-125 object-cover object-bottom"
      />
    </span>
  );
}
