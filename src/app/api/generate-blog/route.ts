import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

// ─────────────────────────────────────────────────────────────────────────────
// Topik artikel yang akan di-rotate setiap minggu
// AI akan memilih dari daftar ini secara berurutan (round-robin)
// ─────────────────────────────────────────────────────────────────────────────
const WEEKLY_TOPICS = [
  {
    id: "tips-nego",
    title: { id: "Tips Negosiasi Harga Sewa Apartemen", en: "Tips for Negotiating Apartment Rent" },
    category: { id: "Tips & Trik", en: "Tips & Tricks" },
    keywords: ["negosiasi harga", "sewa apartemen", "tips hemat", "JABODETABEK"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",
  },
  {
    id: "expat-friendly",
    title: { id: "Apartemen Ramah Ekspatriat di Jakarta 2024", en: "Expat-Friendly Apartments in Jakarta 2024" },
    category: { id: "Rekomendasi", en: "Recommendation" },
    keywords: ["ekspatriat", "expat", "jakarta", "apartemen premium", "SCBD"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
  {
    id: "tren-2024",
    title: { id: "Tren Pasar Sewa Apartemen JABODETABEK", en: "JABODETABEK Apartment Rental Market Trends" },
    category: { id: "Analisis Pasar", en: "Market Analysis" },
    keywords: ["tren properti", "pasar sewa", "JABODETABEK", "2024", "analisis"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  },
  {
    id: "studio-vs-1br",
    title: { id: "Studio vs 1BR: Mana yang Lebih Worth It?", en: "Studio vs 1BR: Which is More Worth It?" },
    category: { id: "Panduan", en: "Guide" },
    keywords: ["studio", "1 bedroom", "perbandingan", "tips memilih", "apartemen"],
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
  },
  {
    id: "checklist-sewa",
    title: { id: "Checklist Lengkap Sebelum Sewa Apartemen", en: "Complete Checklist Before Renting an Apartment" },
    category: { id: "Panduan", en: "Guide" },
    keywords: ["checklist", "panduan sewa", "tips", "sebelum sewa", "apartemen"],
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
  },
  {
    id: "bsd-vs-bintaro",
    title: { id: "BSD City vs Bintaro: Pilih Mana untuk Hunian?", en: "BSD City vs Bintaro: Which to Choose for Living?" },
    category: { id: "Perbandingan", en: "Comparison" },
    keywords: ["BSD City", "Bintaro", "Tangerang Selatan", "perbandingan kawasan"],
    image: "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?w=800&q=80",
  },
  {
    id: "investasi-properti",
    title: { id: "Apartemen Sewaan sebagai Investasi Properti", en: "Rental Apartments as Property Investment" },
    category: { id: "Investasi", en: "Investment" },
    keywords: ["investasi properti", "sewa apartemen", "passive income", "ROI"],
    image: "https://images.unsplash.com/photo-1560185008-a33f5c7b1844?w=800&q=80",
  },
  {
    id: "kalibata-bekasi",
    title: { id: "Panduan Lengkap Apartemen di Bekasi 2024", en: "Complete Apartment Guide in Bekasi 2024" },
    category: { id: "Panduan", en: "Guide" },
    keywords: ["bekasi", "Summarecon", "apartemen bekasi", "harga sewa bekasi"],
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers untuk baca/tulis data/blogs.json
// ─────────────────────────────────────────────────────────────────────────────
const DATA_PATH = join(process.cwd(), "data", "blogs.json");

function readBlogs(): any[] {
  if (!existsSync(DATA_PATH)) return [];
  try {
    return JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeBlogs(blogs: any[]) {
  const dir = join(process.cwd(), "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DATA_PATH, JSON.stringify(blogs, null, 2), "utf-8");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ─────────────────────────────────────────────────────────────────────────────
// Generate konten artikel menggunakan Mistral AI
// Model: mistral-small-latest (murah & cepat, cocok untuk konten blog)
// Fallback template otomatis jika API key tidak ada / error
// ─────────────────────────────────────────────────────────────────────────────
async function generateArticleWithMistral(topic: (typeof WEEKLY_TOPICS)[0]) {
  const apiKey = process.env.MISTRAL_API_KEY;

  const prompt = `Kamu adalah penulis konten properti profesional Indonesia untuk website SewaApartement.id.
Tulis artikel blog informatif tentang: "${topic.title.id}"
Keyword yang harus dimasukkan: ${topic.keywords.join(", ")}
Website: SewaApartement.id — platform marketplace sewa apartemen JABODETABEK untuk mahasiswa, pekerja, dan keluarga.

Format output JSON (HANYA JSON murni, tanpa markdown code block, tanpa teks lain):
{
  "title_id": "judul bahasa Indonesia yang menarik",
  "title_en": "judul bahasa Inggris",
  "excerpt_id": "ringkasan 2 kalimat bahasa Indonesia",
  "excerpt_en": "ringkasan 2 kalimat bahasa Inggris",
  "content_id": "konten artikel lengkap bahasa Indonesia dalam format markdown, minimal 500 kata, gunakan ## heading, **bold**, list -, dan paragraf informatif. Selipkan SewaApartement.id secara natural di akhir.",
  "content_en": "full article content in English markdown format, minimum 400 words",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`;

  // ── Mistral AI API ──────────────────────────────────────────────────────
  if (apiKey) {
    const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "mistral-small-latest",   // model terjangkau Mistral
        messages: [{ role: "user", content: prompt }],
        temperature: 0.75,
        max_tokens: 4000,
        response_format: { type: "json_object" }, // force JSON output
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Mistral API error ${res.status}: ${errText}`);
    }

    const data = await res.json();
    const raw = data.choices[0].message.content.trim();
    // strip markdown code block jika ada (safety net)
    const cleaned = raw
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();
    return JSON.parse(cleaned);
  }

  // ── Fallback: generate konten template tanpa API key ──────────────────
  return generateFallbackContent(topic);
}

function generateFallbackContent(topic: (typeof WEEKLY_TOPICS)[0]) {
  const now = new Date();
  const month = now.toLocaleString("id-ID", { month: "long", year: "numeric" });

  const contentId = `## ${topic.title.id}

Pasar properti JABODETABEK terus berkembang pesat. ${topic.keywords[0]} menjadi salah satu topik yang paling banyak dicari oleh para pencari hunian di kawasan Jakarta, Bogor, Depok, Tangerang, dan Bekasi.

### Mengapa Ini Penting?

Dengan harga sewa yang terus berfluktuasi, memahami ${topic.keywords[0]} sangat krusial bagi siapapun yang sedang mencari atau menyewakan apartemen di JABODETABEK pada ${month}.

### Panduan Lengkap

**1. Riset Pasar Terlebih Dahulu**
Sebelum mengambil keputusan, lakukan riset mendalam tentang harga pasaran di area yang Anda tuju. Platform seperti SewaApartement.id menyediakan data listing real-time dari seluruh JABODETABEK.

**2. Bandingkan Beberapa Pilihan**
Jangan terburu-buru. Bandingkan minimal 3-5 unit apartemen sebelum memutuskan. Perhatikan tidak hanya harga, tapi juga fasilitas yang sudah include (WiFi, IPL, listrik, air).

**3. Manfaatkan Teknologi**
Gunakan fitur filter di SewaApartement.id untuk menyaring berdasarkan kota, tipe unit, rentang harga, dan fasilitas yang Anda butuhkan.

**4. Hubungi Pemilik Langsung**
Salah satu keunggulan SewaApartement.id adalah Anda bisa langsung menghubungi pemilik via WhatsApp tanpa perantara. Ini memungkinkan negosiasi yang lebih fleksibel.

**5. Perhatikan Tren Musiman**
Harga sewa apartemen di JABODETABEK cenderung naik menjelang tahun ajaran baru (Juni-Agustus) dan awal tahun. Rencanakan pencarian Anda di luar periode tersebut untuk harga lebih baik.

### Kesimpulan

Dengan strategi yang tepat dan informasi yang akurat, menemukan apartemen ideal di JABODETABEK tidaklah sulit. Kunjungi [SewaApartement.id](https://sewa-apartement-claude.vercel.app) untuk melihat 2.940+ listing terverifikasi dari seluruh JABODETABEK.`;

  return {
    title_id: topic.title.id,
    title_en: topic.title.en,
    excerpt_id: `Panduan lengkap tentang ${topic.keywords[0]} di JABODETABEK untuk ${month}. Temukan tips dan rekomendasi terbaik dari SewaApartement.id.`,
    excerpt_en: `Complete guide about ${topic.keywords[0]} in JABODETABEK for ${month}. Find the best tips and recommendations from SewaApartement.id.`,
    content_id: contentId,
    content_en: `## ${topic.title.en}\n\nThe JABODETABEK property market continues to grow rapidly. ${topic.keywords[0]} is one of the most searched topics by housing seekers in the Jakarta, Bogor, Depok, Tangerang, and Bekasi areas.\n\n### Why This Matters\n\nWith rental prices constantly fluctuating, understanding ${topic.keywords[0]} is crucial for anyone looking to rent or lease apartments in JABODETABEK.\n\n### Conclusion\n\nWith the right strategy and accurate information, finding the ideal apartment in JABODETABEK is not difficult. Visit SewaApartement.id to see 2,940+ verified listings from across JABODETABEK.`,
    tags: topic.keywords,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/generate-blog — dipanggil oleh Vercel Cron setiap Senin 08:00 WIB
// Juga bisa dipanggil manual dengan header Authorization: Bearer <CRON_SECRET>
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // ── Auth guard ──────────────────────────────────────────────────────────
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || "sewa-cron-secret-2024";
  const isVercelCron = req.headers.get("x-vercel-cron") === "1";

  if (!isVercelCron && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = readBlogs();

    // Hitung topic index berdasarkan minggu ke berapa sejak epoch
    const weeksSinceEpoch = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
    const topicIndex = weeksSinceEpoch % WEEKLY_TOPICS.length;
    const topic = WEEKLY_TOPICS[topicIndex];

    // Cek apakah topik ini sudah pernah dibuat dalam 7 hari terakhir
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentTopicExists = blogs.some(
      (b: any) =>
        b.topicId === topic.id &&
        new Date(b.publishedAt) > sevenDaysAgo
    );

    if (recentTopicExists) {
      return NextResponse.json({
        success: false,
        message: "Artikel untuk topik ini sudah ada minggu ini.",
        topicId: topic.id,
      });
    }

    // Generate konten
    const generated = await generateArticleWithMistral(topic);

    const now = new Date();
    const dateStr = now.toISOString().split("T")[0];
    const slug = `${slugify(generated.title_id)}-${dateStr}`;

    const newArticle = {
      id: `auto-${Date.now()}`,
      slug,
      topicId: topic.id,
      title: {
        id: generated.title_id,
        en: generated.title_en,
      },
      excerpt: {
        id: generated.excerpt_id,
        en: generated.excerpt_en,
      },
      content: {
        id: generated.content_id,
        en: generated.content_en,
      },
      category: topic.category,
      tags: generated.tags || topic.keywords,
      image: topic.image,
      author: "AI Redaksi SewaApartement",
      authorAvatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=60&q=80",
      publishedAt: now.toISOString(),
      readTime: Math.ceil((generated.content_id?.length || 1000) / 1000),
      views: 0,
      featured: false,
      autoGenerated: true,
      generatedWithAI: !!process.env.MISTRAL_API_KEY,
    };

    // Simpan ke blogs.json
    blogs.push(newArticle);
    writeBlogs(blogs);

    return NextResponse.json({
      success: true,
      message: `Artikel berhasil di-generate: "${newArticle.title.id}"`,
      article: {
        id: newArticle.id,
        slug: newArticle.slug,
        title: newArticle.title,
        publishedAt: newArticle.publishedAt,
        generatedWithAI: newArticle.generatedWithAI,
      },
    });
  } catch (err: any) {
    console.error("[generate-blog] Error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Internal error" },
      { status: 500 }
    );
  }
}

// GET — untuk test / preview topik minggu ini tanpa generate
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET || "sewa-cron-secret-2024";
  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const weeksSinceEpoch = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
  const topicIndex = weeksSinceEpoch % WEEKLY_TOPICS.length;
  const topic = WEEKLY_TOPICS[topicIndex];
  const blogs = readBlogs();

  return NextResponse.json({
    currentWeekTopic: topic,
    topicIndex,
    totalTopics: WEEKLY_TOPICS.length,
    nextTopicIn: `${7 - (new Date().getDay() || 7)} hari`,
    totalArticles: blogs.length,
    autoGeneratedCount: blogs.filter((b: any) => b.autoGenerated).length,
    hasMistralKey: !!process.env.MISTRAL_API_KEY,
    allTopics: WEEKLY_TOPICS.map((t, i) => ({
      index: i,
      id: t.id,
      title: t.title.id,
      isCurrent: i === topicIndex,
    })),
  });
}
