import {Dialog,DialogContent, DialogHeader,DialogTitle,DialogFooter,} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";
import { Select,SelectTrigger,SelectValue,SelectContent,SelectItem,} from "@/components/ui/shadcn/select";
import { Checkbox } from "@/components/ui/shadcn/checkbox";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "../../validators/job.schema";
import { useJobModalStore } from "../../store/openJobModalStore";
import type { Job } from "@/types/job.type";
import { useEffect } from "react";
import type { JSX } from "react";
import type { z } from "zod";

type JobFormValues = z.infer<typeof jobSchema>;
type SubmitPayload = { job: Job;
  jobId?: string; 
};
export function AddJobModal({ onSubmit,}: {onSubmit: (payload: SubmitPayload) => void}): JSX.Element {

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
      applicationCount: undefined,
    },
  });

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
        applicationCount: selectedJob.applicationCount ?? undefined,
      });
    } else {
      form.reset({
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
        applicationCount: undefined,
      });
    }
  }, [selectedJob]);


  const handleSubmit = (data: JobFormValues) => {
  const jobPayload: Job = {
    ...data,
    skills: data.skills
      ? data.skills.split(",").map((s) => s.trim())
      : [],
  };

  onSubmit({
    job: jobPayload,
    jobId: selectedJob?._id, 
  });
}


  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{selectedJob ? "Edit Job" : "Add Job"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* Job Title */}
          <Input placeholder="Job Title" {...form.register("title")} />

          {/* Company */}
          <Input placeholder="Company" {...form.register("company")} />

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

          {/* Experience Min-Max */}
          <div className="flex gap-3">
            <Input
              type="number"
              placeholder="Experience Min"
              {...form.register("experienceMin", { valueAsNumber: true })}
            />
            <Input
              type="number"
              placeholder="Experience Max"
              {...form.register("experienceMax", { valueAsNumber: true })}
            />
          </div>

          {/* Salary */}
          <Input placeholder="Salary" {...form.register("salary")} />

          {/* Location */}
          <Input placeholder="Location" {...form.register("location")} />

          {/* Remote Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              checked={form.watch("remote")}
              onCheckedChange={(value) =>
                form.setValue("remote", Boolean(value))
              }
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
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium">Job Status</label>
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
          </div>

          {/* Application Count */}
          <Input
            type="number"
            placeholder="Application Count"
            {...form.register("applicationCount", { valueAsNumber: true })}
          />

          <DialogFooter>
            <Button type="submit">Submit Job</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
