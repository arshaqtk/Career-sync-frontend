import { Button } from "@/components/ui/shadcn/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card"
import type { ApplicationDetails } from "@/features/candidate/types/applicationDetail.types"

import { FileText, Download } from "lucide-react";

export const Documentscard = ({ application }: { application: ApplicationDetails }) => {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
          Applications Documents
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-3 border border-slate-100 rounded-lg bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-slate-800">Resume_Candidate.pdf</p>
              <p className="text-[12px] text-slate-500 font-medium">Applied Resume</p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="h-9 border-slate-200 text-blue-600 font-bold hover:bg-blue-50">
            <a href={application.resumeUrl} target="_blank" className="flex items-center gap-2">
              <Download size={14} />
              Download
            </a>
          </Button>
        </div>

        {application.coverLetter && (
          <div className="space-y-2">
            <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">Cover Letter</p>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-[14px] text-slate-600 leading-relaxed italic">
              "{application.coverLetter}"
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
