import Link from "next/link";
import { PostList } from "@/components/blog/PostList";
import { posts } from "@/content/blog";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Blog() {
  return (
    <section id="blog" aria-labelledby="blog-heading" className="page-container py-16 lg:py-24">
      <SectionHeader meta="04 / Blog" heading="Writing from the work." headingId="blog-heading">
        <p>
          Technical work leaves behind questions worth writing down. These posts come straight out of my projects:
          the engineering decisions, the research problems, and the bugs that taught me something.
        </p>
      </SectionHeader>

      <div className="mt-14 lg:mt-20">
        <PostList posts={posts} />
      </div>
      <p className="mt-8 text-sm">
        <Link href="/blog" className="link-underline">
          All posts <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}
