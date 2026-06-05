"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Target, Eye, Heart, Users, Building2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { STATS } from "@/lib/data";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const team = [
  { name: "Andi Saputra", role: { id: "CEO & Co-Founder", en: "CEO & Co-Founder" }, img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80", bio: { id: "Berpengalaman 10 tahun di industri properti Indonesia.", en: "10 years experience in Indonesian property industry." } },
  { name: "Maya Sari", role: { id: "CTO & Co-Founder", en: "CTO & Co-Founder" }, img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80", bio: { id: "Mantan engineer di Gojek & Tokopedia.", en: "Former engineer at Gojek & Tokopedia." } },
  { name: "Rizal Firmansyah", role: { id: "Head of Product", en: "Head of Product" }, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80", bio: { id: "Spesialis UX/UI dengan fokus pada proptech.", en: "UX/UI specialist focused on proptech." } },
  { name: "Putri Handayani", role: { id: "Head of Operations", en: "Head of Operations" }, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80", bio: { id: "Ahli operasional marketplace dengan track record terbukti.", en: "Marketplace operations expert with proven track record." } },
];

const milestones = [
  { year: "2022", title: { id: "Berdiri", en: "Founded" }, desc: { id: "SewaTerlengkap lahir dari keresahan sulitnya mencari apartemen di Jakarta.", en: "SewaTerlengkap was born from the difficulty of finding apartments in Jakarta." } },
  { year: "2023", title: { id: "Ekspansi JABODETABEK", en: "JABODETABEK Expansion" }, desc: { id: "Ekspansi ke Bogor, Depok, Tangerang, dan Bekasi. Mencapai 1.000+ listing.", en: "Expanded to Bogor, Depok, Tangerang, and Bekasi. Reached 1,000+ listings." } },
  { year: "2024", title: { id: "2.940+ Listing", en: "2,940+ Listings" }, desc: { id: "Menjadi platform sewa apartemen terlengkap di JABODETABEK dengan 12.500+ pengguna.", en: "Became the most complete apartment rental platform in JABODETABEK with 12,500+ users." } },
];

export default function AboutPage() {
  const { lang, t } = useLanguage();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div className="page-dark pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-accent-500/10 rounded-full blur-[80px]" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600/20 border border-primary-500/30 text-primary-300 text-sm font-medium mb-6">
            <Heart size={14} className="text-red-400" />
            {lang === "id" ? "Dibuat dengan ❤️ di Indonesia" : "Made with ❤️ in Indonesia"}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading font-black text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {lang === "id" ? "Tentang " : "About "}
            <span className="gradient-text">SewaApartement</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/60 text-lg leading-relaxed max-w-2xl mx-auto">
            {lang === "id"
              ? "Kami hadir untuk memudahkan siapa saja menemukan hunian terbaik di JABODETABEK — dengan cara yang transparan, mudah, dan terpercaya."
              : "We're here to make it easy for anyone to find the best housing in JABODETABEK — in a transparent, easy, and trusted way."}
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Target size={24} />, title: { id: "Misi Kami", en: "Our Mission" }, desc: { id: "Menghubungkan pencari apartemen dengan pemilik properti secara langsung, efisien, dan terpercaya di seluruh JABODETABEK.", en: "Connecting apartment seekers with property owners directly, efficiently, and trustworthily across JABODETABEK." }, color: "text-primary-400 bg-primary-600/20 border-primary-500/30" },
            { icon: <Eye size={24} />, title: { id: "Visi Kami", en: "Our Vision" }, desc: { id: "Menjadi platform properti rental #1 di Indonesia yang mengubah cara orang mencari dan menyewakan hunian.", en: "To become the #1 property rental platform in Indonesia that transforms how people search and rent housing." }, color: "text-accent-400 bg-accent-600/20 border-accent-500/30" },
            { icon: <Heart size={24} />, title: { id: "Nilai Kami", en: "Our Values" }, desc: { id: "Transparansi, Kepercayaan, Inovasi, dan Komunitas adalah pondasi dari setiap keputusan yang kami buat.", en: "Transparency, Trust, Innovation, and Community are the foundation of every decision we make." }, color: "text-emerald-400 bg-emerald-600/20 border-emerald-500/30" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:border-primary-500/20 transition-all">
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center mx-auto mb-4 ${item.color}`}>{item.icon}</div>
              <h3 className="font-heading font-bold text-white text-lg mb-3">{t(item.title)}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{t(item.desc)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-heading font-black text-white text-responsive-md">
              {lang === "id" ? "Angka yang " : "Numbers That "}
              <span className="gradient-text">{lang === "id" ? "Bicara" : "Speak"}</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 text-center">
                <div className="font-heading font-black text-4xl gradient-text-blue mb-2">
                  {inView ? <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} separator="," /> : "0"}
                </div>
                <p className="text-white/50 text-sm">{t(stat.label)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-800/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-black text-white text-responsive-md">
              {lang === "id" ? "Perjalanan " : "Our "}
              <span className="gradient-text">{lang === "id" ? "Kami" : "Journey"}</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  className="flex gap-6">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center font-black text-white text-sm shadow-glow-blue">
                      {m.year}
                    </div>
                  </div>
                  <div className="glass rounded-2xl p-5 flex-1">
                    <h3 className="font-bold text-white mb-1">{t(m.title)}</h3>
                    <p className="text-white/60 text-sm">{t(m.desc)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading font-black text-white text-responsive-md">
              {lang === "id" ? "Tim " : "Meet the "}
              <span className="gradient-text">{lang === "id" ? "Kami" : "Team"}</span>
            </h2>
            <p className="text-white/50 mt-2">{lang === "id" ? "Orang-orang hebat di balik SewaTerlengkap." : "The great people behind SewaTerlengkap."}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-5 text-center hover:border-primary-500/30 transition-all">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden mx-auto mb-4">
                  <Image src={member.img} alt={member.name} fill className="object-cover" sizes="80px" />
                </div>
                <h3 className="font-bold text-white mb-1">{member.name}</h3>
                <p className="text-primary-400 text-xs font-medium mb-2">{t(member.role)}</p>
                <p className="text-white/50 text-xs leading-relaxed">{t(member.bio)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-900/30 via-dark-900 to-accent-900/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-black text-white text-3xl mb-4">
            {lang === "id" ? "Bergabung dengan Kami" : "Join Us Today"}
          </h2>
          <p className="text-white/60 mb-8">{lang === "id" ? "Jadilah bagian dari komunitas terpercaya SewaTerlengkap." : "Be part of the trusted SewaTerlengkap community."}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="btn-primary inline-flex items-center gap-2">{lang === "id" ? "Cari Apartemen" : "Find Apartment"} <ArrowRight size={16} /></Link>
            <Link href="/auth/register" className="btn-secondary inline-flex items-center gap-2">{lang === "id" ? "Pasang Iklan" : "List Property"} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
