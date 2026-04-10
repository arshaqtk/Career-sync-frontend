import { useAuthStore } from "@/store/auth.store"

export function DashboardHeader() {
  const { user } = useAuthStore()

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good Morning"
    if (hour < 18) return "Good Afternoon"
    return "Good Evening"
  }

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
          Recruiter Workspace
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {getGreeting()}, {user?.name ?? "Recruiter"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Your hiring pipeline, job activity, and next actions for {today}
        </p>
      </div>

      <div className="flex items-center gap-3 self-start rounded-xl bg-muted/60 px-4 py-3 md:self-auto">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          {user?.name?.charAt(0).toUpperCase() ?? "R"}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">{user?.name ?? "Recruiter"}</p>
          <p className="text-xs text-muted-foreground">Hiring dashboard overview</p>
        </div>
      </div>
    </div>
  )
}
