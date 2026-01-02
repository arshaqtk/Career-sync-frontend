export default function NotificationSkeleton() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Notification items */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-lg border p-4 bg-white animate-pulse"
        >
          <div className="flex justify-between items-start">
            <div className="space-y-2 w-full">
              <div className="h-4 w-1/3 bg-gray-200 rounded" />
              <div className="h-3 w-3/4 bg-gray-200 rounded" />
              <div className="h-3 w-2/3 bg-gray-200 rounded" />
            </div>

            <div className="h-2 w-2 bg-gray-300 rounded-full mt-1" />
          </div>

          <div className="h-3 w-24 bg-gray-200 rounded mt-3" />
        </div>
      ))}
    </div>
  )
}
