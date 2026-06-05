"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, LogIn, ArrowLeft, ShieldCheck, Building2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";
import { findAccount, saveSession } from "@/lib/auth";

type LoginTab = "owner" | "admin";

export default function LoginPage() {
  const { lang } = useLanguage();
  const router = useRouter();

  const [tab, setTab] = useState<LoginTab>("owner");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));

    const account = findAccount(form.email, form.password);

    if (!account) {
      setError(
        lang === "id"
          ? "Email atau password salah. Silakan coba lagi."
          : "Incorrect email or password. Please try again."
      );
      setLoading(false);
      return;
    }

    // role guard per tab
    if (tab === "admin" && account.role !== "admin") {
      setError(
        lang === "id"
          ? "Akun ini tidak memiliki akses admin."
          : "This account does not have admin access."
      );
      setLoading(false);
      return;
    }

    saveSession(account);

    if (account.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  // prefill helper
  const prefill = (email: string, pw: string) => {
    setForm({ email, password: pw });
    setError("");
  };

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
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">SA</span>
              </div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-white text-lg leading-none">
                Sewa<span className="gradient-text-gold">Apartement</span>
              </div>
              <div className="text-white/40 text-xs">JABODETABEK</div>
            </div>
          </div>

          {/* Tab Toggle */}
          <div className="flex p-1 bg-dark-800 border border-white/10 rounded-2xl mb-6">
            {(["owner", "admin"] as LoginTab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setForm({ email: "", password: "" }); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  tab === t
                    ? t === "admin"
                      ? "bg-accent-600 text-white shadow-glow-gold"
                      : "bg-primary-600 text-white shadow-glow-blue"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {t === "admin" ? <ShieldCheck size={15} /> : <Building2 size={15} />}
                {t === "admin"
                  ? lang === "id" ? "Admin" : "Admin"
                  : lang === "id" ? "Pemilik" : "Owner"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: tab === "admin" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="font-heading font-bold text-white text-xl mb-1">
                {tab === "admin"
                  ? lang === "id" ? "Masuk sebagai Admin" : "Sign In as Admin"
                  : lang === "id" ? "Masuk sebagai Pemilik" : "Sign In as Owner"}
              </h1>
              <p className="text-white/40 text-sm mb-6">
                {tab === "owner" && (
                  <>
                    {lang === "id" ? "Belum punya akun? " : "No account yet? "}
                    <Link href="/auth/register" className="text-primary-400 hover:text-primary-300 font-medium">
                      {lang === "id" ? "Daftar gratis" : "Register free"}
                    </Link>
                  </>
                )}
                {tab === "admin" && (
                  <span className="flex items-center gap-1.5 text-accent-400/70">
                    <ShieldCheck size={12} />
                    {lang === "id" ? "Akses terbatas — hanya staf resmi" : "Restricted access — authorized staff only"}
                  </span>
                )}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Demo credentials hint */}
          <div className={`mb-5 p-3 rounded-xl border text-xs space-y-1.5 ${
            tab === "admin"
              ? "bg-accent-600/10 border-accent-500/30"
              : "bg-primary-600/10 border-primary-500/30"
          }`}>
            <p className="font-semibold text-white/60 mb-1">
              {lang === "id" ? "💡 Demo Kredensial:" : "💡 Demo Credentials:"}
            </p>
            {tab === "admin" ? (
              <button
                type="button"
                onClick={() => prefill("admin@sewaapartement.id", "Admin@2024!")}
                className="text-accent-400 hover:text-accent-300 font-mono block text-left w-full transition-colors"
              >
                <span className="text-white/40">Email:</span> admin@sewaapartement.id
                <br />
                <span className="text-white/40">Pass: </span> Admin@2024!
                <span className="ml-2 text-accent-500/60">(klik untuk isi otomatis)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => prefill("owner@sewaapartement.id", "Owner@2024!")}
                className="text-primary-400 hover:text-primary-300 font-mono block text-left w-full transition-colors"
              >
                <span className="text-white/40">Email:</span> owner@sewaapartement.id
                <br />
                <span className="text-white/40">Pass: </span> Owner@2024!
                <span className="ml-2 text-primary-500/60">(klik untuk isi otomatis)</span>
              </button>
            )}
          </div>

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
              className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-base transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-0.5 ${
                tab === "admin"
                  ? "bg-gradient-to-r from-accent-600 to-accent-500 hover:from-accent-500 hover:to-accent-400 text-white shadow-glow-gold"
                  : "bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white shadow-glow-blue"
              }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {tab === "admin" ? <ShieldCheck size={17} /> : <LogIn size={17} />}
                  {loading
                    ? lang === "id" ? "Memproses..." : "Processing..."
                    : tab === "admin"
                      ? lang === "id" ? "Masuk Admin" : "Admin Sign In"
                      : lang === "id" ? "Masuk" : "Sign In"}
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          🔒 {lang === "id" ? "Data Anda aman & terenkripsi" : "Your data is safe & encrypted"}
        </p>
      </motion.div>
    </div>
  );
}
