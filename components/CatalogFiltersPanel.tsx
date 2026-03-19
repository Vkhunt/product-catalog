
"use client";

import { useCatalog } from "@/hooks/useCatalog";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";

const STATUSES = ["all", "active", "draft", "discontinued"] as const;
const CONDITIONS = ["all", "new", "refurbished", "used"] as const;

interface CatalogFiltersPanelProps {
  mode: "storefront" | "admin";
  className?: string;
}

export default function CatalogFiltersPanel({ mode, className = "" }: CatalogFiltersPanelProps) {
  const { filters, setFilter, clearFilters } = useCatalog();
  const { categories, brands } = useFilteredProducts();


  const activeCount = Object.entries(filters).filter(([k, v]) => {
    if (k === "search") return v !== "";
    if (k === "status" || k === "condition") return v !== "all";
    if (k === "category" || k === "brand") return v !== "";
    if (k === "featured") return v !== null && v !== false;
    if (k === "minPrice" || k === "maxPrice") return v !== null;
    return false;
  }).length;

  return (
    <aside className={`w-64 shrink-0 ${className}`}>
      <div className="bg-white border border-gray-300 p-4 sticky top-20">
 
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-gray-800">Filters</h2>
            {activeCount > 0 && (
              <span className="flex items-center justify-center w-5 h-5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                {activeCount}
              </span>
            )}
          </div>
       
          {activeCount > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs text-indigo-600 hover:underline font-medium"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="space-y-5">
         
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Search
            </label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => setFilter({ search: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

         
          {mode === "admin" && (
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilter({
                    status: e.target.value as typeof filters.status,
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="capitalize">
                    {s === "all" ? "All statuses" : s}
                  </option>
                ))}
              </select>
            </div>
          )}

       
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => setFilter({ category: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

         
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Brand
            </label>
            <select
              value={filters.brand}
              onChange={(e) => setFilter({ brand: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

       
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Condition
            </label>
            <select
              value={filters.condition}
              onChange={(e) =>
                setFilter({
                  condition: e.target.value as typeof filters.condition,
                })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              {CONDITIONS.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c === "all" ? "All conditions" : c}
                </option>
              ))}
            </select>
          </div>

      
          {mode === "admin" && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="featured"
                checked={filters.featured === true}
                onChange={(e) =>
                  setFilter({ featured: e.target.checked ? true : null })
                }
                className="w-4 h-4 accent-indigo-600"
              />
              <label htmlFor="featured" className="text-sm text-gray-700 font-medium">
                Featured only
              </label>
            </div>
          )}

          
          {mode === "storefront" && (
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="wishlistOnly"
                checked={filters.wishlistOnly}
                onChange={(e) => setFilter({ wishlistOnly: e.target.checked })}
                className="w-4 h-4 accent-red-600"
              />
              <label htmlFor="wishlistOnly" className="text-sm text-gray-700 font-medium">
                My Wishlist only
              </label>
            </div>
          )}

       
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Price range (USD)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                min={0}
                value={
                  filters.minPrice !== null ? filters.minPrice / 100 : ""
                }
                onChange={(e) =>
                  setFilter({
                    minPrice: e.target.value
                      ? Math.round(Number(e.target.value) * 100)
                      : null,
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Max"
                min={0}
                value={
                  filters.maxPrice !== null ? filters.maxPrice / 100 : ""
                }
                onChange={(e) =>
                  setFilter({
                    maxPrice: e.target.value
                      ? Math.round(Number(e.target.value) * 100)
                      : null,
                  })
                }
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
