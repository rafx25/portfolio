import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { ExperienceItem, Position } from "@/data/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateRange(start: string, end: string | null) {
  return `${start} - ${end ?? "Present"}`;
}

/** The job title, with the employer when it differs from the organization. */
export function positionLabel(position: Position) {
  return position.employer
    ? `${position.title} (${position.employer})`
    : position.title;
}

/**
 * First start to last end across an organization's positions. Positions are
 * listed newest first, so the oldest start is the last one.
 */
export function experienceSpan(item: ExperienceItem) {
  const oldest = item.positions[item.positions.length - 1];
  const current = item.positions.some((p) => p.end === null);

  return {
    start: oldest?.start ?? "",
    end: current ? null : (item.positions[0]?.end ?? null),
  };
}
