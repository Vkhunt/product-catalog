import Link from "next/link";
import { LayoutDashboard, Package, PlusCircle, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Admin — Product Catalog",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-60 bg-white border-r border-gray-200 flex flex-col min-h-screen">
        <div className="px-5 py-5 border-b border-gray-100">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-indigo-600 text-lg"
          >
            <ShoppingBag className="w-5 h-5" />
            Catalog Admin
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <SidebarLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink href="/admin/products" icon={Package} label="Products" />
          <SidebarLink
            href="/admin/products/create"
            icon={PlusCircle}
            label="Add Product"
          />
        </nav>

        <div className="px-3 py-4 border-t border-gray-100">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            View Storefront
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-300 h-16 shrink-0 flex items-center justify-between px-8 relative z-10">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          <Link
            href="/shop"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Back to Storefront &rarr;
          </Link>
        </header>

        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}


interface SidebarLinkProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

function SidebarLink({ href, icon: Icon, label }: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-indigo-50 hover:text-indigo-700 font-medium transition-colors"
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}
