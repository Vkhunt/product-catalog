

"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminProductsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin products error:", error);
  }, [error]);

  return (
    <div className="p-8 flex items-center justify-center min-h-64">
      <div className="text-center">
        <p className="text-4xl mb-3">⚠️</p>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Failed to load products
        </h2>
        <p className="text-gray-500 text-sm mb-6">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700"
          >
            Try again
          </button>
          <Link
            href="/admin"
            className="border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50"
          >
            Go to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
