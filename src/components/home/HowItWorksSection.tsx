"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HOW_IT_WORKS_TENANT, HOW_IT_WORKS_OWNER } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HowItWorksSection() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"tenant" | "owner">("tenant");

  const steps = activeTab === "tenant" ? HOW_IT_WORKS_TENANT : HOW_IT_WORKS_OWNER;

  return (
    <section className="section-padding bg-dark-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-[100px]" />

      <div className="container-custom relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="h-1 w-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">
              {lang === "id" ? "Mudah & Cepat" : "Easy & Fast"}
            </span>
            <div className="h-1 w-8 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-white text-responsive-md mb-4"
          >
            {lang === "id" ? "Cara Kerja " : "How "}
            <span className="gradient-text">SewaApartement</span>
            {lang === "en" ? " Works" : ""}
          </motion.h2>

          {/* Tab Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center p-1 bg-dark-800 border border-white/10 rounded-2xl mt-4"
          >
            {(["tenant", "owner"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary-600 text-white shadow-glow-blue"
                    : "text-white/50 hover:text-white"
                }`}
              >
                {tab === "tenant"
                  ? lang === "id" ? "🏠 Pencari Sewa" : "🏠 Tenant"
                  : lang === "id" ? "🏢 Pemilik Properti" : "🏢 Property Owner"}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="glass p-6 rounded-2xl hover:border-primary-500/30 transition-all duration-300 group h-full">
                {/* Step Number */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center font-black text-white text-sm shadow-glow-blue">
                    {step.step}
                  </div>
                  <div className="text-3xl">{step.icon}</div>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                  {t(step.title)}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed">
                  {t(step.desc)}
                </p>

                {/* Arrow (not last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 rounded-full bg-dark-800 border border-primary-500/30 flex items-center justify-center">
                      <ArrowRight size={12} className="text-primary-400" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          {activeTab === "tenant" ? (
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2">
              {lang === "id" ? "Mulai Cari Apartemen" : "Start Finding Apartment"}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link href="/auth/register" className="btn-accent inline-flex items-center gap-2">
              {lang === "id" ? "Daftar Jadi Pemilik" : "Register as Owner"}
              <ArrowRight size={16} />
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
