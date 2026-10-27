import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PostBody, PostSources } from "@/components/blog/PostBody";
import { formatDate, formatPeriod, getPost, posts, readingTime } from "@/content/blog";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata({ title: post.title, description: post.summary, path: `/blog/${post.slug}` });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.published, authors: [site.name] },
  };
}

// Params are read inside Suspense so the route's shared shell stays URL-independent
// (Partial Prefetching). Known slugs are still fully prerendered via generateStaticParams.
export default function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  return (
    <Suspense fallback={<div aria-busy="true" className="min-h-[70vh]" />}>
      <Post params={params} />
    </Suspense>
  );
}

async function Post({ params }: Pick<PageProps<"/blog/[slug]">, "params">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const project = getProject(post.project);
  const others = posts.filter((other) => other.slug !== post.slug);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.published,
    author: { "@type": "Person", name: site.name, url: site.url },
    url: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="border-b border-line bg-panel">
        <header className="page-container pb-12 pt-10 sm:pt-14 lg:pb-16 lg:pt-20">
          <nav aria-label="Breadcrumb">
            <ol className="meta flex flex-wrap items-center gap-2 text-muted">
              <li>
                <Link href="/blog" className="link-underline hover:text-fg">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-fg">
                {post.title}
              </li>
            </ol>
          </nav>

          <div className="mt-10 lg:mt-14">
            <h1 className="animate-rise max-w-[20ch] font-serif text-[2.75rem] leading-[1.02] tracking-[-0.015em] sm:text-6xl lg:text-[4.5rem]">
              {post.title}
            </h1>
            <p className="mt-8 max-w-[60ch] text-[1.1875rem] leading-relaxed text-muted">{post.summary}</p>
          </div>
          <dl className="meta mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-muted sm:grid-cols-3 lg:grid-cols-5">
            <div>
              <dt>Work period</dt>
              <dd className="mt-1 text-fg">
                <time dateTime={post.period}>{formatPeriod(post.period)}</time>
              </dd>
            </div>
            <div>
              <dt>Published</dt>
              <dd className="mt-1 text-fg">
                <time dateTime={post.published}>{formatDate(post.published)}</time>
              </dd>
            </div>
            <div>
              <dt>Reading time</dt>
              <dd className="mt-1 text-fg">{readingTime(post)} min</dd>
            </div>
            <div>
              <dt>Project</dt>
              <dd className="mt-1">
                {project ? (
                  <Link href={`/work/${project.slug}`} className="link-underline text-accent">
                    {project.title}
                  </Link>
                ) : null}
              </dd>
            </div>
            <div>
              <dt>Topics</dt>
              <dd className="mt-1 text-fg">{post.topics.join(" · ")}</dd>
            </div>
          </dl>
        </header>
      </div>

      <div className="page-container grid pt-12 lg:grid-cols-12 lg:pt-16">
        <div className="min-w-0 lg:col-span-9 lg:col-start-4">
          <PostBody blocks={post.body} />
          {post.sources?.length ? <PostSources sources={post.sources} /> : null}
        </div>
      </div>

      <nav aria-label="More from the blog" className="page-container mb-16 mt-24 lg:mb-24">
        <p className="meta border-b border-fg pb-4 text-muted">More from the blog</p>
        <ul>
          {others.map((other) => (
            <li key={other.slug} className="border-b border-line">
              <Link
                href={`/blog/${other.slug}`}
                className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className="font-serif text-[1.625rem] leading-snug transition-colors duration-200 group-hover:text-accent">
                  {other.title}
                </span>
                <span className="meta shrink-0 text-muted">{formatPeriod(other.period)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="py-6 text-sm">
          <Link href="/blog" className="link-underline">
            <span aria-hidden="true">← </span>All posts
          </Link>
        </p>
      </nav>
    </article>
  );
}
