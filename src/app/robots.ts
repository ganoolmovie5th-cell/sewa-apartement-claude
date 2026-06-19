import { MetadataRoute } from "next";

const BASE_URL = "https://sewa-apartement.web.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/sa-admin-x9q2m",
          "/dashboard",
          "/api/",
          "/auth/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
