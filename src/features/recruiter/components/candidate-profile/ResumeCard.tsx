import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { FileText, Download } from "lucide-react";

interface Resume {
    url: string,
    originalName: string,
  }
export default function ResumeCard({ resume }:{resume:Resume}) {
  if (!resume?.url) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <a
          href={resume.url}
          target="_blank"
          className="flex items-center gap-2 text-blue-600 underline"
        >
          <FileText size={18} /> View Resume
        </a>

        <Button asChild>
          <a href={resume.url} download={resume.originalName}>
            <Download size={16} className="mr-2" />
            Download Resume
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
