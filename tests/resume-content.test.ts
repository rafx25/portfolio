import { afterEach, describe, expect, it, vi } from "vitest";

// site.url is read from the environment at module load, so each case needs a
// fresh import with the variable already set.
async function loadContactLines(siteUrl?: string) {
  vi.resetModules();

  if (siteUrl === undefined) {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  } else {
    process.env.NEXT_PUBLIC_SITE_URL = siteUrl;
  }

  const { resumeContactLines } = await import("@/lib/resume-content");
  return resumeContactLines();
}

afterEach(() => {
  delete process.env.NEXT_PUBLIC_SITE_URL;
  vi.resetModules();
});

describe("resume contact lines", () => {
  it("puts the portfolio URL first, without its protocol", async () => {
    const { links } = await loadContactLines("https://rafaeldomer.dev");

    expect(links.startsWith("rafaeldomer.dev")).toBe(true);
    expect(links).toContain("github.com");
  });

  it("leaves out a localhost URL, so a PDF built in development does not advertise it", async () => {
    const { links } = await loadContactLines("http://localhost:3000");

    expect(links).not.toContain("localhost");
    expect(links).toContain("github.com");
  });

  it("also leaves out a loopback IP", async () => {
    const { links } = await loadContactLines("http://127.0.0.1:3000");

    expect(links).not.toContain("127.0.0.1");
  });

  it("drops a trailing slash so the URL does not read as a path", async () => {
    const { links } = await loadContactLines("https://rafaeldomer.dev/");

    expect(links.startsWith("rafaeldomer.dev |")).toBe(true);
  });

  it("keeps the phone out of the contact line while it is unset", async () => {
    const { contact } = await loadContactLines("https://rafaeldomer.dev");

    expect(contact).toContain("@");
    expect(contact).not.toMatch(/\|\s*\|/);
  });
});
