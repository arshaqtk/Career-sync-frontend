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
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-semibold">
          {getGreeting()}, {user?.name ?? "Recruiter"}
        </h1>
        <p className="text-sm text-muted-foreground">
          Recruiter Dashboard • {today}
        </p>
      </div>

      {/* Right */}
      {/* <div className="flex items-center gap-3">
       
        <Button
          variant="outline"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
         
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
        </Button>

       
        <Avatar className="cursor-pointer">
          <AvatarFallback>
            {user?.name?.charAt(0).toUpperCase() ?? "R"}
          </AvatarFallback>
        </Avatar>
      </div> */}
    </div>
  )
}
