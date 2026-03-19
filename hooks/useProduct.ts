

"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/catalog";
import { fetchClientProductBySlug } from "@/lib/clientProductStore";

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setProduct(null);

    const fetchProduct = async () => {
      try {
        const found = await fetchClientProductBySlug(slug);

        setProduct(found);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  return {
    product,  
    loading,  
    error,    
  };
}
