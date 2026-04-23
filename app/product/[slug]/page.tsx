import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";
import prisma from "@/lib/prisma";
import { PRODUCTS } from "@/lib/products";

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { reviews: { include: { user: { select: { name: true } } } } },
    });
    if (product) return product;
  } catch {}
  return PRODUCTS.find((p) => p.slug === slug) || null;
}

async function getRelated(category: string, excludeId: string) {
  try {
    const products = await prisma.product.findMany({
      where: { category, id: { not: excludeId } },
      take: 4,
    });
    if (products.length > 0) return products;
  } catch {}
  return PRODUCTS.filter((p) => p.category === category && p.id !== excludeId).slice(0, 4);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} | PRISM INDIA`,
      description: product.description,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const related = await getRelated(product.category, product.id);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "INR",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
