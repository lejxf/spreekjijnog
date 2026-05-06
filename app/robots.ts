import type { MetadataRoute } from "next";

const SITE_URL = "https://spreekjijnog.nl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block dynamic OG image route from being indexed as a regular page
        // (the images are still accessible to social-platform fetchers via og:image meta).
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
