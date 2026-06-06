"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  MapPin, Bed, Bath, Maximize2, Star, BadgeCheck, Phone, MessageCircle,
  Share2, Heart, ArrowLeft, Building2, Calendar, ChevronLeft, ChevronRight,
  Wifi, Car, Dumbbell, Waves, Shield, WashingMachine, UtensilsCrossed, Wind,
  Copy, Check
} from "lucide-react";
import { SAMPLE_LISTINGS, AMENITIES, formatPrice } from "@/lib/data";
import { getWhatsAppUrl, cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import PropertyCard from "@/components/ui/PropertyCard";

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi size={16} />,
  parking: <Car size={16} />,
  gym: <Dumbbell size={16} />,
  pool: <Waves size={16} />,
  security: <Shield size={16} />,
  laundry: <WashingMachine size={16} />,
  kitchen: <UtensilsCrossed size={16} />,
  ac: <Wind size={16} />,
};

export default function ListingDetailPage({ params }: { params: { slug: string } }) {
  const { lang, t } = useLanguage();
  const found = SAMPLE_LISTINGS.find((l) => l.slug === params.slug);
  if (!found) notFound();
  const listing = found;
  const [currentImage, setCurrentImage] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [copied, setCopied]         = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Close share menu when clicking outside
  useEffect(() => {
    if (!showShareMenu) return;
    const handler = () => setShowShareMenu(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showShareMenu]);

  const pageUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = listing.title;
  const shareText  = `${lang === "id" ? "Lihat apartemen ini di SewaApartement.id" : "Check out this apartment on SewaApartement.id"}: ${listing.title} — ${formatPrice(listing.price)}/${listing.priceUnit}`;

  const handleShare = async () => {
    // Coba Web Share API dulu (mobile-native)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: pageUrl });
        return;
      } catch {
        // User cancel atau browser tidak support — fallback ke menu
      }
    }
    // Fallback: tampilkan menu share manual
    setShowShareMenu(prev => !prev);
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(pageUrl).then(() => {
        setCopied(true);
        setShowShareMenu(false);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleShareWA   = () => { window.open(`https://wa.me/?text=${encodeURIComponent(shareText + "\n" + pageUrl)}`, "_blank"); setShowShareMenu(false); };
  const handleShareTW   = () => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`, "_blank"); setShowShareMenu(false); };
  const handleShareFB   = () => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`, "_blank"); setShowShareMenu(false); };

  const similar = SAMPLE_LISTINGS
    .filter((l) => l.city === listing.city && l.id !== listing.id)
    .slice(0, 3);

  const whatsappMsg = `Halo ${listing.ownerName}, saya tertarik dengan apartemen *${listing.title}* yang Anda iklankan di SewaApartement.id. Boleh saya tanya lebih lanjut mengenai ketersediaan dan harga?`;

  return (
    <div className="page-dark pt-16 md:pt-20">
      {/* Breadcrumb */}
      <div className="bg-dark-800/60 border-b border-white/5 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-white/40">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/listings" className="hover:text-white transition-colors">{lang === "id" ? "Listing" : "Listings"}</Link>
          <span>/</span>
          <span className="text-white/70 truncate">{listing.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <Link href="/listings" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {lang === "id" ? "Kembali ke Listing" : "Back to Listings"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="space-y-3">
              {/* Main Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-dark-800">
                <Image
                  src={listing.images[currentImage]}
                  alt={listing.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                {/* Navigation */}
                <button
                  onClick={() => setCurrentImage((p) => (p - 1 + listing.images.length) % listing.images.length)}
                  aria-label={lang === "id" ? "Foto sebelumnya" : "Previous photo"}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-900/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-dark-700 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentImage((p) => (p + 1) % listing.images.length)}
                  aria-label={lang === "id" ? "Foto berikutnya" : "Next photo"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-dark-900/70 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-dark-700 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
                {/* Image counter */}
                <div className="absolute bottom-3 right-3 bg-dark-900/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                  {currentImage + 1} / {listing.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {listing.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={cn(
                      "relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all",
                      i === currentImage ? "border-primary-500" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                {listing.verified && (
                  <span className="badge bg-primary-600 text-white text-xs">
                    <BadgeCheck size={12} />
                    {lang === "id" ? "Terverifikasi" : "Verified"}
                  </span>
                )}
                {listing.featured && (
                  <span className="badge bg-accent-500 text-white text-xs">⭐ {lang === "id" ? "Unggulan" : "Featured"}</span>
                )}
                {listing.available && (
                  <span className="badge bg-green-600/20 text-green-400 border border-green-500/30 text-xs">
                    ✓ {lang === "id" ? "Tersedia" : "Available"}
                  </span>
                )}
              </div>

              <h1 className="font-heading font-black text-white text-2xl md:text-3xl mb-2">{listing.title}</h1>

              <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
                <MapPin size={14} className="text-primary-400" />
                <span>{listing.location}</span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: <Bed size={16} />, label: listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} ${lang === "id" ? "Kamar Tidur" : "Bedrooms"}` },
                  { icon: <Bath size={16} />, label: `${listing.bathrooms} ${lang === "id" ? "KM Mandi" : "Bathrooms"}` },
                  { icon: <Maximize2 size={16} />, label: `${listing.size} m²` },
                  { icon: <Building2 size={16} />, label: `${lang === "id" ? "Lantai" : "Floor"} ${listing.floor}/${listing.totalFloors}` },
                ].map((spec, i) => (
                  <div key={i} className="glass rounded-xl p-3 flex items-center gap-2.5">
                    <span className="text-primary-400">{spec.icon}</span>
                    <span className="text-white/70 text-sm font-medium">{spec.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-heading font-bold text-white text-lg mb-3">
                {lang === "id" ? "Deskripsi" : "Description"}
              </h2>
              <p className="text-white/60 leading-relaxed">{t(listing.description)}</p>
            </div>

            {/* Amenities */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-heading font-bold text-white text-lg mb-4">
                {lang === "id" ? "Fasilitas" : "Amenities"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {AMENITIES.filter((a) => listing.amenities.includes(a.id)).map((amenity) => (
                  <div key={amenity.id} className="flex items-center gap-2.5 p-3 bg-primary-600/10 rounded-xl border border-primary-500/20">
                    <span className="text-primary-400">
                      {AMENITY_ICONS[amenity.id] || <span className="text-base">{amenity.icon}</span>}
                    </span>
                    <span className="text-white/70 text-sm">{t(amenity.label)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            {listing.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {listing.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            )}
          </div>

          {/* Right: Sticky Contact Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="glass rounded-2xl p-6">
                <div className="flex items-end gap-2 mb-1">
                  <span className="font-heading font-black text-primary-400 text-3xl">{formatPrice(listing.price)}</span>
                </div>
                <p className="text-white/40 text-sm mb-6">
                  / {listing.priceUnit} {lang === "id" ? "(sudah termasuk biaya admin)" : "(incl. admin fee)"}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6 p-3 bg-white/5 rounded-xl">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} className={i < Math.floor(listing.rating) ? "text-accent-400 fill-accent-400" : "text-white/20"} />
                    ))}
                  </div>
                  <span className="text-white font-semibold text-sm">{listing.rating}</span>
                  <span className="text-white/40 text-xs">({listing.reviews} {lang === "id" ? "ulasan" : "reviews"})</span>
                  {(listing as any).ratingSource && (
                    <span className="ml-auto text-[10px] text-white/25 bg-white/5 px-2 py-0.5 rounded-full">
                      via {(listing as any).ratingSource}
                    </span>
                  )}
                </div>

                {/* Owner */}
                <div className="flex items-center gap-3 mb-6 p-3 bg-white/5 rounded-xl">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={listing.ownerAvatar} alt={listing.ownerName} fill className="object-cover" sizes="40px" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm truncate">{listing.ownerName}</div>
                    <div className="text-white/40 text-xs">{lang === "id" ? "Pemilik Properti" : "Property Owner"}</div>
                  </div>
                  {listing.verified && <BadgeCheck size={16} className="text-primary-400 flex-shrink-0" />}
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={getWhatsAppUrl(listing.ownerPhone, whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:-translate-y-0.5 mb-3"
                >
                  <MessageCircle size={20} />
                  {lang === "id" ? "Hubungi via WhatsApp" : "Contact via WhatsApp"}
                </a>

                {/* Action Row */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setWishlisted(!wishlisted)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all",
                      wishlisted
                        ? "bg-red-500/20 border-red-500/50 text-red-400"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Heart size={15} className={wishlisted ? "fill-red-400" : ""} />
                    {lang === "id" ? "Simpan" : "Save"}
                  </button>

                  {/* Share button + dropdown */}
                  <div className="flex-1 relative">
                    <button
                      onClick={handleShare}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 rounded-xl border font-semibold text-sm transition-all",
                        copied
                          ? "bg-green-500/20 border-green-500/50 text-green-400"
                          : showShareMenu
                          ? "bg-primary-600/20 border-primary-500/40 text-primary-300"
                          : "bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                      )}
                    >
                      {copied
                        ? <><Check size={14} /> {lang === "id" ? "Tersalin!" : "Copied!"}</>
                        : <><Share2 size={14} /> {lang === "id" ? "Bagikan" : "Share"}</>
                      }
                    </button>

                    {/* Dropdown share menu */}
                    {showShareMenu && (
                      <div className="absolute bottom-full right-0 mb-2 w-52 glass rounded-2xl border border-white/15 shadow-glass overflow-hidden z-30">
                        <div className="p-2 space-y-0.5">
                          <p className="text-white/30 text-xs px-3 py-1.5 font-medium">
                            {lang === "id" ? "Bagikan via:" : "Share via:"}
                          </p>
                          {/* WhatsApp */}
                          <button onClick={handleShareWA}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-green-600/15 text-white/70 hover:text-green-400 text-sm transition-all text-left">
                            <span className="text-base">💬</span> WhatsApp
                          </button>
                          {/* Twitter/X */}
                          <button onClick={handleShareTW}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-sky-600/15 text-white/70 hover:text-sky-400 text-sm transition-all text-left">
                            <span className="text-base">🐦</span> Twitter / X
                          </button>
                          {/* Facebook */}
                          <button onClick={handleShareFB}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-600/15 text-white/70 hover:text-blue-400 text-sm transition-all text-left">
                            <span className="text-base">📘</span> Facebook
                          </button>
                          {/* Copy link */}
                          <div className="border-t border-white/5 pt-1 mt-1">
                            <button onClick={handleCopyLink}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/10 text-white/70 hover:text-white text-sm transition-all text-left">
                              <Copy size={14} />
                              {lang === "id" ? "Salin Link" : "Copy Link"}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <div className="glass rounded-2xl p-4 text-xs text-white/40 space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar size={12} className="text-primary-400" />
                  <span>{lang === "id" ? "Diposting:" : "Posted:"} {new Date(listing.createdAt).toLocaleDateString(lang === "id" ? "id-ID" : "en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={12} className="text-primary-400" />
                  <span>{lang === "id" ? "Listing telah diverifikasi oleh tim kami" : "Listing verified by our team"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Listings */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="font-heading font-bold text-white text-2xl mb-6">
              {lang === "id" ? "Properti Serupa" : "Similar Properties"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {similar.map((l, i) => (
                <PropertyCard key={l.id} listing={l} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
