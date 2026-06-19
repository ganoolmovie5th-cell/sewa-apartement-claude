import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Self-hosted via Next.js — tidak ada request ke fonts.gstatic.com
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-DFKHWJ3TJZ";
const GSC_VERIFICATION = "pEw-CXIVMv8NSSGvdlOtNwSWWdIWmsANEaYXG9lN-8o";

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
  verification: {
    google: GSC_VERIFICATION,
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
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
        url: "/logo.svg",
        width: 512,
        height: 512,
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
    <html lang="id" className={`dark ${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WXDBVJJ3');`}
      </Script>
      {/* Google Analytics */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
      <body className="bg-dark-900 text-white antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WXDBVJJ3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Navbar />
        <main>{children}</main>
        <Footer />
        {/* Vercel Web Analytics + Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
