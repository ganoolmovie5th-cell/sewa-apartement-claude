"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function NotFound() {
  const { lang } = useLanguage();
  return (
    <div className="page-dark min-h-screen flex items-center justify-center px-4">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center max-w-lg"
      >
        <div className="font-heading font-black text-primary-500/20 text-[10rem] leading-none mb-4">404</div>
        <h1 className="font-heading font-black text-white text-3xl mb-3">
          {lang === "id" ? "Halaman Tidak Ditemukan" : "Page Not Found"}
        </h1>
        <p className="text-white/50 mb-8">
          {lang === "id"
            ? "Maaf, halaman yang Anda cari tidak ada atau sudah dipindahkan."
            : "Sorry, the page you are looking for doesn't exist or has been moved."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <Home size={16} /> {lang === "id" ? "Ke Beranda" : "Go Home"}
          </Link>
          <Link href="/listings" className="btn-secondary inline-flex items-center gap-2">
            <Search size={16} /> {lang === "id" ? "Cari Apartemen" : "Find Apartment"}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
