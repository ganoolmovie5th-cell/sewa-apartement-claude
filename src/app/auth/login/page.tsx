"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Building2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

// ponytail: login replaced with coming-soon banner — auth.ts removed (plaintext passwords)
export default function LoginPage() {
  const { lang } = useLanguage();

  return (
    <div className="page-dark min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-[80px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
        </Link>

        <div className="glass rounded-3xl p-8 border border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="SewaApartement" width={40} height={40} className="w-10 h-10 flex-shrink-0" />
            <div>
              <div className="font-heading font-extrabold text-white text-lg leading-none">
                Sewa<span className="gradient-text-gold">Apartement</span>
              </div>
              <div className="text-white/60 text-xs">JABODETABEK</div>
            </div>
          </div>

          {/* Title — hanya Owner */}
          <div className="flex items-center gap-2 mb-1">
            <Building2 size={18} className="text-primary-400" />
            <h1 className="font-heading font-bold text-white text-xl">
              {lang === "id" ? "Masuk sebagai Pemilik" : "Sign In as Owner"}
            </h1>
          </div>
          <p className="text-white/40 text-sm mb-6">
            {lang === "id" ? "Belum punya akun? " : "No account yet? "}
            <Link href="/auth/register" className="text-primary-400 hover:text-primary-300 font-medium">
              {lang === "id" ? "Daftar gratis" : "Register free"}
            </Link>
          </p>

          {/* Demo credentials — development only */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-5 p-3 rounded-xl border bg-primary-600/10 border-primary-500/30 text-xs">
              <p className="font-semibold text-white/60 mb-1">
                {lang === "id" ? "💡 Demo Owner:" : "💡 Demo Owner:"}
              </p>
              <button
                type="button"
                onClick={() => { setForm({ email: "owner@sewaapartement.id", password: "Owner@2024!" }); setError(""); }}
                className="text-primary-400 hover:text-primary-300 font-mono block text-left w-full transition-colors"
              >
                <span className="text-white/40">Email:</span> owner@sewaapartement.id
                <br />
                <span className="text-white/40">Pass: </span> Owner@2024!
                <span className="ml-2 text-primary-500/60">(klik isi otomatis)</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); setError(""); }}
                placeholder="email@example.com"
                className="input-field"
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <div className="flex items-center justify-between mb-2">
                <label className="form-label mb-0">Password *</label>
                <Link href="/auth/forgot-password" className="text-primary-400 hover:text-primary-300 text-xs">
                  {lang === "id" ? "Lupa password?" : "Forgot password?"}
                </Link>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => { setForm({ ...form, password: e.target.value }); setError(""); }}
                  placeholder="••••••••"
                  className="input-field pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                >
                  <span>⚠️</span> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-bold text-base transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-glow-blue"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <><LogIn size={17} /> {lang === "id" ? "Masuk" : "Sign In"}</>
              }
            </button>
          </form>
        </div>

        <p className="text-center text-white/55 text-xs mt-6">
          🔒 {lang === "id" ? "Data Anda aman & terenkripsi" : "Your data is safe & encrypted"}
        </p>
      </motion.div>
    </div>
  );
}
