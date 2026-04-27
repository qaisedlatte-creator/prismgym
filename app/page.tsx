import { HeroStatic } from "@/components/home/HeroStatic";
import { MarqueeStrip } from "@/components/home/MarqueeStrip";
import { NewArrivals } from "@/components/home/NewArrivals";
import { FeatureStrip } from "@/components/home/FeatureStrip";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { Bestsellers } from "@/components/home/Bestsellers";
import { ManifestoSection } from "@/components/home/ManifestoSection";
import { Newsletter } from "@/components/home/Newsletter";
import { NEW_ARRIVALS, BESTSELLERS } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <HeroStatic />
      <MarqueeStrip />
      <NewArrivals products={NEW_ARRIVALS} />
      <FeatureStrip />
      <CategoryTiles />
      <Bestsellers products={BESTSELLERS} />
      <ManifestoSection />
      <Newsletter />
    </>
  );
}
