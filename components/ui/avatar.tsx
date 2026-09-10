import Image from "next/image";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type AvatarProps = {
  /** Rendered pixel size. Also what next/image uses to pick a source width. */
  size?: number;
  className?: string;
  /** Set on the one above the fold so it is not lazy-loaded. */
  priority?: boolean;
};

export function Avatar({ size = 88, className, priority = false }: AvatarProps) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cn(
        "border-border bg-surface-muted relative inline-block shrink-0 overflow-hidden rounded-full border",
        className,
      )}
    >
      <Image
        src={site.avatarPath}
        alt={`${site.name}, ${site.role}`}
        fill
        sizes={`${size}px`}
        priority={priority}
        className="object-cover"
      />
    </span>
  );
}
