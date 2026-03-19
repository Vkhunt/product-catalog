"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-6 text-2xl">
          ⚠️
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Something went wrong!
        </h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          We encountered an error while loading the product catalog. This might
          be a temporary connection issue.
        </p>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="bg-indigo-600 text-white px-6 py-2 rounded font-medium hover:bg-indigo-700 transition"
          >
            Try again
          </button>
          <Link
            href="/"
            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-50 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
