import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"

export function JobSkillsCard({ skills }: { skills: string[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Required Skills</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-wrap gap-2">
        {skills.length ? (
          skills.map((skill) => (
            <span
              key={skill}
              className="px-2 py-1 text-xs border rounded-md"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">
            No skills specified
          </p>
        )}
      </CardContent>
    </Card>
  )
}
