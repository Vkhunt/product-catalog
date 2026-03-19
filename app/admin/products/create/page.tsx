"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import ProductForm from "@/components/ProductForm";
import { createProduct } from "@/store/catalogSlice";
import { AppDispatch } from "@/store";
import { Product } from "@/types/catalog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Partial<Product>) => {
    setIsLoading(true);
    try {
      await dispatch(createProduct(data)).unwrap();
      router.push("/admin/products");
    } catch (err: unknown) {
      console.error("Product creation error:", err);
      alert(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Link
        href="/admin/products"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create Product</h1>
        <p className="text-gray-500 mt-1">
          Add a new product to your catalog.
        </p>
      </div>

      <ProductForm
        initialData={null}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
