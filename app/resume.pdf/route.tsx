import { renderToBuffer } from "@react-pdf/renderer";

import { site } from "@/lib/site";
import { ResumeDocument } from "@/lib/resume-pdf";

// Rendering needs Node, not the edge runtime.
export const runtime = "nodejs";

export async function GET() {
  const buffer = await renderToBuffer(<ResumeDocument />);
  const filename = `${site.name.replace(/[^A-Za-z]+/g, "_")}_Resume.pdf`;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      // attachment, so the browser saves the file instead of opening a viewer.
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
