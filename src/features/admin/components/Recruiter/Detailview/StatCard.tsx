import { Card, CardContent } from "@/components/ui/shadcn/card"

export function StatCard({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  )
}
