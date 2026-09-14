import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/layout/site-header";
import { ProjectCard } from "@/components/projects/project-card";
import { AiEngineering } from "@/components/sections/ai-engineering";
import { Hero } from "@/components/sections/hero";
import { featuredProjects } from "@/data/projects";
import { site } from "@/lib/site";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: "dark",
    setTheme: vi.fn(),
  }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/image", () => ({
  default: (
    props: React.ImgHTMLAttributes<HTMLImageElement> & {
      alt: string;
      src: string;
      fill?: boolean;
      priority?: boolean;
      sizes?: string;
    },
  ) => {
    const { alt, src, fill, priority, sizes, ...imageProps } = props;

    void fill;
    void priority;
    void sizes;

    return React.createElement("img", { alt, src, ...imageProps });
  },
}));

describe("portfolio design adaptation", () => {
  it("centers the hero around the portrait and primary message", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", { level: 1, name: site.name });
    const section = heading.closest("section");
    const portraitFrame = screen.getByAltText(
      `${site.name}, ${site.role}`,
    ).parentElement;

    expect(section).toHaveClass("text-center");
    expect(section).toHaveClass("min-h-[calc(100svh-4rem)]");
    expect(portraitFrame).toHaveClass("mx-auto");
  });

  it("uses a pill navigation shell that echoes the reference without changing copy", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("navigation", { name: "Main" })).toHaveClass(
      "rounded-full",
      "border",
      "bg-surface/80",
    );
    expect(screen.getByLabelText(`${site.shortName} — home`)).toHaveClass(
      "rounded-full",
      "border",
    );
  });

  it("keeps project cards screenshot-forward and case-study oriented", () => {
    const project = featuredProjects[0];

    expect(project).toBeDefined();
    if (!project) throw new Error("Expected at least one featured project");

    const screenshotData = project.screenshots[0];

    expect(screenshotData).toBeDefined();
    if (!screenshotData) throw new Error("Expected featured project screenshot");

    render(<ProjectCard project={project} />);

    const card = screen
      .getByRole("heading", { level: 3, name: project.name })
      .closest("article");
    const screenshot = screen.getByAltText(screenshotData.alt);

    expect(card).toHaveClass("rounded-lg", "shadow-sm");
    expect(screenshot).toHaveClass("h-56", "sm:h-64");
    expect(screen.getByText("Read case study")).toHaveClass("rounded-full");
  });

  it("keeps the AI note compact instead of making it a major portfolio section", () => {
    render(<AiEngineering />);

    const section = screen.getByRole("region", { name: "AI in my workflow" });

    expect(section).toHaveClass("py-12");
    expect(
      screen.getByRole("heading", { level: 2, name: "AI in my workflow" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Tools" })).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Where AI sits in the workflow" }),
    ).not.toBeInTheDocument();
  });
});
