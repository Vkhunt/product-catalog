import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import StarRating from "@/components/StarRating";
import ReviewSection from "@/app/shop/[slug]/ReviewSection";
import ProductActionIsland from "@/components/ProductActionIsland";
import {
  getProductBySlug,
  getReviewsByProductId,
  getAverageRating,
} from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const statusBadge: Record<string, string> = {
  active: "In Stock",
  draft: "Coming Soon",
  discontinued: "Discontinued",
};

const statusColor: Record<string, string> = {
  active: "text-green-700 bg-green-100",
  draft: "text-yellow-700 bg-yellow-100",
  discontinued: "text-red-700 bg-red-100",
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product || product.status !== "active") notFound();

  const reviews = getReviewsByProductId(product.id);
  const avgRating = getAverageRating(product.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          {" / "}
          <Link href="/shop" className="hover:text-indigo-600">Shop</Link>
          {" / "}
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-3">
            {product.imageUrls[0] ? (
              <div className="relative aspect-square border border-gray-300 bg-gray-100">
                <Image
                  src={product.imageUrls[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="aspect-square border border-gray-300 bg-gray-100 flex items-center justify-center text-6xl">
                📦
              </div>
            )}

            {product.imageUrls.length > 1 && (
              <div className="flex gap-2">
                {product.imageUrls.slice(1).map((url, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 rounded overflow-hidden border border-gray-300 cursor-pointer hover:border-indigo-400"
                  >
                    <Image src={url} alt={`${product.name} ${i + 2}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
                {product.brand}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor[product.status]}`}
              >
                {statusBadge[product.status]}
              </span>
              {product.featured && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                  ⭐ Featured
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {product.name}
            </h1>

            {reviews.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={avgRating} reviewCount={reviews.length} />
              </div>
            )}

            <ProductActionIsland product={product} />

            <p className="text-gray-600 leading-relaxed mt-4 mb-6">
              {product.description}
            </p>

            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-4 mt-6 text-sm text-gray-500">
              <span>
                Condition:{" "}
                <strong className="text-gray-700 capitalize">{product.condition}</strong>
              </span>
              <span>
                Category:{" "}
                <strong className="text-gray-700">{product.category}</strong>
              </span>
            </div>
          </div>
        </div>

        <ReviewSection productId={product.id} initialReviews={reviews} />
      </div>
    </div>
  );
}
