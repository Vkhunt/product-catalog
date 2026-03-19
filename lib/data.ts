import { Product, Review, CatalogFilters, CatalogStats } from "@/types/catalog";


export const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "AeroRun Pro Sneakers",
    slug: "aerorun-pro-sneakers",
    description:
      "Lightweight running shoes with responsive cushioning and breathable mesh upper. Perfect for daily training.",
    brand: "AeroFit",
    category: "Shoes",
    tags: ["running", "sport", "lightweight"],
    status: "active",
    condition: "new",
    featured: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600",
    ],
    variants: [
      {
        id: "v1-1",
        label: "Size 8 / White",
        sku: "AERO-PRO-8-WHT",
        price: 8999,           
        compareAtPrice: 11999, 
        stock: 15,
        attributes: { size: "8", color: "White" },
      },
      {
        id: "v1-2",
        label: "Size 10 / Black",
        sku: "AERO-PRO-10-BLK",
        price: 8999,
        compareAtPrice: 11999,
        stock: 8,
        attributes: { size: "10", color: "Black" },
      },
    ],
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-02-15T12:00:00Z",
  },
  {
    id: "prod-2",
    name: "Urban Canvas Tote Bag",
    slug: "urban-canvas-tote-bag",
    description:
      "Durable canvas tote with laptop compartment. Eco-friendly and stylish for everyday carry.",
    brand: "UrbanCarry",
    category: "Bags",
    tags: ["tote", "canvas", "eco-friendly", "laptop"],
    status: "active",
    condition: "new",
    featured: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600",
    ],
    variants: [
      {
        id: "v2-1",
        label: "Natural / Small",
        sku: "UCT-NAT-SM",
        price: 3499, 
        stock: 25,
        attributes: { color: "Natural", size: "Small" },
      },
      {
        id: "v2-2",
        label: "Black / Large",
        sku: "UCT-BLK-LG",
        price: 4499,  
        stock: 18,
        attributes: { color: "Black", size: "Large" },
      },
    ],
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "prod-3",
    name: "Vintage Denim Jacket",
    slug: "vintage-denim-jacket",
    description:
      "Classic stone-washed denim jacket. Slightly worn-in look for that authentic vintage feel.",
    brand: "RetroStyle",
    category: "Clothing",
    tags: ["denim", "vintage", "jacket", "casual"],
    status: "active",
    condition: "refurbished",
    featured: false,
    imageUrls: [
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600",
    ],
    variants: [
      {
        id: "v3-1",
        label: "S / Blue",
        sku: "VDJ-S-BLU",
        price: 5999,
        compareAtPrice: 9999,
        stock: 5,
        attributes: { size: "S", color: "Blue" },
      },
      {
        id: "v3-2",
        label: "M / Blue",
        sku: "VDJ-M-BLU",
        price: 5999,
        compareAtPrice: 9999,
        stock: 7,
        attributes: { size: "M", color: "Blue" },
      },
      {
        id: "v3-3",
        label: "L / Blue",
        sku: "VDJ-L-BLU",
        price: 6499,
        compareAtPrice: 9999,
        stock: 3,
        attributes: { size: "L", color: "Blue" },
      },
    ],
    createdAt: "2024-02-01T11:00:00Z",
    updatedAt: "2024-02-25T14:00:00Z",
  },
  {
    id: "prod-4",
    name: "SmartHome LED Desk Lamp",
    slug: "smarthome-led-desk-lamp",
    description:
      "Adjustable LED desk lamp with touch dimmer and USB charging port. Three color temperature modes.",
    brand: "LumiTech",
    category: "Electronics",
    tags: ["lamp", "LED", "desk", "smart", "USB"],
    status: "draft",
    condition: "new",
    featured: false,
    imageUrls: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
    ],
    variants: [
      {
        id: "v4-1",
        label: "White",
        sku: "LUMI-DESK-WHT",
        price: 4999,
        stock: 30,
        attributes: { color: "White" },
      },
      {
        id: "v4-2",
        label: "Matte Black",
        sku: "LUMI-DESK-BLK",
        price: 5499,
        stock: 20,
        attributes: { color: "Matte Black" },
      },
    ],
    createdAt: "2024-02-10T08:00:00Z",
    updatedAt: "2024-03-01T09:00:00Z",
  },
  {
    id: "prod-5",
    name: "Ceramic Pour-Over Coffee Set",
    slug: "ceramic-pour-over-coffee-set",
    description:
      "Hand-thrown ceramic pour-over dripper with matching mug. Ideal for the specialty coffee enthusiast.",
    brand: "BrewCraft",
    category: "Kitchen",
    tags: ["coffee", "ceramic", "pour-over", "handmade"],
    status: "active",
    condition: "new",
    featured: true,
    imageUrls: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    ],
    variants: [
      {
        id: "v5-1",
        label: "Matte White",
        sku: "BREW-PO-WHT",
        price: 6799,
        stock: 12,
        attributes: { color: "Matte White" },
      },
      {
        id: "v5-2",
        label: "Terracotta",
        sku: "BREW-PO-TER",
        price: 7299,
        stock: 9,
        attributes: { color: "Terracotta" },
      },
    ],
    createdAt: "2024-02-20T07:00:00Z",
    updatedAt: "2024-03-05T11:00:00Z",
  },
  {
    id: "prod-6",
    name: "Wireless Noise-Cancelling Headphones",
    slug: "wireless-noise-cancelling-headphones",
    description:
      "Premium over-ear headphones with 30hr battery, active noise cancellation, and foldable design.",
    brand: "SoundWave",
    category: "Electronics",
    tags: ["headphones", "wireless", "noise-cancelling", "audio"],
    status: "discontinued",
    condition: "used",
    featured: false,
    imageUrls: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    ],
    variants: [
      {
        id: "v6-1",
        label: "Midnight Black",
        sku: "SW-NC-BLK",
        price: 14999,
        compareAtPrice: 24999,
        stock: 2,
        attributes: { color: "Midnight Black" },
      },
    ],
    createdAt: "2023-06-01T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
  },
];


export const MOCK_REVIEWS: Review[] = [
  {
    id: "rev-1",
    productId: "prod-1",
    reviewerName: "Alex M.",
    rating: 5,
    title: "Best running shoes I've owned!",
    body: "Super lightweight and really comfortable even on long runs. Highly recommend.",
    verified: true,
    createdAt: "2024-02-20T10:00:00Z",
  },
  {
    id: "rev-2",
    productId: "prod-1",
    reviewerName: "Priya K.",
    rating: 4,
    title: "Great quality, slightly narrow",
    body: "Love the cushioning and style. A bit narrow for wide feet — size up if you're in between.",
    verified: true,
    createdAt: "2024-03-01T09:00:00Z",
  },
  {
    id: "rev-3",
    productId: "prod-2",
    reviewerName: "James L.",
    rating: 5,
    title: "Perfect everyday bag",
    body: "Great size, fits my laptop and all my daily essentials. The material feels very durable.",
    verified: true,
    createdAt: "2024-02-25T12:00:00Z",
  },
  {
    id: "rev-4",
    productId: "prod-3",
    reviewerName: "Sofia R.",
    rating: 4,
    title: "Authentic vintage look",
    body: "Looks exactly as described. The refurbishment is clean — you can barely tell it's not new.",
    verified: false,
    createdAt: "2024-03-05T14:00:00Z",
  },
  {
    id: "rev-5",
    productId: "prod-5",
    reviewerName: "Kai T.",
    rating: 5,
    title: "Beautiful craftsmanship",
    body: "The terracotta set is stunning. Makes every morning coffee feel like a ritual.",
    verified: true,
    createdAt: "2024-03-08T08:30:00Z",
  },
  {
    id: "rev-6",
    productId: "prod-6",
    reviewerName: "Dana W.",
    rating: 3,
    title: "Good but showing age",
    body: "Noise cancellation still works well, but the ear cushions are wearing out. Good for the price.",
    verified: true,
    createdAt: "2024-03-10T16:00:00Z",
  },
];


export function getProductBySlug(slug: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.slug === slug);
}


export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}


export function getReviewsByProductId(productId: string): Review[] {
  return MOCK_REVIEWS.filter((r) => r.productId === productId);
}


export function getLowestPrice(product: Product): number {
  return Math.min(...product.variants.map((v) => v.price));
}
export function getAverageRating(productId: string): number {
  const reviews = getReviewsByProductId(productId);
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return total / reviews.length;
}


export function getFilteredProducts(
  products: Product[],
  filters: CatalogFilters
): Product[] {
  return products.filter((product) => {
    
    if (filters.status !== "all" && product.status !== filters.status)
      return false;

    if (filters.category && product.category !== filters.category) return false;

    if (filters.brand && product.brand !== filters.brand) return false;

    
    if (filters.featured !== null && product.featured !== filters.featured)
      return false;

   
    if (filters.condition !== "all" && product.condition !== filters.condition)
      return false;

  
    if (filters.search) {
      const q = filters.search.toLowerCase();
      const matchesText =
        product.name.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesText) return false;
    }

   
    const prices = product.variants.map((v) => v.price);
    const lowestPrice = Math.min(...prices);
    if (filters.minPrice !== null && lowestPrice < filters.minPrice)
      return false;
    if (filters.maxPrice !== null && lowestPrice > filters.maxPrice)
      return false;

    return true;
  });
}


export function getCatalogStats(products: Product[]): CatalogStats {

  const activeProducts = products.filter((p) => p.status === "active").length;
  const draftProducts = products.filter((p) => p.status === "draft").length;
  const featuredProducts = products.filter((p) => p.featured).length;
  
  const totalVariants = products.reduce(
    (sum, p) => sum + p.variants.length,
    0
  );

  const allPrices = products.flatMap((p) => p.variants.map((v) => v.price));
  const averagePrice =
    allPrices.length > 0
      ? Math.round(allPrices.reduce((a, b) => a + b, 0) / allPrices.length)
      : 0;

 
  const byCategory: Record<string, number> = {};
  products.forEach((p) => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });

  
  const topRatedProducts = [...products]
    .map((p) => ({ product: p, rating: getAverageRating(p.id) }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5)
    .map((x) => x.product);

  return {
    totalProducts: products.length,
    activeProducts,
    draftProducts,
    featuredProducts,
    totalVariants,
    averagePrice,
    byCategory,
    topRatedProducts,
  };
}


export function getAllCategories(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.category))];
}


export function getAllBrands(products: Product[]): string[] {
  return [...new Set(products.map((p) => p.brand))];
}
