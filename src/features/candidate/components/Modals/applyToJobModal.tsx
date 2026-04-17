import { useForm } from "react-hook-form";
import { logger } from "@/lib/logger";
import type { ApplyJobDTO } from "../../types/application.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyJobSchema } from "../../validators/applyJob.schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { useUpdateResume } from "../../hooks/useUpdateProfile";
import { useEffect, useRef, useState } from "react";
import { FileText, Upload, Briefcase, DollarSign, Clock, User, Sparkles, Loader2, Ban } from "lucide-react";
import { useCoverLetterLimit } from "../../hooks/useCoverLetterLimit";
import { toast } from "sonner";

type Tone = "professional" | "enthusiastic" | "concise";

export const ApplyToJobModal = ({ jobIds, candidateresumeUrl, onSubmit, open, OpenChange }: {
    jobIds: string; candidateresumeUrl?: string; onSubmit: (payload: ApplyJobDTO) => void; open: boolean; OpenChange: (val: boolean) => void;
}) => {

    const { mutate, isPending } = useUpdateResume();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [tone, setTone] = useState<Tone>("professional");
    const [isGenerating, setIsGenerating] = useState(false);
    const { limitState, updateFromHeaders, markAsLimited } = useCoverLetterLimit();

    const form = useForm<ApplyJobDTO>({
        resolver: zodResolver(applyJobSchema),
        defaultValues: {
            jobId: jobIds,
            coverLetter: "",
            resumeKey: candidateresumeUrl || "",
            expectedSalary: 0,
            noticePeriod: "",
            experience: 0,
            currentRole: ""
        },
    });

    useEffect(() => {
        if (open) {
            form.reset({
                jobId: jobIds,
                resumeKey: candidateresumeUrl || "",
                coverLetter: "",
                expectedSalary: 0,
                noticePeriod: "",
                experience: 0,
                currentRole: ""
            });
        }
    }, [open, jobIds, candidateresumeUrl, form]);

    const { handleSubmit, register, formState: { errors } } = form;

    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("resume", file);
        mutate(formData, {
            onSuccess: (data) => {
                form.setValue("resumeKey", data.candidateData?.resume?.key as string);
            }
        });
    };

    // --- AI Cover Letter Generator ---
    const handleGenerateCoverLetter = async () => {
        if (limitState.isLimited) {
    toast.error("Daily limit reached. Please try again tomorrow.");
    return;
  }
        setIsGenerating(true);
        form.setValue("coverLetter", ""); // clear before streaming

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/ai/coverletter/generate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId: jobIds, tone }),
            // Important: include cookies for authentication
            credentials: 'include' 
        });

        updateFromHeaders(response.headers);

         if (response.status === 429) {
      // Rate limited — mark as blocked
      const resetHeader = response.headers.get("Ratelimit-Reset");
      const resetTime = resetHeader ? new Date(parseInt(resetHeader) * 1000) : undefined;
      markAsLimited(resetTime);
      setIsGenerating(false);
      return;
    }

        if (!response.ok) throw new Error("Failed to generate cover letter");


            // Stream the response chunk by chunk
            const reader = response.body?.getReader();
            if (!reader) throw new Error("No reader available");
            const decoder = new TextDecoder();
            let accumulated = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                accumulated += chunk;
                form.setValue("coverLetter", accumulated); // live update textarea
            }

        } catch (err) {
            logger.error("Cover letter generation failed:", err);
            form.setValue("coverLetter", "Failed to generate. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={OpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none bg-card shadow-2xl rounded-2xl">
                <DialogHeader className="px-8 pt-8 pb-6 bg-muted/50/50 border-b border-border/50">
                    <DialogTitle className="text-2xl font-extrabold text-foreground tracking-tight uppercase flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-blue-600" />
                        Apply for Job
                    </DialogTitle>
                    <p className="text-sm font-medium text-muted-foreground mt-1">
                        Submit your application and stand out to recruiters with a professional profile.
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Current Role */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-foreground/80 uppercase tracking-wider px-1 flex items-center gap-2">
                                <User className="w-3.5 h-3.5" /> Current Role
                            </label>
                            <Input
                                placeholder="e.g. Software Engineer"
                                className="h-11 border-border focus-visible:ring-blue-600 font-medium"
                                {...register("currentRole")}
                            />
                            {errors.currentRole && (
                                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.currentRole.message}</p>
                            )}
                        </div>

                        {/* Experience */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-foreground/80 uppercase tracking-wider px-1 flex items-center gap-2">
                                <Briefcase className="w-3.5 h-3.5" /> Experience (Years)
                            </label>
                            <Input
                                type="number"
                                placeholder="e.g. 3"
                                className="h-11 border-border focus-visible:ring-blue-600 font-medium"
                                {...register("experience", { valueAsNumber: true })}
                            />
                            {errors.experience && (
                                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.experience.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Expected Salary */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-foreground/80 uppercase tracking-wider px-1 flex items-center gap-2">
                                <DollarSign className="w-3.5 h-3.5" /> Expected Salary
                            </label>
                            <Input
                                placeholder="e.g. 1500000"
                                type="number"
                                className="h-11 border-border focus-visible:ring-blue-600 font-medium"
                                {...register("expectedSalary", { valueAsNumber: true })}
                            />
                            {errors.expectedSalary && (
                                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.expectedSalary.message}</p>
                            )}
                        </div>

                        {/* Notice Period */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-foreground/80 uppercase tracking-wider px-1 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" /> Notice Period
                            </label>
                            <Input
                                placeholder="e.g. 30 Days"
                                className="h-11 border-border focus-visible:ring-blue-600 font-medium"
                                {...register("noticePeriod")}
                            />
                            {errors.noticePeriod && (
                                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.noticePeriod.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className="space-y-3">
                        <label className="text-[13px] font-bold text-foreground/80 uppercase tracking-wider px-1 flex items-center gap-2">
                            <FileText className="w-3.5 h-3.5" /> Resume
                        </label>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-blue-100 rounded-xl bg-blue-50/30">
                            <div className="flex-1">
                                {candidateresumeUrl ? (
                                    <div className="flex items-center gap-2 text-blue-700 font-medium">
                                        <FileText className="w-5 h-5" />
                                        <span className="text-sm">Using your saved resume</span>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">No resume selected. Please upload one.</p>
                                )}
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isPending}
                                onClick={() => fileInputRef.current?.click()}
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 font-bold gap-2 bg-card"
                            >
                                {isPending ? <Upload className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                {isPending ? "Uploading..." : candidateresumeUrl ? "Update Resume" : "Upload Resume"}
                            </Button>
                        </div>
                        <input
                            ref={fileInputRef}
                            id="resumeFile"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={handleResumeUpload}
                        />
                        {errors.resumeKey && (
                            <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.resumeKey.message}</p>
                        )}
                    </div>

                    {/* ✅ Cover Letter Section with AI Generator */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-[13px] font-bold text-foreground/80 uppercase tracking-wider px-1">
                                Cover Letter
                            </label>

                            {/* Tone Dropdown + Generate Button */}
                            <div className="flex items-center gap-2">
                                <Select value={tone} onValueChange={(val) => setTone(val as Tone)}>
                                    <SelectTrigger className="h-8 w-36 text-xs font-semibold border-border focus:ring-blue-600">
                                        <SelectValue placeholder="Tone" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="professional">Professional</SelectItem>
                                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                                        <SelectItem value="concise">Concise</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    type="button"
                                     disabled={isGenerating || !candidateresumeUrl || limitState.isLimited}
                                    onClick={handleGenerateCoverLetter}
                                    className={`h-8 px-3 text-xs font-bold 
                                    ${limitState.isLimited ? "bg-gray-300 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white gap-1.5 shadow-sm"}`}
                                >
                                    {isGenerating
      ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating...</>
      : limitState.isLimited
        ? <><Ban className="w-3.5 h-3.5" /> Limit reached</>
        : <><Sparkles className="w-3.5 h-3.5" /> AI Generate</>
    }
                                </Button>
                            </div>
                        </div>
                        {/* Tooltip if limited */}
{limitState.isLimited && (
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] rounded-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
      Daily limit reached
      {limitState.resetTime && (
        <span> · Resets at {limitState.resetTime.toLocaleTimeString()}</span>
      )}
    </div>
  )}
  {/* Usage counter below the label */}
{!limitState.isLimited ? (
  <p className="text-[11px] text-muted-foreground/70 px-1">
    {limitState.remaining}/{limitState.total} generations remaining today
  </p>
) : (
  <p className="text-[11px] text-red-500 font-semibold px-1">
    ⚠ Daily limit reached.
    {limitState.resetTime && (
      <span> Resets at {limitState.resetTime.toLocaleTimeString()}</span>
    )}
  </p>
)}
                        {/* Tooltip if no resume */}
                        {!candidateresumeUrl && (
                            <p className="text-amber-500 text-[11px] font-semibold px-1">
                                ⚠ Upload a resume to enable AI generation
                            </p>
                        )}
                        

                        <Textarea
                            placeholder="Write a brief cover letter or click AI Generate above..."
                            className="min-h-[160px] border-border focus-visible:ring-blue-600 font-medium text-foreground/80 placeholder:text-muted-foreground/70 resize-none rounded-xl p-4"
                            {...register("coverLetter")}
                        />
                        {errors.coverLetter && (
                            <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.coverLetter.message}</p>
                        )}
                    </div>

                    <div className="pt-8 border-t border-border/50 flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => OpenChange(false)}
                            disabled={form.formState.isSubmitting}
                            className="text-muted-foreground font-bold hover:bg-muted/50 px-6 h-12"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting || isPending || isGenerating}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-10 h-12 shadow-lg shadow-blue-100 transition-all active:scale-95"
                        >
                            {form.formState.isSubmitting ? "Applying..." : "Submit Application"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};