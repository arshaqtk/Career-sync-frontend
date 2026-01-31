import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Upload, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDeleteResume, useUpdateResume } from "../../hooks/useUpdateProfile";
import { getResumeDownloadUrlApi } from "@/api/profile.api";
import { AlertDialogComponent } from "@/components/dialogs/alertDialog";

export default function ResumeUpload({
  resume,
}: {
  resume: {
    originalName: string,
    uploadedAt: string,
  } | null;
}) {

  const { mutate, isPending } = useUpdateResume();
  const {mutate:deleteResume,isPending:isDeletePending}=useDeleteResume()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    mutate(formData, {
      onSuccess:()=>{   
          toast.success("Resume updated!")
      },
      onError: () => {
        toast.error("Resume upload failed!");
      }
    });
  };

  const handleResumeDownload = async() => {
    if (!resume) {
      toast.error("Resume not uploaded!");
      return;
    }
    const resumeUrl=await getResumeDownloadUrlApi()
    const link = document.createElement("a");
    link.href = resumeUrl.url;
    link.download = resume.originalName || "resume.pdf";
    link.click();
  };


  
 
  

   return (
    <Card className="border border-slate-200 shadow-none bg-white overflow-hidden">
      <CardHeader className="px-6 py-4 border-b border-slate-50 bg-slate-50/50">
        <CardTitle className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">Resume</CardTitle>
        <p className="text-sm font-medium text-slate-500">
          Your resume is the first impression you make on potential employers. Keep it updated.
        </p>
      </CardHeader>

      <CardContent className="px-6 py-6 space-y-6">
        {/* EXISTING RESUME */}
        {resume && resume?.originalName &&(
          <div className="flex items-center justify-between border border-slate-200 rounded-xl px-5 py-4 bg-white shadow-sm transition-all hover:border-blue-200">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-blue-50 rounded-lg">
                <Download size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900">{resume.originalName}</p>
                <p className="text-[12px] font-medium text-slate-500 italic">
                  Uploaded on {resume.uploadedAt}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                onClick={handleResumeDownload}
                title="Download Resume"
              >
                <Download size={18} />
              </Button>
              <AlertDialogComponent
              alertTitle="Resume Deletion Confirmation"
              alertDescription="Are you sure want to delete..."
              onConfirm={deleteResume}
              trigger={
                 <Button
              disabled={isDeletePending}
                variant="ghost"
                size="icon"
                className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete Resume"
              >
                <Trash2 size={18} />
              </Button>
              }
              ></AlertDialogComponent>
             
            </div>
          </div>
        )}

        {/* UPLOAD NEW RESUME */}
        <div className="relative group">
          <input
            disabled={isPending}
            type="file"
            id="resume-upload"
            className="hidden"
            accept=".pdf,.doc,.docx,.rtf"
            onChange={handleFileChange}
          />

          <label
            htmlFor="resume-upload"
            className="border-2 border-dashed border-slate-200 group-hover:border-blue-300 rounded-xl flex flex-col items-center justify-center py-12 cursor-pointer w-full bg-slate-50/50 group-hover:bg-blue-50/30 transition-all"
          >
            <div className="p-4 bg-white rounded-full shadow-sm mb-4 border border-slate-100 group-hover:scale-110 transition-transform">
              <Upload size={24} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </div>

            <div className="text-center">
              <p className="text-slate-700 font-bold mb-1">
                {isPending ? "Uploading your resume..." : resume ? "Update your resume" : "Upload your resume"}
              </p>
              <p className="text-slate-400 text-[13px] font-medium mb-6">
                Supported formats: PDF, DOC, DOCX, RTF
              </p>
            </div>

            <Button
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-10 px-8 rounded-lg pointer-events-none transition-all"
              disabled={isPending}
            >
              {isPending ? "Please wait..." : "Select File"}
            </Button>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
