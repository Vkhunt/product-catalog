import Navbar from "@/components/Navbar";

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-pulse">
          <div className="h-8 bg-gray-200 w-1/4 mb-2 rounded" />
          <div className="h-4 bg-gray-200 w-1/3 rounded" />
        </div>

        <div className="flex gap-8 items-start">
          <div className="w-64 bg-white border border-gray-300 h-[600px] shrink-0 animate-pulse hidden md:block" />

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white border border-gray-300 p-2 animate-pulse">
                <div className="aspect-square bg-gray-100 mb-2" />
                <div className="h-3 bg-gray-100 w-1/3 mb-1" />
                <div className="h-4 bg-gray-100 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
