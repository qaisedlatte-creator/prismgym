import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_FEE = 79;
export const COD_FEE = 100;

export function calculateShipping(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const COLORS = ["Black", "White", "Charcoal Grey"];
export const CATEGORIES = ["Vests", "Compression", "Shorts", "Hoodies", "Bottoms", "Accessories"];
