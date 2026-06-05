"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard, Plus, Building2, Eye, Edit3, Trash2, BadgeCheck,
  TrendingUp, MessageCircle, Settings, LogOut, ChevronRight,
  Star, MapPin, ToggleLeft, ToggleRight, Upload, X, ImagePlus,
  CheckSquare, Square, Phone, Info,
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

// ── Kelompok fasilitas lengkap ─────────────────────────────────────────
const FACILITY_GROUPS = [
  {
    group: { id: "Yang Sudah Termasuk (Include)", en: "What's Included" },
    items: [
      { id: "inc_wifi",     icon: "📶", label: { id: "WiFi / Internet",         en: "WiFi / Internet" } },
      { id: "inc_ipl",      icon: "🏢", label: { id: "IPL (Iuran Pengelolaan)", en: "Building Management Fee (IPL)" } },
      { id: "inc_air",      icon: "💧", label: { id: "Tagihan Air",              en: "Water Bill" } },
      { id: "inc_listrik",  icon: "⚡", label: { id: "Tagihan Listrik",          en: "Electricity Bill" } },
      { id: "inc_gas",      icon: "🔥", label: { id: "Gas / Kompor Gas",         en: "Gas / Gas Stove" } },
      { id: "inc_parkir",   icon: "🚗", label: { id: "Parkir 1 Kendaraan",       en: "1 Vehicle Parking" } },
      { id: "inc_ac",       icon: "❄️", label: { id: "AC (sudah terpasang)",      en: "AC (already installed)" } },
    ],
  },
  {
    group: { id: "Kondisi Unit", en: "Unit Condition" },
    items: [
      { id: "cond_furnished_full", icon: "🛋️", label: { id: "Fully Furnished",        en: "Fully Furnished" } },
      { id: "cond_furnished_semi", icon: "🪑", label: { id: "Semi Furnished",          en: "Semi Furnished" } },
      { id: "cond_unfurnished",    icon: "📦", label: { id: "Unfurnished (Kosong)",    en: "Unfurnished (Empty)" } },
      { id: "cond_baru",           icon: "✨", label: { id: "Unit Baru (Belum Pernah Dihuni)", en: "Brand New Unit" } },
      { id: "cond_renovasi",       icon: "🔨", label: { id: "Baru Direnovasi",         en: "Newly Renovated" } },
    ],
  },
  {
    group: { id: "Fasilitas Dalam Unit", en: "In-Unit Facilities" },
    items: [
      { id: "u_springbed",   icon: "🛏️", label: { id: "Springbed / Kasur",   en: "Spring Bed" } },
      { id: "u_lemari",      icon: "🚪", label: { id: "Lemari Pakaian",       en: "Wardrobe" } },
      { id: "u_kulkas",      icon: "🧊", label: { id: "Kulkas",               en: "Refrigerator" } },
      { id: "u_tv",          icon: "📺", label: { id: "TV / Smart TV",        en: "TV / Smart TV" } },
      { id: "u_wh",          icon: "🚿", label: { id: "Water Heater",         en: "Water Heater" } },
      { id: "u_mesin_cuci",  icon: "👕", label: { id: "Mesin Cuci",           en: "Washing Machine" } },
      { id: "u_microwave",   icon: "🍳", label: { id: "Dapur / Kitchen Set",  en: "Kitchen Set" } },
      { id: "u_meja_kerja",  icon: "💻", label: { id: "Meja Kerja / Study",   en: "Work Desk" } },
      { id: "u_sofa",        icon: "🛋️", label: { id: "Sofa / Ruang Tamu",   en: "Sofa / Living Area" } },
      { id: "u_meja_makan",  icon: "🍽️", label: { id: "Meja Makan",          en: "Dining Table" } },
      { id: "u_balkon",      icon: "🌅", label: { id: "Balkon",               en: "Balcony" } },
      { id: "u_bathtub",     icon: "🛁", label: { id: "Bathtub",              en: "Bathtub" } },
    ],
  },
  {
    group: { id: "Fasilitas Gedung", en: "Building Facilities" },
    items: [
      { id: "b_pool",      icon: "🏊", label: { id: "Kolam Renang",        en: "Swimming Pool" } },
      { id: "b_gym",       icon: "🏋️", label: { id: "Gym / Fitness",       en: "Gym / Fitness" } },
      { id: "b_security",  icon: "🔒", label: { id: "Keamanan 24 Jam",     en: "24H Security" } },
      { id: "b_cctv",      icon: "📹", label: { id: "CCTV",                en: "CCTV" } },
      { id: "b_lift",      icon: "🛗", label: { id: "Lift",                en: "Elevator" } },
      { id: "b_lobby",     icon: "🏛️", label: { id: "Lobby Grand",         en: "Grand Lobby" } },
      { id: "b_minimart",  icon: "🛒", label: { id: "Mini Market",         en: "Mini Market" } },
      { id: "b_laundry",   icon: "🧺", label: { id: "Laundry / Dobi",      en: "Laundry / Dobi" } },
      { id: "b_rooftop",   icon: "🌆", label: { id: "Rooftop / Sky Lounge", en: "Rooftop / Sky Lounge" } },
      { id: "b_cowork",    icon: "💼", label: { id: "Co-working Space",    en: "Co-working Space" } },
      { id: "b_playground",icon: "🎠", label: { id: "Playground Anak",     en: "Children's Playground" } },
      { id: "b_jogging",   icon: "🏃", label: { id: "Jogging Track",       en: "Jogging Track" } },
      { id: "b_bbq",       icon: "🔥", label: { id: "Area BBQ / Garden",   en: "BBQ / Garden Area" } },
    ],
  },
  {
    group: { id: "Kebijakan & Lainnya", en: "Policy & Others" },
    items: [
      { id: "p_pet",        icon: "🐾", label: { id: "Pet Friendly",             en: "Pet Friendly" } },
      { id: "p_no_pet",     icon: "🚫", label: { id: "Tidak Boleh Hewan Peliharaan", en: "No Pets Allowed" } },
      { id: "p_expat",      icon: "🌍", label: { id: "Expat Friendly",           en: "Expat Friendly" } },
      { id: "p_mahasiswa",  icon: "🎓", label: { id: "Cocok untuk Mahasiswa",    en: "Student Friendly" } },
      { id: "p_keluarga",   icon: "👨‍👩‍👧", label: { id: "Cocok untuk Keluarga",     en: "Family Friendly" } },
      { id: "p_single",     icon: "👤", label: { id: "Cocok untuk Single",       en: "Good for Single" } },
      { id: "p_no_smoke",   icon: "🚭", label: { id: "No Smoking",               en: "No Smoking" } },
      { id: "p_dekat_mrt",  icon: "🚇", label: { id: "Dekat MRT / KRL",         en: "Near MRT / KRL" } },
      { id: "p_dekat_tol",  icon: "🛣️", label: { id: "Dekat Pintu Tol",         en: "Near Toll Gate" } },
      { id: "p_dekat_mall", icon: "🏬", label: { id: "Dekat Mall",              en: "Near Mall" } },
    ],
  },
];

export default function DashboardPage() {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [myListings, setMyListings] = useState(SAMPLE_LISTINGS.slice(0, 3).map(l => ({ ...l, active: true })));

  // ── Confirm delete ──────────────────────────────────────────────────
  const [confirmDeleteListing, setConfirmDeleteListing] = useState<{ id: string; title: string } | null>(null);
  const handleConfirmDeleteListing = () => {
    if (!confirmDeleteListing) return;
    setMyListings(prev => prev.filter(l => l.id !== confirmDeleteListing.id));
    setConfirmDeleteListing(null);
  };

  // ── Add Listing form state ──────────────────────────────────────────
  const [newListing, setNewListing] = useState({
    title: "", location: "", city: "", type: "", price: "", size: "",
    bedrooms: "", bathrooms: "", floor: "", totalFloors: "",
    description: "", phone: "", priceUnit: "bulan",
    checkedFacilities: [] as string[],
  });
  const [photoFiles, setPhotoFiles]   = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);

  // ── Photo handlers ─────────────────────────────────────────────────
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newFiles = [...photoFiles, ...files].slice(0, 8);
    setPhotoFiles(newFiles);
    const previews = newFiles.map(f => URL.createObjectURL(f));
    setPhotoPreviews(previews);
  };
  const removePhoto = (idx: number) => {
    setPhotoFiles(prev => prev.filter((_, i) => i !== idx));
    setPhotoPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  // ── Facility toggle ─────────────────────────────────────────────────
  const toggleFacility = (id: string) => {
    setNewListing(prev => ({
      ...prev,
      checkedFacilities: prev.checkedFacilities.includes(id)
        ? prev.checkedFacilities.filter(f => f !== id)
        : [...prev.checkedFacilities, id],
    }));
  };

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
                        <button
                          onClick={() => setConfirmDeleteListing({ id: listing.id, title: listing.title })}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 rounded-lg text-xs text-red-400 transition-all">
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
          <div className="max-w-3xl space-y-6">
            <div>
              <h1 className="font-heading font-bold text-white text-2xl">{lang === "id" ? "Tambah Listing Baru" : "Add New Listing"}</h1>
              <p className="text-white/50 text-sm">{lang === "id" ? "Isi informasi selengkap mungkin agar menarik lebih banyak calon penyewa." : "Fill in as complete information as possible to attract more potential tenants."}</p>
            </div>

            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-600/20 border-2 border-green-500/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BadgeCheck className="text-green-400" size={32} />
                </div>
                <h3 className="font-bold text-white text-xl mb-2">{lang === "id" ? "Listing Berhasil Ditambahkan! 🎉" : "Listing Added Successfully! 🎉"}</h3>
                <p className="text-white/50 text-sm">{lang === "id" ? "Listing Anda sedang diverifikasi oleh tim kami. Aktif dalam 1×24 jam." : "Your listing is being verified by our team. Active within 1×24 hours."}</p>
              </motion.div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                await new Promise(r => setTimeout(r, 1500));
                setSubmitting(false);
                setSubmitted(true);
                setTimeout(() => { setSubmitted(false); setActiveTab("listings"); }, 3000);
              }} className="space-y-6">

                {/* ── STEP 1: Info Dasar ── */}
                <div className="glass rounded-2xl p-6 space-y-4">
                  <h2 className="font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                    <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                    {lang === "id" ? "Informasi Dasar" : "Basic Information"}
                  </h2>

                  <div className="form-group">
                    <label className="form-label">{lang === "id" ? "Judul Listing" : "Listing Title"} *</label>
                    <input required value={newListing.title} onChange={e => setNewListing({ ...newListing, title: e.target.value })}
                      placeholder={lang === "id" ? "cth: Apartemen 2BR Fully Furnished Sudirman Tower A Lt. 28" : "e.g: 2BR Fully Furnished Apartment Sudirman Tower A 28F"}
                      className="input-field" />
                    <p className="text-white/30 text-xs mt-1">{lang === "id" ? "Buat judul yang informatif dan menarik." : "Make a descriptive and catchy title."}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">{lang === "id" ? "Kota" : "City"} *</label>
                      <select required value={newListing.city} onChange={e => setNewListing({ ...newListing, city: e.target.value })} className="input-field appearance-none cursor-pointer">
                        <option value="" className="bg-dark-800">{lang === "id" ? "Pilih kota" : "Select city"}</option>
                        {["Jakarta","Bogor","Depok","Tangerang","Bekasi"].map(c => <option key={c} value={c.toLowerCase()} className="bg-dark-800">{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{lang === "id" ? "Tipe Unit" : "Unit Type"} *</label>
                      <select required value={newListing.type} onChange={e => setNewListing({ ...newListing, type: e.target.value })} className="input-field appearance-none cursor-pointer">
                        <option value="" className="bg-dark-800">{lang === "id" ? "Pilih tipe" : "Select type"}</option>
                        {[{v:"studio",l:"Studio"},{v:"1br",l:"1 Bedroom"},{v:"2br",l:"2 Bedrooms"},{v:"3br",l:"3 Bedrooms"},{v:"penthouse",l:"Penthouse"}].map(t =>
                          <option key={t.v} value={t.v} className="bg-dark-800">{t.l}</option>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{lang === "id" ? "Lokasi Lengkap (Nama Apart + Area/Kecamatan)" : "Full Location (Building + Area)"} *</label>
                    <input required value={newListing.location} onChange={e => setNewListing({ ...newListing, location: e.target.value })}
                      placeholder={lang === "id" ? "cth: Branz Simatupang, Cilandak – Jakarta Selatan" : "e.g: Branz Simatupang, Cilandak – South Jakarta"}
                      className="input-field" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="form-group">
                      <label className="form-label">{lang === "id" ? "KT" : "BR"}</label>
                      <select value={newListing.bedrooms} onChange={e => setNewListing({ ...newListing, bedrooms: e.target.value })} className="input-field appearance-none cursor-pointer">
                        <option value="0" className="bg-dark-800">Studio</option>
                        {[1,2,3,4,5].map(n => <option key={n} value={n} className="bg-dark-800">{n} KT</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{lang === "id" ? "KM" : "Bath"}</label>
                      <select value={newListing.bathrooms} onChange={e => setNewListing({ ...newListing, bathrooms: e.target.value })} className="input-field appearance-none cursor-pointer">
                        {[1,2,3,4].map(n => <option key={n} value={n} className="bg-dark-800">{n} KM</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Luas (m²) *</label>
                      <input required type="number" min="1" value={newListing.size} onChange={e => setNewListing({ ...newListing, size: e.target.value })} placeholder="45" className="input-field" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{lang === "id" ? "Lantai" : "Floor"} *</label>
                      <input required type="number" min="1" value={newListing.floor} onChange={e => setNewListing({ ...newListing, floor: e.target.value })} placeholder="12" className="input-field" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="form-group">
                      <label className="form-label">{lang === "id" ? "Harga Sewa" : "Rental Price"} *</label>
                      <div className="flex gap-2">
                        <input required type="number" min="1" value={newListing.price} onChange={e => setNewListing({ ...newListing, price: e.target.value })}
                          placeholder="5000000" className="input-field flex-1" />
                        <select value={newListing.priceUnit} onChange={e => setNewListing({ ...newListing, priceUnit: e.target.value })} className="input-field w-28 appearance-none cursor-pointer flex-shrink-0">
                          <option value="hari" className="bg-dark-800">/hari</option>
                          <option value="bulan" className="bg-dark-800">/bulan</option>
                          <option value="tahun" className="bg-dark-800">/tahun</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">{lang === "id" ? "No. WhatsApp Pemilik" : "Owner WhatsApp"} *</label>
                      <div className="relative">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                        <input required value={newListing.phone} onChange={e => setNewListing({ ...newListing, phone: e.target.value })}
                          placeholder="628xxxxxxxxxx" className="input-field pl-8" />
                      </div>
                      <p className="text-white/30 text-xs mt-1">{lang === "id" ? "Format internasional, cth: 628111234567" : "International format e.g: 628111234567"}</p>
                    </div>
                  </div>
                </div>

                {/* ── STEP 2: Upload Foto ── */}
                <div className="glass rounded-2xl p-6 space-y-4">
                  <h2 className="font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                    <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                    {lang === "id" ? "Foto Properti" : "Property Photos"}
                    <span className="text-white/40 text-xs font-normal ml-1">{lang === "id" ? "(maks. 8 foto)" : "(max. 8 photos)"}</span>
                  </h2>

                  {/* Upload zone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-primary-500/70 hover:bg-primary-600/5",
                      photoPreviews.length > 0 ? "border-primary-500/40 bg-primary-600/5" : "border-white/15 bg-white/[0.02]"
                    )}
                  >
                    <ImagePlus size={32} className="mx-auto mb-3 text-white/30" />
                    <p className="text-white/60 text-sm font-medium mb-1">
                      {lang === "id" ? "Klik untuk pilih foto" : "Click to select photos"}
                    </p>
                    <p className="text-white/30 text-xs">
                      {lang === "id"
                        ? "JPG, PNG, WebP • Maks. 5MB per foto • Maks. 8 foto"
                        : "JPG, PNG, WebP • Max 5MB per photo • Max 8 photos"}
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </div>

                  {/* Previews */}
                  {photoPreviews.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {photoPreviews.map((src, i) => (
                        <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-dark-800">
                          <img src={src} alt={`foto ${i+1}`} className="w-full h-full object-cover" />
                          {i === 0 && (
                            <div className="absolute top-1 left-1 bg-primary-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                              Cover
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      ))}
                      {photoPreviews.length < 8 && (
                        <button type="button" onClick={() => fileInputRef.current?.click()}
                          className="aspect-square rounded-xl border-2 border-dashed border-white/15 hover:border-primary-500/50 flex items-center justify-center text-white/30 hover:text-white/60 transition-all">
                          <Plus size={20} />
                        </button>
                      )}
                    </div>
                  )}
                  <p className="flex items-center gap-1.5 text-white/30 text-xs">
                    <Info size={11} />
                    {lang === "id"
                      ? "Foto pertama akan jadi cover. Gunakan foto landscape berkualitas tinggi untuk hasil terbaik."
                      : "First photo will be the cover. Use high-quality landscape photos for best results."}
                  </p>
                </div>

                {/* ── STEP 3: Fasilitas & Include ── */}
                <div className="glass rounded-2xl p-6 space-y-5">
                  <h2 className="font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                    <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold">3</span>
                    {lang === "id" ? "Fasilitas & Ketentuan" : "Facilities & Terms"}
                  </h2>
                  <p className="text-white/40 text-xs -mt-2 pb-1">
                    {lang === "id"
                      ? "Centang semua yang ada/termasuk. Semakin lengkap → semakin banyak yang tertarik."
                      : "Check all that apply/are included. More complete → more interested tenants."}
                  </p>

                  {FACILITY_GROUPS.map((group) => (
                    <div key={group.group.id}>
                      <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">
                        {lang === "id" ? group.group.id : group.group.en}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {group.items.map((item) => {
                          const checked = newListing.checkedFacilities.includes(item.id);
                          return (
                            <button
                              type="button"
                              key={item.id}
                              onClick={() => toggleFacility(item.id)}
                              className={cn(
                                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium border transition-all text-left",
                                checked
                                  ? "bg-primary-600/20 border-primary-500/50 text-primary-300"
                                  : "bg-white/3 border-white/8 text-white/50 hover:bg-white/8 hover:text-white/80 hover:border-white/20"
                              )}
                            >
                              <span className="flex-shrink-0">{item.icon}</span>
                              <span className="flex-1 leading-tight">{lang === "id" ? item.label.id : item.label.en}</span>
                              {checked
                                ? <CheckSquare size={13} className="flex-shrink-0 text-primary-400" />
                                : <Square size={13} className="flex-shrink-0 text-white/20" />
                              }
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}

                  {newListing.checkedFacilities.length > 0 && (
                    <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                      <span className="text-white/40 text-xs">{lang === "id" ? "Dipilih:" : "Selected:"}</span>
                      <span className="text-primary-400 text-xs font-semibold">{newListing.checkedFacilities.length} {lang === "id" ? "fasilitas" : "facilities"}</span>
                      <button type="button" onClick={() => setNewListing(p => ({ ...p, checkedFacilities: [] }))}
                        className="ml-auto text-white/30 hover:text-white/60 text-xs flex items-center gap-1">
                        <X size={11} /> {lang === "id" ? "Reset" : "Clear"}
                      </button>
                    </div>
                  )}
                </div>

                {/* ── STEP 4: Deskripsi Tambahan ── */}
                <div className="glass rounded-2xl p-6 space-y-3">
                  <h2 className="font-semibold text-white flex items-center gap-2 pb-2 border-b border-white/10">
                    <span className="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold">4</span>
                    {lang === "id" ? "Deskripsi Tambahan (Opsional)" : "Additional Description (Optional)"}
                  </h2>
                  <p className="flex items-start gap-1.5 text-white/40 text-xs leading-relaxed">
                    <Info size={11} className="flex-shrink-0 mt-0.5" />
                    {lang === "id"
                      ? "Tulis hanya info yang TIDAK ADA di pilihan fasilitas di atas — cth: view spesifik, kondisi khusus, aturan tambahan, atau keunggulan unik lainnya."
                      : "Only write info NOT covered by the facility checkboxes above — e.g: specific view, special conditions, additional rules, or other unique highlights."}
                  </p>
                  <textarea
                    rows={5}
                    value={newListing.description}
                    onChange={e => setNewListing({ ...newListing, description: e.target.value })}
                    placeholder={
                      lang === "id"
                        ? "cth: Unit menghadap timur dengan view Gunung Salak yang indah di pagi hari. Deposit 2 bulan. Kontrak minimal 6 bulan. Ada biaya tambahan parkir motor Rp150rb/bln jika diperlukan."
                        : "e.g: East-facing unit with beautiful Mount Salak view in the morning. 2-month deposit. Minimum 6-month contract. Additional motorcycle parking fee Rp150k/month if needed."
                    }
                    className="input-field resize-none"
                  />
                </div>

                {/* ── Submit ── */}
                <div className="flex gap-3 pb-6">
                  <button type="button" onClick={() => setActiveTab("listings")} className="btn-secondary flex-1 py-3.5">
                    {lang === "id" ? "Batal" : "Cancel"}
                  </button>
                  <button type="submit" disabled={submitting}
                    className="btn-primary flex-2 flex-1 py-3.5 flex items-center justify-center gap-2 disabled:opacity-70">
                    {submitting
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {lang === "id" ? "Mengirim..." : "Submitting..."}</>
                      : <><Upload size={16} /> {lang === "id" ? "Pasang Listing Sekarang" : "Post Listing Now"}</>
                    }
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

      {/* ── Confirm Delete Listing Modal ─────────────────────────── */}
      <AnimatePresence>
        {confirmDeleteListing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setConfirmDeleteListing(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.35 }}
              className="glass rounded-2xl p-6 w-full max-w-sm border border-red-500/30 shadow-[0_0_60px_rgba(239,68,68,0.15)]"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-5">
                <Trash2 className="text-red-400" size={26} />
              </div>

              {/* Title */}
              <h3 className="font-heading font-bold text-white text-center text-lg mb-2">
                {lang === "id" ? "Hapus Listing Ini?" : "Delete This Listing?"}
              </h3>

              {/* Listing name */}
              <p className="text-center text-white/40 text-sm mb-2">
                {lang === "id" ? "Anda akan menghapus:" : "You are about to delete:"}
              </p>
              <div className="mx-auto mb-5 px-4 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                <span className="text-red-300 text-sm font-semibold line-clamp-2">
                  {confirmDeleteListing.title}
                </span>
              </div>

              {/* Warning */}
              <p className="text-center text-white/40 text-xs mb-6 leading-relaxed">
                {lang === "id"
                  ? "⚠️ Listing ini akan dihapus permanen dari dashboard Anda. Aksi ini tidak bisa dibatalkan."
                  : "⚠️ This listing will be permanently removed from your dashboard. This action cannot be undone."}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDeleteListing(null)}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white text-sm font-semibold transition-all"
                >
                  {lang === "id" ? "Batal" : "Cancel"}
                </button>
                <button
                  onClick={handleConfirmDeleteListing}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                >
                  <Trash2 size={14} />
                  {lang === "id" ? "Ya, Hapus" : "Yes, Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
