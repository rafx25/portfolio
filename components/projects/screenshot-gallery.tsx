import Image from "next/image";

import type { Screenshot } from "@/data/types";

export function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
  if (screenshots.length === 0) return null;

  return (
    <div className="space-y-5">
      <p className="text-muted-foreground text-xs">
        Captures from test accounts. Anything that identified a person was covered
        before these were uploaded.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {screenshots.map((shot) => (
          <figure
            key={shot.src}
            className="border-border bg-surface-muted overflow-hidden rounded-lg border"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              width={shot.width}
              height={shot.height}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="border-border bg-surface text-muted-foreground border-t px-4 py-2.5 text-xs">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
