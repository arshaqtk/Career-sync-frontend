import { Skeleton } from "@/components/ui/shadcn/skeleton"

export function ApplicationDetailSkeleton() {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Back Header */}
            <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
                <Skeleton className="h-9 w-9 rounded-md" />
                <div className="space-y-2">
                    <Skeleton className="h-7 w-52" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Candidate Profile Card */}
                    <div className="rounded-lg border p-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-14 w-14 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-5 w-36" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                        </div>
                    </div>

                    {/* Application Info Card */}
                    <div className="rounded-lg border p-6 space-y-4">
                        <Skeleton className="h-5 w-40" />
                        <div className="grid grid-cols-2 gap-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="space-y-1">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-4 w-32" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interview Timeline */}
                    <div className="rounded-lg border overflow-hidden">
                        <div className="bg-gray-50 border-b p-4">
                            <Skeleton className="h-4 w-36" />
                        </div>
                        <div className="p-6 space-y-4">
                            {Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex gap-4">
                                    <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                                    <div className="space-y-2 flex-1">
                                        <Skeleton className="h-4 w-40" />
                                        <Skeleton className="h-3 w-28" />
                                    </div>
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Job Info */}
                    <div className="rounded-lg border p-6 space-y-3">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>

                    {/* Actions Card */}
                    <div className="rounded-lg border overflow-hidden">
                        <div className="bg-gray-50 border-b p-4">
                            <Skeleton className="h-4 w-36" />
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                            <div className="space-y-2 pt-4 border-t">
                                <Skeleton className="h-3 w-28" />
                                <Skeleton className="h-10 w-full rounded-md" />
                                <Skeleton className="h-10 w-full rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
