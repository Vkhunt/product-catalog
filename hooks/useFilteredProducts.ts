


"use client";

import { useMemo } from "react";
import { Product } from "@/types/catalog";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useStorefront } from "@/context/StorefrontContext";


function getMinPrice(product: Product): number {
  if (!product.variants || product.variants.length === 0) return 0;
  return Math.min(...product.variants.map((v) => v.price));
}

export function useFilteredProducts() {
  const { products, filters } = useSelector((state: RootState) => state.catalog);
  const { wishlist } = useStorefront();

  return useMemo(() => {
    
    const categorySet = new Set<string>();
    const brandSet = new Set<string>();

    products.forEach((p) => {
      if (p.category) categorySet.add(p.category);
      if (p.brand) brandSet.add(p.brand);
    });

    const categories = Array.from(categorySet).sort();
    const brands = Array.from(brandSet).sort();

   
    const filteredProducts = products.filter((p) => {
     
      if (filters.wishlistOnly && !wishlist.includes(p.id)) return false;

    
      if (filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.category && p.category !== filters.category) return false;
      if (filters.brand && p.brand !== filters.brand) return false;
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBrand = p.brand.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand) return false;
      }

      if (filters.featured !== null && p.featured !== filters.featured) return false;
      if (filters.condition !== "all" && p.condition !== filters.condition) return false;
      const minPriceOfProduct = getMinPrice(p);
      if (filters.minPrice !== null && minPriceOfProduct < filters.minPrice) return false;
      if (filters.maxPrice !== null && minPriceOfProduct > filters.maxPrice) return false;

      return true;
    });

    return {
      filteredProducts,
      count: filteredProducts.length,
      categories,
      brands,
    };
  }, [products, filters, wishlist]);
}
