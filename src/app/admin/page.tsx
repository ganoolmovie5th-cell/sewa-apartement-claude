"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, ShieldCheck, LogOut,
  Eye, Trash2, ToggleLeft, ToggleRight, BadgeCheck, BadgeX,
  TrendingUp, MessageCircle, Search, Filter, ChevronRight,
  MapPin, Star, AlertTriangle, CheckCircle2, Settings,
} from "lucide-react";
import { SAMPLE_LISTINGS, formatPrice } from "@/lib/data";
import { getSession, clearSession } from "@/lib/auth";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

type AdminTab = "overview" | "listings" | "owners" | "settings";

const mockOwners = [
  { id: "o1", name: "Hendra Kusuma",    email: "hendra@gmail.com",    phone: "6281234501001", listings: 1, verified: true,  joined: "Jan 2024", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80" },
  { id: "o2", name: "Sari Dewi Lestari",email: "sari@gmail.com",      phone: "6281234501002", listings: 1, verified: true,  joined: "Jan 2024", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&q=80" },
  { id: "o3", name: "Bambang Setiawan", email: "bambang@gmail.com",   phone: "6281234501003", listings: 1, verified: true,  joined: "Feb 2024", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80" },
  { id: "o4", name: "Michael Hartawan", email: "michael@gmail.com",   phone: "6281234501004", listings: 1, verified: true,  joined: "Jan 2024", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&q=80" },
  { id: "o5", name: "Rina Sulistyowati",email: "rina@gmail.com",      phone: "6281234501005", listings: 1, verified: true,  joined: "Feb 2024", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&q=80" },
  { id: "o6", name: "Agus Prasetyo",    email: "agus@gmail.com",      phone: "6281234501006", listings: 1, verified: false, joined: "Jan 2024", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&q=80" },
  { id: "o7", name: "Dewi Kartika",     email: "dewi@gmail.com",      phone: "6281234501007", listings: 1, verified: true,  joined: "Mar 2024", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&q=80" },
  { id: "o8", name: "Nita Rahayu",      email: "nita@gmail.com",      phone: "6281234501008", listings: 1, verified: true,  joined: "Feb 2024", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=60&q=80" },
];

export default function AdminPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [listings, setListings] = useState(
    SAMPLE_LISTINGS.map((l) => ({ ...l, active: true, pendingVerify: !l.verified }))
  );
  const [owners, setOwners] = useState(mockOwners);
  const [searchListing, setSearchListing] = useState("");
  const [searchOwner, setSearchOwner] = useState("");

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "admin") {
      router.replace("/auth/login");
      return;
    }
    setSession(s);
  }, [router]);

  if (!session) {
    return (
      <div className="page-dark min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => { clearSession(); router.push("/auth/login"); };
  const toggleListing = (id: string) =>
    setListings((p) => p.map((l) => l.id === id ? { ...l, active: !l.active } : l));
  const verifyListing = (id: string) =>
    setListings((p) => p.map((l) => l.id === id ? { ...l, verified: true, pendingVerify: false } : l));
  const deleteListing = (id: string) =>
    setListings((p) => p.filter((l) => l.id !== id));
  const verifyOwner = (id: string) =>
    setOwners((p) => p.map((o) => o.id === id ? { ...o, verified: true } : o));
  const deleteOwner = (id: string) =>
    setOwners((p) => p.filter((o) => o.id !== id));

  const filteredListings = listings.filter(
    (l) => !searchListing || l.title.toLowerCase().includes(searchListing.toLowerCase()) || l.location.toLowerCase().includes(searchListing.toLowerCase())
  );
  const filteredOwners = owners.filter(
    (o) => !searchOwner || o.name.toLowerCase().includes(searchOwner.toLowerCase()) || o.email.toLowerCase().includes(searchOwner.toLowerCase())
  );

  const stats = [
    { icon: <Building2 size={20} />, value: listings.length, label: lang === "id" ? "Total Listing" : "Total Listings", color: "text-primary-400 bg-primary-600/20 border-primary-500/30" },
    { icon: <Users size={20} />, value: owners.length, label: lang === "id" ? "Total Pemilik" : "Total Owners", color: "text-accent-400 bg-accent-600/20 border-accent-500/30" },
    { icon: <AlertTriangle size={20} />, value: listings.filter((l) => l.pendingVerify).length, label: lang === "id" ? "Menunggu Verifikasi" : "Pending Verification", color: "text-yellow-400 bg-yellow-600/20 border-yellow-500/30" },
    { icon: <CheckCircle2 size={20} />, value: listings.filter((l) => l.active).length, label: lang === "id" ? "Listing Aktif" : "Active Listings", color: "text-green-400 bg-green-600/20 border-green-500/30" },
  ];

  const sidebarItems: { id: AdminTab; icon: React.ReactNode; label: string }[] = [
    { id: "overview",  icon: <LayoutDashboard size={18} />, label: lang === "id" ? "Ringkasan" : "Overview" },
    { id: "listings",  icon: <Building2 size={18} />,       label: lang === "id" ? "Kelola Listing" : "Manage Listings" },
    { id: "owners",    icon: <Users size={18} />,            label: lang === "id" ? "Kelola Pemilik" : "Manage Owners" },
    { id: "settings",  icon: <Settings size={18} />,         label: lang === "id" ? "Pengaturan" : "Settings" },
  ];

  return (
    <div className="page-dark min-h-screen pt-16 md:pt-20 flex">
      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col w-64 bg-dark-800/90 border-r border-white/5 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
        {/* Admin badge */}
        <div className="p-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={session.avatar} alt={session.name} fill className="object-cover" sizes="40px" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-white font-semibold text-sm truncate">{session.name}</p>
                <ShieldCheck size={13} className="text-accent-400 flex-shrink-0" />
              </div>
              <p className="text-accent-400 text-xs font-medium">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id
                  ? "bg-accent-600/20 text-accent-300 border border-accent-500/30"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              )}
            >
              {item.icon}
              {item.label}
              {item.id === "listings" && listings.filter((l) => l.pendingVerify).length > 0 && (
                <span className="ml-auto w-5 h-5 rounded-full bg-yellow-500 text-dark-900 text-[10px] font-bold flex items-center justify-center">
                  {listings.filter((l) => l.pendingVerify).length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} /> {lang === "id" ? "Keluar" : "Logout"}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* Mobile tab bar */}
        <div className="flex md:hidden gap-1 mb-6 bg-dark-800 border border-white/10 rounded-xl p-1 overflow-x-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all",
                activeTab === item.id ? "bg-accent-600 text-white" : "text-white/50"
              )}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </div>

        {/* ═══════════ OVERVIEW ═══════════ */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h1 className="font-heading font-bold text-white text-2xl flex items-center gap-2">
                <ShieldCheck className="text-accent-400" size={24} />
                {lang === "id" ? "Dashboard Admin" : "Admin Dashboard"}
              </h1>
              <p className="text-white/50 text-sm">{lang === "id" ? "Kelola seluruh platform SewaApartement." : "Manage the entire SewaApartement platform."}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className={`glass rounded-2xl p-5 border ${s.color.split(" ")[2]}`}>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-3 ${s.color}`}>{s.icon}</div>
                  <div className="font-heading font-black text-white text-2xl mb-1">{s.value}</div>
                  <p className="text-white/50 text-xs">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Pending verification */}
            {listings.filter((l) => l.pendingVerify).length > 0 && (
              <div>
                <h2 className="font-bold text-white mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-yellow-400" />
                  {lang === "id" ? "Menunggu Verifikasi" : "Pending Verification"}
                </h2>
                <div className="space-y-3">
                  {listings.filter((l) => l.pendingVerify).map((l) => (
                    <div key={l.id} className="glass rounded-xl p-4 flex items-center gap-4 border border-yellow-500/20">
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                        <Image src={l.images[0]} alt={l.title} fill className="object-cover" sizes="56px" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm truncate">{l.title}</p>
                        <p className="text-white/40 text-xs truncate">{l.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => verifyListing(l.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/20 border border-green-500/30 hover:bg-green-600/30 text-green-400 text-xs font-medium rounded-lg transition-all">
                          <BadgeCheck size={12} /> {lang === "id" ? "Verifikasi" : "Verify"}
                        </button>
                        <button onClick={() => deleteListing(l.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 text-red-400 text-xs font-medium rounded-lg transition-all">
                          <Trash2 size={12} /> {lang === "id" ? "Tolak" : "Reject"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent listings */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-white">{lang === "id" ? "Listing Terbaru" : "Recent Listings"}</h2>
                <button onClick={() => setActiveTab("listings")} className="text-primary-400 text-sm flex items-center gap-1">
                  {lang === "id" ? "Lihat Semua" : "View All"} <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-2">
                {listings.slice(0, 5).map((l) => (
                  <div key={l.id} className="glass rounded-xl p-3 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={l.images[0]} alt={l.title} fill className="object-cover" sizes="40px" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{l.title}</p>
                      <div className="flex items-center gap-1 text-white/40 text-xs">
                        <MapPin size={9} /> {l.city}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-primary-400 text-sm font-bold">{formatPrice(l.price)}</p>
                      <span className={`text-xs ${l.active ? "text-green-400" : "text-white/30"}`}>
                        ● {l.active ? (lang === "id" ? "Aktif" : "Active") : (lang === "id" ? "Nonaktif" : "Inactive")}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ LISTINGS ═══════════ */}
        {activeTab === "listings" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="font-heading font-bold text-white text-2xl">{lang === "id" ? "Kelola Listing" : "Manage Listings"}</h1>
                <p className="text-white/50 text-sm">{listings.length} {lang === "id" ? "listing terdaftar" : "listings registered"}</p>
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  value={searchListing}
                  onChange={(e) => setSearchListing(e.target.value)}
                  placeholder={lang === "id" ? "Cari listing..." : "Search listings..."}
                  className="input-field pl-8 py-2 text-sm w-56"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredListings.map((l, i) => (
                <motion.div key={l.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                  className="glass rounded-xl p-4 flex flex-col sm:flex-row gap-4">
                  <div className="relative w-full sm:w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={l.images[0]} alt={l.title} fill className="object-cover" sizes="80px" />
                    <div className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${l.active ? "bg-green-600 text-white" : "bg-dark-800/80 text-white/40"}`}>
                      {l.active ? "ON" : "OFF"}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <p className="text-white font-semibold text-sm leading-snug flex-1">{l.title}</p>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {l.verified ? (
                          <BadgeCheck size={14} className="text-primary-400" />
                        ) : (
                          <AlertTriangle size={14} className="text-yellow-400" />
                        )}
                        <div className="flex items-center gap-0.5 text-accent-400 text-xs">
                          <Star size={10} className="fill-accent-400" /> {l.rating}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-white/40 text-xs mb-2">
                      <MapPin size={9} /> {l.location}
                    </div>
                    <p className="text-primary-400 font-bold text-sm">{formatPrice(l.price)}<span className="text-white/30 font-normal text-xs">/{l.priceUnit}</span></p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <Link href={`/listings/${l.slug}`} target="_blank" className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-xs text-white/60 hover:text-white transition-all">
                        <Eye size={11} /> {lang === "id" ? "Lihat" : "View"}
                      </Link>
                      {!l.verified && (
                        <button onClick={() => verifyListing(l.id)} className="flex items-center gap-1 px-2.5 py-1.5 bg-green-600/10 border border-green-500/30 hover:bg-green-600/20 rounded-lg text-xs text-green-400 transition-all">
                          <BadgeCheck size={11} /> {lang === "id" ? "Verifikasi" : "Verify"}
                        </button>
                      )}
                      <button onClick={() => toggleListing(l.id)} className={cn("flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all",
                        l.active ? "bg-green-600/10 border-green-500/30 text-green-400" : "bg-white/5 border-white/10 text-white/50"
                      )}>
                        {l.active ? <ToggleRight size={12} /> : <ToggleLeft size={12} />}
                        {l.active ? (lang === "id" ? "Nonaktifkan" : "Deactivate") : (lang === "id" ? "Aktifkan" : "Activate")}
                      </button>
                      <button onClick={() => deleteListing(l.id)} className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 rounded-lg text-xs text-red-400 transition-all">
                        <Trash2 size={11} /> {lang === "id" ? "Hapus" : "Delete"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              {filteredListings.length === 0 && (
                <div className="text-center py-16 text-white/40">
                  <Building2 size={40} className="mx-auto mb-3 opacity-30" />
                  <p>{lang === "id" ? "Tidak ada listing ditemukan." : "No listings found."}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════ OWNERS ═══════════ */}
        {activeTab === "owners" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="font-heading font-bold text-white text-2xl">{lang === "id" ? "Kelola Pemilik" : "Manage Owners"}</h1>
                <p className="text-white/50 text-sm">{owners.length} {lang === "id" ? "pemilik terdaftar" : "owners registered"}</p>
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  value={searchOwner}
                  onChange={(e) => setSearchOwner(e.target.value)}
                  placeholder={lang === "id" ? "Cari pemilik..." : "Search owners..."}
                  className="input-field pl-8 py-2 text-sm w-56"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredOwners.map((o, i) => (
                <motion.div key={o.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={o.avatar} alt={o.name} fill className="object-cover" sizes="48px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-white font-semibold text-sm">{o.name}</p>
                      {o.verified
                        ? <BadgeCheck size={14} className="text-primary-400" />
                        : <AlertTriangle size={14} className="text-yellow-400" />}
                    </div>
                    <p className="text-white/40 text-xs">{o.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="tag-pill text-[10px]">📞 {o.phone}</span>
                      <span className="tag-pill text-[10px]">🏠 {o.listings} listing</span>
                      <span className="tag-pill text-[10px]">📅 {o.joined}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!o.verified && (
                      <button onClick={() => verifyOwner(o.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/10 border border-green-500/30 hover:bg-green-600/20 text-green-400 text-xs font-medium rounded-lg transition-all">
                        <BadgeCheck size={12} /> {lang === "id" ? "Verifikasi" : "Verify"}
                      </button>
                    )}
                    <a href={`https://wa.me/${o.phone}`} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/10 border border-green-500/30 hover:bg-green-600/20 text-green-400 text-xs font-medium rounded-lg transition-all">
                      <MessageCircle size={12} /> WA
                    </a>
                    <button onClick={() => deleteOwner(o.id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 text-red-400 text-xs rounded-lg transition-all">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════ SETTINGS ═══════════ */}
        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <h1 className="font-heading font-bold text-white text-2xl">{lang === "id" ? "Pengaturan Platform" : "Platform Settings"}</h1>

            <div className="glass rounded-2xl p-6 space-y-5">
              <h2 className="font-semibold text-white border-b border-white/10 pb-3">{lang === "id" ? "Informasi Admin" : "Admin Info"}</h2>
              {[
                { label: "Nama", value: session.name },
                { label: "Email", value: session.email },
                { label: "Role", value: "Administrator" },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div>
                    <p className="text-white/40 text-xs">{f.label}</p>
                    <p className="text-white text-sm font-medium">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-white border-b border-white/10 pb-3">{lang === "id" ? "Aksi Platform" : "Platform Actions"}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: lang === "id" ? "Export Data Listing" : "Export Listing Data", icon: "📥", color: "border-primary-500/30 text-primary-400 hover:bg-primary-600/10" },
                  { label: lang === "id" ? "Export Data Pemilik" : "Export Owner Data", icon: "👥", color: "border-primary-500/30 text-primary-400 hover:bg-primary-600/10" },
                  { label: lang === "id" ? "Backup Database" : "Backup Database", icon: "💾", color: "border-green-500/30 text-green-400 hover:bg-green-600/10" },
                  { label: lang === "id" ? "Kirim Notifikasi" : "Send Notification", icon: "🔔", color: "border-accent-500/30 text-accent-400 hover:bg-accent-600/10" },
                ].map((a, i) => (
                  <button key={i} className={`flex items-center gap-3 p-4 rounded-xl bg-white/5 border ${a.color} text-sm font-medium transition-all`}>
                    <span className="text-lg">{a.icon}</span> {a.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleLogout} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-semibold text-sm transition-all">
              <LogOut size={16} /> {lang === "id" ? "Keluar dari Admin" : "Logout from Admin"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
