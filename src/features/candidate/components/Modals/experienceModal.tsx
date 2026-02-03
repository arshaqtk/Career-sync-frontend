import { Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem,} from "@/components/ui/shadcn/select";
import { Popover, PopoverTrigger, PopoverContent,} from "@/components/ui/shadcn/popover";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import type { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceFormSchema } from "../../validators/Experience.schema";
import { ExperienceModalStore } from "../../store/experienceFormModal.store";
import { useLayoutEffect } from "react";
import type { Experience } from "../../types/Experience.types";

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

export function ExperienceFormModal({
  onSubmit,
}: {
  onSubmit: (payload: Experience) => void;
}) {
  const { isOpen, closeModal, selectedExperience } =
    ExperienceModalStore();

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      company: "",
      role: "",
      description: "",
      skills: "",
      location: "",
      jobType: "full-time",
      startDate: undefined,
      endDate: undefined,
    },
  });

  useLayoutEffect(() => {
    if (!isOpen) return;

    if (selectedExperience) {
      form.reset({
        _id: selectedExperience._id,
        company: selectedExperience.company,
        role: selectedExperience.role,
        description: selectedExperience.description,
        location: selectedExperience.location,
        jobType: selectedExperience.jobType,

        // ✅ STRING → DATE (THIS IS MANDATORY)
        startDate: selectedExperience.startDate
          ? new Date(selectedExperience.startDate)
          : undefined,

        endDate: selectedExperience.endDate
          ? new Date(selectedExperience.endDate)
          : undefined,

        skills: selectedExperience.skills?.join(", "),
      });
    } else {
      form.reset({
        company: "",
        role: "",
        description: "",
        skills: "",
        location: "",
        jobType: "full-time",
        startDate: undefined,
        endDate: undefined,
      });
    }
  }, [isOpen, selectedExperience, form]);

  const errors = form.formState.errors;

  console.log(form.formState.errors);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !form.formState.isSubmitting) {
          closeModal();
        }
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white shadow-2xl rounded-2xl">
        <DialogHeader className="px-8 pt-8 pb-6 bg-slate-50/50 border-b border-slate-100">
          <DialogTitle className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
            {selectedExperience ? "Update Experience" : "Add Experience"}
          </DialogTitle>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Highlight your professional journey and key responsibilities.
          </p>
        </DialogHeader>

        <form
          className="p-8 space-y-6"
          onSubmit={form.handleSubmit((data) => {
            const payload: Experience = {
              ...data,
              startDate: data.startDate.toISOString(),
              endDate: data.endDate
                ? data.endDate.toISOString()
                : undefined,
              skills: data.skills
                ? data.skills
                  .split(",")
                  .map(s => s.trim())
                  .filter(Boolean)
                : [],
            };

            onSubmit(payload);
          })}
        >
          {/* Role */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Job Title / Role</label>
            <Input
              placeholder="e.g. Senior Software Engineer"
              className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
              {...form.register("role")}
            />
            {errors.role && (
              <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.role.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Company */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Company Name</label>
              <Input
                placeholder="e.g. Google, Amazon, Startup Inc."
                className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
                {...form.register("company")}
              />
              {errors.company && (
                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.company.message}</p>
              )}
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Employment Type</label>
              <Controller
                name="jobType"
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-11 border-slate-200 focus:ring-blue-600 font-medium capitalize">
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Location</label>
            <Input
              placeholder="e.g. Hyderabad, India (or Remote)"
              className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
              {...form.register("location")}
            />
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 text-left font-medium border-slate-200 hover:bg-slate-50 transition-all",
                      !form.watch("startDate") && "text-slate-400"
                    )}
                  >
                    {form.watch("startDate")
                      ? format(form.watch("startDate")!, "PPP")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none shadow-2xl rounded-2xl overflow-hidden" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("startDate")}
                    onSelect={(date) => {
                      if (!date) return;
                      form.setValue("startDate", date, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && (
                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.startDate.message}</p>
              )}
            </div>

            {/* End Date */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">End Date (Optional)</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 text-left font-medium border-slate-200 hover:bg-slate-50 transition-all",
                      !form.watch("endDate") && "text-slate-400"
                    )}
                  >
                    {form.watch("endDate")
                      ? format(form.watch("endDate")!, "PPP")
                      : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 border-none shadow-2xl rounded-2xl overflow-hidden" align="start">
                  <Calendar
                    mode="single"
                    selected={form.watch("endDate")}
                    onSelect={(date) =>
                      form.setValue("endDate", date ?? undefined, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && (
                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Skills Used</label>
            <Input
              placeholder="e.g. React, Next.js, Node.js (comma separated)"
              className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
              {...form.register("skills")}
            />
            <p className="text-[11px] text-slate-400 font-medium px-1 italic">Separate multiple skills with commas.</p>
            {errors.skills && (
              <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.skills.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Key Responsibilities / Achievements</label>
            <Textarea
              placeholder="Describe your role, projects you worked on, and impact you made..."
              className="min-h-[140px] border-slate-200 focus-visible:ring-blue-600 font-medium text-slate-700 placeholder:text-slate-400 resize-none rounded-xl p-4"
              {...form.register("description")}
            />
          </div>

          <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={closeModal}
              disabled={form.formState.isSubmitting}
              className="text-slate-500 font-bold hover:bg-slate-50 px-6 h-12"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-10 h-12 shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              {form.formState.isSubmitting
                ? "Saving..."
                : selectedExperience
                  ? "Save Changes"
                  : "Save Experience"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
