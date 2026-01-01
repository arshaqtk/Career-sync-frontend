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
    <Card>
      <CardHeader>
        <CardTitle>Hiring Funnel</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <FunnelRow label="Applied" value={funnel.applied} />
        <FunnelRow label="Shortlisted" value={funnel.shortlisted} />
        <FunnelRow label="Interviewed" value={funnel.interviewed} />
        <FunnelRow label="selected" value={funnel.selected} />
        <FunnelRow label="Hired" value={funnel.hired} />
      </CardContent>
    </Card>
  )
}

/* ---------------- Sub Component ---------------- */

function FunnelRow({
  label,
  value,
}: {
  label: string
  value: number
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <p className="text-sm font-medium">{label}</p>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  )
}
