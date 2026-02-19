import { Card, CardContent } from "@/components/ui/shadcn/card"

export function RecruiterStats({ jobsPosted, activeJobs,
  applicationsCount, interviewsCount }: {
    jobsPosted: number, activeJobs: number,
    applicationsCount: number, interviewsCount: number
  }) {
  const stats = [
    { label: "Jobs Posted", value: jobsPosted },
    { label: "Active Jobs", value: activeJobs },
    { label: "Applications", value: applicationsCount },
    { label: "Interviews", value: interviewsCount },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardContent className="p-6 flex flex-col items-center justify-center gap-1.5">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">{s.label}</p>
            <p className="text-2xl font-black text-slate-900 text-center leading-none">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
