"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const SECTIONS_ID = [
  { title: "1. Penerimaan Syarat", body: "Dengan mengakses dan menggunakan platform SewaApartement.id, Anda menyetujui untuk terikat oleh syarat dan ketentuan ini. Jika Anda tidak setuju dengan salah satu ketentuan, harap hentikan penggunaan platform kami." },
  { title: "2. Deskripsi Layanan", body: "SewaApartement.id adalah platform marketplace yang menghubungkan pemilik properti dengan pencari sewa apartemen di wilayah JABODETABEK. Kami tidak bertindak sebagai agen properti dan tidak bertanggung jawab atas transaksi langsung antara pemilik dan penyewa." },
  { title: "3. Akun Pengguna", body: "Untuk menjadi pemilik listing, Anda diharuskan mendaftar akun dan memberikan informasi yang akurat. Anda bertanggung jawab penuh atas keamanan akun dan semua aktivitas yang terjadi di bawah akun Anda. Kami berhak menonaktifkan akun yang melanggar ketentuan ini." },
  { title: "4. Konten Listing", body: "Pemilik properti bertanggung jawab penuh atas keakuratan, kelengkapan, dan legalitas informasi yang dipasang. Dilarang memasang konten yang menyesatkan, melanggar hukum, atau merugikan pihak lain. Kami berhak menghapus konten yang melanggar ketentuan tanpa pemberitahuan." },
  { title: "5. Larangan Penggunaan", body: "Dilarang menggunakan platform untuk tujuan ilegal, melakukan spam, menyebarkan informasi palsu, mencuri data pengguna lain, atau melakukan tindakan yang dapat merusak platform. Pelanggaran dapat mengakibatkan pemblokiran akun permanen." },
  { title: "6. Batasan Tanggung Jawab", body: "SewaApartement.id tidak bertanggung jawab atas kerugian yang timbul dari transaksi antara pemilik dan penyewa, keakuratan informasi listing, atau ketidaktersediaan layanan. Gunakan platform ini dengan bijak dan lakukan verifikasi mandiri." },
  { title: "7. Perubahan Ketentuan", body: "Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan signifikan akan diumumkan melalui email atau notifikasi platform. Penggunaan berkelanjutan setelah perubahan berarti Anda menyetujui ketentuan yang diperbarui." },
  { title: "8. Hukum yang Berlaku", body: "Syarat dan ketentuan ini diatur oleh hukum Republik Indonesia. Setiap perselisihan akan diselesaikan melalui jalur musyawarah atau pengadilan yang berwenang di Indonesia." },
];

const SECTIONS_EN = [
  { title: "1. Acceptance of Terms", body: "By accessing and using the SewaApartement.id platform, you agree to be bound by these terms and conditions. If you do not agree with any provision, please stop using our platform." },
  { title: "2. Service Description", body: "SewaApartement.id is a marketplace platform connecting property owners with apartment renters in the JABODETABEK area. We do not act as a property agent and are not responsible for direct transactions between owners and tenants." },
  { title: "3. User Accounts", body: "To become a listing owner, you must register an account and provide accurate information. You are fully responsible for account security and all activities under your account. We reserve the right to deactivate accounts that violate these terms." },
  { title: "4. Listing Content", body: "Property owners are fully responsible for the accuracy, completeness, and legality of posted information. Posting misleading, illegal, or harmful content is prohibited. We reserve the right to remove violating content without notice." },
  { title: "5. Prohibited Uses", body: "Using the platform for illegal purposes, spamming, spreading false information, stealing user data, or performing actions that could damage the platform is prohibited. Violations may result in permanent account blocking." },
  { title: "6. Limitation of Liability", body: "SewaApartement.id is not liable for losses arising from owner-tenant transactions, listing accuracy, or service unavailability. Use this platform wisely and conduct independent verification." },
  { title: "7. Changes to Terms", body: "We reserve the right to modify these terms at any time. Significant changes will be announced via email or platform notification. Continued use after changes means you accept the updated terms." },
  { title: "8. Governing Law", body: "These terms are governed by the laws of the Republic of Indonesia. Disputes will be resolved through deliberation or competent courts in Indonesia." },
];

export default function TermsPage() {
  const { lang } = useLanguage();
  const sections = lang === "id" ? SECTIONS_ID : SECTIONS_EN;
  return (
    <div className="page-dark pt-16 md:pt-20">
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center mx-auto mb-5">
            <FileText className="text-primary-400" size={26} />
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading font-black text-white mb-3" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
            {lang === "id" ? "Syarat & Ketentuan" : "Terms & Conditions"}
          </motion.h1>
          <p className="text-white/50 text-sm">
            {lang === "id" ? "Terakhir diperbarui: 1 Januari 2024" : "Last updated: January 1, 2024"}
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
        </Link>
        <div className="space-y-6">
          {sections.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6">
              <h2 className="font-heading font-bold text-white mb-3">{s.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 p-5 glass rounded-2xl border border-primary-500/20 text-center">
          <p className="text-white/50 text-sm mb-3">
            {lang === "id" ? "Ada pertanyaan tentang ketentuan ini?" : "Questions about these terms?"}
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm py-2.5 px-5">
            {lang === "id" ? "Hubungi Kami" : "Contact Us"}
          </Link>
        </div>
      </div>
    </div>
  );
}
