import { getPost, posts } from "@/content/blog";
import { site } from "@/content/site";
import { ogSize, renderOgCard } from "@/lib/og";

export const alt = `Blog post by ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug) ?? posts[0];
  return renderOgCard({
    eyebrow: "BLOG",
    title: post.title,
    statement: post.summary,
    footer: site.name,
  });
}
