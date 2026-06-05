"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard, Plus, Building2, Eye, Edit3, Trash2, BadgeCheck,
  TrendingUp, MessageCircle, Bell, Settings, LogOut, ChevronRight,
  Star, MapPin, MoreVertical, ToggleLeft, ToggleRight, Search
} from "lucide-react";
import { SAMPLE_LISTINGS, formatPrice } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

type Tab = "overview" | "listings" | "add" | "profile";

const mockOwner = {
  name: "Budi Santoso",
  email: "budi@email.com",
  phone: "08123456789",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
  verified: true,
  joinDate: "Januari 2024",
  totalListings: 3,
  totalViews: 1247,
  totalContacts: 89,
};

export default function DashboardPage() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [myListings, setMyListings] = useState(SAMPLE_LISTINGS.slice(0, 3).map(l => ({ ...l, active: true })));
  const [newListing, setNewListing] = useState({
    title: "", location: "", city: "", type: "", price: "", size: "", bedrooms: "", bathrooms: "",
    floor: "", totalFloors: "", description: "", phone: "", priceUnit: "bulan",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sidebarItems = [
    { id: "overview" as Tab, icon: <LayoutDashboard size={18} />, label: { id: "Ringkasan", en: "Overview" } },
    { id: "listings" as Tab, icon: <Building2 size={18} />, label: { id: "Listing Saya", en: "My Listings" } },
    { id: "add" as Tab, icon: <Plus size={18} />, label: { id: "Tambah Listing", en: "Add Listing" } },
    { id: "profile" as Tab, icon: <Settings size={18} />, label: { id: "Profil", en: "Profile" } },
  ];

  const stats = [
    { icon: <Building2 size={20} />, value: myListings.length, label: { id: "Total Listing", en: "Total Listings" }, color: "text-primary-400 bg-primary-600/20 border-primary-500/30" },
    { icon: <Eye size={20} />, value: "1.247", label: { id: "Total Dilihat", en: "Total Views" }, color: "text-accent-400 bg-accent-600/20 border-accent-500/30" },
    { icon: <MessageCircle size={20} />, value: "89", label: { id: "Pesan Masuk", en: "Messages" }, color: "text-green-400 bg-green-600/20 border-green-500/30" },
    { icon: <TrendingUp size={20} />, value: "94%", label: { id: "Tingkat Respons", en: "Response Rate" }, color: "text-purple-400 bg-purple-600/20 border-purple-500/30" },
  ];

  const toggleListingStatus = (id: string) => {
    setMyListings(prev => prev.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setSubmitting(false);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setActiveTab("listings"); }, 2000);
  };

  return (
    <div className="page-dark min-h-screen pt-16 md:pt-20 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-dark-800/80 border-r border-white/5 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        {/* Owner Profile */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={mockOwner.avatar} alt={mockOwner.name} fill className="object-cover" sizes="40px" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-white font-semibold text-sm truncate">{mockOwner.name}</p>
                {mockOwner.verified && <BadgeCheck size={12} className="text-primary-400 flex-shrink-0" />}
              </div>
              <p className="text-white/40 text-xs truncate">{mockOwner.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={cn("w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id ? "bg-primary-600/20 text-primary-300 border border-primary-500/30" : "text-white/50 hover:text-white hover:bg-white/5"
              )}>
              {item.icon}
              {lang === "id" ? item.label.id : item.label.en}
              {item.id === "add" && <span className="ml-auto w-5 h-5 rounded-full bg-accent-500 text-white text-[10px] flex items-center justify-center font-bold">+</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/5">
          <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <LogOut size={18} />
            {lang === "id" ? "Keluar" : "Logout"}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Mobile tab bar */}
        <div className="flex md:hidden gap-1 mb-6 bg-dark-800 border border-white/10 rounded-xl p-1 overflow-x-auto">
          {sidebarItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={cn("flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                activeTab === item.id ? "bg-primary-600 text-white" : "text-white/50"
              )}>
              {item.icon}
              <span className="hidden sm:inline">{lang === "id" ? item.label.id : item.label.en}</span>
            </button>
          ))}
        </div>

        {/* ============ OVERVIEW ============ */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h1 className="font-heading font-bold text-white text-2xl">
                {lang === "id" ? `Selamat datang, ${mockOwner.name.split(" ")[0]}! 👋` : `Welcome back, ${mockOwner.name.split(" ")[0]}! 👋`}
              </h1>
              <p className="text-white/50 text-sm">{lang === "id" ? "Berikut ringkasan aktivitas listing Anda." : "Here's a summary of your listing activity."}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className={`glass rounded-2xl p-5 border ${stat.color.split(" ")[2]}`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${stat.color}`}>{stat.icon}</div>
                  <div className="font-heading font-black text-white text-2xl mb-1">{stat.value}</div>
                  <p className="text-white/50 text-xs">{lang === "id" ? stat.label.id : stat.label.en}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent Listings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">{lang === "id" ? "Listing Terbaru" : "Recent Listings"}</h2>
                <button onClick={() => setActiveTab("listings")} className="text-primary-400 hover:text-primary-300 text-sm flex items-center gap-1">
                  {lang === "id" ? "Lihat Semua" : "View All"} <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-3">
                {myListings.slice(0, 3).map((listing) => (
                  <div key={listing.id} className="glass rounded-xl p-4 flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" sizes="56px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">{listing.title}</p>
                      <div className="flex items-center gap-1 text-white/40 text-xs mt-0.5">
                        <MapPin size={10} /> {listing.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-primary-400 font-bold text-sm">{formatPrice(listing.price)}</p>
                      <span className={`text-xs ${listing.active ? "text-green-400" : "text-white/30"}`}>
                        ● {listing.active ? (lang === "id" ? "Aktif" : "Active") : (lang === "id" ? "Nonaktif" : "Inactive")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Add CTA */}
            <motion.div whileHover={{ scale: 1.01 }}
              className="relative p-6 rounded-2xl bg-gradient-to-r from-primary-600/20 to-accent-600/10 border border-primary-500/30 cursor-pointer"
              onClick={() => setActiveTab("add")}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center text-white"><Plus size={24} /></div>
                <div>
                  <h3 className="font-bold text-white">{lang === "id" ? "Tambah Listing Baru" : "Add New Listing"}</h3>
                  <p className="text-white/50 text-sm">{lang === "id" ? "Pasang iklan apartemen baru secara gratis." : "Post a new apartment ad for free."}</p>
                </div>
                <ChevronRight size={20} className="text-white/40 ml-auto" />
              </div>
            </motion.div>
          </div>
        )}

        {/* ============ MY LISTINGS ============ */}
        {activeTab === "listings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-heading font-bold text-white text-2xl">{lang === "id" ? "Listing Saya" : "My Listings"}</h1>
                <p className="text-white/50 text-sm">{myListings.length} {lang === "id" ? "listing terdaftar" : "listings registered"}</p>
              </div>
              <button onClick={() => setActiveTab("add")} className="btn-primary flex items-center gap-2 py-2.5 px-5 text-sm">
                <Plus size={15} /> {lang === "id" ? "Tambah" : "Add New"}
              </button>
            </div>

            <div className="space-y-4">
              {myListings.map((listing, i) => (
                <motion.div key={listing.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="glass rounded-2xl p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative w-full sm:w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                      <Image src={listing.images[0]} alt={listing.title} fill className="object-cover" sizes="112px" />
                      <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-semibold ${listing.active ? "bg-green-600 text-white" : "bg-dark-800/80 text-white/50"}`}>
                        {listing.active ? (lang === "id" ? "Aktif" : "Active") : (lang === "id" ? "Nonaktif" : "Inactive")}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-bold text-white text-sm sm:text-base leading-snug">{listing.title}</h3>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <div className="flex items-center gap-1 text-accent-400 text-xs">
                            <Star size={11} className="fill-accent-400" /> {listing.rating}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-white/40 text-xs mb-2">
                        <MapPin size={10} /> {listing.location}
                      </div>
                      <p className="text-primary-400 font-bold">{formatPrice(listing.price)}<span className="text-white/40 text-xs font-normal">/{listing.priceUnit}</span></p>

                      {/* Actions */}
                      <div className="flex items-center gap-2 mt-4 flex-wrap">
                        <Link href={`/listings/${listing.slug}`} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs text-white/70 hover:text-white transition-all">
                          <Eye size={12} /> {lang === "id" ? "Lihat" : "View"}
                        </Link>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs text-white/70 hover:text-white transition-all">
                          <Edit3 size={12} /> {lang === "id" ? "Edit" : "Edit"}
                        </button>
                        <button onClick={() => toggleListingStatus(listing.id)}
                          className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                            listing.active ? "bg-green-600/10 border-green-500/30 text-green-400 hover:bg-green-600/20" : "bg-white/5 border-white/10 text-white/50 hover:text-white"
                          )}>
                          {listing.active ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                          {listing.active ? (lang === "id" ? "Nonaktifkan" : "Deactivate") : (lang === "id" ? "Aktifkan" : "Activate")}
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 rounded-lg text-xs text-red-400 transition-all">
                          <Trash2 size={12} /> {lang === "id" ? "Hapus" : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ============ ADD LISTING ============ */}
        {activeTab === "add" && (
          <div className="max-w-2xl space-y-6">
            <div>
              <h1 className="font-heading font-bold text-white text-2xl">{lang === "id" ? "Tambah Listing Baru" : "Add New Listing"}</h1>
              <p className="text-white/50 text-sm">{lang === "id" ? "Isi informasi lengkap untuk menarik lebih banyak penyewa." : "Fill in complete information to attract more tenants."}</p>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-600/20 border-2 border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck className="text-green-400" size={32} />
                </div>
                <h3 className="font-bold text-white text-xl mb-2">{lang === "id" ? "Listing Berhasil Ditambahkan!" : "Listing Added Successfully!"}</h3>
                <p className="text-white/50 text-sm">{lang === "id" ? "Listing Anda sedang diverifikasi oleh tim kami." : "Your listing is being verified by our team."}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleAddSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="form-group">
                  <label className="form-label">{lang === "id" ? "Judul Listing" : "Listing Title"} *</label>
                  <input required value={newListing.title} onChange={e => setNewListing({ ...newListing, title: e.target.value })} placeholder={lang === "id" ? "cth: Apartemen 2BR Sudirman Tower A" : "e.g: 2BR Apartment Sudirman Tower A"} className="input-field" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">{lang === "id" ? "Kota" : "City"} *</label>
                    <select required value={newListing.city} onChange={e => setNewListing({ ...newListing, city: e.target.value })} className="input-field appearance-none cursor-pointer">
                      <option value="" className="bg-dark-800">{lang === "id" ? "Pilih kota" : "Select city"}</option>
                      {["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"].map(c => <option key={c} value={c.toLowerCase()} className="bg-dark-800">{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{lang === "id" ? "Tipe Unit" : "Unit Type"} *</label>
                    <select required value={newListing.type} onChange={e => setNewListing({ ...newListing, type: e.target.value })} className="input-field appearance-none cursor-pointer">
                      <option value="" className="bg-dark-800">{lang === "id" ? "Pilih tipe" : "Select type"}</option>
                      {["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "Penthouse"].map(t => <option key={t} value={t.toLowerCase().replace(" ", "")} className="bg-dark-800">{t}</option>)}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{lang === "id" ? "Lokasi Lengkap" : "Full Location"} *</label>
                  <input required value={newListing.location} onChange={e => setNewListing({ ...newListing, location: e.target.value })} placeholder={lang === "id" ? "cth: Sudirman, Jakarta Selatan" : "e.g: Sudirman, South Jakarta"} className="input-field" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="form-group col-span-2">
                    <label className="form-label">{lang === "id" ? "Harga" : "Price"} *</label>
                    <div className="flex gap-2">
                      <input required type="number" value={newListing.price} onChange={e => setNewListing({ ...newListing, price: e.target.value })} placeholder="5000000" className="input-field flex-1" />
                      <select value={newListing.priceUnit} onChange={e => setNewListing({ ...newListing, priceUnit: e.target.value })} className="input-field w-28 appearance-none cursor-pointer">
                        <option value="hari" className="bg-dark-800">/hari</option>
                        <option value="bulan" className="bg-dark-800">/bulan</option>
                        <option value="tahun" className="bg-dark-800">/tahun</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Luas (m²) *</label>
                    <input required type="number" value={newListing.size} onChange={e => setNewListing({ ...newListing, size: e.target.value })} placeholder="45" className="input-field" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Lantai *</label>
                    <input required type="number" value={newListing.floor} onChange={e => setNewListing({ ...newListing, floor: e.target.value })} placeholder="12" className="input-field" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{lang === "id" ? "No. WhatsApp untuk Dihubungi" : "WhatsApp Contact Number"} *</label>
                  <input required value={newListing.phone} onChange={e => setNewListing({ ...newListing, phone: e.target.value })} placeholder="08xxxxxxxxxx" className="input-field" />
                </div>

                <div className="form-group">
                  <label className="form-label">{lang === "id" ? "Deskripsi Properti" : "Property Description"} *</label>
                  <textarea required rows={4} value={newListing.description} onChange={e => setNewListing({ ...newListing, description: e.target.value })} placeholder={lang === "id" ? "Jelaskan keunggulan apartemen Anda..." : "Describe the highlights of your apartment..."} className="input-field resize-none" />
                </div>

                <div className="flex gap-3">
                  <button type="button" onClick={() => setActiveTab("listings")} className="btn-secondary flex-1 py-3">
                    {lang === "id" ? "Batal" : "Cancel"}
                  </button>
                  <button type="submit" disabled={submitting} className="btn-primary flex-1 py-3 flex items-center justify-center gap-2 disabled:opacity-70">
                    {submitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Plus size={16} />}
                    {submitting ? (lang === "id" ? "Menyimpan..." : "Saving...") : (lang === "id" ? "Pasang Listing" : "Post Listing")}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* ============ PROFILE ============ */}
        {activeTab === "profile" && (
          <div className="max-w-2xl space-y-6">
            <h1 className="font-heading font-bold text-white text-2xl">{lang === "id" ? "Profil Saya" : "My Profile"}</h1>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex items-center gap-5 mb-8">
                <div className="relative">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden">
                    <Image src={mockOwner.avatar} alt={mockOwner.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center border-2 border-dark-800">
                    <Edit3 size={12} className="text-white" />
                  </button>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-white text-xl">{mockOwner.name}</h2>
                    {mockOwner.verified && <BadgeCheck size={18} className="text-primary-400" />}
                  </div>
                  <p className="text-white/50 text-sm">{mockOwner.email}</p>
                  <p className="text-white/30 text-xs mt-1">{lang === "id" ? "Bergabung sejak" : "Member since"} {mockOwner.joinDate}</p>
                </div>
              </div>

              <div className="space-y-4">
                {[
                  { label: { id: "Nama Lengkap", en: "Full Name" }, value: mockOwner.name },
                  { label: { id: "Email", en: "Email" }, value: mockOwner.email },
                  { label: { id: "No. WhatsApp", en: "WhatsApp" }, value: mockOwner.phone },
                ].map((field, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div>
                      <p className="text-white/40 text-xs mb-0.5">{lang === "id" ? field.label.id : field.label.en}</p>
                      <p className="text-white text-sm font-medium">{field.value}</p>
                    </div>
                    <button className="text-primary-400 hover:text-primary-300 text-xs font-medium">
                      {lang === "id" ? "Edit" : "Edit"}
                    </button>
                  </div>
                ))}
              </div>

              <button className="mt-6 btn-primary w-full py-3 flex items-center justify-center gap-2">
                <Settings size={16} />
                {lang === "id" ? "Simpan Perubahan" : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
