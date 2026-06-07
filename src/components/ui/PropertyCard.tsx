"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize2, Star, BadgeCheck, MessageCircle, Wifi, Car, Dumbbell } from "lucide-react";
import { formatPrice, getWhatsAppUrl } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import type { Listing } from "@/types";
import { useState } from "react";

interface PropertyCardProps {
  listing: Listing;
  index?: number;
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi size={11} />,
  parking: <Car size={11} />,
  gym: <Dumbbell size={11} />,
};

export default function PropertyCard({ listing, index = 0 }: PropertyCardProps) {
  const { t, lang } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const priceLabel = lang === "id" ? `/${listing.priceUnit}` : `/month`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="property-card bg-dark-800 border border-white/5 hover:border-primary-500/30 shadow-card hover:shadow-card-hover group"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <Image
          src={imgError ? `https://picsum.photos/seed/${listing.id}/800/600` : listing.images[0]}
          alt={listing.title}
          fill
          className="property-image object-cover"
          onError={() => setImgError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {listing.featured && (
            <span className="badge bg-accent-500 text-white text-[10px]">
              ⭐ {lang === "id" ? "Unggulan" : "Featured"}
            </span>
          )}
          {listing.verified && (
            <span className="badge bg-primary-600 text-white text-[10px]">
              <BadgeCheck size={10} />
              {lang === "id" ? "Terverifikasi" : "Verified"}
            </span>
          )}
        </div>

        {/* Floor info */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="text-white/70 text-xs bg-dark-900/70 backdrop-blur-sm px-2 py-1 rounded-lg">
            {lang === "id" ? `Lantai ${listing.floor}/${listing.totalFloors}` : `Floor ${listing.floor}/${listing.totalFloors}`}
          </span>
        </div>

        {/* Photo count */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-dark-900/70 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-white/60 text-xs">📷 {listing.images.length}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/listings/${listing.slug}`}>
          <h3 className="font-heading font-bold text-white text-sm md:text-base leading-snug hover:text-primary-400 transition-colors line-clamp-2 mb-1.5">
            {listing.title}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1 text-white/50 text-xs mb-3">
          <MapPin size={11} className="flex-shrink-0" />
          <span className="truncate">{listing.location}</span>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-3 text-white/60 text-xs mb-3">
          <div className="flex items-center gap-1">
            <Bed size={11} />
            <span>{listing.bedrooms === 0 ? (lang === "id" ? "Studio" : "Studio") : `${listing.bedrooms} ${lang === "id" ? "KT" : "BR"}`}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={11} />
            <span>{listing.bathrooms} {lang === "id" ? "KM" : "Bath"}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 size={11} />
            <span>{listing.size} m²</span>
          </div>
        </div>

        {/* Tags */}
        {listing.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {listing.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-pill text-[10px] px-2">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="section-divider mb-3" />

        {/* Price + Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-heading font-bold text-primary-400 text-base">
              {formatPrice(listing.price)}
            </div>
            <div className="text-white/40 text-xs">{priceLabel}</div>
          </div>

          <div className="flex items-center gap-2">
            {/* Rating */}
            <div className="flex flex-col items-end gap-0.5">
              <div className="flex items-center gap-1 text-xs text-white/60">
                <Star size={11} className="text-accent-400 fill-accent-400" />
                <span className="font-semibold text-white/80">{listing.rating}</span>
                <span className="text-white/30">({listing.reviews})</span>
              </div>
              {listing.ratingSource && (
                <span className="text-[9px] text-white/25 leading-none">
                  via {listing.ratingSource}
                </span>
              )}
            </div>

            {/* WhatsApp */}
            <a
              href={getWhatsAppUrl(listing.ownerPhone, undefined, listing.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              <MessageCircle size={12} />
              WA
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
