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
import { Briefcase, MapPin, DollarSign, Cpu, Clock, LayoutGrid, Info } from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema } from "../../validators/job.schema";
import { useJobModalStore } from "../../store/openJobModalStore";
import type { Job } from "@/features/recruiter/types/job.type";
import type { JSX } from "react";
import { useEffect } from "react";
import type { z } from "zod";

type JobFormValues = z.infer<typeof jobSchema>;
type SubmitPayload = {
  job: Job;
  jobId?: string;
};

const FIELD_OPTIONS = [
  { label: "IT / Software", value: "IT" },
  { label: "Healthcare / Medical", value: "Healthcare" },
  { label: "Design", value: "Design" },
  { label: "Education", value: "Education" },
  { label: "Finance", value: "Finance" },
  { label: "Other", value: "Other" },
];

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
      // company: "",
      description: "",
      skills: "",
      experienceMin: undefined,
      experienceMax: undefined,
      salary: 0,
      location: "",
      remote: false,
      jobType: "full-time",
      field: "",
    },
  });

  useEffect(() => {
    if (selectedJob) {
      form.reset({
        title: selectedJob.title ?? "",
        // company: selectedJob.company ?? "",
        description: selectedJob.description ?? "",
        skills: selectedJob.skills ? selectedJob.skills.join(", ") : "",
        experienceMin: selectedJob.experienceMin ?? undefined,
        experienceMax: selectedJob.experienceMax ?? undefined,
        salary: selectedJob.salary ?? 0,
        location: selectedJob.location ?? "",
        remote: selectedJob.remote ?? false,
        jobType: selectedJob.jobType ?? "full-time",
        field: selectedJob.field ?? "",
      });
    } else {
      form.reset();
    }
  }, [selectedJob, form]);

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

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="bg-gray-50 border-b border-gray-200 p-6">
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Briefcase className="h-5 w-5 text-blue-600" />
            {selectedJob ? "Edit Job Posting" : "Create New Job"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Section: Basic Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 flex items-center justify-center">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-none">General Information</h3>
                <p className="text-[11px] text-gray-500 mt-1 font-medium italic">Basic details about the position</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="h-3 w-3" />
                  Job Title
                </label>
                <Input placeholder="e.g. Senior Frontend Engineer" className="h-10 border-gray-200 focus:border-blue-400 focus:ring-blue-100 transition-all" {...form.register("title")} />
                {errors.title && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.title.message}</p>}
              </div>

              {/* <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="h-3 w-3" />
                  Company Name
                </label>
                <Input placeholder="e.g. CareerSync Inc." className="h-10 border-gray-200 focus:border-blue-400 focus:ring-blue-100 transition-all" {...form.register("company")} />
                {errors.company && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.company.message}</p>}
              </div> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <LayoutGrid className="h-3 w-3" />
                  Industry / Field
                </label>
                <Select onValueChange={(val) => form.setValue("field", val)} value={form.watch("field")}>
                  <SelectTrigger className="h-10 border-gray-200 focus:border-blue-400 focus:ring-blue-100">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {FIELD_OPTIONS.map((item) => (
                      <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.field && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.field.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="h-3 w-3" />
                  Employment type
                </label>
                <Select onValueChange={(val) => form.setValue("jobType", val as "full-time" | "part-time" | "internship")} value={form.watch("jobType")}>
                  <SelectTrigger className="h-10 border-gray-200 focus:border-blue-400 focus:ring-blue-100">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Section: Requirements & Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center">
                <Cpu className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-none">Requirements & Role</h3>
                <p className="text-[11px] text-gray-500 mt-1 font-medium italic">What are you looking for in a candidate?</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Detailed Description</label>
              <Textarea
                placeholder="Break down responsibilities and expectations..."
                className="min-h-[140px] border-gray-200 focus:border-blue-400 focus:ring-blue-100 resize-none leading-relaxed"
                {...form.register("description")}
              />
              {errors.description && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.description.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Required Skills</label>
              <Input placeholder="React, Node.js, TypeScript (comma separated)" className="h-10 border-gray-200 focus:border-blue-400 focus:ring-blue-100" {...form.register("skills")} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Min. Experience (Years)</label>
                <Input type="number" className="h-10 border-gray-200 focus:border-blue-400 focus:ring-blue-100" {...form.register("experienceMin", { valueAsNumber: true })} />
                {errors.experienceMin && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.experienceMin.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Max. Experience (Years)</label>
                <Input type="number" className="h-10 border-gray-200 focus:border-blue-400 focus:ring-blue-100" {...form.register("experienceMax", { valueAsNumber: true })} />
                {errors.experienceMax && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.experienceMax.message}</p>}
              </div>
            </div>
          </div>

          {/* Section: Logistics */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center">
                <MapPin className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 leading-none">Location & Compensation</h3>
                <p className="text-[11px] text-gray-500 mt-1 font-medium italic">Logistical details and salary</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="h-3 w-3" />
                  Office Location
                </label>
                <Input placeholder="e.g. New York, NY" className="h-10 border-gray-200 focus:border-blue-400 focus:ring-blue-100 transition-all" {...form.register("location")} />
                {errors.location && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.location.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="h-3 w-3" />
                  Annual Salary (INR)
                </label>
                <Input type="number" placeholder="e.g. 1200000" className="h-10 border-gray-200 focus:border-blue-400 focus:ring-blue-100 transition-all" {...form.register("salary", { valueAsNumber: true })} />
                {errors.salary && <p className="text-red-500 text-[10px] font-bold mt-1">{errors.salary.message}</p>}
              </div>
            </div>

            <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl hover:bg-white transition-all group">
              <Checkbox
                id="remote-checkbox"
                checked={form.watch("remote")}
                onCheckedChange={(val) => form.setValue("remote", Boolean(val))}
                className="h-5 w-5 data-[state=checked]:bg-blue-600 border-gray-300"
              />
              <div className="flex flex-col">
                <label htmlFor="remote-checkbox" className="text-sm font-bold text-gray-800 cursor-pointer group-hover:text-blue-700 transition-colors">
                  Remote friendly position
                </label>
                <p className="text-[10px] text-gray-500 font-medium">Candidates can work from anywhere in the world</p>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-6 border-t border-gray-100">
            <Button type="button" variant="ghost" onClick={closeModal} className="text-gray-500">Cancel</Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 shadow-md">
              {selectedJob ? "Update Job Posting" : "Publish Job"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
