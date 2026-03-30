import { useAuthStore } from "@/store/auth.store"

interface AdminHeaderProps {
  title?: string
  subtitle?: string
}

export function AdminHeader({
  title = "Admin Dashboard",
  subtitle = "Platform overview & system control",
}: AdminHeaderProps) {
  const { user } = useAuthStore()

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border/50 pb-6 mb-2">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">Live</span>
        </div>
        <p className="text-muted-foreground font-medium">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-col items-end text-right">
        <span className="text-sm font-semibold text-foreground">Welcome back, {user?.name?.split(' ')[0] ?? "Administrator"}</span>
        <span className="text-xs text-muted-foreground font-medium">{today}</span>
      </div>
    </div>
  )
}
