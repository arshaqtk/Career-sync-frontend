import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Upload, Download, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useUpdateResume } from "../../hooks/useUpdateProfile";

export default function ResumeUpload({
  resume,

}: {
  resume: {
    url: string,
    originalName: string,
    uploadedAt: string,
  } | null;
}) {

  const { mutate, isPending } = useUpdateResume();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    mutate(formData, {
      onSuccess: (data) => {
        const newUrl = data?.candidateData?.resumeUrl as string;

        if (newUrl) {
            
          toast.success("Resume updated!");
        }
      },
      onError: () => {
        toast.error("Resume upload failed!");
      }
    });
  };

  const handleResumeDownload = () => {
    if (!resume) {
      toast.error("Resume not uploaded!");
      return;
    }

    const link = document.createElement("a");
    link.href = resume.url;
    link.download = resume.originalName || "resume.pdf";
    link.click();
  };

  return (
    <Card className="w-full border rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-[20px] font-semibold">Resume</CardTitle>
        <p className="text-sm text-gray-500 mt-1">
          Your resume is the first impression you make on potential employers.
        </p>
      </CardHeader>

      <CardContent className="mt-2">

        {/* EXISTING RESUME */}
        {resume && (
          <div className="flex items-center justify-between border rounded-lg px-4 py-3 bg-gray-50">
            <div>
              <p className="font-medium">{resume.originalName}</p>
              <p className="text-xs text-gray-500">
                Uploaded on {resume.uploadedAt}
              </p>
            </div>

            <div className="flex gap-4">
              <button className="text-blue-600 hover:text-blue-700" onClick={handleResumeDownload}>
                <Download size={20} />
              </button>
              <button className="text-red-600 hover:text-red-700" onClick={() => alert("work on it ")}>
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        )}

        {/* UPLOAD NEW RESUME */}
        <div className="mt-4">
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
            className="border-2 border-dashed rounded-xl flex flex-col items-center justify-center py-10 cursor-pointer w-full"
          >
            <Button
              variant="outline"
              className="px-6 py-5 rounded-full flex items-center gap-2 pointer-events-none"
              disabled={isPending}
            >
              <Upload size={20} />
              {isPending ? "Uploading..." : "Update Resume"}
            </Button>

            <p className="text-xs text-gray-500 mt-2 pointer-events-none">
              Supported formats: doc, docx, rtf, pdf
            </p>
          </label>
        </div>

      </CardContent>
    </Card>
  );
}
