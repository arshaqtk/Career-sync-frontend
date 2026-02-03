import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { FileText, ExternalLink } from "lucide-react";

interface Resume {
  url: string,
  originalName: string,
}

export default function ResumeCard({ resume }: { resume: Resume }) {
  if (!resume?.url) return null;

  return (
    <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden text-black">
      <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Resume
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="p-2 bg-white rounded shadow-sm">
              <FileText className="h-6 w-6 text-red-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {resume.originalName || "candidate_resume.pdf"}
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">PDF Document</p>
            </div>
          </div>

          <Button
            className="w-full gap-2 bg-blue-600 hover:bg-blue-700 shadow-sm"
            onClick={() => window.open(resume.url, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
            View Full Resume
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
