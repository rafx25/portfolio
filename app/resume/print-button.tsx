import { Download } from "lucide-react";

import { buttonStyles } from "@/components/ui/button";

/**
 * A real download rather than window.print(). The print dialog cannot be told
 * to save a PDF — the browser picks the destination, and it often picks a
 * physical printer.
 */
export function PrintButton() {
  return (
    <a href="/resume.pdf" download className={buttonStyles()}>
      <Download className="size-4" aria-hidden />
      Download PDF
    </a>
  );
}
