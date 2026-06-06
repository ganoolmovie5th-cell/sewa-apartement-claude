"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, ShieldCheck, LogOut,
  Eye, Trash2, ToggleLeft, ToggleRight, BadgeCheck,
  MessageCircle, Search, ChevronRight,
  MapPin, Star, AlertTriangle, CheckCircle2, Settings,
  Download, Database, Bell, Send, CheckCircle,
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

const LISTINGS_STORAGE_KEY = "admin-listings-state";
const OWNERS_STORAGE_KEY   = "admin-owners-state";

function loadListings() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LISTINGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveListings(data: any[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(LISTINGS_STORAGE_KEY, JSON.stringify(data)); } catch {}
}
function loadOwners() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(OWNERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveOwners(data: any[]) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(OWNERS_STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export default function AdminPage() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  // State: load dari localStorage, fallback ke default ────────────────
  const [listings, setListingsRaw] = useState<any[]>(() => {
    const saved = loadListings();
    if (saved && saved.length > 0) return saved;
    return SAMPLE_LISTINGS.map((l) => ({ ...l, active: true, pendingVerify: !l.verified }));
  });
  const [owners, setOwnersRaw] = useState<any[]>(() => loadOwners() ?? mockOwners);

  // Wrapper persist ───────────────────────────────────────────────────
  const setListings = (updater: any) => {
    setListingsRaw((prev: any[]) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveListings(next);
      return next;
    });
  };
  const setOwners = (updater: any) => {
    setOwnersRaw((prev: any[]) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveOwners(next);
      return next;
    });
  };

  const [searchListing, setSearchListing] = useState("");
  const [searchOwner, setSearchOwner] = useState("");

  // ── Settings action states ──────────────────────────────────────────
  const [actionLoading, setActionLoading]   = useState<string | null>(null);
  const [actionDone, setActionDone]         = useState<string | null>(null);
  const [showNotifModal, setShowNotifModal] = useState(false);
  const [notifMsg, setNotifMsg]             = useState("");

  // ── Confirm delete modal ────────────────────────────────────────────
  const [confirmDelete, setConfirmDelete] = useState<{
    type: "listing" | "owner" | "pending";
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const s = getSession();
    if (!s || s.role !== "admin") {
      router.replace("/auth/login");
      return;
    }
    setSession(s);
  }, [router]);

  // ── Memory leak: cancel pending timers on unmount ──────────────────
  const adminTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const safeTimeout = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    adminTimers.current.push(id);
    return id;
  };
  useEffect(() => {
    return () => { adminTimers.current.forEach(clearTimeout); };
  }, []);

  if (!session) {
    return (
      <div className="page-dark min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleLogout = () => { clearSession(); router.push("/auth/login"); };

  // ── Helpers: CSV export ─────────────────────────────────────────────
  function downloadCSV(filename: string, rows: string[][], headers: string[]) {
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleExportListings() {
    setActionLoading("export-listing");
    const headers = ["ID","Judul","Lokasi","Kota","Tipe","Harga","Satuan","Kamar","Luas","Lantai","Rating","Ulasan","Status","Verified","Owner WA"];
    const rows = listings.map((l) => [
      l.id, l.title, l.location, l.city, l.type,
      String(l.price), l.priceUnit, String(l.bedrooms),
      String(l.size), String(l.floor),
      String(l.rating), String(l.reviews),
      l.active ? "Aktif" : "Nonaktif",
      l.verified ? "Ya" : "Tidak",
      l.ownerPhone,
    ]);
    safeTimeout(() => {
      downloadCSV(`listings-sewaapartement-${new Date().toISOString().split("T")[0]}.csv`, rows, headers);
      setActionLoading(null);
      setActionDone("export-listing");
      safeTimeout(() => setActionDone(null), 3000);
    }, 800);
  }

  function handleExportOwners() {
    setActionLoading("export-owner");
    const headers = ["ID","Nama","Email","No. HP","Listings","Verified","Bergabung"];
    const rows = owners.map((o) => [
      o.id, o.name, o.email, o.phone,
      String(o.listings), o.verified ? "Ya" : "Tidak", o.joined,
    ]);
    safeTimeout(() => {
      downloadCSV(`owners-sewaapartement-${new Date().toISOString().split("T")[0]}.csv`, rows, headers);
      setActionLoading(null);
      setActionDone("export-owner");
      safeTimeout(() => setActionDone(null), 3000);
    }, 800);
  }

  function handleBackup() {
    setActionLoading("backup");
    const data = {
      exportedAt: new Date().toISOString(),
      platform:   "SewaApartement.id",
      listings:   listings,
      owners:     owners,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `backup-sewaapartement-${new Date().toISOString().split("T")[0]}.json`;
    safeTimeout(() => {
      a.click();
      URL.revokeObjectURL(url);
      setActionLoading(null);
      setActionDone("backup");
      safeTimeout(() => setActionDone(null), 3000);
    }, 1000);
  }

  function handleSendNotification() {
    if (!notifMsg.trim()) return;
    setActionLoading("notif");

    // Generate WA broadcast — buka semua link WA owner satu per satu
    // (WhatsApp tidak support broadcast API tanpa Business API,
    //  solusi: buka tab WA per owner dengan pesan pre-filled)
    const verifiedOwners = owners.filter(o => o.verified);

    safeTimeout(() => {
      setActionLoading(null);
      setActionDone("notif");
      setShowNotifModal(false);

      // Buka WA link untuk setiap owner terverifikasi (maks 3 sekaligus agar tidak diblokir browser)
      verifiedOwners.slice(0, 3).forEach((owner, i) => {
        safeTimeout(() => {
          const msg = `Halo ${owner.name}! 👋\n\n${notifMsg}\n\n_— Admin SewaApartement.id_`;
          window.open(`https://wa.me/${owner.phone}?text=${encodeURIComponent(msg)}`, "_blank");
        }, i * 800);
      });

      // Jika lebih dari 3 owner, simpan broadcast list ke clipboard
      if (verifiedOwners.length > 3) {
        const broadcastList = verifiedOwners
          .map(o => `https://wa.me/${o.phone}?text=${encodeURIComponent(`Halo ${o.name}! 👋\n\n${notifMsg}\n\n_— Admin SewaApartement.id_`)}`)
          .join("\n");
        navigator.clipboard?.writeText(broadcastList).catch(() => {});
      }

      setNotifMsg("");
      safeTimeout(() => setActionDone(null), 4000);
    }, 1200);
  }
  const toggleListing = (id: string) =>
    setListings((p: any[]) => p.map((l) => l.id === id ? { ...l, active: !l.active } : l));
  const verifyListing = (id: string) =>
    setListings((p: any[]) => p.map((l) => l.id === id ? { ...l, verified: true, pendingVerify: false } : l));

  // Verifikasi SEMUA listing yang pending sekaligus
  const verifyAllPending = () => {
    setListings((p: any[]) => p.map((l) => ({ ...l, verified: true, pendingVerify: false })));
  };

  const verifyOwner = (id: string) =>
    setOwners((p: any[]) => p.map((o) => o.id === id ? { ...o, verified: true } : o));

  // Verifikasi SEMUA owner yang belum terverifikasi sekaligus
  const verifyAllOwners = () => {
    setOwners((p: any[]) => p.map((o) => ({ ...o, verified: true })));
  };

  // Open confirm modal instead of direct delete
  const askDeleteListing = (l: { id: string; title: string }) =>
    setConfirmDelete({ type: "listing", id: l.id, name: l.title });
  const askRejectListing = (l: { id: string; title: string }) =>
    setConfirmDelete({ type: "pending", id: l.id, name: l.title });
  const askDeleteOwner   = (o: { id: string; name: string }) =>
    setConfirmDelete({ type: "owner",   id: o.id, name: o.name });

  // Execute after confirmed
  const handleConfirmDelete = () => {
    if (!confirmDelete) return;
    if (confirmDelete.type === "listing" || confirmDelete.type === "pending") {
      setListings((p) => p.filter((l) => l.id !== confirmDelete.id));
    } else {
      setOwners((p) => p.filter((o) => o.id !== confirmDelete.id));
    }
    setConfirmDelete(null);
  };

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
            {listings.filter((l: any) => l.pendingVerify).length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <h2 className="font-bold text-white flex items-center gap-2">
                    <AlertTriangle size={16} className="text-yellow-400" />
                    {lang === "id" ? "Menunggu Verifikasi" : "Pending Verification"}
                    <span className="w-5 h-5 rounded-full bg-yellow-500 text-dark-900 text-[10px] font-bold flex items-center justify-center">
                      {listings.filter((l: any) => l.pendingVerify).length}
                    </span>
                  </h2>
                  {/* Tombol Verifikasi Semua */}
                  <button
                    onClick={verifyAllPending}
                    className="flex items-center gap-1.5 px-4 py-2 bg-green-600/20 border border-green-500/40 hover:bg-green-600/30 text-green-400 text-xs font-semibold rounded-xl transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.25)]"
                  >
                    <BadgeCheck size={14} />
                    {lang === "id"
                      ? `Verifikasi Semua (${listings.filter((l: any) => l.pendingVerify).length})`
                      : `Verify All (${listings.filter((l: any) => l.pendingVerify).length})`}
                  </button>
                </div>
                <div className="space-y-3">
                  {listings.filter((l: any) => l.pendingVerify).map((l: any) => (
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
                        <button onClick={() => askRejectListing(l)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 text-red-400 text-xs font-medium rounded-lg transition-all">
                          <Trash2 size={12} /> {lang === "id" ? "Tolak" : "Reject"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All verified banner */}
            {listings.filter((l: any) => l.pendingVerify).length === 0 && (
              <div className="flex items-center gap-3 p-4 glass rounded-xl border border-green-500/20 bg-green-600/5">
                <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                <p className="text-green-400 text-sm font-medium">
                  {lang === "id" ? "✅ Semua listing sudah terverifikasi!" : "✅ All listings are verified!"}
                </p>
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
                      <button onClick={() => askDeleteListing(l)} className="flex items-center gap-1 px-2.5 py-1.5 bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 rounded-lg text-xs text-red-400 transition-all">
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
              <div className="flex items-center gap-2 flex-wrap">
                {/* Verifikasi Semua Owner */}
                {owners.filter((o: any) => !o.verified).length > 0 && (
                  <button
                    onClick={verifyAllOwners}
                    className="flex items-center gap-1.5 px-4 py-2 bg-green-600/20 border border-green-500/40 hover:bg-green-600/30 text-green-400 text-xs font-semibold rounded-xl transition-all"
                  >
                    <BadgeCheck size={14} />
                    {lang === "id"
                      ? `Verifikasi Semua (${owners.filter((o: any) => !o.verified).length})`
                      : `Verify All (${owners.filter((o: any) => !o.verified).length})`}
                  </button>
                )}
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
                    <button onClick={() => askDeleteOwner(o)} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/10 border border-red-500/30 hover:bg-red-600/20 text-red-400 text-xs rounded-lg transition-all">
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
            <h1 className="font-heading font-bold text-white text-2xl">
              {lang === "id" ? "Pengaturan Platform" : "Platform Settings"}
            </h1>

            {/* Success toast */}
            <AnimatePresence>
              {actionDone && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5 p-4 glass rounded-xl border border-green-500/30 bg-green-600/10 text-green-400 text-sm font-medium"
                >
                  <CheckCircle size={16} />
                  {actionDone === "export-listing" && (lang === "id" ? "✅ Data listing berhasil diexport sebagai CSV!" : "✅ Listing data exported as CSV!")}
                  {actionDone === "export-owner"   && (lang === "id" ? "✅ Data pemilik berhasil diexport sebagai CSV!" : "✅ Owner data exported as CSV!")}
                  {actionDone === "backup"         && (lang === "id" ? "✅ Backup database berhasil didownload sebagai JSON!" : "✅ Database backup downloaded as JSON!")}
                  {actionDone === "notif"          && (lang === "id" ? `✅ WA dibuka untuk ${owners.filter(o=>o.verified).length} pemilik! Jika lebih dari 3, link tersisa disalin ke clipboard.` : `✅ WA opened for ${owners.filter(o=>o.verified).length} owners! If more than 3, remaining links copied to clipboard.`)}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Admin Info */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-white border-b border-white/10 pb-3">
                {lang === "id" ? "Informasi Admin" : "Admin Information"}
              </h2>
              {[
                { label: lang === "id" ? "Nama" : "Name", value: session.name },
                { label: "Email", value: session.email },
                { label: "Role", value: "Super Administrator" },
                { label: lang === "id" ? "Total Listing" : "Total Listings", value: `${listings.length} listing` },
                { label: lang === "id" ? "Total Pemilik" : "Total Owners", value: `${owners.length} pemilik` },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="text-white/40 text-xs mb-0.5">{f.label}</p>
                    <p className="text-white text-sm font-medium">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform Actions */}
            <div className="glass rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-white border-b border-white/10 pb-3">
                {lang === "id" ? "Aksi Platform" : "Platform Actions"}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Export Listing */}
                <button
                  onClick={handleExportListings}
                  disabled={actionLoading === "export-listing"}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-primary-500/30 text-primary-400 hover:bg-primary-600/10 text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {actionLoading === "export-listing" ? (
                    <div className="w-5 h-5 border-2 border-primary-400/30 border-t-primary-400 rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <Download size={18} className="flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                  <div className="text-left">
                    <div>{lang === "id" ? "Export Data Listing" : "Export Listing Data"}</div>
                    <div className="text-primary-400/60 text-xs font-normal">
                      {listings.length} listing → CSV
                    </div>
                  </div>
                </button>

                {/* Export Owner */}
                <button
                  onClick={handleExportOwners}
                  disabled={actionLoading === "export-owner"}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-primary-500/30 text-primary-400 hover:bg-primary-600/10 text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {actionLoading === "export-owner" ? (
                    <div className="w-5 h-5 border-2 border-primary-400/30 border-t-primary-400 rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <Users size={18} className="flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                  <div className="text-left">
                    <div>{lang === "id" ? "Export Data Pemilik" : "Export Owner Data"}</div>
                    <div className="text-primary-400/60 text-xs font-normal">
                      {owners.length} pemilik → CSV
                    </div>
                  </div>
                </button>

                {/* Backup Database */}
                <button
                  onClick={handleBackup}
                  disabled={actionLoading === "backup"}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-green-500/30 text-green-400 hover:bg-green-600/10 text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {actionLoading === "backup" ? (
                    <div className="w-5 h-5 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <Database size={18} className="flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                  <div className="text-left">
                    <div>{lang === "id" ? "Backup Database" : "Backup Database"}</div>
                    <div className="text-green-400/60 text-xs font-normal">
                      {lang === "id" ? "Listings + Pemilik → JSON" : "Listings + Owners → JSON"}
                    </div>
                  </div>
                </button>

                {/* Kirim Notifikasi */}
                <button
                  onClick={() => setShowNotifModal(true)}
                  disabled={actionLoading === "notif"}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-accent-500/30 text-accent-400 hover:bg-accent-600/10 text-sm font-medium transition-all disabled:opacity-60 disabled:cursor-not-allowed group"
                >
                  {actionLoading === "notif" ? (
                    <div className="w-5 h-5 border-2 border-accent-400/30 border-t-accent-400 rounded-full animate-spin flex-shrink-0" />
                  ) : (
                    <Bell size={18} className="flex-shrink-0 group-hover:animate-bounce transition-all" />
                  )}
                  <div className="text-left">
                    <div>{lang === "id" ? "Kirim Notifikasi" : "Send Notification"}</div>
                    <div className="text-accent-400/60 text-xs font-normal">
                      {lang === "id" ? `Broadcast ke ${owners.length} pemilik` : `Broadcast to ${owners.length} owners`}
                    </div>
                  </div>
                </button>

              </div>
            </div>

            {/* Danger Zone */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 font-semibold text-sm transition-all"
            >
              <LogOut size={16} />
              {lang === "id" ? "Keluar dari Admin" : "Logout from Admin"}
            </button>
          </div>
        )}

        {/* ── Notification Modal ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showNotifModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
              onClick={(e) => e.target === e.currentTarget && setShowNotifModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass rounded-2xl p-6 w-full max-w-md border border-accent-500/30"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-accent-600/20 border border-accent-500/30 flex items-center justify-center">
                      <Bell className="text-accent-400" size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">
                        {lang === "id" ? "Kirim Notifikasi" : "Send Notification"}
                      </h3>
                      <p className="text-white/40 text-xs">
                        {lang === "id"
                          ? `Akan dikirim ke ${owners.length} pemilik terdaftar`
                          : `Will be sent to ${owners.length} registered owners`}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNotifModal(false)}
                    className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
                  >
                    ✕
                  </button>
                </div>

                {/* Penerima */}
                <div className="mb-4 p-3 bg-white/5 rounded-xl border border-white/5">
                  <p className="text-white/40 text-xs mb-2">{lang === "id" ? "Penerima:" : "Recipients:"}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {owners.slice(0, 5).map((o) => (
                      <span key={o.id} className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary-600/20 rounded-full text-primary-300 text-xs">
                        {o.name.split(" ")[0]}
                      </span>
                    ))}
                    {owners.length > 5 && (
                      <span className="px-2 py-0.5 bg-white/10 rounded-full text-white/40 text-xs">
                        +{owners.length - 5} lainnya
                      </span>
                    )}
                  </div>
                  <p className="text-white/30 text-xs mt-2">
                    💬 {lang === "id"
                      ? `Pesan dikirim via WhatsApp ke ${owners.filter(o => o.verified).length} pemilik terverifikasi. Browser akan membuka tab WA per pemilik.`
                      : `Message sent via WhatsApp to ${owners.filter(o => o.verified).length} verified owners. Browser will open a WA tab per owner.`}
                  </p>
                </div>

                {/* Quick templates */}
                <p className="text-white/40 text-xs mb-2">{lang === "id" ? "Template cepat:" : "Quick templates:"}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {[
                    lang === "id" ? "🎉 Selamat datang di SewaApartement.id! Pastikan listing Anda lengkap & terupdate." : "🎉 Welcome to SewaApartement.id! Make sure your listing is complete & updated.",
                    lang === "id" ? "⚡ Reminder: Perbarui listing Anda agar tetap aktif dan mudah ditemukan calon penyewa." : "⚡ Reminder: Update your listing to stay active and discoverable.",
                    lang === "id" ? "🆕 Fitur baru tersedia! Kunjungi dashboard untuk melihat update terbaru." : "🆕 New features available! Visit your dashboard to see the latest updates.",
                  ].map((tpl, i) => (
                    <button
                      key={i}
                      onClick={() => setNotifMsg(tpl)}
                      className="text-left text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white transition-all leading-relaxed"
                    >
                      {tpl.length > 50 ? tpl.slice(0, 50) + "…" : tpl}
                    </button>
                  ))}
                </div>

                {/* Pesan */}
                <div className="form-group mb-5">
                  <label className="form-label">{lang === "id" ? "Isi Pesan *" : "Message *"}</label>
                  <textarea
                    rows={4}
                    value={notifMsg}
                    onChange={(e) => setNotifMsg(e.target.value)}
                    placeholder={lang === "id"
                      ? "Tulis pesan notifikasi untuk semua pemilik apartemen..."
                      : "Write a notification message for all apartment owners..."}
                    className="input-field resize-none"
                  />
                  <p className="text-white/30 text-xs mt-1">{notifMsg.length}/500 karakter</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowNotifModal(false)}
                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-sm font-semibold transition-all"
                  >
                    {lang === "id" ? "Batal" : "Cancel"}
                  </button>
                  <button
                    onClick={handleSendNotification}
                    disabled={!notifMsg.trim() || actionLoading === "notif"}
                    className="flex-1 py-3 rounded-xl bg-accent-600 hover:bg-accent-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {actionLoading === "notif" ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={15} />
                    )}
                    {lang === "id" ? "Kirim Sekarang" : "Send Now"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Confirm Delete Modal (listing / owner / pending) ─────────────── */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm"
              onClick={(e) => e.target === e.currentTarget && setConfirmDelete(null)}
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
                  {confirmDelete.type === "owner"
                    ? lang === "id" ? "Hapus Pemilik?" : "Delete Owner?"
                    : confirmDelete.type === "pending"
                    ? lang === "id" ? "Tolak Listing Ini?" : "Reject This Listing?"
                    : lang === "id" ? "Hapus Listing Ini?" : "Delete This Listing?"}
                </h3>

                {/* Name chip */}
                <p className="text-center text-white/40 text-sm mb-1">
                  {lang === "id" ? "Anda akan menghapus:" : "You are about to delete:"}
                </p>
                <div className="mx-auto mb-5 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                  <span className="text-red-300 text-sm font-semibold line-clamp-2">
                    {confirmDelete.name}
                  </span>
                </div>

                {/* Warning */}
                <p className="text-center text-white/40 text-xs mb-6 leading-relaxed">
                  {confirmDelete.type === "owner"
                    ? lang === "id"
                      ? "⚠️ Data pemilik dan semua listing terkait akan dihapus permanen. Aksi ini tidak bisa dibatalkan."
                      : "⚠️ Owner data and all related listings will be permanently deleted. This action cannot be undone."
                    : lang === "id"
                      ? "⚠️ Listing ini akan dihapus permanen. Aksi ini tidak bisa dibatalkan."
                      : "⚠️ This listing will be permanently deleted. This action cannot be undone."}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white text-sm font-semibold transition-all"
                  >
                    {lang === "id" ? "Batal" : "Cancel"}
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
                  >
                    <Trash2 size={14} />
                    {confirmDelete.type === "pending"
                      ? lang === "id" ? "Ya, Tolak" : "Yes, Reject"
                      : lang === "id" ? "Ya, Hapus" : "Yes, Delete"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
