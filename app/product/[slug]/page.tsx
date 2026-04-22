import { notFound } from "next/navigation";
import { ProductDetailClient } from "./ProductDetailClient";
import prisma from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";

const fallbackProducts: Record<string, any> = {
  "stringer-vest": {
    id: "1", name: "Stringer Vest", slug: "stringer-vest", price: 699,
    description: "Cut for the grind, not the gym selfie. This stringer vest lets your shoulders breathe while keeping you locked in. Lightweight performance fabric that wicks sweat and moves with you — set after brutal set.",
    images: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Black", "White", "Charcoal Grey"],
    isNew: true, isFeatured: true, category: "Vests", stock: 100,
  },
  "heavyweight-hoodie": {
    id: "2", name: "Heavyweight Hoodie", slug: "heavyweight-hoodie", price: 1799,
    description: "500GSM French terry that hits different. This heavyweight hoodie is built for cold mornings, post-workout recovery, and making a statement doing nothing at all. This is armour.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Black", "Charcoal Grey"],
    isNew: true, isFeatured: true, category: "Hoodies", stock: 100,
  },
};

const relatedFallback = [
  {
    id: "3", name: "Racerback Vest", slug: "racerback-vest", price: 749,
    description: "Engineered for maximum shoulder mobility and zero restrictions.",
    images: ["https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80"],
    sizes: ["S", "M", "L", "XL"], colors: ["Black", "White"], isNew: false, category: "Vests", stock: 100,
  },
  {
    id: "4", name: "Compression Half Sleeve", slug: "compression-half-sleeve", price: 999,
    description: "Muscle-mapped compression that accelerates recovery and delays fatigue.",
    images: ["https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80"],
    sizes: ["S", "M", "L", "XL"], colors: ["Black"], isNew: false, category: "Compression", stock: 100,
  },
];

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { reviews: { include: { user: { select: { name: true } } } } },
    });
    return product;
  } catch {
    return fallbackProducts[slug] || null;
  }
}

async function getRelated(category: string, excludeId: string) {
  try {
    return await prisma.product.findMany({
      where: { category, id: { not: excludeId } },
      take: 4,
    });
  } catch {
    return relatedFallback;
  }
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
      images: [{ url: product.images[0] }],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
