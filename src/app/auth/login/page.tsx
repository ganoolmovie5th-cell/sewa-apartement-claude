"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, LogIn, ArrowLeft, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/dashboard");
  };

  return (
    <div className="page-dark min-h-screen flex items-center justify-center px-4 py-20">
      {/* Background effects */}
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
          <div className="flex items-center gap-3 mb-8">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">ST</span>
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-white text-lg leading-none">
                Sewa<span className="gradient-text-gold">Terlengkap</span>
              </div>
              <div className="text-white/40 text-xs">JABODETABEK</div>
            </div>
          </div>

          <h1 className="font-heading font-bold text-white text-2xl mb-1">
            {lang === "id" ? "Masuk ke Akun" : "Sign In"}
          </h1>
          <p className="text-white/50 text-sm mb-8">
            {lang === "id" ? "Belum punya akun? " : "Don't have an account? "}
            <Link href="/auth/register" className="text-primary-400 hover:text-primary-300 font-medium">
              {lang === "id" ? "Daftar gratis" : "Register free"}
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@example.com"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <div className="flex items-center justify-between mb-2">
                <label className="form-label mb-0">{lang === "id" ? "Password" : "Password"} *</label>
                <Link href="/auth/forgot-password" className="text-primary-400 hover:text-primary-300 text-xs">
                  {lang === "id" ? "Lupa password?" : "Forgot password?"}
                </Link>
              </div>
              <div className="relative">
                <input
                  required
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-field pr-10"
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

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {lang === "id" ? "Memproses..." : "Processing..."}
                </>
              ) : (
                <>
                  <LogIn size={17} />
                  {lang === "id" ? "Masuk" : "Sign In"}
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">{lang === "id" ? "atau" : "or"}</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Google", icon: "🇬", bg: "hover:bg-white/10" },
              { label: "Facebook", icon: "📘", bg: "hover:bg-blue-600/20" },
            ].map((s) => (
              <button
                key={s.label}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 ${s.bg} text-white/70 hover:text-white text-sm font-medium transition-all`}
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Security note */}
        <p className="text-center text-white/30 text-xs mt-6">
          🔒 {lang === "id" ? "Data Anda aman & terenkripsi" : "Your data is safe & encrypted"}
        </p>
      </motion.div>
    </div>
  );
}
