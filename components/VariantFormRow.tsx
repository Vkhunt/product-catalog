
import { ProductVariant } from "@/types/catalog";
import { Trash2 } from "lucide-react";

interface VariantFormRowProps {
  variant: Partial<ProductVariant>;
  index: number;
  onChange: (index: number, field: keyof ProductVariant, value: string | number) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
  className?: string;
  errors?: {
    sku?: string;
    price?: string;
    compareAtPrice?: string;
  };
}

export default function VariantFormRow({
  variant,
  index,
  onChange,
  onRemove,
  canRemove,
  className = "",
  errors = {},
}: VariantFormRowProps) {
  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const errorClass = "border-red-500 focus:ring-red-500";

  return (
    <div className={`grid grid-cols-6 gap-2 items-start p-3 bg-gray-50 rounded-lg ${className}`}>
 
      <div className="col-span-2">
        <label className="text-xs text-gray-500 mb-1 block">Label *</label>
        <input
          className={inputClass}
          value={variant.label || ""}
          onChange={(e) => onChange(index, "label", e.target.value)}
          placeholder="e.g. Size 8 / Red"
          required
        />
      </div>

  
      <div className="col-span-2">
        <label className="text-xs text-gray-500 mb-1 block">SKU *</label>
        <input
          className={`${inputClass} ${errors.sku ? errorClass : ""}`}
          value={variant.sku || ""}
          onChange={(e) => onChange(index, "sku", e.target.value)}
          placeholder="e.g. PROD-001-RED"
          required
        />
        {errors.sku && <p className="text-red-500 text-[10px] mt-1">{errors.sku}</p>}
      </div>

 
      <div>
        <label className="text-xs text-gray-500 mb-1 block">Price (Cents) *</label>
        <input
          type="number"
          min={0}
          className={`${inputClass} ${errors.price ? errorClass : ""}`}
          value={variant.price !== undefined ? variant.price : ""}
          onChange={(e) => onChange(index, "price", parseInt(e.target.value, 10) || 0)}
          placeholder="2999"
          required
        />
        {errors.price && <p className="text-red-500 text-[10px] mt-1">{errors.price}</p>}
      </div>

   
      <div className="flex items-end gap-1">
        <div className="flex-1 space-y-2">

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Stock</label>
            <input
              type="number"
              min={0}
              className={inputClass}
              value={variant.stock !== undefined ? variant.stock : ""}
              onChange={(e) => onChange(index, "stock", parseInt(e.target.value, 10) || 0)}
              placeholder="10"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onRemove(index)}
          disabled={!canRemove}
          className="mb-0.5 p-2 text-red-400 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed h-9"
          title="Remove variant"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
