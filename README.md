# SewaApartement

Platform marketplace sewa apartemen di JABODETABEK. 2.940+ listing real dengan harga market rate, fitur bilingual (ID/EN), 3D hero scene, dan panel admin.

**Tech Stack:** Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Three.js · Vercel

## Features

- 2.940+ listing apartemen real JABODETABEK
- Pencarian & filter (kota, tipe unit, harga, durasi, fasilitas)
- Bilingual (ID/EN)
- 3D Hero Scene (Three.js interaktif)
- Blog properti
- Admin dashboard (panel pengelolaan listing)
- Auth (login, register, forgot password)
- Dashboard pengguna
- SEO (metadata, sitemap, robots.txt, OpenGraph)
- Analytics (Vercel Analytics, GA4, GTM)
- Responsive (mobile, tablet, desktop)

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    page.tsx                → Beranda (hero 3D, listing unggulan, statistik)
    listings/               → Pencarian & detail apartemen
    blog/                   → Artikel properti
    auth/                   → Login, register, forgot password
    dashboard/              → Dashboard pengguna
    admin/                  → Panel admin
    about/contact/how-it-works/privacy/terms/cookies/
  components/
    home/                   → Hero, Stats, Featured, City, Testimonials, CTA
    layout/                 → Navbar, Footer
    ui/                     → PropertyCard, CountUp
    3d/                     → HeroScene (Three.js)
  hooks/                    → useLanguage (ID/EN toggle)
  lib/
    data.ts                 → Data listing, kota, tipe, fasilitas
    utils.ts                → cn, formatPrice, getWhatsAppUrl
  types/                    → TypeScript definitions
```

## License

MIT
