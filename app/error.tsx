"use client";

import { useEffect } from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button, buttonStyles } from "@/components/ui/button";

// In production Next replaces the real message with a digest, so the digest
// is the only thing worth showing. It matches the server log.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <p className="text-accent font-mono text-xs tracking-widest uppercase">Error</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        Something went wrong
      </h1>
      <p className="text-muted-foreground mt-4 max-w-md text-sm leading-relaxed">
        This page failed to render. Trying again is usually enough; if it is not, the
        reference below identifies what happened in the server log.
      </p>

      {error.digest ? (
        <p className="text-muted-foreground mt-3 font-mono text-xs">
          Reference: {error.digest}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={reset}>Try again</Button>
        <Link href="/" className={buttonStyles({ variant: "secondary" })}>
          Back to home
        </Link>
      </div>
    </Container>
  );
}
