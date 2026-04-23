"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, User, X, Menu } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useSession } from "next-auth/react";

const navLinks = [
  { href: "/catalog", label: "CATALOG" },
  { href: "/about", label: "ABOUT" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getItemCount, openCart } = useCartStore();
  const { data: session } = useSession();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: scrolled ? 0 : "2rem",
          left: 0,
          right: 0,
          zIndex: 40,
          background: scrolled ? "rgba(10,10,10,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid #2a2a2a" : "none",
          transition: "background 0.3s ease, backdrop-filter 0.3s ease, top 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo — image only, no text */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="PRISM INDIA"
              width={52}
              height={52}
              priority
              style={{ height: "52px", width: "auto" }}
              className="invert md:h-[52px] h-[44px]"
            />
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
      </nav>

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
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Image src="/logo.svg" alt="PRISM" width={44} height={44} className="invert" style={{ height: "44px", width: "auto" }} />
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
                    className="text-white text-5xl tracking-widest hover:text-[#888888] transition-colors"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href={session ? "/account" : "/login"}
                  onClick={() => setMobileOpen(false)}
                  className="text-white text-5xl tracking-widest hover:text-[#888888] transition-colors"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {session ? "ACCOUNT" : "LOGIN"}
                </Link>
              </motion.div>
            </nav>

            <div className="mt-auto pt-8 border-t border-[#2a2a2a]">
              <p className="text-[#888888] text-xs tracking-widest">@prismindia.in</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
