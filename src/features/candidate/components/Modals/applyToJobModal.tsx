import { useForm } from "react-hook-form";
import type { ApplyJobDTO } from "../../types/application.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyJobSchema } from "../../validators/applyJob.schema";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/shadcn/dialog";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { useUpdateResume } from "../../hooks/useUpdateProfile";
import { useEffect, useRef } from "react";
import { FileText, Upload, Briefcase, DollarSign, Clock, User } from "lucide-react";

export const ApplyToJobModal = ({ jobIds, candidateresumeUrl, onSubmit, open, OpenChange, }: {
    jobIds: string; candidateresumeUrl?: string; onSubmit: (payload: ApplyJobDTO) => void; open: boolean; OpenChange: (val: boolean) => void;
}) => {

    const { mutate, isPending } = useUpdateResume()
    const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = form;

    const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const formData = new FormData();
        formData.append("resume", file);
        mutate(formData, {
            onSuccess: (data) => {
                form.setValue("resumeKey", data.candidateData?.resume?.key as string);
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={OpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white shadow-2xl rounded-2xl">
                <DialogHeader className="px-8 pt-8 pb-6 bg-slate-50/50 border-b border-slate-100">
                    <DialogTitle className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase flex items-center gap-3">
                        <Briefcase className="w-8 h-8 text-blue-600" />
                        Apply for Job
                    </DialogTitle>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                        Submit your application and stand out to recruiters with a professional profile.
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Current Role */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1 flex items-center gap-2">
                                <User className="w-3.5 h-3.5" /> Current Role
                            </label>
                            <Input 
                                placeholder="e.g. Software Engineer" 
                                className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
                                {...register("currentRole")} 
                            />
                            {errors.currentRole && (
                                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.currentRole.message}</p>
                            )}
                        </div>

                        {/* Experience */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1 flex items-center gap-2">
                                <Briefcase className="w-3.5 h-3.5" /> Experience (Years)
                            </label>
                            <Input
                                type="number" 
                                placeholder="e.g. 3" 
                                className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
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
                            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1 flex items-center gap-2">
                                <DollarSign className="w-3.5 h-3.5" /> Expected Salary
                            </label>
                            <Input
                                placeholder="e.g. 1500000"
                                type="number"
                                className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
                                {...register("expectedSalary", { valueAsNumber: true })}
                            />
                            {errors.expectedSalary && (
                                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.expectedSalary.message}</p>
                            )}
                        </div>

                        {/* Notice Period */}
                        <div className="space-y-2">
                            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1 flex items-center gap-2">
                                <Clock className="w-3.5 h-3.5" /> Notice Period
                            </label>
                            <Input 
                                placeholder="e.g. 30 Days" 
                                className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
                                {...register("noticePeriod")} 
                            />
                            {errors.noticePeriod && (
                                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.noticePeriod.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Resume Section */}
                    <div className="space-y-3">
                        <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1 flex items-center gap-2">
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
                                    <p className="text-sm text-slate-500">No resume selected. Please upload one.</p>
                                )}
                            </div>
                            
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isPending}
                                onClick={() => fileInputRef.current?.click()}
                                className="border-blue-200 text-blue-600 hover:bg-blue-50 font-bold gap-2 bg-white"
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

                    {/* Cover Letter */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Cover Letter</label>
                        <Textarea
                            placeholder="Write a brief cover letter explaining why you're a great fit for this role..."
                            className="min-h-[160px] border-slate-200 focus-visible:ring-blue-600 font-medium text-slate-700 placeholder:text-slate-400 resize-none rounded-xl p-4"
                            {...register("coverLetter")}
                        />
                        {errors.coverLetter && (
                            <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.coverLetter.message}</p>
                        )}
                    </div>

                    <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => OpenChange(false)}
                            disabled={form.formState.isSubmitting}
                            className="text-slate-500 font-bold hover:bg-slate-50 px-6 h-12"
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            disabled={form.formState.isSubmitting || (isPending)}
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

