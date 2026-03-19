"use client";

import { useRouter } from "next/navigation";
import { Product, ProductVariant } from "@/types/catalog";
import { PlusCircle } from "lucide-react";
import { useProductForm } from "@/hooks/useProductForm";
import VariantFormRow from "./VariantFormRow";

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: Partial<Product>) => Promise<void>;
  isLoading?: boolean;
}

export default function ProductForm({
  initialData,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;

  const {
    values,
    handleChange,
    errors,
    handleSubmit,
    isDirty,
    addVariant,
    updateVariant,
    removeVariant,
    submitFormWithOverride,
  } = useProductForm(initialData || undefined);

  const handleNameChange = (val: string) => {
    handleChange("name", val);
    if (!isEditing) {
      handleChange(
        "slug",
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
      );
    }
  };

  const inputClass =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const errorClass = "border-red-500 focus:ring-red-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-3xl">
     
      <section className="bg-white border border-gray-300 p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Basic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              className={`${inputClass} ${errors.name ? errorClass : ""}`}
              value={values.name || ""}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Running Shoes Pro"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug * <span className="text-gray-400 text-xs">(URL-friendly)</span>
            </label>
            <input
              className={`${inputClass} ${errors.slug ? errorClass : ""}`}
              value={values.slug || ""}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="running-shoes-pro"
            />
            {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand *
            </label>
            <input
              className={`${inputClass} ${errors.brand ? errorClass : ""}`}
              value={values.brand || ""}
              onChange={(e) => handleChange("brand", e.target.value)}
              placeholder="e.g. AeroFit"
            />
            {errors.brand && <p className="text-red-500 text-xs mt-1">{errors.brand}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <input
              className={inputClass}
              value={values.category || ""}
              onChange={(e) => handleChange("category", e.target.value)}
              placeholder="e.g. Shoes"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags <span className="text-gray-400 text-xs">(comma-separated)</span>
            </label>
            <input
              className={inputClass}
              value={Array.isArray(values.tags) ? values.tags.join(", ") : values.tags || ""}
              onChange={(e) => handleChange("tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
              placeholder="running, sport, lightweight"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              value={values.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Product description..."
            />
          </div>
        </div>
      </section>

      
      <section className="bg-white border border-gray-300 p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Status & Settings</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className={inputClass}
              value={values.status}
              onChange={(e) => handleChange("status", e.target.value as Product["status"])}
            >
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              className={inputClass}
              value={values.condition}
              onChange={(e) => handleChange("condition", e.target.value as Product["condition"])}
            >
              <option value="new">New</option>
              <option value="refurbished">Refurbished</option>
              <option value="used">Used</option>
            </select>
          </div>

          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={values.featured || false}
                onChange={(e) => handleChange("featured", e.target.checked)}
                className="w-4 h-4 accent-indigo-600"
              />
              <span className="text-sm font-medium text-gray-700">
                Featured product
              </span>
            </label>
          </div>
        </div>
      </section>

   
      <section className="bg-white border border-gray-300 p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4">Images</h2>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image URLs <span className="text-gray-400 text-xs">(one per line)</span>
        </label>
        <textarea
          className={`${inputClass} resize-none`}
          rows={3}
          value={Array.isArray(values.imageUrls) ? values.imageUrls.join("\n") : values.imageUrls || ""}
          onChange={(e) => handleChange("imageUrls", e.target.value.split("\n").map(u => u.trim()).filter(Boolean))}
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
        />
      </section>

      <section className="bg-white border border-gray-300 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800">
            Variants{" "}
            <span className="text-xs text-gray-400 font-normal">
              (at least 1 required)
            </span>
          </h2>
          <button
            type="button"
            onClick={addVariant}
            className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            <PlusCircle className="w-4 h-4" />
            Add variant
          </button>
        </div>

        {errors.variants && <p className="text-red-500 text-sm mb-3">{errors.variants}</p>}

        <div className="space-y-3">
          {(values.variants || []).map((variant: ProductVariant, index: number) => {
            const variantErrors = {
              sku: errors[`variant_${index}_sku`],
              price: errors[`variant_${index}_price`],
              compareAtPrice: errors[`variant_${index}_compareAtPrice`],
            };

            return (
              <VariantFormRow
                key={variant.id || index}
                variant={variant}
                index={index}
                onChange={updateVariant}
                onRemove={removeVariant}
                canRemove={(values.variants || []).length > 1}
                errors={variantErrors}
              />
            );
          })}
        </div>
      </section>

     
      <div className="flex items-center gap-3">
   
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

  
        {isEditing ? (
          <>
            <button
              type="button"
              disabled={isLoading || !isDirty}
              onClick={() => submitFormWithOverride(onSubmit, { status: "draft" })}
              className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Saving..." : "Save as Draft"}
            </button>
            <button
              type="button"
              disabled={isLoading || !isDirty}
              onClick={() => submitFormWithOverride(onSubmit, { status: "active" })}
              className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Saving..." : "Publish"}
            </button>
          </>
        ) : (
          <button
            type="submit"
            disabled={isLoading || !isDirty}
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Saving..." : "Create product"}
          </button>
        )}
      </div>
    </form>
  );
}
