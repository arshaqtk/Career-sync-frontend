import { useRef, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { useUpdateResume } from "../../hooks/useUpdateProfile";
import {
  Upload,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Brain,
  Briefcase,
  GraduationCap,
  Code2,
} from "lucide-react";

interface ProfileInitModalProps {
  open: boolean;
  onSkip?: () => void;
}

const features = [
  { icon: Brain,          label: "AI extracts your skills automatically"     },
  { icon: Briefcase,      label: "Work experience parsed and saved"           },
  { icon: GraduationCap,  label: "Education history filled in for you"        },
  { icon: Code2,          label: "Tech stack detected from your resume"       },
];

export const ProfileInitModal = ({ open, onSkip }: ProfileInitModalProps) => {
  const fileInputRef                    = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging]     = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDone, setIsDone]             = useState(false);

  const { mutate, isPending } = useUpdateResume();

  const handleFile = (file: File) => {
    if (!file) return;
    setUploadedFile(file);
    const formData = new FormData();
    formData.append("resume", file);
    mutate(formData, {
      onSuccess: () => setIsDone(true),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-2xl p-0 border-none overflow-hidden rounded-3xl shadow-2xl"
        onInteractOutside={(e) => e.preventDefault()} // prevent close
        onEscapeKeyDown={(e) => e.preventDefault()}   // prevent close
      >
        {/* ── Done state ── */}
        {isDone ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20 px-10 bg-white text-center">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                Profile initialized!
              </h2>
              <p className="text-slate-500 text-sm">
                Your resume has been parsed and your profile is ready.
                You can edit any details from your profile settings.
              </p>
            </div>
            <Button
              onClick={() => {
                if (onSkip) {
                  onSkip();
                } else {
                  window.location.reload();
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-12 rounded-xl shadow-lg gap-2"
            >
              Go to my profile <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row min-h-[480px]">

            {/* ── Left panel ── */}
            <div className="w-full md:w-[42%] bg-gradient-to-br from-blue-600 to-violet-700 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <Sparkles className="w-5 h-5 text-white/80" />
                  <span className="text-white/80 text-sm font-semibold tracking-widest uppercase">
                    CareerSync AI
                  </span>
                </div>
                <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">
                  Let AI build your profile
                </h2>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Upload your resume once and we'll automatically fill in your entire profile — skills, experience, education and more.
                </p>
              </div>

              {/* Features list */}
              <div className="space-y-3 mt-8">
                {features.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-blue-100 text-xs font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right panel ── */}
            <div className="flex-1 bg-white p-8 flex flex-col justify-center gap-6">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Upload your resume
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Supports PDF, DOC, DOCX · Max 5MB
                </p>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => !isPending && fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-2xl p-8
                  flex flex-col items-center justify-center gap-3
                  cursor-pointer transition-all duration-200
                  ${isDragging
                    ? "border-blue-500 bg-blue-50 scale-[1.01]"
                    : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/80"
                  }
                  ${isPending ? "pointer-events-none opacity-70" : ""}
                `}
              >
                {isPending ? (
                  <>
                    {/* Parsing animation */}
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-blue-500 animate-pulse" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-800">
                        AI is reading your resume...
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Extracting skills, experience & education
                      </p>
                    </div>
                    {/* Progress bar */}
                    <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: "70%" }} />
                    </div>
                  </>
                ) : uploadedFile ? (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-green-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-800">{uploadedFile.name}</p>
                      <p className="text-xs text-slate-400 mt-1">Uploaded successfully</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                      <Upload className="w-7 h-7 text-blue-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-slate-800">
                        Drag & drop or{" "}
                        <span className="text-blue-600 underline underline-offset-2">
                          browse
                        </span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Your resume will auto-fill your entire profile
                      </p>
                    </div>
                  </>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleInputChange}
              />

              {/* Manual skip option */}
              <p className="text-center text-xs text-slate-400">
                Want to fill manually?{" "}
                <button
                  type="button"
                  onClick={() => {
                    if (onSkip) {
                      onSkip();
                    } else {
                      window.location.reload();
                    }
                  }}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Skip for now
                </button>
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};