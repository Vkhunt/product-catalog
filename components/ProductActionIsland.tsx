"use client";

import { useState } from "react";
import { Product } from "@/types/catalog";
import { useStorefront } from "@/context/StorefrontContext";
import ProductVariantSelector from "./ProductVariantSelector";
import { Heart } from "lucide-react";

interface ProductActionIslandProps {
  product: Product;
}

export default function ProductActionIsland({ product }: ProductActionIslandProps) {
  const { formatPrice, wishlist, addToWishlist, removeFromWishlist } = useStorefront();
  const defaultVariant = product.variants.find(v => v.stock > 0) || product.variants[0];
  const [selectedVariantId, setSelectedVariantId] = useState<string>(defaultVariant ? defaultVariant.id : "");

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || defaultVariant;
  const isWishlisted = wishlist.includes(product.id);

  const toggleWishlist = () => {
    if (isWishlisted) removeFromWishlist(product.id);
    else addToWishlist(product.id);
  };

  if (!selectedVariant) return null;

  return (
    <div className="space-y-6">
    
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900 mb-1 flex items-baseline gap-2">
            {formatPrice(selectedVariant.price)}
            {selectedVariant.compareAtPrice && (
              <span className="text-lg text-gray-400 line-through font-normal">
                {formatPrice(selectedVariant.compareAtPrice)}
              </span>
            )}
          </p>
        </div>
        
        <button
          onClick={toggleWishlist}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
            isWishlisted 
              ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" 
              : "border-gray-200 bg-white text-gray-700 hover:border-red-200 hover:text-red-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-600" : ""}`} />
          {isWishlisted ? "Saved" : "Save"}
        </button>
      </div>

      
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Options</h3>
        <ProductVariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />
        <p className="text-sm text-gray-500 mt-2">
          {selectedVariant.stock > 0 
            ? `${selectedVariant.stock} in stock` 
            : <span className="text-red-500">Out of Stock</span>}
        </p>
      </div>
    </div>
  );
}
