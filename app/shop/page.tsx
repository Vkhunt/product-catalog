import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import CatalogFiltersPanel from "@/components/CatalogFiltersPanel";
import ShopProductGrid from "./ShopProductGrid";

export const metadata = {
  title: "Shop — Product Catalog",
  description: "Browse and filter our full product catalog",
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <p className="text-gray-500 mt-1">
            Use the filters to narrow down your selection.
          </p>
        </div>

        <div className="flex gap-8 items-start">
          <Suspense fallback={<div className="w-64 shrink-0 bg-white border border-gray-300 p-4 h-[600px] animate-pulse" />}>
            <CatalogFiltersPanel mode="storefront" />
          </Suspense>

          <Suspense fallback={<div className="flex-1 text-center py-20 text-gray-400">Loading products...</div>}>
            <ShopProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
