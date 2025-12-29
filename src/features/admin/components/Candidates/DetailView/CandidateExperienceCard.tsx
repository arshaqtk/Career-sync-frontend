import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card"
import { Separator } from "@/components/ui/shadcn/separator"

interface Experience {
  _id: string
  role: string
  company: string
  startDate: string
  endDate?: string
  description?: string
}

interface CandidateExperienceCardProps {
  experience: Experience[]
}

export function CandidateExperienceCard({
  experience,
}: CandidateExperienceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {experience?.length ? (
          experience.map((exp, index) => (
            <div key={exp._id} className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">{exp.role}</p>
                  <p className="text-sm text-muted-foreground">
                    {exp.company}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {formatDate(exp.startDate)} –{" "}
                  {exp.endDate ? formatDate(exp.endDate) : "Present"}
                </p>
              </div>

              {exp.description && (
                <p className="text-sm text-gray-600">
                  {exp.description}
                </p>
              )}

              {index !== experience.length - 1 && <Separator />}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No experience added
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  })
}
