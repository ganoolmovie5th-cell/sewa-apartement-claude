"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Heart, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLanguage();
  const post = BLOG_POSTS.find(p => p.slug === params.slug) || BLOG_POSTS[0];
  const related = BLOG_POSTS.filter(p => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="page-dark pt-16 md:pt-20">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <Image src={post.image} alt={t(post.title)} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          {lang === "id" ? "Kembali ke Blog" : "Back to Blog"}
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="badge bg-primary-600/20 text-primary-400 border border-primary-500/30 text-xs">
            <Tag size={10} /> {t(post.category)}
          </span>
          <div className="flex items-center gap-1 text-white/40 text-xs">
            <Calendar size={11} />
            {new Date(post.date).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", { year: "numeric", month: "long", day: "numeric" })}
          </div>
          <div className="flex items-center gap-1 text-white/40 text-xs">
            <Clock size={11} /> {post.readTime} min {lang === "id" ? "baca" : "read"}
          </div>
        </div>

        {/* Title */}
        <h1 className="font-heading font-black text-white text-2xl md:text-3xl leading-tight mb-4">
          {t(post.title)}
        </h1>

        <p className="text-white/60 text-sm mb-2">
          {lang === "id" ? "Oleh" : "By"} <span className="text-white/80 font-medium">{post.author}</span>
        </p>

        <div className="section-divider my-8" />

        {/* Content Placeholder */}
        <div className="prose prose-invert max-w-none space-y-5 text-white/70 leading-relaxed text-[15px]">
          <p>{t(post.excerpt)}</p>
          <p>{lang === "id"
            ? "Mencari apartemen yang tepat di Jakarta dan sekitarnya bisa terasa overwhelming, terutama bagi pendatang baru. Dengan ribuan pilihan yang tersebar di JABODETABEK, penting untuk memiliki strategi yang jelas sebelum mulai mencari."
            : "Finding the right apartment in Jakarta and surrounding areas can feel overwhelming, especially for newcomers. With thousands of options spread across JABODETABEK, it's important to have a clear strategy before you start searching."
          }</p>
          <h2 className="font-heading font-bold text-white text-xl mt-8">
            {lang === "id" ? "1. Tentukan Budget dengan Jelas" : "1. Set a Clear Budget"}
          </h2>
          <p>{lang === "id"
            ? "Sebelum mulai mencari, tentukan range harga yang nyaman untuk Anda. Sebagai patokan, alokasikan tidak lebih dari 30% dari penghasilan bulanan Anda untuk biaya sewa. Jangan lupa perhitungkan biaya-biaya tambahan seperti listrik, air, internet, dan parkir."
            : "Before starting your search, determine a comfortable price range for you. As a benchmark, allocate no more than 30% of your monthly income to rental costs. Don't forget to factor in additional costs like electricity, water, internet, and parking."
          }</p>
          <h2 className="font-heading font-bold text-white text-xl mt-8">
            {lang === "id" ? "2. Pilih Lokasi Strategis" : "2. Choose a Strategic Location"}
          </h2>
          <p>{lang === "id"
            ? "Pertimbangkan jarak ke tempat kerja atau kampus, akses transportasi publik (MRT, KRL, TransJakarta), dan fasilitas sekitar seperti minimarket, restoran, dan rumah sakit. Apartemen dekat MRT biasanya lebih mahal tapi menghemat waktu dan biaya transportasi."
            : "Consider the distance to work or campus, access to public transportation (MRT, KRL, TransJakarta), and surrounding facilities like minimarkets, restaurants, and hospitals. Apartments near MRT stations are usually more expensive but save time and transportation costs."
          }</p>
          <blockquote className="border-l-4 border-primary-500 pl-5 py-1 bg-primary-500/5 rounded-r-xl my-8">
            <p className="text-white/80 italic">{lang === "id"
              ? '"Platform seperti SewaTerlengkap memudahkan saya menemukan apartemen yang tepat tanpa harus datang langsung ke lokasi."'
              : '"Platforms like SewaTerlengkap made it easy for me to find the right apartment without having to visit in person."'
            }</p>
            <footer className="text-white/40 text-sm mt-2">— Andi W., Software Engineer</footer>
          </blockquote>
          <p>{lang === "id"
            ? "Dengan menggunakan platform SewaTerlengkap, Anda bisa memfilter ribuan listing berdasarkan lokasi, harga, tipe unit, dan fasilitas yang diinginkan. Fitur WhatsApp langsung ke pemilik memudahkan proses negosiasi tanpa perantara."
            : "By using the SewaTerlengkap platform, you can filter thousands of listings based on location, price, unit type, and desired amenities. The direct WhatsApp feature to owners simplifies the negotiation process without intermediaries."
          }</p>
        </div>

        <div className="section-divider my-10" />

        {/* Share */}
        <div className="flex items-center justify-between">
          <p className="text-white/40 text-sm">{lang === "id" ? "Bagikan artikel ini:" : "Share this article:"}</p>
          <div className="flex gap-2">
            {[{ label: "WhatsApp", icon: "💬", color: "hover:bg-green-600/20 hover:border-green-500/30" },
              { label: "Twitter", icon: "🐦", color: "hover:bg-sky-600/20 hover:border-sky-500/30" },
              { label: "Copy Link", icon: "🔗", color: "hover:bg-white/10" }].map(s => (
              <button key={s.label} className={`px-3 py-2 rounded-xl bg-white/5 border border-white/10 ${s.color} text-white/60 hover:text-white text-xs flex items-center gap-1.5 transition-all`}>
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading font-bold text-white text-xl mb-6">{lang === "id" ? "Artikel Terkait" : "Related Articles"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r, i) => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link href={`/blog/${r.slug}`} className="group flex gap-4 glass rounded-xl p-4 hover:border-primary-500/20 transition-all">
                    <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={r.image} alt={t(r.title)} fill className="object-cover group-hover:scale-110 transition-transform duration-300" sizes="80px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary-300 transition-colors">{t(r.title)}</h3>
                      <div className="flex items-center gap-1 text-white/30 text-xs mt-1.5">
                        <Clock size={10} /> {r.readTime} min
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
