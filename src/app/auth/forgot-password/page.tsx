"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2, Send } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { getWhatsAppUrl } from "@/lib/utils";
import { ACCOUNTS } from "@/lib/auth";

export default function ForgotPasswordPage() {
  const { lang } = useLanguage();
  const [email, setEmail]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [sent, setSent]         = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    const isRegistered = ACCOUNTS.some(a => a.email.toLowerCase() === email.toLowerCase());
    if (isRegistered) {
      setSent(true);
    } else {
      setNotFound(true);
    }
  };

  // WA fallback ke admin jika tidak bisa akses email
  const waFallback = getWhatsAppUrl(
    "628118696940",
    `Halo SewaApartement, saya lupa password untuk akun ${email || "saya"}. Mohon bantuannya.`
  );

  return (
    <div className="page-dark min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        <Link href="/auth/login" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          {lang === "id" ? "Kembali ke Login" : "Back to Login"}
        </Link>

        <div className="glass rounded-3xl p-8 border border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-7">
            <div className="relative w-10 h-10 flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">SA</span>
              </div>
            </div>
            <div className="font-heading font-extrabold text-white text-lg leading-none">
              Sewa<span className="gradient-text-gold">Apartement</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {/* ── Success state ── */}
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-600/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="text-green-400" size={32} />
                </div>
                <h2 className="font-heading font-bold text-white text-xl mb-2">
                  {lang === "id" ? "Email Terkirim!" : "Email Sent!"}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed mb-2">
                  {lang === "id"
                    ? `Instruksi reset password telah dikirim ke`
                    : `Password reset instructions have been sent to`}
                </p>
                <p className="text-primary-400 font-semibold text-sm mb-6 break-all">{email}</p>
                <p className="text-white/40 text-xs mb-7">
                  {lang === "id"
                    ? "Cek folder Inbox dan Spam. Email valid selama 30 menit."
                    : "Check Inbox and Spam folder. Link valid for 30 minutes."}
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => { setSent(false); setEmail(""); }}
                    className="btn-secondary w-full py-3 text-sm"
                  >
                    {lang === "id" ? "Coba Email Lain" : "Try Another Email"}
                  </button>
                  <a
                    href={waFallback}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600/10 border border-green-500/30 hover:bg-green-600/20 text-green-400 text-sm font-semibold transition-all"
                  >
                    💬 {lang === "id" ? "Butuh bantuan? Chat WhatsApp" : "Need help? Chat WhatsApp"}
                  </a>
                </div>
              </motion.div>
            ) : (
              /* ── Form state ── */
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="font-heading font-bold text-white text-2xl mb-1">
                  {lang === "id" ? "Lupa Password?" : "Forgot Password?"}
                </h1>
                <p className="text-white/50 text-sm mb-7">
                  {lang === "id"
                    ? "Masukkan email akun Anda. Kami akan kirim link reset password."
                    : "Enter your account email. We'll send a password reset link."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setNotFound(false); }}
                        placeholder="email@example.com"
                        className="input-field pl-9"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Error: email not found */}
                  <AnimatePresence>
                    {notFound && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                      >
                        ⚠️ {lang === "id"
                          ? "Email tidak ditemukan. Pastikan email sesuai akun terdaftar."
                          : "Email not found. Make sure it matches a registered account."}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {loading
                      ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <><Send size={16} />{lang === "id" ? "Kirim Link Reset" : "Send Reset Link"}</>
                    }
                  </button>
                </form>

                {/* WA fallback */}
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-white/40 text-xs text-center mb-3">
                    {lang === "id" ? "Tidak dapat akses email?" : "Can't access your email?"}
                  </p>
                  <a
                    href={waFallback}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-600/10 border border-green-500/30 hover:bg-green-600/20 text-green-400 text-sm font-semibold transition-all"
                  >
                    💬 {lang === "id" ? "Hubungi Admin via WhatsApp" : "Contact Admin via WhatsApp"}
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
