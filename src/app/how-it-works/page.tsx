"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Users, Building2, Shield, Zap } from "lucide-react";
import { HOW_IT_WORKS_TENANT, HOW_IT_WORKS_OWNER, FAQS } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HowItWorksPage() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"tenant" | "owner">("tenant");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = activeTab === "tenant" ? HOW_IT_WORKS_TENANT : HOW_IT_WORKS_OWNER;

  const benefits = [
    { icon: <Shield size={22} />, title: { id: "100% Terverifikasi", en: "100% Verified" }, desc: { id: "Setiap listing diverifikasi oleh tim kami untuk keamanan Anda.", en: "Every listing is verified by our team for your safety." } },
    { icon: <Zap size={22} />, title: { id: "Cepat & Mudah", en: "Fast & Easy" }, desc: { id: "Temukan dan hubungi pemilik dalam hitungan menit.", en: "Find and contact owners in minutes." } },
    { icon: <Users size={22} />, title: { id: "12.500+ Pengguna", en: "12,500+ Users" }, desc: { id: "Komunitas besar pencari dan pemilik apartemen terpercaya.", en: "Large community of trusted apartment seekers and owners." } },
    { icon: <Building2 size={22} />, title: { id: "2.940+ Listing", en: "2,940+ Listings" }, desc: { id: "Pilihan terlengkap di seluruh area JABODETABEK.", en: "Most complete options across the JABODETABEK area." } },
  ];

  return (
    <div className="page-dark pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary-500/10 rounded-full blur-[100px]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
            <Zap size={14} className="text-accent-400" />
            {lang === "id" ? "Mudah, Cepat, Terpercaya" : "Easy, Fast, Trusted"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading font-black text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {lang === "id" ? "Cara Kerja " : "How "}
            <span className="gradient-text">SewaTerlengkap</span>
            {lang === "en" ? " Works" : ""}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            {lang === "id"
              ? "Platform yang menghubungkan pencari apartemen dengan pemilik properti secara langsung, tanpa perantara, tanpa biaya tersembunyi."
              : "A platform that directly connects apartment seekers with property owners, no intermediaries, no hidden fees."}
          </motion.p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((b, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-5 text-center hover:border-primary-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-400 mx-auto mb-3">{b.icon}</div>
              <h3 className="font-bold text-white text-sm mb-1">{t(b.title)}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{t(b.desc)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Tab */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center p-1 bg-dark-800 border border-white/10 rounded-2xl">
              {(["tenant", "owner"] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === tab ? "bg-primary-600 text-white shadow-glow-blue" : "text-white/50 hover:text-white"}`}>
                  {tab === "tenant" ? (lang === "id" ? "🏠 Saya Pencari Sewa" : "🏠 I'm a Tenant") : (lang === "id" ? "🏢 Saya Pemilik Properti" : "🏢 I'm an Owner")}
                </button>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-6">
            {steps.map((step, i) => (
              <motion.div key={step.step} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-6 items-start glass rounded-2xl p-6 hover:border-primary-500/20 transition-all group">
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-glow-blue">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white/30 text-xs font-mono font-bold">{lang === "id" ? "LANGKAH" : "STEP"} {step.step}</span>
                    <div className="flex-1 h-px bg-white/5" />
                    <CheckCircle2 size={16} className="text-primary-500/50 group-hover:text-primary-400 transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-white text-xl mb-2">{t(step.title)}</h3>
                  <p className="text-white/60 leading-relaxed">{t(step.desc)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
            {activeTab === "tenant" ? (
              <Link href="/listings" className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4">
                {lang === "id" ? "Mulai Cari Apartemen" : "Start Searching"} <ArrowRight size={18} />
              </Link>
            ) : (
              <Link href="/auth/register" className="btn-accent inline-flex items-center gap-2 text-base px-10 py-4">
                {lang === "id" ? "Daftar Gratis Sekarang" : "Register Free Now"} <ArrowRight size={18} />
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-dark-800/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-black text-white text-responsive-md mb-3">
              {lang === "id" ? "Pertanyaan " : "Frequently Asked "}
              <span className="gradient-text">{lang === "id" ? "Umum" : "Questions"}</span>
            </h2>
            <p className="text-white/50">{lang === "id" ? "Temukan jawaban atas pertanyaan yang sering ditanyakan." : "Find answers to commonly asked questions."}</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors">
                  <span className="font-semibold text-white text-sm">{t(faq.q)}</span>
                  <ChevronDown size={16} className={cn("text-white/40 flex-shrink-0 transition-transform duration-300", openFaq === i ? "rotate-180" : "")} />
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      key="faq-answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5">
                        <p className="text-white/60 text-sm leading-relaxed">{t(faq.a)}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
