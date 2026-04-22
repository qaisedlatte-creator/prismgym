"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, Search, X, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useSession } from "next-auth/react";

const navLinks = [
  { href: "/catalog", label: "CATALOG" },
  { href: "/about", label: "ABOUT" },
  { href: "/#contact", label: "CONTACT" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getItemCount, openCart } = useCartStore();
  const { data: session } = useSession();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#2e2e2e]" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.svg"
              alt="PRISM INDIA"
              width={36}
              height={36}
              className="invert"
            />
            <span
              className="text-white font-bebas text-xl tracking-widest hidden sm:block"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              PRISM INDIA
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#888888] hover:text-white text-xs tracking-[0.2em] font-medium transition-colors duration-200 uppercase"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="text-[#888888] hover:text-white transition-colors p-1">
              <Search size={18} />
            </button>
            <Link
              href={session ? "/account" : "/login"}
              className="text-[#888888] hover:text-white transition-colors p-1"
            >
              <User size={18} />
            </Link>
            <button
              onClick={openCart}
              className="text-[#888888] hover:text-white transition-colors p-1 relative"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-[#0a0a0a] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
            <button
              className="md:hidden text-[#888888] hover:text-white transition-colors p-1"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 bg-[#0a0a0a] z-50 flex flex-col p-8"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex items-center justify-between mb-16">
              <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                <Image src="/logo.svg" alt="PRISM" width={32} height={32} className="invert" />
                <span className="font-bebas text-xl text-white tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  PRISM INDIA
                </span>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-white font-bebas text-5xl tracking-widest hover:text-[#888888] transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href={session ? "/account" : "/login"}
                  onClick={() => setMobileOpen(false)}
                  className="text-white font-bebas text-5xl tracking-widest hover:text-[#888888] transition-colors"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {session ? "ACCOUNT" : "LOGIN"}
                </Link>
              </motion.div>
            </nav>

            <div className="mt-auto pt-8 border-t border-[#2e2e2e]">
              <p className="text-[#888888] text-xs tracking-widest">@prismindia.in</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
