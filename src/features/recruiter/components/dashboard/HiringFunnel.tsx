import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import { Skeleton } from "@/components/ui/shadcn/skeleton"

interface HiringFunnelData {
  applied: number
  shortlisted: number
  interviewed: number
  selected: number
  hired: number
}

interface HiringFunnelProps {
  data?: HiringFunnelData
  loading?: boolean
}

const DUMMY_FUNNEL: HiringFunnelData = {
  applied: 120,
  shortlisted: 48,
  interviewed: 20,
  selected: 6,
  hired: 3,
}

export function HiringFunnel({ data, loading }: HiringFunnelProps) {
  const funnel = data ?? DUMMY_FUNNEL

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Hiring Funnel</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader>
        <CardTitle>Hiring Funnel</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <FunnelRow label="Applied" value={funnel.applied} tone="bg-slate-500" />
        <FunnelRow label="Shortlisted" value={funnel.shortlisted} />
        <FunnelRow label="Interviewed" value={funnel.interviewed} tone="bg-amber-500" />
        <FunnelRow label="Selected" value={funnel.selected} tone="bg-emerald-500" />
      </CardContent>
    </Card>
  )
}

/* ---------------- Sub Component ---------------- */

function FunnelRow({
  label,
  value,
  tone = "bg-primary",
}: {
  label: string
  value: number
  tone?: string
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/20 p-4">
      <div className="flex items-center gap-3">
        <span className={`h-2.5 w-2.5 rounded-full ${tone}`} />
        <p className="text-sm font-medium text-foreground">{label}</p>
      </div>
      <span className="text-lg font-semibold text-foreground">{value}</span>
    </div>
  )
}
