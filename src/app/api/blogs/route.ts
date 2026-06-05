import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";

function getBlogs() {
  const filePath = join(process.cwd(), "data", "blogs.json");
  if (!existsSync(filePath)) return [];
  try {
    const raw = readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

// GET /api/blogs — list semua artikel (bisa filter ?slug=xxx atau ?featured=true)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");
  const featured = searchParams.get("featured");
  const limit = searchParams.get("limit");
  const category = searchParams.get("category");

  let blogs = getBlogs();

  // Sort by date desc
  blogs.sort(
    (a: any, b: any) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  if (slug) {
    const post = blogs.find((b: any) => b.slug === slug);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  }

  if (featured === "true") {
    blogs = blogs.filter((b: any) => b.featured);
  }

  if (category) {
    blogs = blogs.filter(
      (b: any) =>
        b.category?.id?.toLowerCase().includes(category.toLowerCase()) ||
        b.category?.en?.toLowerCase().includes(category.toLowerCase())
    );
  }

  if (limit) {
    blogs = blogs.slice(0, parseInt(limit));
  }

  return NextResponse.json(blogs);
}
