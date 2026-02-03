import { getResumeUrlApi } from "@/api/application.api";
import { Button } from "@/components/ui/shadcn/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, } from "@/components/ui/shadcn/dialog";
import { useState } from "react";
import { FileText, ExternalLink, Loader2 } from "lucide-react";

export function ResumeModal({
  resumeKey,
  applicationId,
  directUrl
}: {
  resumeKey?: string;
  applicationId?: string;
  directUrl?: string;
}) {
  const [resumeUrl, setResumeUrl] = useState(directUrl || "");
  const [loading, setLoading] = useState(false);
  const fetchResume = async () => {
    if (resumeUrl) return;
    if (!resumeKey || !applicationId) return;
    setLoading(true);
    const url = await getResumeUrlApi({
      applicationId,
      key: resumeKey,
    });
    console.log(url)
    setResumeUrl(url);
    setLoading(false);
  };

  return (
    <Dialog onOpenChange={(open) => open && fetchResume()}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-gray-200 hover:bg-gray-50 text-gray-700"
        >
          <FileText className="h-4 w-4 text-gray-400" />
          View Candidate Resume
          <ExternalLink className="h-3 w-3 ml-auto text-gray-300" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="bg-gray-50 border-b border-gray-200 p-6">
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <FileText className="h-5 w-5 text-blue-600" />
            Resume Preview
          </DialogTitle>
        </DialogHeader>

        <div className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-3">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              <p className="text-sm font-medium text-gray-500 font-bold uppercase tracking-widest">Loading preview...</p>
            </div>
          ) : (
            resumeUrl && (
              <iframe
                src={`${resumeUrl}#toolbar=0`}
                className="w-full h-[85vh] border-none"
              />
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
