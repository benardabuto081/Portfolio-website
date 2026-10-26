import { PostList } from "@/components/blog/PostList";
import { posts } from "@/content/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Blog",
  description:
    "Technical writing by Bernard Abuto on machine learning research, data quality, model evaluation, and building applied AI systems.",
  path: "/blog",
});

export default function BlogIndexPage() {
  return (
    <section className="page-container pt-12 sm:pt-16 lg:pt-24">
      <p className="meta text-muted">Bernard Abuto</p>
      <h1 className="mt-6 font-serif text-[3.5rem] leading-[0.95] tracking-[-0.02em] sm:text-7xl lg:text-[5.5rem]">
        Blog
      </h1>
      <p className="mt-8 max-w-[58ch] text-[1.0625rem] leading-relaxed text-muted">
        Engineering decisions, research problems, and the lessons that came out of them — written from the projects
        themselves, including the parts that went wrong.
      </p>
      <div className="mt-16 lg:mt-20">
        <PostList posts={posts} headingLevel={2} />
      </div>
    </section>
  );
}
