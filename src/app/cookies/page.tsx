"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Cookie } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function CookiesPage() {
  const { lang } = useLanguage();
  const sections = lang === "id" ? [
    { title: "Apa itu Cookie?", body: "Cookie adalah file teks kecil yang disimpan di perangkat Anda saat mengunjungi website. Cookie membantu website mengingat preferensi Anda dan meningkatkan pengalaman pengguna." },
    { title: "Cookie yang Kami Gunakan", body: "Kami menggunakan tiga jenis cookie: (1) Cookie Esensial — diperlukan untuk fungsi dasar seperti sesi login dan preferensi bahasa. (2) Cookie Analitik — membantu kami memahami cara pengguna berinteraksi dengan platform. (3) Cookie Preferensi — menyimpan pilihan seperti bahasa dan filter pencarian." },
    { title: "Cookie Pihak Ketiga", body: "Platform kami menggunakan layanan dari pihak ketiga yang mungkin memasang cookie mereka sendiri, termasuk layanan analitik untuk memahami trafik website. Cookie ini diatur oleh kebijakan privasi masing-masing penyedia layanan." },
    { title: "Mengelola Cookie", body: "Anda dapat mengelola atau menonaktifkan cookie melalui pengaturan browser Anda. Namun, menonaktifkan cookie esensial dapat mempengaruhi fungsionalitas platform, seperti kemampuan login dan preferensi bahasa yang tidak tersimpan." },
    { title: "Perubahan Kebijakan", body: "Kami dapat memperbarui kebijakan cookie ini sewaktu-waktu. Perubahan akan dipublikasikan di halaman ini. Penggunaan platform setelah perubahan berarti Anda menerima kebijakan yang diperbarui." },
  ] : [
    { title: "What are Cookies?", body: "Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve user experience." },
    { title: "Cookies We Use", body: "We use three types of cookies: (1) Essential Cookies — required for basic functions like login sessions and language preferences. (2) Analytics Cookies — help us understand how users interact with the platform. (3) Preference Cookies — store choices like language and search filters." },
    { title: "Third-Party Cookies", body: "Our platform uses third-party services that may set their own cookies, including analytics services to understand website traffic. These cookies are governed by each service provider's privacy policy." },
    { title: "Managing Cookies", body: "You can manage or disable cookies through your browser settings. However, disabling essential cookies may affect platform functionality, such as login ability and language preferences not being saved." },
    { title: "Policy Changes", body: "We may update this cookie policy at any time. Changes will be published on this page. Continued use of the platform after changes means you accept the updated policy." },
  ];

  return (
    <div className="page-dark pt-16 md:pt-20">
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-accent-600/20 border border-accent-500/30 flex items-center justify-center mx-auto mb-5">
            <Cookie className="text-accent-400" size={26} />
          </div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="font-heading font-black text-white mb-3" style={{ fontSize: "clamp(2rem,4vw,3.5rem)" }}>
            {lang === "id" ? "Kebijakan Cookie" : "Cookie Policy"}
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
      </div>
    </div>
  );
}
