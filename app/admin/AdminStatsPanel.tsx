
"use client";

import StatsCard from "@/components/StatsCard";
import { useCatalogStats } from "@/hooks/useCatalogStats";
import {
  Package,
  CheckCircle,
  FileText,
  Star,
  Layers,
  DollarSign,
} from "lucide-react";

export default function AdminStatsPanel() {
  const { stats, loading, error } = useCatalogStats();


  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 p-6 h-32 animate-pulse" />
        ))}
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Failed to load stats: {error}
      </div>
    );
  }

  if (!stats) return null;

 
  const formatPrice = (cents: number) => `$${(cents / 100).toFixed(2)}`;//123.45

  return (
    <div className="space-y-8">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          label="Total Products"
          value={stats.totalProducts}
          icon={Package}
          color="text-indigo-600"
        />
        <StatsCard
          label="Active Products"
          value={stats.activeProducts}
          icon={CheckCircle}
          color="text-green-600"
          description={`${stats.draftProducts} draft`}
        />
        <StatsCard
          label="Featured Products"
          value={stats.featuredProducts}
          icon={Star}
          color="text-yellow-500"
        />
        <StatsCard
          label="Draft Products"
          value={stats.draftProducts}
          icon={FileText}
          color="text-orange-500"
        />
        <StatsCard
          label="Total Variants"
          value={stats.totalVariants}
          icon={Layers}
          color="text-purple-600"
        />
        <StatsCard
          label="Average Price"
          value={formatPrice(stats.averagePrice)}
          icon={DollarSign}
          color="text-teal-600"
          description="across all variants"
        />
      </div>

      
      <div className="bg-white border border-gray-300 p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Products by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(stats.byCategory).map(([cat, count]) => (//object to array
            <div
              key={cat}
              className="bg-white p-4 text-center border border-gray-300"
            >
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-xs text-gray-500 mt-1">{cat}</p>
            </div>
          ))}
        </div>
      </div>

     
      {stats.topRatedProducts.length > 0 && (
        <div className="bg-white border border-gray-300 p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Top Rated Products</h2>
          <div className="space-y-1">
            {stats.topRatedProducts.map((product, index) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-300 text-sm w-5">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400">{product.brand}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                    product.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {product.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
