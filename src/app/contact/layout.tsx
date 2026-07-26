import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description:
    "Hubungi tim Sewa Apartement untuk pertanyaan seputar sewa apartemen di JABODETABEK. Kami siap membantu Anda menemukan hunian yang tepat.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
