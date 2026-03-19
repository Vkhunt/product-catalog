

import Link from "next/link";
import { PlusCircle } from "lucide-react";
import AdminProductList from "./AdminProductList"; 

export const metadata = {
  title: "Products — Admin",
};

export default function AdminProductsPage() {
  return (
    <div className="p-8">
    
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-1">Manage your entire product catalog.</p>
        </div>

        <Link
          href="/admin/products/create"
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-indigo-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Add Product
        </Link>
      </div>
      <AdminProductList />
    </div>
  );
}
