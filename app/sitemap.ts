import type { MetadataRoute } from "next";
import { absoluteUrl, indexablePages } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages.map((page) => ({
    url: absoluteUrl(page.path),
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.7,
  }));
}
