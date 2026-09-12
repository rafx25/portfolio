import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

// Built from lib/site.ts so the preview card cannot drift from the page.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#181311",
        color: "#efeae8",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 26, color: "#f05560", letterSpacing: 4 }}>
          {site.role.toUpperCase()}
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 62,
            lineHeight: 1.15,
            fontWeight: 600,
            maxWidth: 960,
          }}
        >
          Building reliable web systems for real-world business operations.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          fontSize: 26,
          color: "#a29996",
        }}
      >
        <div>{site.name}</div>
        <div>PHP · Slim · Laravel · MySQL · Vue</div>
      </div>
    </div>,
    size,
  );
}
