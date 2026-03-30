import { Skeleton } from "@/components/ui/shadcn/skeleton"

export function CompanyDetailSkeleton() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-10 animate-in fade-in duration-500">
      {/* Header Skeleton */}
      <div className="bg-card/50 backdrop-blur-xl p-8 rounded-3xl border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-24 w-24 rounded-2xl" />
          <div className="space-y-3">
            <div className="flex gap-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-12 w-32 rounded-xl" />
        </div>
      </div>

      {/* Info Cards Skeleton */}
      <div className="grid gap-8 md:grid-cols-2">
        <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 space-y-4">
          <Skeleton className="h-6 w-1/3 mb-4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 space-y-6">
          <Skeleton className="h-6 w-1/3 mb-4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recruiters Skeleton */}
      <div className="bg-card/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 space-y-8">
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-4 pt-4">
          <Skeleton className="h-4 w-32" />
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
            <Skeleton className="h-8 w-24 rounded-lg" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-40" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-4 flex gap-4">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
