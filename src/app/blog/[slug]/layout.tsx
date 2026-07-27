import type { Metadata } from "next";
import { BLOG_POSTS } from "@/lib/data";

const SITE_URL = "https://www.sewa-apartement.web.id";

function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: post.title.id,
    description: post.excerpt.id,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title.id,
      description: post.excerpt.id,
      images: [post.image],
      type: "article",
      locale: "id_ID",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

// post.date is already ISO 8601 ("2024-03-01") in data.ts — no conversion needed.
function postJsonLd(post: NonNullable<ReturnType<typeof getPost>>) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.id,
    description: post.excerpt.id,
    image: post.image,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Sewa Apartement",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.svg` },
    },
    articleSection: post.category.id,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    inLanguage: "id-ID",
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postJsonLd(post)) }}
        />
      )}
      {children}
    </>
  );
}
