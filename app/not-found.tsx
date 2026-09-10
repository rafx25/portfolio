import Link from "next/link";

import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <p className="text-accent font-mono text-xs tracking-widest uppercase">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        That page does not exist
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
        The link may be out of date, or the address may have a typo in it.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={buttonStyles()}>
          Back to home
        </Link>
        <Link href="/projects" className={buttonStyles({ variant: "secondary" })}>
          View projects
        </Link>
      </div>
    </Container>
  );
}
