import { Skeleton } from "@/components/ui/shadcn/skeleton"

export function ProfilePageSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                        <Skeleton className="h-24 w-24 rounded-full" />
                        <div className="space-y-3 pt-2">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-64" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>
                    <Skeleton className="h-11 w-36 rounded-lg" />
                </div>
            </div>

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-lg border p-6 flex flex-col items-center gap-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-8 w-12" />
                    </div>
                ))}
            </div>

            {/* Details Skeleton */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
                {/* Personal Info */}
                <div className="space-y-6">
                    <Skeleton className="h-6 w-48 border-b pb-2" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-5 w-40" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Company Info */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between border-b pb-2">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-9 w-36 rounded-lg" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-5 w-40" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
