const SidebarSkeleton = () => {
  return (
    <aside className="w-64 hidden lg:block px-5 py-10 bg-primary rounded-xl border-2 border-accent/5 h-fit animate-pulse">
      {/* Search title */}
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-3"></div>

      {/* Search input */}
      <div className="h-10 bg-gray-200 rounded mb-6"></div>

      {/* Category title */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

      {/* Category list */}
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
