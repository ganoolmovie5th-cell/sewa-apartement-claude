"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Building2, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

// ponytail: login replaced with coming-soon banner — auth.ts removed (plaintext passwords)
export default function LoginPage() {
  const { lang } = useLanguage();

  return (
    <div className="page-dark min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
        </Link>

        <div className="glass rounded-3xl p-8 border border-white/10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="SewaApartement" width={40} height={40} className="w-10 h-10 flex-shrink-0" />
            <div className="text-left">
              <div className="font-heading font-extrabold text-white text-lg leading-none">
                Sewa<span className="gradient-text-gold">Apartement</span>
              </div>
              <div className="text-white/60 text-xs">JABODETABEK</div>
            </div>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center mx-auto mb-5">
            <Building2 size={28} className="text-primary-400" />
          </div>

          <h1 className="font-heading font-bold text-white text-2xl mb-2">
            {lang === "id" ? "Fitur Segera Hadir" : "Coming Soon"}
          </h1>
          <p className="text-white/50 text-sm mb-6 leading-relaxed">
            {lang === "id"
              ? "Sistem login pemilik sedang dalam pengembangan. Hubungi kami untuk memasang listing."
              : "Owner login is under development. Contact us to list your property."}
          </p>

          <div className="flex items-center justify-center gap-2 text-white/30 text-xs mb-6">
            <Clock size={13} />
            {lang === "id" ? "Estimasi: Q3 2025" : "ETA: Q3 2025"}
          </div>

          <a
            href="https://wa.me/628118696940?text=Halo%20SewaApartement%2C%20saya%20ingin%20memasang%20listing%20apartemen."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 text-green-400 font-semibold text-sm transition-all"
          >
            💬 {lang === "id" ? "Hubungi via WhatsApp" : "Contact via WhatsApp"}
          </a>
        </div>
      </motion.div>
    </div>
  );
}
