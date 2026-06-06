"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, UserPlus, ArrowLeft, CheckCircle2, Building2, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, label: { id: "Info Akun", en: "Account Info" } },
  { id: 2, label: { id: "Info Properti", en: "Property Info" } },
  { id: 3, label: { id: "Verifikasi", en: "Verification" } },
];

export default function RegisterPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "",
    propertyType: "", propertyCount: "", city: "", description: "",
    agreeTerms: false,
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setStep(4);
  };

  if (step === 4) {
    return (
      <div className="page-dark min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-3xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-600/20 border-2 border-green-500/40 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-green-400" size={40} />
          </div>
          <h2 className="font-heading font-black text-white text-2xl mb-3">
            {lang === "id" ? "Pendaftaran Berhasil! 🎉" : "Registration Successful! 🎉"}
          </h2>
          <p className="text-white/60 text-sm mb-8 leading-relaxed">
            {lang === "id"
              ? "Akun pemilik Anda telah dibuat. Silakan cek email untuk verifikasi, lalu masuk ke dashboard untuk mulai pasang iklan."
              : "Your owner account has been created. Please check your email for verification, then sign in to the dashboard to start listing."}
          </p>
          <div className="space-y-3">
            <Link href="/auth/login" className="btn-primary w-full flex items-center justify-center gap-2">
              {lang === "id" ? "Masuk ke Akun" : "Sign In to Account"}
            </Link>
            <Link href="/" className="btn-secondary w-full flex items-center justify-center gap-2">
              {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="page-dark min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-accent-500/10 rounded-full blur-[80px]" />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative w-full max-w-lg">
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 group">
          <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
          {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
        </Link>

        <div className="glass rounded-3xl p-8 border border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative w-9 h-9">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl rotate-6" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-xs">SA</span>
              </div>
            </div>
            <div className="font-heading font-extrabold text-white leading-none">
              Sewa<span className="gradient-text-gold">Apartement</span>
            </div>
          </div>

          <h1 className="font-heading font-bold text-white text-2xl mb-1">
            {lang === "id" ? "Daftar sebagai Pemilik" : "Register as Owner"}
          </h1>
          <p className="text-white/50 text-sm mb-6">
            {lang === "id" ? "Sudah punya akun? " : "Already have an account? "}
            <Link href="/auth/login" className="text-primary-400 hover:text-primary-300 font-medium">
              {lang === "id" ? "Masuk" : "Sign In"}
            </Link>
          </p>

          {/* Steps Indicator */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                  step > s.id ? "bg-green-600 text-white" : step === s.id ? "bg-primary-600 text-white shadow-glow-blue" : "bg-white/10 text-white/40"
                }`}>
                  {step > s.id ? <CheckCircle2 size={14} /> : s.id}
                </div>
                <span className={`text-xs font-medium hidden sm:block ${step === s.id ? "text-white" : "text-white/30"}`}>
                  {lang === "id" ? s.label.id : s.label.en}
                </span>
                {i < steps.length - 1 && <div className={`flex-1 h-px ${step > s.id ? "bg-green-600/50" : "bg-white/10"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Account Info */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="form-group">
                <label className="form-label">{lang === "id" ? "Nama Lengkap" : "Full Name"} *</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={lang === "id" ? "Nama lengkap Anda" : "Your full name"} className="input-field" />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" className="input-field" />
              </div>
              <div className="form-group">
                <label className="form-label">{lang === "id" ? "No. WhatsApp" : "WhatsApp Number"} *</label>
                <div className="relative">
                  <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="08xxxxxxxxxx" className="input-field pl-9" />
                </div>
                <p className="text-white/30 text-xs mt-1">
                  {lang === "id" ? "Nomor ini akan ditampilkan kepada calon penyewa." : "This number will be shown to potential tenants."}
                </p>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === "id" ? "Password" : "Password"} *</label>
                <div className="relative">
                  <input required type={showPass ? "text" : "password"} value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} placeholder="Min. 8 karakter" className="input-field pr-10" minLength={8} />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                {lang === "id" ? "Lanjut" : "Continue"} →
              </button>
            </form>
          )}

          {/* Step 2: Property Info */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="form-group">
                <label className="form-label">{lang === "id" ? "Tipe Properti" : "Property Type"} *</label>
                <select required value={form.propertyType} onChange={e => setForm({ ...form, propertyType: e.target.value })} className="input-field appearance-none cursor-pointer">
                  <option value="" className="bg-dark-800">{lang === "id" ? "Pilih tipe..." : "Select type..."}</option>
                  <option value="studio" className="bg-dark-800">Studio</option>
                  <option value="1br" className="bg-dark-800">1 Bedroom</option>
                  <option value="2br" className="bg-dark-800">2 Bedrooms</option>
                  <option value="3br" className="bg-dark-800">3+ Bedrooms</option>
                  <option value="mixed" className="bg-dark-800">{lang === "id" ? "Campuran" : "Mixed"}</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">{lang === "id" ? "Jumlah Unit" : "Unit Count"} *</label>
                  <input required type="number" min="1" value={form.propertyCount} onChange={e => setForm({ ...form, propertyCount: e.target.value })} placeholder="1" className="input-field" />
                </div>
                <div className="form-group">
                  <label className="form-label">{lang === "id" ? "Kota" : "City"} *</label>
                  <select required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} className="input-field appearance-none cursor-pointer">
                    <option value="" className="bg-dark-800">{lang === "id" ? "Pilih kota" : "Select city"}</option>
                    {["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"].map(c => (
                      <option key={c} value={c.toLowerCase()} className="bg-dark-800">{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">{lang === "id" ? "Deskripsi Singkat" : "Brief Description"}</label>
                <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder={lang === "id" ? "Ceritakan tentang properti Anda..." : "Tell us about your property..."} className="input-field resize-none" />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 py-3">← {lang === "id" ? "Kembali" : "Back"}</button>
                <button type="submit" className="btn-primary flex-1 py-3">{lang === "id" ? "Lanjut" : "Continue"} →</button>
              </div>
            </form>
          )}

          {/* Step 3: Terms & Submit */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="glass rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-3">
                  <Building2 className="text-primary-400" size={20} />
                  <div>
                    <p className="text-white font-semibold text-sm">{form.name || (lang === "id" ? "Nama Pemilik" : "Owner Name")}</p>
                    <p className="text-white/50 text-xs">{form.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="tag-pill">{form.city || "Jakarta"}</span>
                  <span className="tag-pill">{form.propertyType || "studio"}</span>
                  <span className="tag-pill">{form.propertyCount || "1"} {lang === "id" ? "unit" : "units"}</span>
                </div>
              </div>

              <div className="bg-dark-800/50 rounded-xl p-4 text-xs text-white/50 leading-relaxed max-h-28 overflow-y-auto">
                {lang === "id"
                  ? "Dengan mendaftar, Anda menyetujui Syarat & Ketentuan dan Kebijakan Privasi SewaApartement. Anda berkomitmen untuk memberikan informasi yang akurat dan bertanggung jawab atas konten yang dipasang."
                  : "By registering, you agree to SewaApartement's Terms & Conditions and Privacy Policy. You commit to providing accurate information and are responsible for the content posted."}
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  required
                  checked={form.agreeTerms}
                  onChange={e => setForm({ ...form, agreeTerms: e.target.checked })}
                  className="mt-0.5 accent-primary-500"
                />
                <span className="text-white/60 text-sm leading-relaxed">
                  {lang === "id" ? "Saya menyetujui " : "I agree to the "}
                  <Link href="/terms" className="text-primary-400 hover:underline">{lang === "id" ? "Syarat & Ketentuan" : "Terms & Conditions"}</Link>
                  {lang === "id" ? " dan " : " and "}
                  <Link href="/privacy" className="text-primary-400 hover:underline">{lang === "id" ? "Kebijakan Privasi" : "Privacy Policy"}</Link>
                </span>
              </label>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary flex-1 py-3">← {lang === "id" ? "Kembali" : "Back"}</button>
                <button type="submit" disabled={loading || !form.agreeTerms}
                  className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><UserPlus size={16} /> {lang === "id" ? "Daftar Sekarang" : "Register Now"}</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
