import { Product, CatalogFilters } from "@/types/catalog";
import { MOCK_PRODUCTS, getFilteredProducts } from "@/lib/data";

const STORAGE_KEY = "storefront_products";

const getProductsFromStorage = (): Product[] => {
  if (typeof window === "undefined") return [...MOCK_PRODUCTS];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_PRODUCTS));
      return [...MOCK_PRODUCTS];
    }
    return JSON.parse(raw) as Product[];
  } catch {
    return [...MOCK_PRODUCTS];
  }
};

const saveProductsToStorage = (products: Product[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }
};

export const fetchClientProducts = async (filters: CatalogFilters, adminMode: boolean): Promise<Product[]> => {
  const products = getProductsFromStorage();
  
  const activeFilters = { ...filters };
  if (!adminMode) {
    activeFilters.status = "active";
  } else if (activeFilters.status !== "all") {
    activeFilters.status = filters.status;
  }
  
  const filtered = getFilteredProducts(products, activeFilters);
  filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return filtered;
};

export const fetchClientProductsAll = async (): Promise<Product[]> => {
  return getProductsFromStorage();
};

export const fetchClientProductBySlug = async (slug: string): Promise<Product> => {
  const products = getProductsFromStorage();
  const product = products.find(p => p.slug === slug);
  if (!product) throw new Error("Product not found");
  return product;
};

export const fetchClientProductById = async (id: string): Promise<Product> => {
  const products = getProductsFromStorage();
  const product = products.find(p => p.id === id);
  if (!product) throw new Error("Product not found");
  return product;
};

export const createClientProduct = async (body: Partial<Product>): Promise<Product> => {
  const products = getProductsFromStorage();
  
  if (!body.name || body.name.length < 3) throw new Error("Name must be at least 3 characters long");
  if (!body.variants || body.variants.length === 0) throw new Error("At least one variant is required");
  
  const skuRegex = /^[A-Z0-9-]+$/;
  const incomingSkus = new Set<string>();

  for (const variant of body.variants) {
    if (typeof variant.price !== "number" || variant.price <= 0) throw new Error("All variant prices must be greater than 0");
    if (!variant.sku || !skuRegex.test(variant.sku)) throw new Error("SKUs must contain only uppercase letters, numbers, and hyphens");
    if (incomingSkus.has(variant.sku)) throw new Error(`SKU ${variant.sku} is duplicated in the request`);
    incomingSkus.add(variant.sku);

    const isSkuDuplicate = products.some(p => p.variants.some(v => v.sku === variant.sku));
    if (isSkuDuplicate) throw new Error(`SKU ${variant.sku} is already in use by another product`);
  }

  const baseSlug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  let finalSlug = baseSlug;
  let counter = 1;
  while (products.some(p => p.slug === finalSlug)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  const newProduct = {
    ...body,
    id: Math.random().toString(36).substring(2, 9),
    slug: finalSlug,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  } as Product;

  products.unshift(newProduct);
  saveProductsToStorage(products);
  return newProduct;
};

export const updateClientProduct = async (id: string, updates: Partial<Product>): Promise<Product> => {
  const products = getProductsFromStorage();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) throw new Error("Product not found");

  const skuRegex = /^[A-Z0-9-]+$/;
  const incomingSkus = new Set<string>();

  if (updates.variants) {
    for (const variant of updates.variants) {
      if (typeof variant.price !== "number" || variant.price <= 0) throw new Error("All variant prices must be greater than 0");
      if (!variant.sku || !skuRegex.test(variant.sku)) throw new Error("SKUs must contain only uppercase letters, numbers, and hyphens");
      if (incomingSkus.has(variant.sku)) throw new Error(`SKU ${variant.sku} is duplicated in the request`);
      incomingSkus.add(variant.sku);

      const isSkuDuplicate = products.some(p => p.id !== id && p.variants.some(v => v.sku === variant.sku));
      if (isSkuDuplicate) throw new Error(`SKU ${variant.sku} is already in use by another product`);
    }
  }

  const product = products[index];
  let finalSlug = product.slug;
  if (updates.name && updates.name !== product.name) {
    const baseSlug = updates.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    finalSlug = baseSlug;
    let counter = 1;
    while (products.some(p => p.id !== id && p.slug === finalSlug)) {
      finalSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  }

  const updatedProduct = {
    ...product,
    ...updates,
    slug: finalSlug,
    updatedAt: new Date().toISOString(),
  } as Product;

  products[index] = updatedProduct;
  saveProductsToStorage(products);
  return updatedProduct;
};

export const deleteClientProduct = async (id: string): Promise<string> => {
  let products = getProductsFromStorage();
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);
  if (products.length === initialLength) throw new Error("Product not found");
  saveProductsToStorage(products);
  return id;
};
