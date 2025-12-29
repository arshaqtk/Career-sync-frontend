import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card"
import { Badge } from "@/components/ui/shadcn/badge"

interface CandidateSkillsCardProps {
  skills: string[]
}

export function CandidateSkillsCard({ skills }: CandidateSkillsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>

      <CardContent>
        {skills?.length ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge key={skill} variant="outline">
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No skills added
          </p>
        )}
      </CardContent>
    </Card>
  )
}
