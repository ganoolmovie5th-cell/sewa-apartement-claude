import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "SewaApartement – Sewa Apartemen JABODETABEK #1",
    template: "%s | SewaApartement",
  },
  description:
    "Platform marketplace sewa apartemen terlengkap di JABODETABEK. Temukan apartemen untuk mahasiswa, pekerja, dan keluarga di Jakarta, Bogor, Depok, Tangerang, Bekasi.",
  keywords: [
    "sewa apartemen",
    "sewa apartement",
    "apartemen jakarta",
    "apartemen murah",
    "sewa apartemen jabodetabek",
    "apartemen tangerang",
    "apartemen bekasi",
    "apartemen depok",
    "kost jakarta",
    "rent apartment jakarta",
  ],
  authors: [{ name: "SewaApartement" }],
  creator: "SewaApartement",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://sewa-apartement-claude.vercel.app",
    siteName: "SewaApartement",
    title: "SewaApartement – Sewa Apartemen JABODETABEK #1",
    description:
      "Platform marketplace sewa apartemen terlengkap di JABODETABEK. Ribuan pilihan untuk mahasiswa, pekerja, dan keluarga.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SewaApartement – Marketplace Sewa Apartemen JABODETABEK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SewaApartement – Sewa Apartemen JABODETABEK #1",
    description: "Platform marketplace sewa apartemen terlengkap di JABODETABEK.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <body className="bg-dark-900 text-white antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
