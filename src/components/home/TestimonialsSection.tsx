"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

export default function TestimonialsSection() {
  const { lang, t } = useLanguage();

  return (
    <section className="section-padding bg-dark-800/40 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px]" />

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
              {lang === "id" ? "Dipercaya Ribuan Pengguna" : "Trusted by Thousands"}
            </span>
            <div className="h-1 w-8 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-white text-responsive-md"
          >
            {lang === "id" ? "Apa Kata " : "What "}
            <span className="gradient-text">{lang === "id" ? "Pengguna Kami" : "Our Users Say"}</span>
            {lang === "en" ? "" : "?"}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass p-6 rounded-2xl hover:border-primary-500/20 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="text-primary-500/30 mb-4" size={36} />

              {/* Stars */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} className="text-accent-400 fill-accent-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                &ldquo;{t(testimonial.text)}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-white/40 text-xs">{t(testimonial.role)}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 glass rounded-2xl">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={20} className="text-accent-400 fill-accent-400" />
              ))}
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-xl">4.9/5.0</div>
              <div className="text-white/40 text-xs">
                {lang === "id" ? "Rating rata-rata dari 12.500+ ulasan" : "Average rating from 12,500+ reviews"}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
