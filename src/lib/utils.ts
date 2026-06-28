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

/**
 * Build a WhatsApp deep-link.
 * - apartmentName: include the listing title in the opening message
 * - message: full override (highest priority)
 */
export function getWhatsAppUrl(
  phone: string,
  message?: string,
  apartmentName?: string
): string {
  const cleanPhone = phone.replace(/\D/g, "");
  let text: string;
  if (message) {
    text = message;
  } else if (apartmentName) {
    text = `Halo, saya tertarik dengan apartemen *${apartmentName}* yang Anda iklankan di SewaApartement.id. Boleh saya tanya lebih lanjut mengenai ketersediaan dan harga?`;
  } else {
    text = "Halo, saya tertarik dengan apartemen yang Anda iklankan di SewaApartement.id. Boleh saya tanya lebih lanjut?";
  }
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
