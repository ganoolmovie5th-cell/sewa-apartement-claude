"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getWhatsAppUrl } from "@/lib/utils";

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi pengiriman — kirim via WA ke admin
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  // Buat pesan WA otomatis dari isian form
  const waMessage = `Halo SewaApartement! Saya mengirim pesan melalui form kontak:\n\n*Nama:* ${form.name}\n*Email:* ${form.email}\n*Subjek:* ${form.subject}\n*Pesan:* ${form.message}`;
  const waUrl = getWhatsAppUrl("628118696940", waMessage);

  const contactInfo = [
    { icon: <MapPin size={20} />, label: { id: "Alamat", en: "Address" }, value: "Binong Permai Blok R-10/14, Tangerang", href: null },
    { icon: <Phone size={20} />,  label: { id: "Telepon", en: "Phone" },   value: "+62 811 8696 940",                        href: "https://wa.me/628118696940" },
    { icon: <Mail size={20} />,   label: { id: "Email", en: "Email" },     value: "sewa-apartement-jabodetabek@gmail.com",   href: "mailto:sewa-apartement-jabodetabek@gmail.com" },
    { icon: <Clock size={20} />,  label: { id: "Jam Operasional", en: "Working Hours" }, value: lang === "id" ? "Senin–Jumat: 09.00–18.00 WIB" : "Mon–Fri: 09:00–18:00 WIB", href: null },
  ];

  return (
    <div className="page-dark pt-16 md:pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary-500/10 rounded-full blur-[80px]" />
        <div className="max-w-3xl mx-auto text-center relative">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading font-black text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            {lang === "id" ? "Hubungi " : "Contact "}
            <span className="gradient-text">{lang === "id" ? "Kami" : "Us"}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-white/60 text-lg">
            {lang === "id" ? "Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda." : "Have a question or need help? Our team is ready to assist you."}
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="font-heading font-bold text-white text-xl mb-2">{lang === "id" ? "Informasi Kontak" : "Contact Information"}</h2>
              <p className="text-white/50 text-sm">{lang === "id" ? "Kami senang mendengar dari Anda." : "We'd love to hear from you."}</p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, i) => {
                const content = (
                  <div className="flex items-start gap-4 glass rounded-2xl p-4 hover:border-primary-500/20 transition-all">
                    <div className="w-10 h-10 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-400 flex-shrink-0">{info.icon}</div>
                    <div>
                      <p className="text-white/50 text-xs mb-0.5">{t(info.label)}</p>
                      <p className="text-white text-sm font-medium break-all">{info.value}</p>
                    </div>
                  </div>
                );
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    {info.href ? (
                      <a href={info.href} target={info.href.startsWith("http") ? "_blank" : undefined} rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined} className="block group">
                        {content}
                      </a>
                    ) : content}
                  </motion.div>
                );
              })}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/628118696940?text=Halo%20SewaApartement%2C%20saya%20butuh%20bantuan." target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-green-600 flex items-center justify-center text-white flex-shrink-0"><MessageCircle size={18} /></div>
              <div>
                <p className="text-white font-semibold text-sm">{lang === "id" ? "Chat via WhatsApp" : "Chat via WhatsApp"}</p>
                <p className="text-white/50 text-xs">{lang === "id" ? "Respon dalam 1 jam" : "Response within 1 hour"}</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="glass rounded-3xl p-8">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-600/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-green-400" size={32} />
                  </div>
                  <h3 className="font-bold text-white text-xl mb-2">
                    {lang === "id" ? "Pesan Terkirim! 🎉" : "Message Sent! 🎉"}
                  </h3>
                  <p className="text-white/60 text-sm mb-2">
                    {lang === "id" ? "Tim kami akan menghubungi Anda dalam 1×24 jam." : "Our team will contact you within 1×24 hours."}
                  </p>
                  <p className="text-white/40 text-xs mb-6">
                    {lang === "id" ? "Balasan dikirim ke:" : "Reply sent to:"} <span className="text-primary-400">{form.email}</span>
                  </p>

                  {/* WA follow-up option */}
                  <div className="glass rounded-2xl p-4 mb-6 text-left border border-green-500/20">
                    <p className="text-white/70 text-sm mb-3 font-medium">
                      {lang === "id" ? "💬 Butuh respons lebih cepat?" : "💬 Need a faster response?"}
                    </p>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                    >
                      <MessageCircle size={16} />
                      {lang === "id" ? "Lanjutkan via WhatsApp" : "Continue via WhatsApp"}
                      <ExternalLink size={12} />
                    </a>
                    <p className="text-white/30 text-xs mt-2 text-center">
                      {lang === "id" ? "Pesan form sudah otomatis disiapkan" : "Form message auto-prepared"}
                    </p>
                  </div>

                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                    className="btn-primary text-sm py-2.5 px-6">
                    {lang === "id" ? "Kirim Pesan Lain" : "Send Another Message"}
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-heading font-bold text-white text-xl mb-6">{lang === "id" ? "Kirim Pesan" : "Send Message"}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">{lang === "id" ? "Nama Lengkap" : "Full Name"} *</label>
                      <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={lang === "id" ? "Masukkan nama Anda" : "Enter your name"} className="input-field" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="input-field" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === "id" ? "Subjek" : "Subject"} *</label>
                    <select required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className="input-field appearance-none cursor-pointer">
                      <option value="" className="bg-dark-800">{lang === "id" ? "Pilih subjek..." : "Select subject..."}</option>
                      <option value="general" className="bg-dark-800">{lang === "id" ? "Pertanyaan Umum" : "General Inquiry"}</option>
                      <option value="listing" className="bg-dark-800">{lang === "id" ? "Tentang Listing" : "About Listing"}</option>
                      <option value="owner" className="bg-dark-800">{lang === "id" ? "Daftar sebagai Pemilik" : "Register as Owner"}</option>
                      <option value="report" className="bg-dark-800">{lang === "id" ? "Laporkan Masalah" : "Report Issue"}</option>
                      <option value="partnership" className="bg-dark-800">{lang === "id" ? "Kerjasama / Partnership" : "Partnership"}</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === "id" ? "Pesan" : "Message"} *</label>
                    <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder={lang === "id" ? "Tulis pesan Anda di sini..." : "Write your message here..."} className="input-field resize-none" />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4 disabled:opacity-70">
                    {loading
                      ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <Send size={16} />
                    }
                    {loading
                      ? lang === "id" ? "Mengirim..." : "Sending..."
                      : lang === "id" ? "Kirim Pesan" : "Send Message"
                    }
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
