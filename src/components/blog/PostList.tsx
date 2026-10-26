import Link from "next/link";
import { formatDate, readingTime, type BlogPost } from "@/content/blog";
import { getProject } from "@/content/projects";

export function PostList({ posts, headingLevel = 3 }: { posts: BlogPost[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <ol className="border-t border-fg">
      {posts.map((post) => (
        <li key={post.slug} className="border-b border-line">
          <Link
            href={`/blog/${post.slug}`}
            className="group grid gap-3 py-8 transition-colors duration-200 lg:grid-cols-12 lg:gap-10"
          >
            <div className="meta flex flex-wrap gap-x-4 gap-y-1 text-muted lg:col-span-3 lg:flex-col lg:pt-2">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>{readingTime(post)} min read</span>
              <span className="text-accent">{getProject(post.project)?.title}</span>
            </div>
            <div className="lg:col-span-8">
              <Heading className="font-serif text-[1.875rem] leading-[1.1] transition-colors duration-200 group-hover:text-accent sm:text-[2.25rem]">
                {post.title}
              </Heading>
              <p className="mt-3 max-w-[62ch] leading-relaxed text-muted">{post.summary}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
                Read the post
                <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
