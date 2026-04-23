import Link from "next/link";
import Image from "next/image";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#2a2a2a] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/">
          <Image src="/logo.svg" alt="PRISM INDIA" width={48} height={48} className="invert" style={{ height: "48px", width: "auto" }} />
        </Link>

        <nav className="flex flex-wrap items-center gap-6 text-xs tracking-[0.2em] uppercase text-[#888888]">
          <Link href="/catalog" className="hover:text-white transition-colors">Catalog</Link>
          <Link href="/about" className="hover:text-white transition-colors">About</Link>
          <Link href="/account" className="hover:text-white transition-colors">Account</Link>
        </nav>

        <div className="flex flex-col items-center sm:items-end gap-2">
          <a
            href="https://instagram.com/prismindia.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#888888] hover:text-white transition-colors text-sm"
          >
            <InstagramIcon size={16} />
            @prismindia.in
          </a>
          <p className="text-[#888888] text-xs tracking-widest">© 2025 PRISM INDIA</p>
        </div>
      </div>
    </footer>
  );
}
