import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cara Kerja",
  description:
    "Pelajari cara menyewa apartemen melalui Sewa Apartement: cari listing, hubungi pemilik, dan sewa dengan aman dalam beberapa langkah mudah.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
