import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daftar Pemilik Gratis",
  description:
    "Daftar gratis sebagai pemilik di SewaApartement dan pasang iklan apartemen sewa Anda ke ribuan pencari hunian di JABODETABEK.",
  alternates: { canonical: "/auth/register" },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
