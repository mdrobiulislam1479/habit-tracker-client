const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow p-4 space-y-4">
      {/* Image */}
      <div className="h-40 bg-gray-200 rounded-lg"></div>

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>

      {/* Description */}
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>

      {/* Button */}
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

export default CardSkeleton;
