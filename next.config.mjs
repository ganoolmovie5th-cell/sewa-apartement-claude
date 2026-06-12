/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Bypass Next.js image optimization proxy — gambar Unsplash langsung dari CDN-nya
    // tanpa melalui /_next/image Vercel (mencegah rate-limit & error 4xx)
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },

  transpilePackages: ["three"],
};

export default nextConfig;
