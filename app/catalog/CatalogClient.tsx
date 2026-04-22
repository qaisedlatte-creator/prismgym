"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/product/ProductCard";
import { SIZES, COLORS } from "@/lib/utils";

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

interface CatalogClientProps {
  products: Product[];
  categories: string[];
}

type SortOption = "newest" | "price-asc" | "price-desc";

export function CatalogClient({ products, categories }: CatalogClientProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [sort, setSort] = useState<SortOption>("newest");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggle = <T,>(arr: T[], setArr: (a: T[]) => void, val: T) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const filtered = useMemo(() => {
    let result = [...products];
    if (selectedCategories.length) result = result.filter((p) => selectedCategories.includes(p.category));
    if (selectedSizes.length) result = result.filter((p) => selectedSizes.some((s) => p.sizes.includes(s)));
    if (selectedColors.length) result = result.filter((p) => selectedColors.some((c) => p.colors.includes(c)));
    result = result.filter((p) => p.price <= maxPrice);
    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [products, selectedCategories, selectedSizes, selectedColors, maxPrice, sort]);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(2500);
    setSort("newest");
  };

  const activeFilterCount =
    selectedCategories.length + selectedSizes.length + selectedColors.length +
    (maxPrice < 2500 ? 1 : 0);

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="border-b border-[#2e2e2e] pb-6 mb-6">
      <h3
        className="text-white text-sm tracking-[0.2em] uppercase mb-4"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {title}
      </h3>
      {children}
    </div>
  );

  const sidebar = (
    <div className="space-y-0">
      <FilterSection title="Category">
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggle(selectedCategories, setSelectedCategories, cat)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedCategories.includes(cat) ? "bg-white border-white" : "border-[#2e2e2e] group-hover:border-white"
                }`}
              >
                {selectedCategories.includes(cat) && (
                  <div className="w-2 h-2 bg-[#0a0a0a]" />
                )}
              </div>
              <span className="text-[#888888] group-hover:text-white text-sm transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggle(selectedSizes, setSelectedSizes, size)}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                selectedSizes.includes(size)
                  ? "bg-white text-[#0a0a0a] border-white"
                  : "border-[#2e2e2e] text-[#888888] hover:border-white hover:text-white"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="space-y-2">
          {COLORS.map((color) => (
            <label key={color} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedColors.includes(color)}
                onChange={() => toggle(selectedColors, setSelectedColors, color)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedColors.includes(color) ? "bg-white border-white" : "border-[#2e2e2e] group-hover:border-white"
                }`}
              >
                {selectedColors.includes(color) && <div className="w-2 h-2 bg-[#0a0a0a]" />}
              </div>
              <span className="text-[#888888] group-hover:text-white text-sm transition-colors">{color}</span>
            </label>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Max Price">
        <input
          type="range"
          min={499}
          max={2500}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-white"
        />
        <div className="flex justify-between text-xs text-[#888888] mt-2">
          <span>₹499</span>
          <span className="text-white font-medium">₹{maxPrice.toLocaleString("en-IN")}</span>
          <span>₹2,500</span>
        </div>
      </FilterSection>
    </div>
  );

  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10">
          <motion.p
            className="text-[#888888] text-xs tracking-[0.3em] uppercase mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            PRISM INDIA
          </motion.p>
          <motion.h1
            style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(3rem, 8vw, 7rem)", lineHeight: 0.9 }}
            className="text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            ALL PRODUCTS
          </motion.h1>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2e2e2e]">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="flex items-center gap-2 text-[#888888] hover:text-white transition-colors text-xs tracking-[0.2em] uppercase lg:hidden"
            >
              <SlidersHorizontal size={14} />
              FILTERS {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>
            {activeFilterCount > 0 && (
              <button onClick={clearAll} className="flex items-center gap-1 text-[#888888] hover:text-white text-xs transition-colors">
                <X size={12} /> CLEAR ALL
              </button>
            )}
            <p className="text-[#888888] text-xs hidden sm:block">{filtered.length} products</p>
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none bg-transparent text-[#888888] text-xs tracking-[0.2em] uppercase pr-6 cursor-pointer focus:outline-none hover:text-white transition-colors"
            >
              <option value="newest">NEWEST</option>
              <option value="price-asc">PRICE: LOW → HIGH</option>
              <option value="price-desc">PRICE: HIGH → LOW</option>
            </select>
            <ChevronDown size={12} className="absolute right-0 top-1/2 -translate-y-1/2 text-[#888888] pointer-events-none" />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-56 flex-shrink-0">{sidebar}</aside>

          {/* Mobile sidebar */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
              <motion.div
                className="absolute left-0 top-0 h-full w-80 bg-[#0a0a0a] border-r border-[#2e2e2e] p-6 overflow-y-auto"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-white font-bebas tracking-widest" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>FILTERS</h2>
                  <button onClick={() => setSidebarOpen(false)} className="text-[#888888] hover:text-white">
                    <X size={18} />
                  </button>
                </div>
                {sidebar}
              </motion.div>
            </div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-[#888888] text-sm mb-4">No products match your filters.</p>
                <button onClick={clearAll} className="text-white text-xs underline underline-offset-4">Clear filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
