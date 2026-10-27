import { AboutBody } from "@/components/sections/About";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "How Bernard Abuto works, his experience founding Sauti Labs, and his education and training in computer science, software engineering, and data science.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader index="01" label="About" title="A little about how I work." />
      <AboutBody />
      <Experience />
      <Education />
    </>
  );
}
