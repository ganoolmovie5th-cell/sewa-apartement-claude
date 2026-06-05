"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const SECTIONS_ID = [
  { title: "1. Informasi yang Kami Kumpulkan", body: "Kami mengumpulkan informasi yang Anda berikan saat mendaftar: nama, alamat email, nomor telepon/WhatsApp, dan informasi properti. Kami juga mengumpulkan data penggunaan seperti halaman yang dikunjungi dan pencarian yang dilakukan." },
  { title: "2. Penggunaan Informasi", body: "Informasi Anda digunakan untuk: menjalankan dan meningkatkan layanan platform, menghubungkan pemilik properti dengan pencari sewa, mengirim notifikasi terkait layanan, dan memastikan keamanan platform. Kami tidak menjual data Anda kepada pihak ketiga." },
  { title: "3. Berbagi Informasi", body: "Nomor WhatsApp pemilik properti ditampilkan kepada pencari sewa sebagai bagian dari layanan kontak langsung. Selain itu, kami tidak membagikan informasi pribadi Anda tanpa persetujuan, kecuali diwajibkan oleh hukum." },
  { title: "4. Keamanan Data", body: "Kami menerapkan langkah-langkah keamanan teknis untuk melindungi data Anda dari akses tidak sah. Namun, tidak ada sistem yang 100% aman. Anda bertanggung jawab menjaga kerahasiaan kata sandi akun Anda." },
  { title: "5. Cookie & Teknologi Pelacak", body: "Kami menggunakan cookie untuk menyimpan preferensi bahasa dan sesi login. Cookie ini diperlukan untuk fungsi dasar platform. Anda dapat menonaktifkan cookie melalui pengaturan browser, namun beberapa fitur mungkin tidak berfungsi." },
  { title: "6. Hak Anda", body: "Anda berhak mengakses, memperbaiki, atau menghapus data pribadi Anda. Untuk menggunakan hak ini, hubungi kami melalui email atau form kontak. Kami akan merespons dalam 30 hari kerja." },
  { title: "7. Retensi Data", body: "Data akun disimpan selama akun aktif. Setelah penutupan akun, data dihapus dalam 30 hari, kecuali data yang diperlukan untuk kepatuhan hukum atau penyelesaian sengketa." },
  { title: "8. Kontak Privacy", body: "Untuk pertanyaan tentang kebijakan privasi ini, hubungi kami di sewa-apartement-jabodetabek@gmail.com atau melalui halaman Kontak kami." },
];

const SECTIONS_EN = [
  { title: "1. Information We Collect", body: "We collect information you provide when registering: name, email, phone/WhatsApp number, and property information. We also collect usage data such as pages visited and searches performed." },
  { title: "2. Use of Information", body: "Your information is used to: operate and improve the platform, connect property owners with renters, send service notifications, and ensure platform security. We do not sell your data to third parties." },
  { title: "3. Information Sharing", body: "Property owner WhatsApp numbers are displayed to renters as part of the direct contact service. Otherwise, we do not share your personal information without consent, except as required by law." },
  { title: "4. Data Security", body: "We implement technical security measures to protect your data from unauthorized access. However, no system is 100% secure. You are responsible for maintaining the confidentiality of your account password." },
  { title: "5. Cookies & Tracking", body: "We use cookies to store language preferences and login sessions. These cookies are necessary for basic platform functionality. You can disable cookies through browser settings, but some features may not work." },
  { title: "6. Your Rights", body: "You have the right to access, correct, or delete your personal data. To exercise these rights, contact us via email or contact form. We will respond within 30 business days." },
  { title: "7. Data Retention", body: "Account data is stored while the account is active. After account closure, data is deleted within 30 days, except data required for legal compliance or dispute resolution." },
  { title: "8. Privacy Contact", body: "For questions about this privacy policy, contact us at sewa-apartement-jabodetabek@gmail.com or through our Contact page." },
];

export default function PrivacyPage() {
  const { lang } = useLanguage();
  const sections = lang === "id" ? SECTIONS_ID : SECTIONS_EN;
  return (
    <div className="page-dark pt-16 md:pt-20">
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-green-600/20 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
            <Shield className="text-green-400" size={26} />
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading font-black text-white mb-3" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
            {lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}
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
        <div className="mt-10 p-5 glass rounded-2xl border border-green-500/20 text-center">
          <p className="text-white/50 text-sm mb-3">
            {lang === "id" ? "Ada pertanyaan tentang privasi Anda?" : "Questions about your privacy?"}
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 text-sm py-2.5 px-5">
            {lang === "id" ? "Hubungi Kami" : "Contact Us"}
          </Link>
        </div>
      </div>
    </div>
  );
}
