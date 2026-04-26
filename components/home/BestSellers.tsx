"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/lib/products";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

interface BestsellersProps {
  products: Product[];
}

export function Bestsellers({ products }: BestsellersProps) {
  return (
    <section
      style={{
        padding: "clamp(4rem, 8vw, 7.5rem) 0",
        background: "#fff",
        borderTop: "1px solid #e8e8e8",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56 }}
        >
          <div>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.6rem",
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#666",
                marginBottom: 8,
              }}
            >
              CUSTOMER FAVOURITES
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                lineHeight: 1,
                color: "#000",
              }}
            >
              BESTSELLERS
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/catalog"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                color: "#000",
                textDecoration: "none",
                borderBottom: "1px solid #000",
                paddingBottom: 2,
              }}
            >
              VIEW ALL →
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-8 sm:gap-6"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
