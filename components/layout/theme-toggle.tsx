"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const noopSubscribe = () => () => {};

// The server does not know the visitor's theme, so the icon waits for
// hydration. A fixed-size placeholder keeps the header from shifting.
export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Switch theme"
      }
      className="text-muted-foreground hover:bg-surface-muted hover:text-foreground inline-flex size-9 items-center justify-center rounded-md transition-colors"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4" aria-hidden />
        ) : (
          <Moon className="size-4" aria-hidden />
        )
      ) : (
        <span className="size-4" aria-hidden />
      )}
    </button>
  );
}
