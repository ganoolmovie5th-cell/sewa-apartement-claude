"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Tag, Search } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";

const categories = [
  { id: "all", label: { id: "Semua", en: "All" } },
  { id: "panduan", label: { id: "Panduan", en: "Guide" } },
  { id: "analisis", label: { id: "Analisis Pasar", en: "Market Analysis" } },
  { id: "rekomendasi", label: { id: "Rekomendasi", en: "Recommendation" } },
  { id: "tips", label: { id: "Tips & Trik", en: "Tips & Tricks" } },
];

const extendedPosts = [
  ...BLOG_POSTS,
  {
    id: 4,
    slug: "cara-negosiasi-harga-sewa-apartemen",
    title: { id: "5 Cara Jitu Negosiasi Harga Sewa Apartemen", en: "5 Smart Ways to Negotiate Apartment Rent" },
    excerpt: { id: "Tips negosiasi harga sewa yang efektif agar mendapatkan penawaran terbaik dari pemilik apartemen.", en: "Effective rent negotiation tips to get the best deal from apartment owners." },
    category: { id: "Tips & Trik", en: "Tips & Tricks" },
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    author: "Tim Redaksi",
    date: "2024-01-25",
    readTime: 6,
  },
  {
    id: 5,
    slug: "apartemen-ramah-ekspatriat-jakarta",
    title: { id: "10 Apartemen Ramah Ekspatriat di Jakarta 2024", en: "10 Expat-Friendly Apartments in Jakarta 2024" },
    excerpt: { id: "Rekomendasi apartemen terbaik untuk ekspatriat di Jakarta dengan fasilitas internasional.", en: "Best apartment recommendations for expats in Jakarta with international facilities." },
    category: { id: "Rekomendasi", en: "Recommendation" },
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    author: "Sarah Chen",
    date: "2024-01-18",
    readTime: 8,
  },
  {
    id: 6,
    slug: "tren-pasar-properti-jabodetabek-2024",
    title: { id: "Tren Pasar Properti JABODETABEK 2024: Apa yang Perlu Anda Ketahui", en: "JABODETABEK Property Market Trends 2024" },
    excerpt: { id: "Analisis mendalam tren pasar properti di kawasan JABODETABEK dan prediksi untuk tahun 2024.", en: "In-depth analysis of property market trends in the JABODETABEK region and predictions for 2024." },
    category: { id: "Analisis Pasar", en: "Market Analysis" },
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    author: "Analis Properti",
    date: "2024-01-10",
    readTime: 12,
  },
];

export default function BlogPage() {
  const { lang, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = extendedPosts.filter((post) => {
    const matchCat = activeCategory === "all" || t(post.category).toLowerCase().includes(activeCategory);
    const matchSearch = !searchQuery ||
      t(post.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(post.excerpt).toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = extendedPosts[0];
  const rest = filtered.slice(1);

  return (
    <div className="page-dark pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary-500/10 rounded-full blur-[80px]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading font-black text-white mb-3" style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
            {lang === "id" ? "Blog & " : "Blog & "}
            <span className="gradient-text">{lang === "id" ? "Artikel" : "Articles"}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 mb-8">
            {lang === "id" ? "Tips, panduan, dan insight terbaru seputar dunia properti JABODETABEK." : "Tips, guides, and latest insights about JABODETABEK property world."}
          </motion.p>
          {/* Search */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === "id" ? "Cari artikel..." : "Search articles..."}
              className="input-field pl-10"
            />
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-primary-600 border-primary-500 text-white shadow-glow-blue"
                  : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        {activeCategory === "all" && !searchQuery && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Link href={`/blog/${featured.slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 glass rounded-3xl overflow-hidden hover:border-primary-500/30 transition-all duration-300">
                <div className="relative aspect-[16/9] lg:aspect-auto lg:h-80">
                  <Image src={featured.image} alt={t(featured.title)} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-900/60 to-transparent lg:bg-none" />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="badge bg-accent-500/20 text-accent-400 border border-accent-500/30 text-xs">
                      ⭐ {lang === "id" ? "Artikel Unggulan" : "Featured Article"}
                    </span>
                    <span className="text-white/40 text-xs">{t(featured.category)}</span>
                  </div>
                  <h2 className="font-heading font-bold text-white text-xl md:text-2xl mb-3 group-hover:text-primary-300 transition-colors leading-snug">
                    {t(featured.title)}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">{t(featured.excerpt)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white/40 text-xs">
                      <span>{featured.author}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1"><Calendar size={11} />{new Date(featured.date).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", { year: "numeric", month: "short", day: "numeric" })}</div>
                      <div className="flex items-center gap-1"><Clock size={11} />{featured.readTime} min</div>
                    </div>
                    <span className="flex items-center gap-1.5 text-primary-400 text-sm font-semibold group-hover:gap-2 transition-all">
                      {lang === "id" ? "Baca" : "Read"} <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(activeCategory === "all" && !searchQuery ? rest : filtered).map((post, i) => (
            <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="glass rounded-2xl overflow-hidden hover:border-primary-500/20 transition-all duration-300 h-full flex flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={post.image} alt={t(post.title)} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute top-3 left-3">
                      <span className="badge bg-dark-900/80 backdrop-blur-sm text-white/70 border-white/10 text-xs">
                        <Tag size={9} /> {t(post.category)}
                      </span>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-heading font-bold text-white text-sm md:text-base leading-snug mb-2 group-hover:text-primary-300 transition-colors line-clamp-2 flex-1">
                      {t(post.title)}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">{t(post.excerpt)}</p>
                    <div className="flex items-center justify-between text-white/30 text-xs mt-auto">
                      <div className="flex items-center gap-2">
                        <span>{post.author}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1"><Clock size={10} />{post.readTime} min</div>
                      </div>
                      <div className="flex items-center gap-1 text-primary-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {lang === "id" ? "Baca" : "Read"} <ArrowRight size={11} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="text-white font-bold text-xl mb-2">{lang === "id" ? "Tidak ada artikel" : "No articles found"}</h3>
            <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="btn-primary mt-4">
              {lang === "id" ? "Reset Filter" : "Reset Filter"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
