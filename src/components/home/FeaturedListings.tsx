"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import PropertyCard from "@/components/ui/PropertyCard";
import { SAMPLE_LISTINGS } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

export default function FeaturedListings() {
  const { lang } = useLanguage();
  const featured = SAMPLE_LISTINGS.filter((l) => l.featured).slice(0, 6);

  return (
    <section className="section-padding bg-dark-900">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-3"
            >
              <div className="h-1 w-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
              <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">
                {lang === "id" ? "Pilihan Terbaik" : "Top Picks"}
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-black text-white text-responsive-md"
            >
              {lang === "id" ? "Apartemen " : ""}
              <span className="gradient-text">{lang === "id" ? "Unggulan" : "Featured"}</span>
              {lang === "en" ? " Apartments" : ""}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/50 mt-2"
            >
              {lang === "id"
                ? "Pilihan terpopuler dari seluruh JABODETABEK yang sudah terverifikasi."
                : "Most popular verified picks from across JABODETABEK."}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/listings"
              className="flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold group transition-colors"
            >
              {lang === "id" ? "Lihat Semua" : "View All"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featured.map((listing, i) => (
            <PropertyCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/listings"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-glow-blue hover:shadow-glow-blue hover:-translate-y-1 transition-all duration-300"
          >
            <Sparkles size={18} />
            {lang === "id" ? "Jelajahi Semua Listing" : "Explore All Listings"}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
