export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  color: string;
  colorHex: string;
  price: number;
  originalPrice?: number;
  images: string[];
  sizes: string[];
  colors: string[];
  isNew: boolean;
  isBestseller?: boolean;
  stock: number;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "compression-half-black",
    name: "COMPRESSION HALF SLEEVE",
    slug: "compression-half-black",
    category: "COMPRESSION",
    color: "Black",
    colorHex: "#1a1a1a",
    price: 1199,
    images: ["/products/compression_half_black.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    isNew: true,
    isBestseller: true,
    stock: 100,
    description: "Second-skin compression half sleeve. Supports every muscle group during peak performance. Engineered for the Indian athlete.",
  },
  {
    id: "compression-half-white",
    name: "COMPRESSION HALF SLEEVE",
    slug: "compression-half-white",
    category: "COMPRESSION",
    color: "White",
    colorHex: "#f0f0f0",
    price: 1199,
    images: ["/products/compression_half_white.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    isNew: true,
    stock: 100,
    description: "Second-skin compression half sleeve. Supports every muscle group during peak performance. Engineered for the Indian athlete.",
  },
  {
    id: "compression-full-black",
    name: "COMPRESSION FULL SLEEVE",
    slug: "compression-full-black",
    category: "COMPRESSION",
    color: "Black",
    colorHex: "#1a1a1a",
    price: 1299,
    images: ["/products/compression_full_black.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    isNew: false,
    isBestseller: true,
    stock: 100,
    description: "Full sleeve compression built for cold sessions and maximum muscle support. Maximum coverage, zero restriction.",
  },
  {
    id: "compression-full-white",
    name: "COMPRESSION FULL SLEEVE",
    slug: "compression-full-white",
    category: "COMPRESSION",
    color: "White",
    colorHex: "#f0f0f0",
    price: 1299,
    images: ["/products/compression_full_white.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    isNew: true,
    stock: 100,
    description: "Full sleeve compression built for cold sessions and maximum muscle support. Maximum coverage, zero restriction.",
  },
  {
    id: "ribbed-vest-black",
    name: "RIBBED VEST",
    slug: "ribbed-vest-black",
    category: "VESTS",
    color: "Black",
    colorHex: "#1a1a1a",
    price: 899,
    images: ["/products/ribbed_vest_black.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Maroon"],
    isNew: true,
    isBestseller: true,
    stock: 100,
    description: "Premium ribbed construction. Engineered for unrestricted movement. Street-ready cut.",
  },
  {
    id: "ribbed-vest-white",
    name: "RIBBED VEST",
    slug: "ribbed-vest-white",
    category: "VESTS",
    color: "White",
    colorHex: "#f0f0f0",
    price: 899,
    images: ["/products/ribbed_vest_white.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Maroon"],
    isNew: false,
    stock: 100,
    description: "Premium ribbed construction. Engineered for unrestricted movement. Street-ready cut.",
  },
  {
    id: "ribbed-vest-maroon",
    name: "RIBBED VEST",
    slug: "ribbed-vest-maroon",
    category: "VESTS",
    color: "Maroon",
    colorHex: "#6B2737",
    price: 899,
    images: ["/products/ribbed_vest_maroon.png"],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White", "Maroon"],
    isNew: true,
    isBestseller: true,
    stock: 100,
    description: "Premium ribbed construction. Engineered for unrestricted movement. Street-ready cut.",
  },
];

export const NEW_ARRIVALS = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
export const BESTSELLERS = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);
