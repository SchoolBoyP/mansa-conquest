import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mansaconquest.com";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/login", "/portal", "/admin"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
