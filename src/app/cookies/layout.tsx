import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Cookie",
  description:
    "Kebijakan cookie Sewa Apartement: jenis cookie yang kami gunakan dan cara mengelolanya.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
