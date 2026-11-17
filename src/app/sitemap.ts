import type { MetadataRoute } from "next";
import { posts } from "@/content/blog";
import { projects } from "@/content/projects";
import { awards } from "@/content/awards";
import { absoluteUrl } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    ...["/about", "/work", "/awards", "/research", "/contact"].map((path) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...awards.map((award) => ({
      url: absoluteUrl(`/awards/${award.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
