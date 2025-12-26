import { Button } from "@/components/ui/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import type { ApplicationDetails } from "@/features/candidate/types/applicationDetail.types"

export const Documentscard=({ application }: { application:ApplicationDetails })=>{
   
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Documents</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Button asChild variant="outline">
          <a href={application.resumeUrl} target="_blank">
            📄 Download Resume (PDF)
          </a>
        </Button>

        {application.coverLetter && (
          <div className="border rounded p-3 text-sm max-h-48 overflow-y-auto">
            <p className="font-medium mb-2">Cover Letter</p>
            <p>{application.coverLetter}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )


}