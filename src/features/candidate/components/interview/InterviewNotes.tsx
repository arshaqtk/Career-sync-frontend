import { Card, CardContent } from "@/components/ui/shadcn/card"

export function InterviewNotes({ notes }: { notes?: string }) {
  if (!notes) return null

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-2">Instructions</h3>
        <p className="text-sm text-muted-foreground">{notes}</p>
      </CardContent>
    </Card>
  )
}
