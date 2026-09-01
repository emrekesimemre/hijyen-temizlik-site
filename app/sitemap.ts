import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hijyenhalitemizleme.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-09-01"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
