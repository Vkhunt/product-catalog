"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import ProductForm from "@/components/ProductForm";
import { editProduct } from "@/store/catalogSlice";
import { AppDispatch } from "@/store";
import { Product } from "@/types/catalog";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchClientProductById } from "@/lib/clientProductStore";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchClientProductById(productId);
        setProduct(data);
      } catch (err) {
        setFetchError(
          err instanceof Error ? err.message : "Failed to load product"
        );
      } finally {
        setFetchLoading(false);
      }
    };

    if (productId) loadProduct();
  }, [productId]);

  const handleSubmit = async (data: Partial<Product>) => {
    setIsSubmitting(true);
    try {
      await dispatch(editProduct({ id: productId, updates: data })).unwrap();
      router.push("/admin/products");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="p-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-8" />
        <div className="space-y-4 max-w-3xl">
          <div className="bg-white border border-gray-300 h-48" />
          <div className="bg-white border border-gray-300 h-32" />
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {fetchError}
        </div>
      </div>
    );
  }

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
        <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
        <p className="text-gray-500 mt-1">
          Update details for{" "}
          <strong className="text-gray-700">{product?.name}</strong>
        </p>
      </div>

      <ProductForm
        initialData={product}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
      />
    </div>
  );
}
