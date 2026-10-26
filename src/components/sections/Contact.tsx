import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "./ContactForm";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="page-container pt-16 lg:pt-24">
      <SectionHeader meta="06 / Contact" heading="Have a problem worth investigating?" headingId="contact-heading">
        <p>
          I&apos;m interested in thoughtful conversations about machine learning research, AI systems, African
          language technology, and the engineering work that connects research to practice. If you&apos;re working on
          something in these areas, I&apos;d be glad to hear from you.
        </p>
      </SectionHeader>

      <div className="mt-14 lg:mt-20 lg:ml-[calc(25%+0.625rem)]">
        <ContactForm />
      </div>
    </section>
  );
}
