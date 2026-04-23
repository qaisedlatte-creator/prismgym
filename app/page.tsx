import { HeroSequence } from "@/components/home/HeroSequence";
import { Marquee } from "@/components/home/Marquee";
import { BestSellers } from "@/components/home/BestSellers";
import { ProductGrid } from "@/components/home/ProductGrid";
import { PRODUCTS } from "@/lib/products";

// Best sellers = products that have real images
const bestSellers = PRODUCTS.filter((p) => p.images.length > 0);

export default function HomePage() {
  return (
    <>
      <HeroSequence />
      <Marquee />
      <BestSellers products={bestSellers} />
      <ProductGrid products={PRODUCTS} />
    </>
  );
}
