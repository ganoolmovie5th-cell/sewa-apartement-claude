"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Plus } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: { id: "Beranda", en: "Home" } },
  { href: "/listings", label: { id: "Cari Apartemen", en: "Find Apartment" } },
  { href: "/how-it-works", label: { id: "Cara Kerja", en: "How It Works" } },
  { href: "/blog", label: { id: "Blog", en: "Blog" } },
  { href: "/about", label: { id: "Tentang", en: "About" } },
  { href: "/contact", label: { id: "Kontak", en: "Contact" } },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { lang, toggle, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-dark-900/95 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">SA</span>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="font-heading font-extrabold text-white text-lg leading-none">
                Sewa<span className="gradient-text-gold">Apartement</span>
              </div>
              <div className="text-white/40 text-[10px] leading-none">JABODETABEK</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  pathname === link.href
                    ? "text-white bg-white/10"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                {t(link.label)}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={toggle}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-medium transition-all duration-200"
            >
              <Globe size={14} />
              <span>{lang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}</span>
            </button>

            <Link
              href="/auth/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white/80 hover:text-white border border-white/10 hover:border-white/30 transition-all duration-200"
            >
              {lang === "id" ? "Masuk" : "Login"}
            </Link>

            <Link
              href="/auth/register"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-sm font-semibold shadow-glow-blue hover:shadow-glow-blue transition-all duration-300 hover:-translate-y-0.5"
            >
              <Plus size={15} />
              {lang === "id" ? "Pasang Iklan" : "List Property"}
            </Link>
          </div>

          {/* Mobile: Lang + Burger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/70 hover:text-white text-xs font-medium"
            >
              {lang === "id" ? "🇮🇩" : "🇬🇧"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-dark-900/98 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      pathname === link.href
                        ? "bg-primary-600/20 text-primary-400 border border-primary-500/30"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {t(link.label)}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-2 border-t border-white/5 space-y-2">
                <Link href="/auth/login" className="flex items-center justify-center px-4 py-3 rounded-xl text-sm font-semibold text-white border border-white/10 hover:bg-white/5 transition-all">
                  {lang === "id" ? "Masuk" : "Login"}
                </Link>
                <Link href="/auth/register" className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold">
                  <Plus size={15} />
                  {lang === "id" ? "Pasang Iklan Gratis" : "List Property Free"}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
