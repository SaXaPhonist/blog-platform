
'use client'
export const PostSkeleton = () => {
  return (
    <div
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 p-4"
      aria-label="Posts loading"
    >
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          data-testid="post-skeleton"
          className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 h-full overflow-hidden animate-pulse transition-colors duration-300"
        >
          <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 transition-colors duration-300" />
          <div className="p-6 space-y-3">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 transition-colors duration-300" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded transition-colors duration-300" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 transition-colors duration-300" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6 transition-colors duration-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
