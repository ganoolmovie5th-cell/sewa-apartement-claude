import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lupa Kata Sandi",
  description:
    "Pulihkan akses akun pemilik SewaApartement. Reset kata sandi Anda dengan cepat dan aman untuk kembali mengelola listing apartemen.",
  alternates: { canonical: "/auth/forgot-password" },
};

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
