import { HeroSequence } from "@/components/home/HeroSequence";
import { AboutSection } from "@/components/home/AboutSection";
import { BestsellerRow } from "@/components/home/BestsellerRow";
import { ProductGridSection } from "@/components/home/ProductGridSection";
import { WhatIsPrism } from "@/components/home/WhatIsPrism";
import { WhyPrism } from "@/components/home/WhyPrism";
import { AdvantagesFaq } from "@/components/home/AdvantagesFaq";
import { NewDropBanner } from "@/components/home/NewDropBanner";
import { HowToOrder } from "@/components/home/HowToOrder";
import { PRODUCTS } from "@/lib/products";

const bestsellers = PRODUCTS.filter((p) => p.images.length > 0);

export default function HomePage() {
  return (
    <>
      {/* S1 — Full viewport scroll hero with giant PRISM text */}
      <HeroSequence />

      {/* S2 — About the brand */}
      <AboutSection />

      {/* S3 — Bestseller horizontal scroll row */}
      <BestsellerRow products={bestsellers} />

      {/* S4 — Full product grid with filters + CTA banner */}
      <ProductGridSection products={PRODUCTS} />

      {/* S5 — What is PRISM? (3-col philosophy) */}
      <WhatIsPrism />

      {/* S6 — Why PRISM? (bullet list + CTA) */}
      <WhyPrism />

      {/* S7 — Advantages + FAQ accordion */}
      <AdvantagesFaq />

      {/* S8 — New drop / coming soon banner */}
      <NewDropBanner />

      {/* S9 — How to order (4 numbered steps) */}
      <HowToOrder />
    </>
  );
}
