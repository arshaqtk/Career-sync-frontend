import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"

export function JobDescriptionCard({ description }: { description: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Description</CardTitle>
      </CardHeader>

      <CardContent className="text-sm leading-relaxed">
        {description || "No description provided"}
      </CardContent>
    </Card>
  )
}
