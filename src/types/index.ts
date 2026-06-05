export type Language = "id" | "en";

export interface BilingualText {
  id: string;
  en: string;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  location: string;
  city: string;
  type: string;
  price: number;
  priceUnit: string;
  size: number;
  floor: number;
  totalFloors: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  amenities: string[];
  description: BilingualText;
  ownerName: string;
  ownerPhone: string;
  ownerAvatar: string;
  rating: number;
  reviews: number;
  ratingSource?: string;
  featured: boolean;
  verified: boolean;
  available: boolean;
  tags: string[];
  createdAt: string;
}

export interface FilterState {
  city: string;
  type: string;
  priceMin: number;
  priceMax: number;
  duration: string;
  amenities: string[];
  keyword: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: "owner" | "admin";
  verified: boolean;
  createdAt: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: BilingualText;
  excerpt: BilingualText;
  category: BilingualText;
  image: string;
  author: string;
  date: string;
  readTime: number;
}
