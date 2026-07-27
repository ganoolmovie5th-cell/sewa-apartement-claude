import type { Metadata } from "next";
import { SAMPLE_LISTINGS, CITIES } from "@/lib/data";

const SITE_URL = "https://www.sewa-apartement.web.id";

function getListing(slug: string) {
  return SAMPLE_LISTINGS.find((l) => l.slug === slug);
}

function cityName(id: string) {
  return CITIES.find((c) => c.id === id)?.name ?? id;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return { title: "Listing Tidak Ditemukan" };

  const price = new Intl.NumberFormat("id-ID").format(listing.price);
  return {
    title: `${listing.title} – Sewa Rp ${price}/${listing.priceUnit}`,
    description: `Sewa ${listing.title} di ${cityName(listing.city)}. ${listing.size} m², ${listing.bedrooms === 0 ? "studio" : `${listing.bedrooms} kamar tidur`}, ${listing.bathrooms} kamar mandi. Rp ${price}/${listing.priceUnit}.`,
    alternates: { canonical: `/listings/${listing.slug}` },
    openGraph: {
      title: listing.title,
      description: listing.description.id.slice(0, 160),
      images: listing.images.slice(0, 1),
      type: "website",
      locale: "id_ID",
    },
  };
}

// page.tsx is 'use client' so metadata + JSON-LD live here. Product/Offer with
// numeric price — priceUnit goes in UnitPriceSpecification, never in the price
// string, or Google's parser rejects it.
function listingJsonLd(listing: NonNullable<ReturnType<typeof getListing>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.description.id,
    image: listing.images,
    url: `${SITE_URL}/listings/${listing.slug}`,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/listings/${listing.slug}`,
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: listing.price,
        priceCurrency: "IDR",
        unitText: listing.priceUnit,
      },
    },
    additionalProperty: [
      { "@type": "PropertyValue", name: "Luas", value: `${listing.size} m²` },
      { "@type": "PropertyValue", name: "Kamar Tidur", value: listing.bedrooms },
      { "@type": "PropertyValue", name: "Kamar Mandi", value: listing.bathrooms },
    ],
  };
}

export default async function ListingDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing = getListing(slug);

  return (
    <>
      {listing && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(listingJsonLd(listing)) }}
        />
      )}
      {children}
    </>
  );
}
