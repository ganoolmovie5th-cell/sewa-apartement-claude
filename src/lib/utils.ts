import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    const inMillion = price / 1000000;
    return `Rp ${inMillion % 1 === 0 ? inMillion.toFixed(0) : inMillion.toFixed(1)} Jt`;
  }
  return `Rp ${price.toLocaleString("id-ID")}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString("id-ID");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  const defaultMsg = message || "Halo, saya tertarik dengan apartemen yang Anda iklankan di SewaTerlengkap. Boleh saya tanya lebih lanjut?";
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;
}

export function generateStars(rating: number): string[] {
  return Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rating)) return "full";
    if (i < rating) return "half";
    return "empty";
  });
}

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
