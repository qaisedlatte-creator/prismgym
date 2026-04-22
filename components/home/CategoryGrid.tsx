"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    name: "VESTS",
    href: "/catalog?category=Vests",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
    description: "Stringers · Racerbacks · Oversized",
  },
  {
    name: "COMPRESSION",
    href: "/catalog?category=Compression",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    description: "Half Sleeve · Full Sleeve · Shorts",
  },
  {
    name: "SHORTS",
    href: "/catalog?category=Shorts",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    description: '5" · 7" · Board Shorts',
  },
  {
    name: "HOODIES",
    href: "/catalog?category=Hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
    description: "Heavyweight · Zip-Up · Crewneck",
  },
  {
    name: "ACCESSORIES",
    href: "/catalog?category=Accessories",
    image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&q=80",
    description: "Gloves · Belts · Bags · Bands",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-[#888888] text-xs tracking-[0.3em] uppercase mb-3">SHOP BY CATEGORY</p>
        <h2
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1 }}
          className="text-white tracking-wide"
        >
          THE COLLECTION
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <Link
              href={cat.href}
              className="group relative block overflow-hidden aspect-[2/3] bg-[#1a1a1a] rounded-sm"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3
                  className="text-white tracking-widest text-lg group-hover:text-[#c0c0c0] transition-colors"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {cat.name}
                </h3>
                <p className="text-[#888888] text-[10px] mt-1 leading-tight">{cat.description}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
