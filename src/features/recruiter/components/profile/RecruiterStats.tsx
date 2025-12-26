import { Card, CardContent } from "@/components/ui/shadcn/card"

export function RecruiterStats({jobsPosted,activeJobs,
  applicationsCount,interviewsCount,hiresCount}) {
  const stats = [
    { label: "Jobs Posted", value: jobsPosted },
    { label: "Active Jobs", value: activeJobs },
    { label: "Applications", value: applicationsCount },
    { label: "Interviews", value: interviewsCount },
    { label: "Hires", value: hiresCount },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
