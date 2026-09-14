import { Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";

import { site, isPlaceholder } from "@/lib/site";
import { Section } from "@/components/ui/section";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";

export function Contact() {
  const email = isPlaceholder(site.email) ? null : site.email;

  const links = [
    { href: site.github, label: "GitHub", Icon: GithubIcon, value: site.github },
    {
      href: site.linkedin,
      label: "LinkedIn",
      Icon: LinkedinIcon,
      value: site.linkedin,
    },
  ].filter((link) => !isPlaceholder(link.value));

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Get in touch"
      description="Hiring for a full stack, backend or Laravel role, or want to talk through any of the work above? Send a message here, or email me directly."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div className="reveal space-y-6 text-sm">
          <ul className="space-y-3">
            {email ? (
              <li className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Mail className="text-muted-foreground size-4" aria-hidden />
                <a
                  href={`mailto:${email}`}
                  className="underline-offset-4 hover:underline"
                >
                  {email}
                </a>
                <CopyEmail email={email} />
              </li>
            ) : null}

            {links.map(({ href, label, Icon }) => (
              <li key={label} className="flex items-center gap-3">
                <Icon className="text-muted-foreground size-4" aria-hidden />
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline-offset-4 hover:underline"
                >
                  {label}
                </a>
              </li>
            ))}

            <li className="text-muted-foreground flex items-center gap-3">
              <MapPin className="size-4" aria-hidden />
              {site.location}
            </li>
          </ul>
        </div>

        <div className="reveal">
          <ContactForm fallbackEmail={email} />
        </div>
      </div>
    </Section>
  );
}
