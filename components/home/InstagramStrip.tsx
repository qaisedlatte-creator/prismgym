"use client";

import { motion } from "framer-motion";
import Image from "next/image";
const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const posts = [
  "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80",
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80",
  "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&q=80",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=400&q=80",
];

export function InstagramStrip() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <a
          href="https://instagram.com/prismindia.in"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 group"
        >
          <InstagramIcon size={20} />
          <span
            className="text-white tracking-[0.3em] text-2xl sm:text-4xl group-hover:text-[#888888] transition-colors"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            @PRISMINDIA.IN
          </span>
        </a>
      </motion.div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1">
        {posts.map((src, i) => (
          <motion.a
            key={i}
            href="https://instagram.com/prismindia.in"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square overflow-hidden group bg-[#1a1a1a]"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <Image
              src={src}
              alt={`PRISM INDIA Instagram post ${i + 1}`}
              fill
              className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
              <InstagramIcon size={20} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
