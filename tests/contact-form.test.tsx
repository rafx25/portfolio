import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ContactForm } from "@/components/sections/contact-form";

function fillValidMessage(user: ReturnType<typeof userEvent.setup>) {
  return async () => {
    await user.type(screen.getByLabelText("Name"), "Jane Santos");
    await user.type(screen.getByLabelText("Email"), "jane@company.com");
    await user.type(screen.getByLabelText("Subject"), "Full stack role");
    await user.type(
      screen.getByLabelText("Message"),
      "We are hiring and your case studies were useful reading.",
    );
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ContactForm", () => {
  it("reports validation errors without calling the API", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const user = userEvent.setup();

    render(<ContactForm fallbackEmail="me@example.com" />);
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(await screen.findByText("Please enter your name.")).toBeInTheDocument();
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("marks an invalid field with aria-invalid and links its error message", async () => {
    const user = userEvent.setup();
    render(<ContactForm fallbackEmail={null} />);

    await user.type(screen.getByLabelText("Email"), "not-an-email");
    await user.click(screen.getByRole("button", { name: "Send message" }));

    const email = await screen.findByLabelText("Email");
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveAccessibleDescription(
      "That does not look like a valid email address.",
    );
  });

  it("posts valid input and shows the success message", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ message: "Thanks — your message has been sent." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const user = userEvent.setup();
    render(<ContactForm fallbackEmail={null} />);

    await fillValidMessage(user)();
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(
      await screen.findByText("Thanks — your message has been sent."),
    ).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalledOnce();

    const [, init] = fetchSpy.mock.calls[0] ?? [];
    expect(JSON.parse(String(init?.body))).toMatchObject({ email: "jane@company.com" });
  });

  it("surfaces the server's message when the request is rejected", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(
        JSON.stringify({ message: "Too many messages from this address." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        },
      ),
    );

    const user = userEvent.setup();
    render(<ContactForm fallbackEmail={null} />);

    await fillValidMessage(user)();
    await user.click(screen.getByRole("button", { name: "Send message" }));

    expect(
      await screen.findByText("Too many messages from this address."),
    ).toBeInTheDocument();
  });
});
