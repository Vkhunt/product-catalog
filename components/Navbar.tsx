"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, LayoutDashboard } from "lucide-react";
import NavbarActions from "./NavbarActions";

export default function Navbar() {
  const pathname = usePathname();

  const isShopActive = pathname === "/shop";
  const isAdminActive = pathname.startsWith("/admin");

  return (
    <header className="bg-white border-b border-gray-300 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
    
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-indigo-600"
          >
            <ShoppingBag className="w-6 h-6" />
            Catalog
          </Link>

         
          <nav className="flex items-center gap-6">
            <Link
              href="/shop"
              className={`font-medium transition-colors ${
                isShopActive ? "text-indigo-600" : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Shop
            </Link>

            <Link
              href="/admin"
              className={`flex items-center gap-1 px-4 py-2 rounded transition-colors font-medium text-sm border ${
                isAdminActive
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin
            </Link>

            <div className="w-px h-6 bg-gray-300 mx-2" />
            <NavbarActions />
          </nav>
        </div>
      </div>
    </header>
  );
}
