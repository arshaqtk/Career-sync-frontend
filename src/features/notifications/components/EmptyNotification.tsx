import { BellOff } from "lucide-react"

export function EmptyNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-muted h-20 w-20 rounded-full flex items-center justify-center mb-6 animate-bounce duration-1000">
        <BellOff className="h-10 w-10 text-muted-foreground opacity-50" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No notifications yet</h3>
      <p className="max-w-xs mx-auto text-muted-foreground">
        We'll let you know when there's an update on your job applications or interviews.
      </p>
    </div>
  )
}
