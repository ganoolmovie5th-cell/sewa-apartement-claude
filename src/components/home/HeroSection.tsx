"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Home, Users, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { CITIES } from "@/lib/data";
import { useState } from "react";
import { useRouter } from "next/navigation";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene"), {
  ssr: false,
  loading: () => null,
});

const floatVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
  }),
};

const targetBadges = [
  { icon: Users, label: { id: "Mahasiswa", en: "Students" }, color: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300" },
  { icon: Briefcase, label: { id: "Pekerja", en: "Workers" }, color: "from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-300" },
  { icon: Home, label: { id: "Keluarga", en: "Families" }, color: "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300" },
];

export default function HeroSection() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCity) params.set("city", selectedCity);
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900">
      {/* 3D Background */}
      <HeroScene />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/40 via-dark-900/20 to-dark-900/90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 via-transparent to-dark-900/80 z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-900 to-transparent z-10" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 w-full">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Badge */}
          <motion.div
            custom={0}
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-6"
          >
            <Sparkles size={14} className="text-accent-400" />
            <span>{lang === "id" ? "Platform Sewa Apartemen #1 JABODETABEK" : "#1 Apartment Rental Platform JABODETABEK"}</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            custom={1}
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="font-heading font-black leading-[1.05] mb-6"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            <span className="text-white">
              {lang === "id" ? "Temukan " : "Find Your "}
            </span>
            <span className="gradient-text">
              {lang === "id" ? "Apartemen Impian" : "Dream Apartment"}
            </span>
            <br />
            <span className="text-white">
              {lang === "id" ? "di JABODETABEK" : "in JABODETABEK"}
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            custom={2}
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl mx-auto"
          >
            {lang === "id"
              ? "2.940+ listing apartemen terpercaya untuk mahasiswa, pekerja kantoran, dan keluarga. Hubungi langsung pemilik tanpa perantara."
              : "2,940+ trusted apartment listings for students, office workers, and families. Contact owners directly without intermediaries."}
          </motion.p>

          {/* Target Badges */}
          <motion.div
            custom={3}
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="flex flex-wrap items-center justify-center gap-2 mb-10"
          >
            {targetBadges.map((badge) => (
              <div
                key={badge.label.id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${badge.color} border text-xs font-medium`}
              >
                <badge.icon size={12} />
                {t(badge.label)}
              </div>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            custom={4}
            variants={floatVariants}
            initial="initial"
            animate="animate"
          >
            <form onSubmit={handleSearch} className="relative max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl shadow-glass">
                {/* City Select */}
                <div className="flex items-center gap-2 sm:w-44 px-3 py-2 bg-white/5 rounded-xl border border-white/10">
                  <MapPin size={16} className="text-primary-400 flex-shrink-0" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent text-white/80 text-sm focus:outline-none w-full cursor-pointer"
                  >
                    <option value="" className="bg-dark-800">{lang === "id" ? "Semua Kota" : "All Cities"}</option>
                    {CITIES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-dark-800">{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Text Search */}
                <div className="flex-1 flex items-center gap-2 px-3">
                  <Search size={16} className="text-white/40 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={lang === "id" ? "Cari apartemen, lokasi, fasilitas..." : "Search apartments, location, amenities..."}
                    className="bg-transparent text-white placeholder:text-white/30 text-sm focus:outline-none w-full"
                  />
                </div>

                {/* Search Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-glow-blue whitespace-nowrap"
                >
                  <Search size={15} />
                  {lang === "id" ? "Cari Sekarang" : "Search Now"}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Quick City Links */}
          <motion.div
            custom={5}
            variants={floatVariants}
            initial="initial"
            animate="animate"
            className="flex flex-wrap items-center justify-center gap-2 mt-6"
          >
            <span className="text-white/40 text-xs">{lang === "id" ? "Populer:" : "Popular:"}</span>
            {CITIES.map((city) => (
              <Link
                key={city.id}
                href={`/listings?city=${city.id}`}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary-500/40 text-white/60 hover:text-white text-xs font-medium transition-all duration-200"
              >
                <span>{city.icon}</span>
                <span>{city.name}</span>
                <span className="text-white/30">({city.count})</span>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs">{lang === "id" ? "Gulir ke bawah" : "Scroll down"}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-primary-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
