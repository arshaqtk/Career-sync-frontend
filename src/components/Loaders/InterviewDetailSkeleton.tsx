import { Skeleton } from "@/components/ui/shadcn/skeleton"

export function InterviewDetailSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Interview Header */}
            <div className="rounded-lg border p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-7 w-56" />
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <Skeleton className="h-8 w-28 rounded-full" />
                </div>
                <div className="flex gap-6 pt-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-1">
                            <Skeleton className="h-3 w-16" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Overview */}
                    <div className="rounded-lg border p-6 space-y-4">
                        <Skeleton className="h-5 w-32" />
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-1">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule Section */}
                    <div className="rounded-lg border p-6 space-y-4">
                        <Skeleton className="h-5 w-36" />
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-1">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="rounded-lg border p-6 space-y-4">
                        <Skeleton className="h-5 w-28" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-4 w-36" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right - Actions Panel */}
                <div className="space-y-4">
                    <div className="rounded-lg border p-6 space-y-4">
                        <Skeleton className="h-5 w-24" />
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} className="h-11 w-full rounded-lg" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
