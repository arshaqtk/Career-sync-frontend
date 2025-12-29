import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"

export function JobStatsCard({
  applications,
  createdAt,
}: {
  applications: number
  createdAt: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Stats</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <p><strong>Applications:</strong> {applications}</p>
        <p>
          <strong>Posted:</strong>{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  )
}
