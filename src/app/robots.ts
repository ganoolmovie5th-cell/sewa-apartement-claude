import { MetadataRoute } from "next";

const BASE_URL = "https://www.sewa-apartement.web.id";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/sa-admin-x9q2m",
          "/api/",
          "/listings?q=",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
