"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

// Social icons as inline SVG (lucide-react removed Facebook/Twitter/Instagram/Youtube)
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const IconTwitterX = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const IconYoutube = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);
const IconFacebook = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
import { useLanguage } from "@/hooks/useLanguage";

const footerLinks = {
  company: {
    title: { id: "Perusahaan", en: "Company" },
    links: [
      { href: "/about", label: { id: "Tentang Kami", en: "About Us" } },
      { href: "/blog", label: { id: "Blog & Artikel", en: "Blog & Articles" } },
      { href: "/how-it-works", label: { id: "Cara Kerja", en: "How It Works" } },
      { href: "/contact", label: { id: "Kontak Kami", en: "Contact Us" } },
    ],
  },
  explore: {
    title: { id: "Jelajahi", en: "Explore" },
    links: [
      { href: "/listings?city=jakarta", label: { id: "Apartemen Jakarta", en: "Jakarta Apartments" } },
      { href: "/listings?city=tangerang", label: { id: "Apartemen Tangerang", en: "Tangerang Apartments" } },
      { href: "/listings?city=bekasi", label: { id: "Apartemen Bekasi", en: "Bekasi Apartments" } },
      { href: "/listings?city=depok", label: { id: "Apartemen Depok", en: "Depok Apartments" } },
      { href: "/listings?city=bogor", label: { id: "Apartemen Bogor", en: "Bogor Apartments" } },
    ],
  },
  owners: {
    title: { id: "Untuk Pemilik", en: "For Owners" },
    links: [
      { href: "/how-it-works", label: { id: "Cara Pasang Iklan", en: "How to List" } },
      { href: "/auth/register", label: { id: "Daftar Gratis", en: "Register Free" } },
      { href: "/dashboard", label: { id: "Dashboard Pemilik", en: "Owner Dashboard" } },
      { href: "/contact", label: { id: "Bantuan", en: "Support" } },
    ],
  },
  legal: {
    title: { id: "Legal", en: "Legal" },
    links: [
      { href: "/privacy", label: { id: "Kebijakan Privasi", en: "Privacy Policy" } },
      { href: "/terms", label: { id: "Syarat & Ketentuan", en: "Terms & Conditions" } },
      { href: "/cookies", label: { id: "Kebijakan Cookie", en: "Cookie Policy" } },
    ],
  },
};

const socials = [
  { icon: IconInstagram, href: "#", label: "Instagram" },
  { icon: IconTwitterX,  href: "#", label: "Twitter/X" },
  { icon: IconYoutube,   href: "#", label: "YouTube" },
  { icon: IconFacebook,  href: "#", label: "Facebook" },
];

export default function Footer() {
  const { t, lang } = useLanguage();

  return (
    <footer className="bg-dark-900 border-t border-white/5">
      {/* Newsletter Section */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-heading font-bold text-xl mb-1">
                {lang === "id" ? "Dapatkan Update Terbaru" : "Get Latest Updates"}
              </h3>
              <p className="text-white/50 text-sm">
                {lang === "id"
                  ? "Listing terbaru, tips properti, dan penawaran eksklusif langsung ke email Anda."
                  : "Latest listings, property tips, and exclusive deals straight to your email."}
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder={lang === "id" ? "Masukkan email Anda..." : "Enter your email..."}
                className="flex-1 md:w-72 bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary-500 transition-all"
              />
              <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap">
                {lang === "id" ? "Subscribe" : "Subscribe"}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl rotate-6" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-sm">SA</span>
                </div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-white text-xl leading-none">
                  Sewa<span className="gradient-text-gold">Apartement</span>
                </div>
                <div className="text-white/40 text-xs">JABODETABEK</div>
              </div>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              {lang === "id"
                ? "Platform marketplace sewa apartemen terlengkap di JABODETABEK. Ribuan pilihan untuk mahasiswa, pekerja kantoran, dan keluarga."
                : "The most complete apartment rental marketplace platform in JABODETABEK. Thousands of options for students, office workers, and families."}
            </p>

            {/* Contact */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-white/50 text-sm">
                <MapPin size={14} className="text-primary-400 flex-shrink-0" />
                <span>Binong Permai Blok R-10/14, Tangerang</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/50 text-sm">
                <Phone size={14} className="text-primary-400 flex-shrink-0" />
                <span>+62 811 8696 940</span>
              </div>
              <div className="flex items-center gap-2.5 text-white/50 text-sm">
                <Mail size={14} className="text-primary-400 flex-shrink-0" />
                <span>sewa-apartement-jabodetabek@gmail.com</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-2 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-600/30 border border-white/10 hover:border-primary-500/50 flex items-center justify-center text-white/50 hover:text-white transition-all duration-200"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="text-white font-semibold text-sm mb-4">{t(section.title)}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/50 hover:text-white text-sm transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {t(link.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-white/30 text-xs">
            <p>
              © 2024 SewaApartement. {lang === "id" ? "Hak Cipta Dilindungi." : "All Rights Reserved."}
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {lang === "id" ? "Semua sistem berjalan normal" : "All systems operational"}
              </span>
              <span>🇮🇩 {lang === "id" ? "Dibuat dengan ❤️ di Indonesia" : "Made with ❤️ in Indonesia"}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
