import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card"
import { Separator } from "@/components/ui/shadcn/separator"

interface Education {
  _id: string
  degree: string
  institution: string
  year: string
}

export function CandidateEducationCard({
  education,
}: {
  education: Education[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {education?.length ? (
          education.map((edu, index) => (
            <div key={edu._id} className="space-y-1">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">
                {edu.institution}
              </p>
              <p className="text-xs text-muted-foreground">
                {edu.year}
              </p>

              {index !== education.length - 1 && <Separator />}
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No education added
          </p>
        )}
      </CardContent>
    </Card>
  )
}
