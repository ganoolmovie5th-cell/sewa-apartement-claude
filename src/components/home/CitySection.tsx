"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CITIES } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

// ──────────────────────────────────────────────────────────────────
// Foto landmark khas JABODETABEK — semua dari Unsplash (free license)
// ──────────────────────────────────────────────────────────────────
const cityImages: Record<string, string> = {
  // Jakarta: Gedung pencakar langit Sudirman/SCBD — skyline ikonik Jakarta
  jakarta: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
  // Bogor: Hutan tropis hijau lebat — ciri khas "Kota Hujan" Bogor
  bogor: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80",
  // Depok: Kampus / gedung universitas modern — identik dengan UI & kampus
  depok: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80",
  // Tangerang: Bandara / terminal modern — ikon Soekarno-Hatta & BSD
  tangerang: "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?w=600&q=80",
  // Bekasi: Kota industri & perumahan modern — kawasan Summarecon Bekasi
  bekasi: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
};

export default function CitySection() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding bg-dark-800/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="h-1 w-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">
              {lang === "id" ? "Area Layanan" : "Coverage Area"}
            </span>
            <div className="h-1 w-8 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-white text-responsive-md"
          >
            {lang === "id" ? "Tersedia di " : "Available in "}
            <span className="gradient-text">JABODETABEK</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 mt-2 max-w-xl mx-auto"
          >
            {lang === "id"
              ? "Ribuan pilihan apartemen tersebar di 5 kota utama di kawasan Jabodetabek."
              : "Thousands of apartment choices spread across 5 major cities in the Jabodetabek region."}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CITIES.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href={`/listings?city=${city.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group">
                  {/* Image */}
                  <Image
                    src={cityImages[city.id]}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-3xl mb-1">{city.icon}</div>
                    <h3 className="font-heading font-bold text-white text-lg">{city.name}</h3>
                    <p className="text-white/60 text-xs">
                      {city.count.toLocaleString()} {lang === "id" ? "listing" : "listings"}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-primary-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {lang === "id" ? "Cari di sini" : "Search here"}
                      <ArrowRight size={12} />
                    </div>
                  </div>

                  {/* Top Badge */}
                  {city.id === "jakarta" && (
                    <div className="absolute top-3 right-3 badge bg-accent-500/90 text-white text-[10px]">
                      🔥 Hot
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
