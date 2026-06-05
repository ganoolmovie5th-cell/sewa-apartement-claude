"use client";

import { useState, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, MapPin, ChevronDown, Grid3X3, List, ArrowUpDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/ui/PropertyCard";
import { SAMPLE_LISTINGS, CITIES, APARTMENT_TYPES, PRICE_RANGES, AMENITIES, RENT_DURATIONS } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

function ListingsContent() {
  const { lang, t } = useLanguage();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("featured");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let results = [...SAMPLE_LISTINGS];

    if (keyword) {
      const kw = keyword.toLowerCase();
      results = results.filter(
        (l) =>
          l.title.toLowerCase().includes(kw) ||
          l.location.toLowerCase().includes(kw) ||
          l.description.id.toLowerCase().includes(kw) ||
          l.tags.some((t) => t.toLowerCase().includes(kw))
      );
    }

    if (city) results = results.filter((l) => l.city === city);
    if (type) results = results.filter((l) => l.type === type);

    if (priceRange) {
      const range = PRICE_RANGES.find((p) => p.id === priceRange);
      if (range) results = results.filter((l) => l.price >= range.min && l.price <= range.max);
    }

    if (selectedAmenities.length > 0) {
      results = results.filter((l) =>
        selectedAmenities.every((a) => l.amenities.includes(a))
      );
    }

    switch (sortBy) {
      case "price-asc": results.sort((a, b) => a.price - b.price); break;
      case "price-desc": results.sort((a, b) => b.price - a.price); break;
      case "rating": results.sort((a, b) => b.rating - a.rating); break;
      case "newest": results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      default: results.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return results;
  }, [keyword, city, type, priceRange, selectedAmenities, sortBy]);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const clearFilters = () => {
    setKeyword("");
    setCity("");
    setType("");
    setPriceRange("");
    setSelectedAmenities([]);
  };

  const hasActiveFilters = keyword || city || type || priceRange || selectedAmenities.length > 0;

  return (
    <div className="page-dark pt-20">
      {/* Header */}
      <div className="bg-dark-800/80 border-b border-white/5 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="font-heading font-black text-white text-3xl md:text-4xl mb-2">
            {lang === "id" ? "Cari Apartemen di " : "Find Apartments in "}
            <span className="gradient-text">JABODETABEK</span>
          </h1>
          <p className="text-white/50">
            {filtered.length.toLocaleString()} {lang === "id" ? "properti ditemukan" : "properties found"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder={lang === "id" ? "Cari apartemen, lokasi, fasilitas..." : "Search apartments, location, amenities..."}
              className="input-field pl-10"
            />
            {keyword && (
              <button onClick={() => setKeyword("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          {/* City Select */}
          <div className="relative sm:w-44">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary-400" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-field pl-8 pr-8 appearance-none cursor-pointer"
            >
              <option value="">{lang === "id" ? "Semua Kota" : "All Cities"}</option>
              {CITIES.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-xl border font-semibold text-sm transition-all",
              showFilters
                ? "bg-primary-600 border-primary-500 text-white"
                : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            <SlidersHorizontal size={15} />
            {lang === "id" ? "Filter" : "Filters"}
            {hasActiveFilters && (
              <span className="w-5 h-5 rounded-full bg-accent-500 text-white text-xs flex items-center justify-center">
                {[city, type, priceRange].filter(Boolean).length + selectedAmenities.length + (keyword ? 1 : 0)}
              </span>
            )}
          </button>
        </div>

        {/* Expanded Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="glass rounded-2xl p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Type */}
                  <div>
                    <label className="form-label mb-2">{lang === "id" ? "Tipe Unit" : "Unit Type"}</label>
                    <div className="flex flex-wrap gap-2">
                      {APARTMENT_TYPES.map((tp) => (
                        <button
                          key={tp.id}
                          onClick={() => setType(type === tp.id ? "" : tp.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                            type === tp.id
                              ? "bg-primary-600 border-primary-500 text-white"
                              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                          )}
                        >
                          {t(tp.label)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="form-label mb-2">{lang === "id" ? "Rentang Harga" : "Price Range"}</label>
                    <div className="flex flex-wrap gap-2">
                      {PRICE_RANGES.map((pr) => (
                        <button
                          key={pr.id}
                          onClick={() => setPriceRange(priceRange === pr.id ? "" : pr.id)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                            priceRange === pr.id
                              ? "bg-primary-600 border-primary-500 text-white"
                              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                          )}
                        >
                          {t(pr.label)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amenities */}
                  <div>
                    <label className="form-label mb-2">{lang === "id" ? "Fasilitas" : "Amenities"}</label>
                    <div className="flex flex-wrap gap-2">
                      {AMENITIES.slice(0, 8).map((am) => (
                        <button
                          key={am.id}
                          onClick={() => toggleAmenity(am.id)}
                          className={cn(
                            "flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-all",
                            selectedAmenities.includes(am.id)
                              ? "bg-primary-600 border-primary-500 text-white"
                              : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                          )}
                        >
                          <span>{am.icon}</span>
                          {t(am.label)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-red-400 hover:text-red-300 text-sm font-medium"
                  >
                    <X size={14} />
                    {lang === "id" ? "Hapus Semua Filter" : "Clear All Filters"}
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sort + View */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/50 text-sm">
            <span className="text-white font-semibold">{filtered.length}</span>{" "}
            {lang === "id" ? "properti ditemukan" : "properties found"}
          </p>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/5 border border-white/10 text-white/70 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none cursor-pointer appearance-none"
              >
                <option value="featured">{lang === "id" ? "Unggulan" : "Featured"}</option>
                <option value="price-asc">{lang === "id" ? "Harga: Terendah" : "Price: Lowest"}</option>
                <option value="price-desc">{lang === "id" ? "Harga: Tertinggi" : "Price: Highest"}</option>
                <option value="rating">{lang === "id" ? "Rating Terbaik" : "Best Rating"}</option>
                <option value="newest">{lang === "id" ? "Terbaru" : "Newest"}</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => setView("grid")}
                className={cn("p-1.5 rounded-lg transition-all", view === "grid" ? "bg-primary-600 text-white" : "text-white/40 hover:text-white")}
              >
                <Grid3X3 size={14} />
              </button>
              <button
                onClick={() => setView("list")}
                className={cn("p-1.5 rounded-lg transition-all", view === "list" ? "bg-primary-600 text-white" : "text-white/40 hover:text-white")}
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className={cn(
            "grid gap-5",
            view === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
          )}>
            {filtered.map((listing, i) => (
              <PropertyCard key={listing.id} listing={listing} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-white font-bold text-xl mb-2">
              {lang === "id" ? "Tidak ada hasil" : "No results found"}
            </h3>
            <p className="text-white/50 text-sm mb-6">
              {lang === "id" ? "Coba ubah filter pencarian Anda." : "Try adjusting your search filters."}
            </p>
            <button onClick={clearFilters} className="btn-primary">
              {lang === "id" ? "Reset Filter" : "Reset Filters"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="page-dark pt-20 flex items-center justify-center min-h-screen">
        <div className="text-white/50">Loading...</div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}
