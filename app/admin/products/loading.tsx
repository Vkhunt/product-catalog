

export default function AdminProductsLoading() {
  return (
    <div className="p-8 animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="h-7 bg-gray-200 rounded w-28 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-52" />
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-36" />
      </div>
      <div className="bg-white border border-gray-300 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-4 border-b border-gray-100"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-20" />
            </div>
            <div className="h-5 bg-gray-200 rounded-full w-16" />
            <div className="h-4 bg-gray-200 rounded w-12" />
          </div>
        ))}
      </div>
    </div>
  );
}
