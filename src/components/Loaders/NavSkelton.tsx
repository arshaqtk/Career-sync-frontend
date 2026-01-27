import { Skeleton } from "@/components/ui/shadcn/skeleton"

export function NavbarSkeleton() {
  return (
    <header className="w-full border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Skeleton className="h-8 w-32" />

        {/* Nav links */}
        <div className="hidden md:flex gap-6">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-24 rounded-md" />
        </div>
      </div>
    </header>
  )
}
