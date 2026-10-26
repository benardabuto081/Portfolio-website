import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Research } from "@/components/sections/Research";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Blog } from "@/components/sections/Blog";
import { personJsonLd } from "@/lib/metadata";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <SelectedWork />
      <Research />
      <Experience />
      <Blog />
      <About />
      <Education />
      <Contact />
    </>
  );
}
