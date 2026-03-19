"use client";

import { ProductVariant } from "@/types/catalog";
import clsx from "clsx";

interface ProductVariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variantId: string) => void;
  className?: string;
}

export default function ProductVariantSelector({
  variants,
  selectedVariantId,
  onSelect,
  className = "",
}: ProductVariantSelectorProps) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {variants.map((variant) => {
        const isSelected = variant.id === selectedVariantId;
        const isOutOfStock = variant.stock === 0;

        return (
          <button
            key={variant.id}
            type="button"
            onClick={() => {
              if (!isOutOfStock) onSelect(variant.id);
            }}
            disabled={isOutOfStock}
            title={isOutOfStock ? "Out of Stock" : `Select ${variant.label}`}
            className={clsx(
              "px-4 py-2 text-sm font-medium rounded border transition-colors",
              isSelected
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-gray-300 bg-white text-gray-700 hover:border-indigo-300 hover:bg-gray-50",
              isOutOfStock && "opacity-50 cursor-not-allowed bg-gray-100 hover:bg-gray-100"
            )}
          >
            {variant.label}
          </button>
        );
      })}
    </div>
  );
}
