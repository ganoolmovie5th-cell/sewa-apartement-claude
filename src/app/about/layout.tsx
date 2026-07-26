import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Kenali Sewa Apartement — platform pencarian apartemen sewa di Jakarta, Bogor, Depok, Tangerang, dan Bekasi dengan listing terverifikasi.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
