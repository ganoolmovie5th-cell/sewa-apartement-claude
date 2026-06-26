import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Masuk Pemilik",
  description:
    "Masuk ke akun pemilik SewaApartement untuk mengelola listing apartemen sewa Anda di JABODETABEK. Pantau minat penyewa dari satu dashboard.",
  alternates: { canonical: "/auth/login" },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
