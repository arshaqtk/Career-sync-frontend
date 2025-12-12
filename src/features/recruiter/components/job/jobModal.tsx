import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/shadcn/select";
import { Checkbox } from "@/components/ui/shadcn/checkbox";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "../../validators/job.schema";
import { useJobModalStore } from "../../store/openJobModalStore";
import type { Job } from "@/types/job.type";
import type { JSX } from "react";
import { useEffect } from "react";
import type { z } from "zod";

type JobFormValues = z.infer<typeof jobSchema>;
type SubmitPayload = {
  job: Job;
  jobId?: string;
};

export function AddJobModal({
  onSubmit,
}: {
  onSubmit: (payload: SubmitPayload) => void;
}): JSX.Element {
  const { isOpen, closeModal, selectedJob } = useJobModalStore();

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      description: "",
      skills: "",
      experienceMin: undefined,
      experienceMax: undefined,
      salary: "",
      location: "",
      remote: false,
      jobType: "full-time",
      status: "open",
    },
  });

  // Load job data when editing
  useEffect(() => {
    if (selectedJob) {
      form.reset({
        title: selectedJob.title ?? "",
        company: selectedJob.company ?? "",
        description: selectedJob.description ?? "",
        skills: selectedJob.skills ? selectedJob.skills.join(", ") : "",
        experienceMin: selectedJob.experienceMin ?? undefined,
        experienceMax: selectedJob.experienceMax ?? undefined,
        salary: selectedJob.salary ?? "",
        location: selectedJob.location ?? "",
        remote: selectedJob.remote ?? false,
        jobType: selectedJob.jobType ?? "full-time",
        status: selectedJob.status ?? "open",
      });
    } else {
      form.reset();
    }
  }, [selectedJob,form]);

  // Final submit handler
  const handleSubmit = (data: JobFormValues) => {
    const jobPayload: Job = {
      ...data,
      skills: data.skills ? data.skills.split(",").map((s) => s.trim()) : [],
    };

    onSubmit({
      job: jobPayload,
      jobId: selectedJob?._id,
    });
  };

  const errors = form.formState.errors;
  console.log(isOpen)

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedJob ? "Edit Job" : "Add Job"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <Input placeholder="Job Title" {...form.register("title")} />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <Input placeholder="Company" {...form.register("company")} />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>

          {/* Description */}
          <Textarea
            placeholder="Job Description"
            {...form.register("description")}
          />

          {/* Skills */}
          <Input
            placeholder="Skills (comma separated)"
            {...form.register("skills")}
          />

          {/* Experience */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                type="number"
                placeholder="Experience Min"
                {...form.register("experienceMin", { valueAsNumber: true })}
              />
              {errors.experienceMin && (
                <p className="text-red-500 text-sm">
                  {errors.experienceMin.message}
                </p>
              )}
            </div>

            <div className="flex-1">
              <Input
                type="number"
                placeholder="Experience Max"
                {...form.register("experienceMax", { valueAsNumber: true })}
              />
              {errors.experienceMax && (
                <p className="text-red-500 text-sm">
                  {errors.experienceMax.message}
                </p>
              )}
            </div>
          </div>

          {/* Salary */}
          <div>
            <Input placeholder="Salary" {...form.register("salary")} />
            {errors.salary && (
              <p className="text-red-500 text-sm">{errors.salary.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <Input placeholder="Location" {...form.register("location")} />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>

          {/* Remote */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={form.watch("remote")}
              onCheckedChange={(val) => form.setValue("remote", Boolean(val))}
            />
            <span>Remote Job</span>
          </div>

          {/* Job Type */}
          <div>
            <label className="text-sm font-medium">Job Type</label>
            <Select
              onValueChange={(val) => form.setValue("jobType", val as any)}
              defaultValue={form.watch("jobType")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Job Type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            {errors.jobType && (
              <p className="text-red-500 text-sm">{errors.jobType.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select
              onValueChange={(val) => form.setValue("status", val as any)}
              defaultValue={form.watch("status")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Submit Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
