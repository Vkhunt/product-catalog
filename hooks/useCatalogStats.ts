

"use client";

import { useEffect, useState } from "react";
import { CatalogStats } from "@/types/catalog";
import { getCatalogStats } from "@/lib/data";
import { fetchClientProductsAll } from "@/lib/clientProductStore";

export function useCatalogStats() {
  const [stats, setStats] = useState<CatalogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (stats) return;

    let mounted = true;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const products = await fetchClientProductsAll();
        const computedStats = getCatalogStats(products);

        if (mounted) {
          setStats(computedStats);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to load stats");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, [stats]);

  return {
    stats,
    loading,
    error,
  };
}
