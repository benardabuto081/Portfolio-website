import Link from "next/link";
import { PostList } from "@/components/blog/PostList";
import { posts } from "@/content/blog";
import { SectionHeader } from "@/components/ui/SectionHeader";

/** Homepage band with the most recent posts; the full list lives at /blog. */
export function LatestWriting() {
  return (
    <section aria-labelledby="home-writing-heading" className="border-y border-line bg-panel">
      <div className="page-container py-16 lg:py-24">
        <SectionHeader meta="From the blog" heading="Writing from the work." headingId="home-writing-heading">
          <p>
            Engineering decisions, research problems, and the convictions behind them — written from the projects
            themselves, including the parts that went wrong.
          </p>
        </SectionHeader>
        <div className="mt-6 lg:mt-10">
          <PostList posts={posts.slice(0, 3)} />
        </div>
        <p className="mt-8 text-sm">
          <Link href="/blog" className="link-underline">
            All {posts.length} posts <span aria-hidden="true">→</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
