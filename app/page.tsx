import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { AboutSection } from "@/components/home/AboutSection";
import { Reviews } from "@/components/home/Reviews";
import { InstagramStrip } from "@/components/home/InstagramStrip";
import prisma from "@/lib/prisma";

const fallbackProducts = [
  {
    id: "1", name: "Stringer Vest", slug: "stringer-vest", price: 699,
    images: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Black", "White", "Charcoal Grey"],
    isNew: true, category: "Vests", stock: 100,
  },
  {
    id: "2", name: "Heavyweight Hoodie", slug: "heavyweight-hoodie", price: 1799,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Black", "Charcoal Grey"],
    isNew: true, category: "Hoodies", stock: 100,
  },
  {
    id: "3", name: "Cargo Track Pants", slug: "cargo-track-pants", price: 1299,
    images: [
      "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Black"],
    isNew: true, category: "Bottoms", stock: 100,
  },
  {
    id: "4", name: '7" Training Shorts', slug: "7-inch-training-shorts", price: 899,
    images: [
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"], colors: ["Black", "White", "Charcoal Grey"],
    isNew: false, category: "Shorts", stock: 100,
  },
];

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isFeatured: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
    return products.length > 0 ? products : fallbackProducts;
  } catch {
    return fallbackProducts;
  }
}

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedProducts products={products} />
      <CategoryGrid />
      <AboutSection />
      <Reviews />
      <InstagramStrip />
    </>
  );
}
