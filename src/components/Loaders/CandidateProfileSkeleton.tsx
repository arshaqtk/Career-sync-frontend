import { Skeleton } from "@/components/ui/shadcn/skeleton"

export function CandidateProfileSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Back Header */}
            <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                <Skeleton className="h-9 w-9 rounded-md" />
                <div className="space-y-2">
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info Card */}
                    <div className="rounded-lg border p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-16 w-16 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-56" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-1">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* About Card */}
                    <div className="rounded-lg border p-6 space-y-3">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-4/6" />
                    </div>

                    {/* Experience Card */}
                    <div className="rounded-lg border p-6 space-y-4">
                        <Skeleton className="h-5 w-28" />
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="flex gap-4 py-3 border-b last:border-0">
                                <Skeleton className="h-10 w-10 rounded-md shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-3 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Education Card */}
                    <div className="rounded-lg border p-6 space-y-4">
                        <Skeleton className="h-5 w-24" />
                        {Array.from({ length: 2 }).map((_, i) => (
                            <div key={i} className="flex gap-4 py-3 border-b last:border-0">
                                <Skeleton className="h-10 w-10 rounded-md shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-40" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Skills */}
                    <div className="rounded-lg border p-6 space-y-3">
                        <Skeleton className="h-5 w-16" />
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-7 w-20 rounded-full" />
                            ))}
                        </div>
                    </div>
                    {/* Resume */}
                    <div className="rounded-lg border p-6 space-y-3">
                        <Skeleton className="h-5 w-20" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    {/* Portfolio */}
                    <div className="rounded-lg border p-6 space-y-3">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                </div>
            </div>
        </div>
    )
}
