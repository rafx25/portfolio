"use client";

import { useId, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

import { contactSchema, toFieldErrors, type FieldErrors } from "@/lib/validation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-md border border-border bg-surface px-3 py-2 text-sm " +
  "placeholder:text-muted-foreground/70 focus-visible:border-accent";

// Form order, so focus lands on the first problem a reader would reach.
const fieldOrder = ["name", "email", "subject", "message"] as const;

function focusFirstInvalid(form: HTMLFormElement, errors: FieldErrors) {
  const first = fieldOrder.find((field) => errors[field]);
  if (first) form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string | null }) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [message, setMessage] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form));
    const parsed = contactSchema.safeParse(raw);

    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus("error");
      setMessage("Please check the highlighted fields.");
      focusFirstInvalid(form, fieldErrors);
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const payload: { message?: string; errors?: FieldErrors } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        const fieldErrors = payload.errors ?? {};
        setErrors(fieldErrors);
        setStatus("error");
        setMessage(payload.message ?? "Something went wrong. Please try again.");
        focusFirstInvalid(form, fieldErrors);
        return;
      }

      form.reset();
      setStatus("success");
      setMessage(payload.message ?? "Thanks — your message has been sent.");
    } catch {
      setStatus("error");
      setMessage(
        "The message could not be sent. Check your connection, or email me directly.",
      );
    }
  }

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      autoComplete: "name",
      placeholder: "Jane Santos",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      autoComplete: "email",
      placeholder: "jane@company.com",
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      autoComplete: "off",
      placeholder: "Full stack role at [company]",
    },
  ] as const;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {fields.map((field) => {
        const fieldId = `${id}-${field.name}`;
        const error = errors[field.name];

        return (
          <div key={field.name}>
            <label htmlFor={fieldId} className="block text-sm font-medium">
              {field.label}
            </label>
            <input
              id={fieldId}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${fieldId}-error` : undefined}
              className={cn(fieldClass, "mt-1.5", error && "border-danger")}
            />
            {error ? (
              <p id={`${fieldId}-error`} className="text-danger mt-1.5 text-xs">
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      <div>
        <label htmlFor={`${id}-message`} className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id={`${id}-message`}
          name="message"
          rows={6}
          placeholder="What are you working on, and what would you want me to do on it?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${id}-message-error` : undefined}
          className={cn(
            fieldClass,
            "mt-1.5 resize-y",
            errors.message && "border-danger",
          )}
        />
        {errors.message ? (
          <p id={`${id}-message-error`} className="text-danger mt-1.5 text-xs">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden>
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Sending
            </>
          ) : (
            "Send message"
          )}
        </Button>

        {fallbackEmail ? (
          <span className="text-muted-foreground text-xs">
            or email{" "}
            <a
              href={`mailto:${fallbackEmail}`}
              className="underline underline-offset-4"
            >
              {fallbackEmail}
            </a>
          </span>
        ) : null}
      </div>

      {/* Announced to screen readers without moving focus. */}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "flex items-start gap-2 text-sm",
          status === "success" && "text-accent",
          status === "error" && "text-danger",
        )}
      >
        {status === "success" ? (
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
        ) : null}
        {status === "error" ? (
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
        ) : null}
        {status === "success" || status === "error" ? message : null}
      </p>
    </form>
  );
}
