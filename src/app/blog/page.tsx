import { PostList } from "@/components/blog/PostList";
import { PageHeader } from "@/components/ui/PageHeader";
import { posts } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Writing by Bernard Abuto on machine learning research, speech technology for African languages, data quality, model evaluation, and building applied AI systems.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <>
      <PageHeader index="04" label="Blog" title="Writing from the work.">
        <p>
          Engineering decisions, research problems, and the convictions behind them — written from the projects
          themselves, including the parts that went wrong.
        </p>
        <p className="meta text-muted">
          Posts are dated by the period of the work they describe. All were published on this site in October 2026.
        </p>
      </PageHeader>
      <section aria-label="All posts" className="page-container pb-24 pt-12 lg:pb-32 lg:pt-16">
        <PostList posts={posts} headingLevel={2} />
      </section>
    </>
  );
}
