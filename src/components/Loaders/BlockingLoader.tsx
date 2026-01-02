import { Loader2 } from "lucide-react"

export function BlockingLoader({
  show,
  message = "Processing...",
}: {
  show: boolean
  message?: string
}) {
  if (!show) return null

  return (
    <div className="absolute inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin" size={28} />
        <p className="text-sm font-medium">{message}</p>
      </div>
    </div>
  )
}
