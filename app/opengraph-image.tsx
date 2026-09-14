import { site } from "@/lib/site";
import { ogCard, ogSize } from "@/lib/og-card";

// Built from lib/site.ts so the preview card cannot drift from the page.
export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogCard({
    eyebrow: site.role,
    title: site.headline,
    footer: site.stack.slice(0, 6).join(" · "),
  });
}
