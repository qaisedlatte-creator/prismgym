import Link from "next/link";
import Image from "next/image";
const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const footerLinks = {
  shop: [
    { href: "/catalog?category=Vests", label: "Vests & Stringers" },
    { href: "/catalog?category=Compression", label: "Compression" },
    { href: "/catalog?category=Shorts", label: "Shorts" },
    { href: "/catalog?category=Hoodies", label: "Hoodies" },
    { href: "/catalog?category=Accessories", label: "Accessories" },
  ],
  info: [
    { href: "/about", label: "About Us" },
    { href: "/size-guide", label: "Size Guide" },
    { href: "/shipping", label: "Shipping & Returns" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2e2e2e] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <Image src="/logo.svg" alt="PRISM INDIA" width={40} height={40} className="invert" />
              <span
                className="text-white text-2xl tracking-widest"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                PRISM INDIA
              </span>
            </Link>
            <p className="text-[#888888] text-sm leading-relaxed max-w-xs mb-6">
              Streetwear meets performance. Built for those who train hard and live harder.
              Born from iron. Worn on the streets.
            </p>
            <a
              href="https://instagram.com/prismindia.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#888888] hover:text-white transition-colors text-sm"
            >
              <InstagramIcon size={16} />
              @prismindia.in
            </a>
          </div>

          {/* Shop */}
          <div>
            <h4
              className="text-white text-sm tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#888888] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4
              className="text-white text-sm tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Info
            </h4>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#888888] hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#2e2e2e] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#888888] text-xs tracking-widest">
            © 2025 PRISM INDIA. All rights reserved.
          </p>
          <p className="text-[#888888] text-xs tracking-widest">Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
