"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Building2, Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function CTASection() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 via-dark-900 to-accent-900/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-500/10 rounded-full blur-[100px]" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container-custom relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tenant CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-primary-600/20 to-primary-900/30 border border-primary-500/30 overflow-hidden group hover:border-primary-400/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-600/10 rounded-full blur-xl" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-primary-600/30 border border-primary-500/40 flex items-center justify-center mb-6">
                <Search className="text-primary-400" size={28} />
              </div>

              <h3 className="font-heading font-black text-white text-2xl md:text-3xl mb-3">
                {lang === "id" ? "Cari Apartemen?" : "Looking for an Apartment?"}
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                {lang === "id"
                  ? "Temukan ribuan pilihan apartemen di JABODETABEK. Filter sesuai budget dan kebutuhan Anda."
                  : "Find thousands of apartment options in JABODETABEK. Filter by budget and your needs."}
              </p>

              <Link
                href="/listings"
                className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 hover:shadow-glow-blue hover:-translate-y-0.5 group"
              >
                {lang === "id" ? "Mulai Cari Sekarang" : "Start Searching Now"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Owner CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative p-8 md:p-10 rounded-3xl bg-gradient-to-br from-accent-600/20 to-accent-900/30 border border-accent-500/30 overflow-hidden group hover:border-accent-400/50 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-accent-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-600/10 rounded-full blur-xl" />

            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-accent-600/30 border border-accent-500/40 flex items-center justify-center mb-6">
                <Building2 className="text-accent-400" size={28} />
              </div>

              <h3 className="font-heading font-black text-white text-2xl md:text-3xl mb-3">
                {lang === "id" ? "Punya Apartemen?" : "Own an Apartment?"}
              </h3>
              <p className="text-white/60 mb-6 leading-relaxed">
                {lang === "id"
                  ? "Pasang iklan gratis dan jangkau ribuan pencari sewa di JABODETABEK. Proses mudah dan cepat."
                  : "Post free ads and reach thousands of renters in JABODETABEK. Easy and fast process."}
              </p>

              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 hover:shadow-glow-gold hover:-translate-y-0.5 group"
              >
                {lang === "id" ? "Pasang Iklan Gratis" : "Post Free Ad"}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
