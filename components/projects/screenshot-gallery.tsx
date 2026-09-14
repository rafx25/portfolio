import Image from "next/image";

import type { Screenshot } from "@/data/types";

export function ScreenshotGallery({ screenshots }: { screenshots: Screenshot[] }) {
  if (screenshots.length === 0) return null;

  return (
    <div className="space-y-5">
      <p className="text-muted-foreground text-xs">
        Captures from test accounts. Anything that identified a person was covered
        before these were uploaded. Select one to open it at full size.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        {screenshots.map((shot) => (
          <figure
            key={shot.src}
            className="border-border bg-surface-muted hover:border-border-strong overflow-hidden rounded-lg border transition-colors"
          >
            {/* A plain link to the file: full resolution, no client JS. */}
            <a
              href={shot.src}
              target="_blank"
              rel="noopener"
              className="block cursor-zoom-in"
            >
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="(min-width: 640px) 50vw, 100vw"
                className="h-auto w-full"
              />
              <span className="sr-only">(opens full size in a new tab)</span>
            </a>
            <figcaption className="border-border bg-surface text-muted-foreground border-t px-4 py-2.5 text-xs">
              {shot.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
