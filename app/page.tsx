import { HeroSequence } from "@/components/home/HeroSequence";
import { Marquee } from "@/components/home/Marquee";
import { ProductGrid } from "@/components/home/ProductGrid";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <HeroSequence />
      <Marquee />
      <ProductGrid products={PRODUCTS} />
    </>
  );
}
