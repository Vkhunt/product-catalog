"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/catalog";
import { getLowestPrice, getAverageRating } from "@/lib/data";
import { Heart, Edit, Trash2 } from "lucide-react";
import { useStorefront } from "@/context/StorefrontContext";
import StarRating from "@/components/StarRating";

interface ProductCardProps {
  product: Product;
  variant: "storefront" | "admin";
  onEdit?: (product: Product) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700 border-green-200",
  draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
  discontinued: "bg-red-100 text-red-700 border-red-200",
};

export default function ProductCard({
  product,
  variant,
  onEdit,
  onDelete,
  className = "",
}: ProductCardProps) {
  const lowestPrice = getLowestPrice(product);

  const compareAtPrice = product.variants
    .map((v) => v.compareAtPrice)
    .filter(Boolean)
    .sort((a, b) => (a ?? 0) - (b ?? 0))[0];

  const { formatPrice, wishlist, addToWishlist, removeFromWishlist } = useStorefront();
  const isWishlisted = wishlist.includes(product.id);
  const avgRating = getAverageRating(product.id);

  const hasDiscount = compareAtPrice && compareAtPrice > lowestPrice;
  const discountPercent = hasDiscount
    ? Math.round((1 - lowestPrice / compareAtPrice) * 100)
    : 0;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    if (onEdit) {
      e.preventDefault();
      onEdit(product);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    if (onDelete) {
      e.preventDefault();
      onDelete(product.id);
    }
  };

  return (
    <Link href={`/shop/${product.slug}`} className={`block ${className}`}>
      <div className="bg-white border border-gray-300 rounded relative h-full flex flex-col p-3">
     
        <div className="relative h-48 bg-gray-100 mb-3 border border-gray-300">
          {product.imageUrls[0] ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">
              📦
            </div>
          )}

          {variant === "storefront" && (
            <>
              {hasDiscount && (
                <span className="absolute top-2 left-2 flex items-center bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  Save {discountPercent}%
                </span>
              )}
              <button
                onClick={toggleWishlist}
                className="absolute top-2 right-2 p-2 rounded bg-white border border-gray-200 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    isWishlisted ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </button>
            </>
          )}

       
          {variant === "admin" && (
            <span
              className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-1 uppercase rounded border ${
                statusColors[product.status]
              }`}
            >
              {product.status}
            </span>
          )}
        </div>

      
        <div className="flex flex-col flex-1">
      
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 font-medium uppercase">
              {product.brand}
            </span>
          </div>

        
          <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 mb-2 flex-1">
            {product.name}
          </h3>

          {variant === "storefront" && (
            <div className="mb-3">
              <StarRating rating={avgRating} size="sm" />
            </div>
          )}

         
          <div className="mt-auto">
           
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-gray-900">
                {formatPrice(lowestPrice)}
              </span>
              {hasDiscount && variant === "storefront" && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(compareAtPrice!)}
                </span>
              )}
            </div>

      
            {variant === "admin" && (
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
               
                <label
                  onClick={(e) => e.stopPropagation()} 
                  className="flex items-center gap-1.5 cursor-pointer text-xs text-gray-600 font-medium"
                >
                  <input
                    type="checkbox"
                    checked={product.featured}
                    readOnly
                    className="w-3.5 h-3.5 accent-indigo-600 cursor-not-allowed opacity-70"
                    title="Featured status (Edit product to change)"
                  />
                  Featured
                </label>

               
                <div className="flex justify-end gap-1">
                  <button
                    onClick={handleEdit}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
