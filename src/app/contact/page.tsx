import { ContactForm } from "@/components/sections/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Get in touch with Bernard Abuto about machine learning research, AI systems, African language technology, or Sauti Labs.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader index="05" label="Contact" title="Have a problem worth investigating?">
        <p>
          I&apos;m interested in thoughtful conversations about machine learning research, AI systems, African
          language technology, and the engineering work that connects research to practice. If you&apos;re working on
          something in these areas, I&apos;d be glad to hear from you.
        </p>
      </PageHeader>
      <section aria-label="Contact form" className="page-container py-14 lg:py-20">
        <div className="lg:ml-[calc(25%+0.625rem)]">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
