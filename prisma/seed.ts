import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  // GYM VESTS / STRINGERS
  {
    name: "Stringer Vest",
    slug: "stringer-vest",
    description: "Cut for the grind, not the gym selfie. This stringer vest lets your shoulders breathe while keeping you locked in. Lightweight performance fabric that wicks sweat and moves with you — set after brutal set.",
    category: "Vests",
    price: 699,
    images: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Charcoal Grey"],
    isFeatured: true,
    isNew: true,
  },
  {
    name: "Racerback Vest",
    slug: "racerback-vest",
    description: "Engineered for maximum shoulder mobility and zero restrictions. The racerback cut gives you full range of motion through every press, pull, and push. Raw performance wrapped in Prism edge.",
    category: "Vests",
    price: 749,
    images: [
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Charcoal Grey"],
    isFeatured: false,
    isNew: true,
  },
  {
    name: "Oversized Gym Vest",
    slug: "oversized-gym-vest",
    description: "Street-ready silhouette, gym-built purpose. This oversized drop-cut vest blurs the line between the iron room and the concrete jungle. Wear it heavy, wear it proud.",
    category: "Vests",
    price: 799,
    images: [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=80",
      "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Charcoal Grey"],
    isFeatured: true,
    isNew: false,
  },
  // COMPRESSION WEAR
  {
    name: "Compression Half Sleeve",
    slug: "compression-half-sleeve",
    description: "Muscle-mapped compression that accelerates recovery and delays fatigue. Four-way stretch fabric holds everything in place while you push past your limits. Built for those who know no rest days.",
    category: "Compression",
    price: 999,
    images: [
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey"],
    isFeatured: false,
    isNew: false,
  },
  {
    name: "Compression Full Sleeve",
    slug: "compression-full-sleeve",
    description: "Full-sleeve compression that locks in warmth and maximizes blood flow from shoulder to wrist. Whether you're warming up or cooling down, this piece keeps your body primed and ready.",
    category: "Compression",
    price: 1099,
    images: [
      "https://images.unsplash.com/photo-1581009137042-c552e485697a?w=800&q=80",
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey"],
    isFeatured: false,
    isNew: false,
  },
  {
    name: "Compression Shorts",
    slug: "compression-shorts",
    description: "High-rise compression shorts engineered for lower body power output. Targeted compression zones support quads and hamstrings through every squat, sprint, and deadlift you throw at them.",
    category: "Compression",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800&q=80",
      "https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey"],
    isFeatured: false,
    isNew: false,
  },
  // SHORTS
  {
    name: '5" Training Shorts',
    slug: "5-inch-training-shorts",
    description: 'The 5" inseam that moves like a second skin. Lightweight, quick-dry fabric with a built-in brief liner. Go hard, go fast, go Prism.',
    category: "Shorts",
    price: 849,
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
      "https://images.unsplash.com/photo-1591693301538-a7a2e63b6c70?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Charcoal Grey"],
    isFeatured: false,
    isNew: true,
  },
  {
    name: '7" Training Shorts',
    slug: "7-inch-training-shorts",
    description: 'The versatile warrior — long enough for the streets, light enough for the gym. Our 7" training shorts are your go-to for every session, every grind, every day.',
    category: "Shorts",
    price: 899,
    images: [
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Charcoal Grey"],
    isFeatured: true,
    isNew: false,
  },
  {
    name: "Board Shorts",
    slug: "board-shorts",
    description: "From the pool deck to the street corner. Water-resistant board shorts with a relaxed fit that never compromises on style. Prism takes you from the gym to anywhere.",
    category: "Shorts",
    price: 949,
    images: [
      "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?w=800&q=80",
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey"],
    isFeatured: false,
    isNew: false,
  },
  // HOODIES & SWEATSHIRTS
  {
    name: "Heavyweight Hoodie",
    slug: "heavyweight-hoodie",
    description: "500GSM French terry that hits different. This heavyweight hoodie is built for cold mornings, post-workout recovery, and making a statement doing nothing at all. This is armour.",
    category: "Hoodies",
    price: 1799,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey"],
    isFeatured: true,
    isNew: true,
  },
  {
    name: "Zip-Up Hoodie",
    slug: "zip-up-hoodie",
    description: "Versatility meets brutality. The Prism zip-up hoodie goes from warm-up layer to post-lift staple in one motion. Premium fleece lining, YKK zipper, and an attitude that doesn't quit.",
    category: "Hoodies",
    price: 1899,
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
      "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey"],
    isFeatured: false,
    isNew: true,
  },
  {
    name: "Crewneck Sweatshirt",
    slug: "crewneck-sweatshirt",
    description: "Clean lines, zero compromise. The Prism crewneck is your canvas for rest days that still look like war. Mid-weight fleece, relaxed fit, permanent edge.",
    category: "Hoodies",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1614495788537-c9d7e77b3df4?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "White", "Charcoal Grey"],
    isFeatured: false,
    isNew: false,
  },
  // BOTTOMS
  {
    name: "Training Track Pants",
    slug: "training-track-pants",
    description: "Tapered, technical, and built to perform. These track pants deliver unrestricted mobility for every movement pattern in your programme. Slim taper, elastic waistband, dual zip pockets.",
    category: "Bottoms",
    price: 1099,
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
      "https://images.unsplash.com/photo-1599595726043-0f6e62e9b54d?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey"],
    isFeatured: false,
    isNew: false,
  },
  {
    name: "Cargo Track Pants",
    slug: "cargo-track-pants",
    description: "Street utility meets athletic precision. Six-pocket cargo track pants with a relaxed silhouette that carries everything you need and still moves like performance wear should.",
    category: "Bottoms",
    price: 1299,
    images: [
      "https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Black", "Charcoal Grey"],
    isFeatured: true,
    isNew: true,
  },
  // ACCESSORIES
  {
    name: "Gym Towel (Microfiber)",
    slug: "gym-towel-microfiber",
    description: "Ultra-absorbent microfiber that dries fast and takes up zero space. Bring Prism to every corner of the gym. No excuses, no mess.",
    category: "Accessories",
    price: 349,
    images: [
      "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
    ],
    sizes: ["One Size"],
    colors: ["Black", "Charcoal Grey"],
    isFeatured: false,
    isNew: false,
  },
  {
    name: "Gym Gloves",
    slug: "gym-gloves",
    description: "Full-palm padding with open-back breathability. These gloves protect your grip without dulling your feel on the bar. Wrist wrap support included — because every rep matters.",
    category: "Accessories",
    price: 549,
    images: [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80",
      "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    isFeatured: false,
    isNew: false,
  },
  {
    name: "Gym Belt (Leather)",
    slug: "gym-belt-leather",
    description: "4-inch genuine leather powerlifting belt with a single-prong buckle. Zero give when you need it most. This is the belt you PR in.",
    category: "Accessories",
    price: 1499,
    images: [
      "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=800&q=80",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black"],
    isFeatured: false,
    isNew: false,
  },
  {
    name: "Resistance Bands (Set of 3)",
    slug: "resistance-bands-set",
    description: "Three resistance levels — light, medium, heavy. Whether you're warming up joints or grinding through banded squats, these bands are built to take the abuse. Snap-proof, stretch-proof, Prism-proof.",
    category: "Accessories",
    price: 699,
    images: [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
    ],
    sizes: ["One Size"],
    colors: ["Black"],
    isFeatured: false,
    isNew: false,
  },
  {
    name: "Gym Bag",
    slug: "gym-bag",
    description: "40L capacity built for the athlete who doesn't travel light. Separate wet/dry compartments, padded straps, and Prism branding that commands respect. From the locker room to the street.",
    category: "Accessories",
    price: 1999,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    ],
    sizes: ["One Size"],
    colors: ["Black"],
    isFeatured: false,
    isNew: false,
  },
];

async function main() {
  console.log("Seeding database...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: { ...product, stock: 100 },
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
