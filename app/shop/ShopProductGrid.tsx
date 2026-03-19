"use client";

import ProductCard from "@/components/ProductCard";
import { useCatalog } from "@/hooks/useCatalog";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";

export default function ShopProductGrid() {
  const { loading, error } = useCatalog();
  const { filteredProducts, count } = useFilteredProducts();

  if (loading) {
    return (
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-gray-300 overflow-hidden animate-pulse p-2"
          >
            <div className="aspect-square bg-gray-100" />
            <div className="p-2 space-y-2">
              <div className="h-3 bg-gray-100 w-1/3" />
              <div className="h-4 bg-gray-100 w-3/4" />
              <div className="h-3 bg-gray-100 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
        <p className="text-4xl mb-3">🔍</p>
        <p className="text-gray-500 text-lg">No products match your filters.</p>
        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or clearing filters.</p>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <p className="text-sm text-gray-500 mb-4">
        {count} product{count !== 1 ? "s" : ""} found
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} variant="storefront" />
        ))}
      </div>
    </div>
  );
}
