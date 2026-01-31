import { useForm } from "react-hook-form";
import type { ApplyJobDTO } from "../../types/application.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyJobSchema } from "../../validators/applyJob.schema";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/shadcn/dialog";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { useUpdateResume } from "../../hooks/useUpdateProfile";
import { useEffect, useRef } from "react";

export const ApplyToJobModal = ({ jobIds, candidateResumeUrl, onSubmit, open, OpenChange, }: {
    jobIds: string; candidateResumeUrl?: string; onSubmit: (payload: ApplyJobDTO) => void; open: boolean; OpenChange: (val: boolean) => void;
}) => {

    const { mutate, isPending } = useUpdateResume()
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const form = useForm<ApplyJobDTO>({
        resolver: zodResolver(applyJobSchema),
        defaultValues: {
            jobId: jobIds,
            coverLetter: "",
            resumeUrl: candidateResumeUrl || "",
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
                resumeUrl: candidateResumeUrl || "",
                coverLetter: "",
                expectedSalary: 0,
                noticePeriod: "",
                experience: 0,
                currentRole: ""
            });
        }
    }, [open, jobIds]);

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
                form.setValue("resumeUrl", data.candidateData?.resume?.url as string);
            }
        })
    };

    return (
        <Dialog open={open} onOpenChange={OpenChange}>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Apply Job</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Cover Letter */}
                    <div className="space-y-2">
                        <p className="font-medium">Cover Letter</p>

                        <Textarea
                            placeholder="Write your cover letter here..."
                            rows={6}
                            {...register("coverLetter")}
                        />

                        {errors.coverLetter && (
                            <p className="text-red-500 text-sm">
                                {errors.coverLetter.message}
                            </p>
                        )}
                    </div>


                    {/* Resume Section */}
                    <div className="space-y-2">
                        <p className="font-medium">Resume</p>

                        {candidateResumeUrl && (
                            <p className="text-sm text-gray-600">
                                Using saved resume
                            </p>
                        )}

                        <Button
                            type="button"
                            variant="outline"
                            disabled={isPending}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {isPending ? "Uploading..." : "Upload New Resume"}
                        </Button>

                        <input
                            ref={fileInputRef}
                            id="resumeFile"
                            type="file"
                            accept=".pdf,.doc,.docx,.rtf"
                            className="hidden"
                            onChange={handleResumeUpload}
                        />

                        {/* Show form validation if needed */}
                        {errors.resumeUrl && (
                            <p className="text-red-500 text-sm">{errors.resumeUrl.message}</p>
                        )}
                    </div>
                    {/* Current Role */}
                    <div>
                        <p className="font-medium">Current Role</p>
                        <Input placeholder="Current Role" {...register("currentRole")} required />
                        {errors.currentRole && (
                            <p className="text-red-500 text-sm">{errors.currentRole.message}</p>
                        )}
                    </div>

                    {/* Notice Period */}
                    <div>
                        <p className="font-medium">Notice Period</p>
                        <Input placeholder="Notice Period" {...register("noticePeriod")} required />
                        {errors.noticePeriod && (
                            <p className="text-red-500 text-sm">{errors.noticePeriod.message}</p>
                        )}
                    </div>

                    {/* Expected Salary */}
                    <div>
                        <p className="font-medium">Expected Salary</p>
                        <Input
                            placeholder="Expected Salary"
                            type="number"
                            {...register("expectedSalary", { valueAsNumber: true })}
                        />
                        {errors.expectedSalary && (
                            <p className="text-red-500 text-sm">{errors.expectedSalary.message}</p>
                        )}
                    </div>
                    {/* Experience */}
                    <div>
                        <p className="font-medium">Experience</p>
                    
                        <Input
                        type="number" 
                        placeholder="Experience" {...register("experience",{ valueAsNumber: true })} required />
                        {errors.experience && (
                            <p className="text-red-500 text-sm">{errors.experience.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        {/* disabled={!form.watch("resumeUrl")} */}
                        <Button type="submit">Apply</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
