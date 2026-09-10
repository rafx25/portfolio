import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { AiEngineering } from "@/components/sections/ai-engineering";
import { Principles } from "@/components/sections/principles";
import { SourceCode } from "@/components/sections/source-code";
import { Contact } from "@/components/sections/contact";
import { PersonJsonLd } from "@/components/seo/json-ld";

export default function HomePage() {
  return (
    <>
      <PersonJsonLd />
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Skills />
      <AiEngineering />
      <Principles />
      <SourceCode />
      <Contact />
    </>
  );
}
