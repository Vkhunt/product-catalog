

"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useCatalog } from "@/hooks/useCatalog";
import { deleteProduct } from "@/store/catalogSlice";
import { AppDispatch } from "@/store";
import { getLowestPrice } from "@/lib/data";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  draft: "bg-yellow-100 text-yellow-700",
  discontinued: "bg-red-100 text-red-700",
};

export default function AdminProductList() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useCatalog(true);
  
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    try {
      await dispatch(deleteProduct(id)).unwrap();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-gray-300 overflow-hidden animate-pulse">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-100">
            <div className="w-12 h-12 bg-gray-100 border border-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Error loading products: {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-white border border-gray-300 p-16 text-center">
        <p className="text-3xl mb-2">📦</p>
        <p className="text-gray-500">No products yet.</p>
        <Link
          href="/admin/products/create"
          className="inline-block mt-4 text-indigo-600 font-medium hover:underline"
        >
          Create your first product →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-300 overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
              Product
            </th>
            <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
              Category
            </th>
            <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
              Status
            </th>
            <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
              Price (from)
            </th>
            <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
              Variants
            </th>
            <th className="text-right px-4 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded border border-gray-300 overflow-hidden bg-gray-100 flex-shrink-0">
                    {product.imageUrls[0] ? (
                      <Image
                        src={product.imageUrls[0]}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="flex items-center justify-center h-full text-gray-300 text-lg">
                        📦
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-gray-400">{product.brand}</p>
                  </div>
                </div>
              </td>

              <td className="px-4 py-3 text-gray-600">{product.category}</td>

              <td className="px-4 py-3">
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${statusColors[product.status]}`}
                >
                  {product.status}
                </span>
              </td>

              <td className="px-4 py-3 text-gray-700 font-medium">
                ${(getLowestPrice(product) / 100).toFixed(2)}
              </td>

              <td className="px-4 py-3 text-gray-500">
                {product.variants.length}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/shop/${product.slug}`}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                    title="View in shop"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="p-1.5 text-gray-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
                    title="Edit product"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-400">
        {products.length} product{products.length !== 1 ? "s" : ""} total
      </div>
    </div>
  );
}
