import { NextRequest, NextResponse } from "next/server";
// Import seed + in-memory cache dari generate-blog
import { SEED_BLOGS } from "@/app/api/generate-blog/route";

// In-memory cache (shared global)
declare global {
  var __blogCache: any[] | undefined;
}

function getAllArticles() {
  const cached = global.__blogCache ?? [];
  const seedIds = new Set(SEED_BLOGS.map((s: any) => s.id));
  const cachedOnly = cached.filter((a: any) => !seedIds.has(a.id));
  return [...SEED_BLOGS, ...cachedOnly].sort(
    (a: any, b: any) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug     = searchParams.get("slug");
  const featured = searchParams.get("featured");
  const limit    = searchParams.get("limit");
  const category = searchParams.get("category");

  let articles = getAllArticles();

  if (slug) {
    const post = articles.find((b: any) => b.slug === slug);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  }

  if (featured === "true") {
    articles = articles.filter((b: any) => b.featured);
  }

  if (category) {
    const cat = category.toLowerCase();
    articles = articles.filter(
      (b: any) =>
        b.category?.id?.toLowerCase().includes(cat) ||
        b.category?.en?.toLowerCase().includes(cat)
    );
  }

  if (limit) {
    articles = articles.slice(0, parseInt(limit));
  }

  return NextResponse.json(articles);
}
