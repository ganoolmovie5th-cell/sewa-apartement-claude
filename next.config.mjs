/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Bypass Next.js image optimization proxy untuk semua gambar eksternal
    // Ini mencegah error 4xx saat Unsplash/picsum rate-limit Vercel's IP
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },

  transpilePackages: ["three"],

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Izinkan Google Fonts (font CSS + file .ttf/.woff2)
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Script: self + inline (Next.js hydration) + GA/GTM
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              // Style: self + inline + Google Fonts CSS
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              // Font: self + Google Fonts file server
              "font-src 'self' https://fonts.gstatic.com",
              // Image: self + data + blob + Unsplash + Vercel
              "img-src 'self' data: blob: https://images.unsplash.com https://sewa-apartement-claude.vercel.app",
              // Media: self
              "media-src 'self'",
              // Connect: self + GA + Vercel analytics + GitHub raw (HDRI)
              "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://raw.githubusercontent.com",
              // Worker: self + blob (Three.js / R3F workers)
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
