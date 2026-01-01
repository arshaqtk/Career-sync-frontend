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
    <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>

      <div className="text-sm text-muted-foreground">
        {user?.name ?? "Admin"} • {today}
      </div>
    </div>
  )
}
