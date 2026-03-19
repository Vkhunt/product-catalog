
"use client";

import { useStorefront } from "@/context/StorefrontContext";
import { Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCatalog } from "@/hooks/useCatalog";
import { Currency } from "@/types/catalog";

export default function NavbarActions() {
  const { currency, setCurrency, wishlist } = useStorefront();
  const { filters, setFilter } = useCatalog();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-4">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 block px-2.5 py-1.5 font-medium"
      >
        <option value="USD">USD ($)</option>
        <option value="EUR">EUR (€)</option>
        <option value="GBP">GBP (£)</option>
        <option value="INR">INR (₹)</option>
      </select>

      <Link 
        href={pathname === "/shop" ? "/shop" : "/shop?wishlist=true"}
        onClick={(e) => {
          if (pathname === "/shop") {
            e.preventDefault();
            setFilter({ wishlistOnly: !filters.wishlistOnly });
          }
        }}
        className={`relative p-2 transition-colors ${
          filters.wishlistOnly ? "text-red-500" : "text-gray-500 hover:text-red-500"
        }`}
      >
        <Heart className={`w-5 h-5 ${filters.wishlistOnly ? "fill-red-500" : ""}`} />
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
            {wishlist.length}
          </span>
        )}
      </Link>
    </div>
  );
}
