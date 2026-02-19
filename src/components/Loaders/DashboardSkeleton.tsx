import { Skeleton } from "@/components/ui/shadcn/skeleton"

export function DashboardSkeleton() {
    return (
        <div className="grid grid-cols-12 gap-6 p-6 animate-pulse">
            {/* Header */}
            <div className="col-span-12 space-y-2">
                <Skeleton className="h-8 w-56" />
                <Skeleton className="h-4 w-80" />
            </div>

            {/* Stats Cards */}
            <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-lg border p-5 space-y-3">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-8 w-14" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                ))}
            </div>

            {/* Action Center */}
            <div className="col-span-12 lg:col-span-8 rounded-lg border p-6 space-y-4">
                <Skeleton className="h-5 w-36" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-3 w-32" />
                        </div>
                        <Skeleton className="h-8 w-20 rounded-md" />
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="col-span-12 lg:col-span-4 rounded-lg border p-6 space-y-4">
                <Skeleton className="h-5 w-28" />
                {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-11 w-full rounded-lg" />
                ))}
            </div>

            {/* Recent Applications */}
            <div className="col-span-12 rounded-lg border p-6 space-y-4">
                <Skeleton className="h-5 w-44" />
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
                        <Skeleton className="h-9 w-9 rounded-full" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-28" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                    </div>
                ))}
            </div>
        </div>
    )
}
