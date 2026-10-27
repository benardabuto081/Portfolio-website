import { AboutTeaser } from "@/components/home/AboutTeaser";
import { ContactBand } from "@/components/home/ContactBand";
import { LatestWriting } from "@/components/home/LatestWriting";
import { WorkList } from "@/components/home/WorkList";
import { Hero } from "@/components/sections/Hero";
import { personJsonLd } from "@/lib/metadata";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <WorkList />
      <LatestWriting />
      <AboutTeaser />
      <ContactBand />
    </>
  );
}
