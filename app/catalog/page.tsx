import { CatalogClient } from "./CatalogClient";
import prisma from "@/lib/prisma";
import { CATEGORIES } from "@/lib/utils";

const fallbackProducts = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  name: ["Stringer Vest", "Heavyweight Hoodie", "Cargo Track Pants", '7" Training Shorts', "Compression Half Sleeve", "Racerback Vest", "Zip-Up Hoodie", "Compression Shorts", '5" Training Shorts', "Crewneck Sweatshirt", "Training Track Pants", "Gym Bag"][i],
  slug: ["stringer-vest", "heavyweight-hoodie", "cargo-track-pants", "7-inch-training-shorts", "compression-half-sleeve", "racerback-vest", "zip-up-hoodie", "compression-shorts", "5-inch-training-shorts", "crewneck-sweatshirt", "training-track-pants", "gym-bag"][i],
  price: [699, 1799, 1299, 899, 999, 749, 1899, 899, 849, 1499, 1099, 1999][i],
  images: [
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["Black", "White", "Charcoal Grey"],
  isNew: i < 4,
  category: ["Vests", "Hoodies", "Bottoms", "Shorts", "Compression", "Vests", "Hoodies", "Compression", "Shorts", "Hoodies", "Bottoms", "Accessories"][i],
  stock: 100,
}));

async function getProducts() {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return products.length > 0 ? products : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export const metadata = {
  title: "Catalog",
  description: "Shop all PRISM INDIA gym wear and streetwear — Vests, Hoodies, Shorts, Compression, Accessories.",
};

export default async function CatalogPage() {
  const products = await getProducts();
  return <CatalogClient products={products} categories={CATEGORIES} />;
}
