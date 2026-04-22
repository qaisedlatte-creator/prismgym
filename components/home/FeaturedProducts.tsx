"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
  category: string;
  stock: number;
}

interface FeaturedProductsProps {
  products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex items-end justify-between mb-12">
        <div>
          <motion.p
            className="text-[#888888] text-xs tracking-[0.3em] uppercase mb-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            FEATURED
          </motion.p>
          <motion.h2
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}
            className="text-white tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            NEW ARRIVALS
          </motion.h2>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link
            href="/catalog"
            className="flex items-center gap-2 text-[#888888] hover:text-white text-xs tracking-[0.2em] uppercase transition-colors group"
          >
            VIEW ALL
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
