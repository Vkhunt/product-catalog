import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/data";

export const metadata = {
  title: "Storefront - Home",
  description: "Browse our complete catalog of amazing products.",
};

export default function HomePage() {
  const activeProducts = MOCK_PRODUCTS.filter((p) => p.status === "active");
  const heroProducts = activeProducts.filter((p) => p.featured).slice(0, 3);
  const categories = Array.from(new Set(activeProducts.map((p) => p.category)));

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="bg-gray-100 border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4 overflow-x-auto">
            <span className="text-sm font-bold text-gray-700">Categories:</span>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="text-sm text-blue-600 hover:text-blue-800 underline px-2 py-1"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        <section className="bg-gray-200 py-10 border-b border-gray-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Highlights
              </h1>
              <p className="text-gray-700">
                Discover our handpicked premium selection of items this week.
              </p>
            </div>

            {heroProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {heroProducts.map((product) => (
                   <ProductCard
                     key={product.id}
                     product={product}
                     variant="storefront"
                   />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No featured products right now.</p>
            )}
          </div>
        </section>

        <section className="py-10 max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-300">
            <h2 className="text-2xl font-bold text-gray-900">Shop All</h2>
            <Link href="/shop" className="text-blue-600 hover:underline">
              View Full Catalog
            </Link>
          </div>

          {activeProducts.length === 0 ? (
            <div className="text-center py-10 border border-gray-300">
              <p className="text-gray-500">No active products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeProducts.map((product) => (
                <ProductCard key={product.id} product={product} variant="storefront" />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
