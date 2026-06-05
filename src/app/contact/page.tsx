"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function ContactPage() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: <MapPin size={20} />, label: { id: "Alamat", en: "Address" }, value: "Sudirman Park Tower A Lt. 12, Jl. KH Mas Mansyur, Jakarta Pusat 10220" },
    { icon: <Phone size={20} />, label: { id: "Telepon", en: "Phone" }, value: "+62 21 1234 5678" },
    { icon: <Mail size={20} />, label: { id: "Email", en: "Email" }, value: "hello@sewaterlengkap.id" },
    { icon: <Clock size={20} />, label: { id: "Jam Operasional", en: "Working Hours" }, value: lang === "id" ? "Senin–Jumat: 09.00–18.00 WIB" : "Mon–Fri: 09:00–18:00 WIB" },
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
              {contactInfo.map((info, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 glass rounded-2xl p-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-600/20 border border-primary-500/30 flex items-center justify-center text-primary-400 flex-shrink-0">{info.icon}</div>
                  <div>
                    <p className="text-white/50 text-xs mb-0.5">{typeof info.label === "string" ? info.label : (lang === "id" ? info.label.id : info.label.en)}</p>
                    <p className="text-white text-sm font-medium">{info.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/6221123456789?text=Halo%20SewaTerlengkap%2C%20saya%20butuh%20bantuan." target="_blank" rel="noopener noreferrer"
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
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-600/20 border border-green-500/40 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="text-green-400" size={32} />
                  </div>
                  <h3 className="font-bold text-white text-xl mb-2">{lang === "id" ? "Pesan Terkirim!" : "Message Sent!"}</h3>
                  <p className="text-white/60 text-sm mb-6">{lang === "id" ? "Tim kami akan menghubungi Anda dalam 1×24 jam." : "Our team will contact you within 1×24 hours."}</p>
                  <button onClick={() => setSubmitted(false)} className="btn-primary">{lang === "id" ? "Kirim Pesan Lain" : "Send Another"}</button>
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
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4">
                    <Send size={16} />
                    {lang === "id" ? "Kirim Pesan" : "Send Message"}
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
