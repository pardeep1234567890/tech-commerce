const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
);

export const ProductCardSkeleton = () => (
  <div className="group relative">
    <Skeleton className="aspect-h-1 aspect-w-1 w-full rounded-md lg:h-80" />
    <div className="mt-4 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-5 w-1/4" />
      </div>
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="relative h-[60vh] min-h-[400px] w-full bg-gray-200 dark:bg-gray-800 sm:h-[80vh]">
    <Skeleton className="absolute inset-0 h-full w-full" />
  </div>
);

export const ProductPageSkeleton = () => (
  <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
    <Skeleton className="h-6 w-32 mb-8" />
    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
      <Skeleton className="w-full h-96 rounded-lg" />
      <div className="space-y-6">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-12 w-full mt-8" />
      </div>
    </div>
  </div>
);

export const OrderSkeleton = () => (
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="border rounded-lg p-6 space-y-3">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <div className="flex gap-4">
          <Skeleton className="h-20 w-20" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
