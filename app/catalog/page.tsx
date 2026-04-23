import { CatalogClient } from "./CatalogClient";
import { PRODUCTS } from "@/lib/products";
import prisma from "@/lib/prisma";

async function getProducts() {
  try {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    if (products.length > 0) return products;
  } catch {}
  return PRODUCTS;
}

export const metadata = {
  title: "Catalog",
  description: "Shop all PRISM INDIA gym wear — Vests, Compression, Accessories.",
};

export default async function CatalogPage() {
  const products = await getProducts();
  return <CatalogClient products={products} />;
}
