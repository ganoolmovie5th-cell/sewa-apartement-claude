"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CITIES } from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

// ─── Ilustrasi CSS per kota — identitas visual khas ──────────────────
function CityIllustration({ cityId }: { cityId: string }) {
  const illustrations: Record<string, React.ReactNode> = {
    // Jakarta: Monas + skyline SCBD — biru tua premium
    jakarta: (
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #060d1e 0%, #0a1a35 45%, #0c2248 100%)" }}>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-20 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #60a5fa, transparent)" }} />
        {/* Monas */}
        <svg className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10" width="24" height="70" viewBox="0 0 24 70" fill="none">
          <polygon points="12,2 15,62 9,62" fill="rgba(252,211,77,0.95)" />
          <rect x="7" y="60" width="10" height="8" rx="1" fill="rgba(252,211,77,0.7)" />
          <circle cx="12" cy="3" r="2.5" fill="#fbbf24" />
        </svg>
        {/* Skyline buildings */}
        <svg className="absolute bottom-0 w-full" height="90" viewBox="0 0 200 90" preserveAspectRatio="none" fill="none">
          <rect x="0"   y="35" width="16" height="55" fill="#0d1f3c"/>
          <rect x="4"   y="12" width="10" height="78" fill="#102648"/>
          <rect x="18"  y="42" width="14" height="48" fill="#0b1c38"/>
          <rect x="36"  y="22" width="16" height="68" fill="#102040"/>
          <rect x="40"  y="5"  width="9"  height="85" fill="#122a50"/>
          <rect x="58"  y="38" width="18" height="52" fill="#0b1c38"/>
          <rect x="80"  y="18" width="20" height="72" fill="#0f2344"/>
          <rect x="86"  y="2"  width="10" height="88" fill="#1a3a6e"/>
          <rect x="108" y="28" width="16" height="62" fill="#0d1f3c"/>
          <rect x="128" y="12" width="18" height="78" fill="#0f2040"/>
          <rect x="132" y="2"  width="9"  height="88" fill="#1a3a6e"/>
          <rect x="152" y="32" width="14" height="58" fill="#0b1c38"/>
          <rect x="170" y="20" width="16" height="70" fill="#0e2244"/>
          <rect x="185" y="42" width="15" height="48" fill="#0b1c38"/>
          {[14,42,88,132,173].map((x, i) => (
            <rect key={i} x={x} y={i%2===0?22:38} width="4" height="3" fill="rgba(253,224,71,0.55)" />
          ))}
        </svg>
      </div>
    ),

    // Bogor: Gunung Salak + hutan tropis — hijau deep
    bogor: (
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #060f08 0%, #0a1e0c 50%, #091a0a 100%)" }}>
        <div className="absolute top-5 right-8 w-14 h-14 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #86efac, transparent)" }} />
        <svg className="absolute bottom-0 w-full" height="120" viewBox="0 0 200 120" preserveAspectRatio="none" fill="none">
          {/* Mountains */}
          <polygon points="100,6 162,82 38,82" fill="#091a0b" />
          <polygon points="55,22 108,82 2,82"  fill="#0c2210" />
          <polygon points="145,18 198,82 92,82" fill="#0a2010" />
          {/* Snow caps */}
          <polygon points="100,6 112,30 88,30"  fill="rgba(240,253,244,0.4)" />
          <polygon points="55,22 65,42 45,42"   fill="rgba(240,253,244,0.25)" />
          {/* Forest floor */}
          <rect x="0" y="78" width="200" height="42" fill="#071508" />
          {[8,24,42,60,78,96,114,132,150,168,186].map((x, i) => (
            <g key={i} transform={`translate(${x},${60+(i%4)*4})`}>
              <polygon points="7,0 14,18 0,18" fill="#0a1e0a" />
              <rect x="5.5" y="17" width="3" height="7" fill="#061208" />
            </g>
          ))}
          {/* Rain streaks */}
          {[25,50,75,100,125,150,175].map((x,i) => (
            <line key={i} x1={x} y1={10+(i%3)*8} x2={x-4} y2={25+(i%3)*8} stroke="rgba(134,239,172,0.15)" strokeWidth="1" />
          ))}
        </svg>
      </div>
    ),

    // Depok: Kampus UI dome — biru akademik
    depok: (
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #08102a 0%, #0c1c3e 45%, #091833 100%)" }}>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-10 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #818cf8, transparent)" }} />
        <svg className="absolute bottom-0 w-full" height="105" viewBox="0 0 200 105" preserveAspectRatio="none" fill="none">
          {/* Main hall */}
          <rect x="60" y="35" width="80" height="70" fill="#0d1f3c" />
          {/* Dome */}
          <ellipse cx="100" cy="36" rx="30" ry="20" fill="#102448" />
          <ellipse cx="100" cy="35" rx="18" ry="10" fill="#0e2040" />
          {/* Columns */}
          {[66,76,86,96,106,116,126].map((x,i) => (
            <rect key={i} x={x} y="42" width="5" height="63" fill="#091a30" />
          ))}
          {/* Wings */}
          <rect x="15"  y="52" width="45" height="53" fill="#0a1c36" />
          <rect x="140" y="52" width="45" height="53" fill="#0a1c36" />
          {/* Windows */}
          {[20,35,50,65,80,95,110,125,145,160].map((x,i) => (
            <rect key={i} x={x} y={57+(i%2)*14} width="9" height="11" fill="rgba(165,180,252,0.3)" />
          ))}
          {/* Flagpole + flag */}
          <line x1="100" y1="16" x2="100" y2="2" stroke="rgba(200,210,255,0.4)" strokeWidth="1.5"/>
          <polygon points="100,2 113,6 100,10" fill="rgba(253,224,71,0.7)"/>
        </svg>
        <div className="absolute top-7 right-8 text-xl opacity-20">🎓</div>
      </div>
    ),

    // Tangerang: Terminal bandara + pesawat — abu baja modern
    tangerang: (
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #080e1c 0%, #0e1a2e 50%, #0a1424 100%)" }}>
        <svg className="absolute top-8 left-1/2 -translate-x-1/2 opacity-55" width="88" height="36" viewBox="0 0 88 36" fill="none">
          <ellipse cx="44" cy="18" rx="36" ry="6" fill="#1a3050" />
          <polygon points="28,18 54,3 58,18" fill="#162848" />
          <polygon points="28,18 54,33 58,18" fill="#122040" />
          <polygon points="6,18 17,9 17,18" fill="#1a3050" />
          <polygon points="6,18 17,27 17,18" fill="#162848" />
          <circle cx="36" cy="23" r="2.8" fill="#3b82f6" opacity="0.65" />
          <circle cx="50" cy="13" r="2.5" fill="#60a5fa" opacity="0.5" />
        </svg>
        <svg className="absolute bottom-0 w-full" height="80" viewBox="0 0 200 80" preserveAspectRatio="none" fill="none">
          <rect x="8"   y="38" width="184" height="42" rx="2" fill="#0c1a30" />
          <rect x="88"  y="12" width="24"  height="48" fill="#0f2244" />
          <rect x="82"  y="10" width="36"  height="12" rx="2" fill="#122652" />
          {[12,28,45,62,80,112,128,144,160,176].map((x,i) => (
            <rect key={i} x={x} y="42" width="11" height="18" rx="1" fill="rgba(96,165,250,0.18)" />
          ))}
          {[18,36,54,72,90,108,126,144,162,180].map((x,i) => (
            <circle key={i} cx={x} cy="79" r="1.5" fill="#fbbf24" opacity="0.55" />
          ))}
        </svg>
        <div className="absolute bottom-16 left-0 right-0 h-px opacity-15" style={{ background: "linear-gradient(90deg,transparent,#60a5fa,transparent)" }} />
      </div>
    ),

    // Bekasi: Kawasan industri + perumahan — amber/orange industrial
    bekasi: (
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #140a02 0%, #1e1004 50%, #180c03 100%)" }}>
        <div className="absolute top-6 right-6 w-12 h-12 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #fb923c, transparent)" }} />
        <svg className="absolute bottom-0 w-full" height="100" viewBox="0 0 200 100" preserveAspectRatio="none" fill="none">
          {/* Factories left */}
          <rect x="0"  y="52" width="28" height="48" fill="#160e04" />
          <rect x="6"  y="36" width="13" height="64" fill="#1a1006" />
          <rect x="32" y="48" width="22" height="52" fill="#140c04" />
          {/* Chimneys */}
          <rect x="10" y="10" width="6"  height="55" fill="#180e05" />
          <rect x="20" y="18" width="5"  height="47" fill="#1a1006" />
          <rect x="46" y="14" width="7"  height="52" fill="#1c1006" />
          {/* Smoke */}
          <circle cx="13" cy="8"  r="5" fill="#231408" opacity="0.45"/>
          <circle cx="22" cy="14" r="4" fill="#231408" opacity="0.35"/>
          <circle cx="49" cy="11" r="5" fill="#231408" opacity="0.40"/>
          {/* Modern apartments right */}
          <rect x="78"  y="28" width="18" height="72" fill="#1c1006" />
          <rect x="100" y="18" width="20" height="82" fill="#201208" />
          <rect x="124" y="32" width="18" height="68" fill="#1c1006" />
          <rect x="146" y="22" width="20" height="78" fill="#201208" />
          <rect x="170" y="38" width="18" height="62" fill="#1c1006" />
          {/* Windows warm */}
          {[80,102,126,148,172].map((x,i) => (
            <g key={i}>
              <rect x={x}   y={36+(i%2)*8} width="5" height="4" fill="rgba(251,146,60,0.4)" />
              <rect x={x+9} y={36+(i%2)*8} width="5" height="4" fill="rgba(251,146,60,0.3)" />
              <rect x={x}   y={50+(i%2)*8} width="5" height="4" fill="rgba(253,186,116,0.25)" />
              <rect x={x+9} y={54+(i%2)*8} width="5" height="4" fill="rgba(253,186,116,0.2)" />
            </g>
          ))}
          <rect x="0" y="96" width="200" height="4" fill="#100802" />
        </svg>
      </div>
    ),
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {illustrations[cityId] ?? (
        <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#0a1628,#102040)" }} />
      )}
    </div>
  );
}

export default function CitySection() {
  const { lang } = useLanguage();

  return (
    <section className="section-padding bg-dark-800/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-3"
          >
            <div className="h-1 w-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
            <span className="text-primary-400 text-sm font-semibold uppercase tracking-wider">
              {lang === "id" ? "Area Layanan" : "Coverage Area"}
            </span>
            <div className="h-1 w-8 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-white text-responsive-md"
          >
            {lang === "id" ? "Tersedia di " : "Available in "}
            <span className="gradient-text">JABODETABEK</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/50 mt-2 max-w-xl mx-auto"
          >
            {lang === "id"
              ? "Ribuan pilihan apartemen tersebar di 5 kota utama di kawasan Jabodetabek."
              : "Thousands of apartment choices spread across 5 major cities in the Jabodetabek region."}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {CITIES.map((city, i) => (
            <motion.div
              key={city.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <Link href={`/listings?city=${city.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl aspect-[3/4] group">
                  {/* CSS Illustration */}
                  <CityIllustration cityId={city.id} />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Bottom gradient for text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/95 via-dark-900/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                    <div className="text-3xl mb-1">{city.icon}</div>
                    <h3 className="font-heading font-bold text-white text-lg">{city.name}</h3>
                    <p className="text-white/60 text-xs">
                      {city.count.toLocaleString()} {lang === "id" ? "listing" : "listings"}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-primary-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {lang === "id" ? "Cari di sini" : "Search here"}
                      <ArrowRight size={12} />
                    </div>
                  </div>

                  {/* Jakarta Hot badge */}
                  {city.id === "jakarta" && (
                    <div className="absolute top-3 right-3 z-10 badge bg-accent-500/90 text-white text-[10px]">
                      🔥 Hot
                    </div>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
