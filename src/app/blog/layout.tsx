import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Panduan Sewa Apartemen",
  description:
    "Artikel, tips, dan panduan lengkap seputar sewa apartemen di JABODETABEK: harga pasar, tips negosiasi, dan rekomendasi area.",
  alternates: { canonical: "/blog" },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
