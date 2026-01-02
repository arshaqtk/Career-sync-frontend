import { LoaderCircle } from "lucide-react"

export function ButtonSpinner({ label }: { label?: string }) {
  return (
    <span className="flex items-center gap-2">
      <LoaderCircle className="h-4 w-4 animate-spin" />
      {label && <span>{label}</span>}
    </span>
  )
}
