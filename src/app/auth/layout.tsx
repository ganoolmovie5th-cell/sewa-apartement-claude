import AuthSeoContent from "@/components/auth/AuthSeoContent";

// Layout bersama untuk seluruh halaman auth — menambahkan konten SEO
// (word count, heading h2→h6, gambar lazy). Canonical di-set per sub-route.
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <AuthSeoContent />
    </>
  );
}
