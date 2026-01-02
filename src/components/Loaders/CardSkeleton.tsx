import { Skeleton } from "@/components/ui/shadcn/skeleton"

export function CardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-7 w-3/4" />
    </div>
  )
}
