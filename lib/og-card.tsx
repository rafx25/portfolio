import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

// Shared by every opengraph-image route so the cards cannot drift apart.
export const ogSize = { width: 1200, height: 630 };

// Hex rather than the OKLCH tokens in globals.css: the OG renderer does not
// parse oklch(). These match the dark theme.
const colors = {
  background: "#181311",
  foreground: "#efeae8",
  accent: "#f05560",
  muted: "#a29996",
};

type OgCardProps = {
  eyebrow: string;
  title: string;
  /** When set, the title is shorter and set larger, with this beneath it. */
  subtitle?: string;
  footer: string;
};

export function ogCard({ eyebrow, title, subtitle, footer }: OgCardProps) {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: colors.background,
        color: colors.foreground,
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 26, color: colors.accent, letterSpacing: 4 }}>
          {eyebrow.toUpperCase()}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: subtitle ? 76 : 62,
            lineHeight: 1.15,
            fontWeight: 600,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              lineHeight: 1.35,
              color: colors.muted,
              maxWidth: 1000,
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 32,
          fontSize: 26,
          color: colors.muted,
        }}
      >
        <div>{site.name}</div>
        <div>{footer}</div>
      </div>
    </div>,
    ogSize,
  );
}
