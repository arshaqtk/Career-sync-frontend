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
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/shadcn/popover";
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
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedExperience ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>

       <form
  className="space-y-4"
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
          {/* Company */}
          <div>
            <Input
              placeholder="Company Name"
              {...form.register("company")}
            />
            {errors.company && (
              <p className="text-red-500 text-sm">
                {errors.company.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <Input placeholder="Role" {...form.register("role")} />
            {errors.role && (
              <p className="text-red-500 text-sm">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Description */}
          <Textarea
            placeholder="Description"
            {...form.register("description")}
          />

          {/* Skills */}
          <div>
            <Input
  placeholder="Skills (comma separated)"
  {...form.register("skills")}
/>
            {errors.skills && (
              <p className="text-red-500 text-sm">
                {errors.skills.message}
              </p>
            )}
          </div>

          {/* Location */}
          <Input
            placeholder="Location"
            {...form.register("location")}
          />

          {/* Job Type */}
          <div>
            <label className="text-sm font-medium">Job Type</label>
            <Controller
              name="jobType"
              control={form.control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">
                      Full-time
                    </SelectItem>
                    <SelectItem value="part-time">
                      Part-time
                    </SelectItem>
                    <SelectItem value="internship">
                      Internship
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full text-left",
                    !form.watch("startDate") &&
                      "text-muted-foreground"
                  )}
                >
                  {form.watch("startDate")
                    ? format(form.watch("startDate")!, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
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
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* End Date */}
          <div>
            <label className="text-sm font-medium">
              End Date (Optional)
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full text-left",
                    !form.watch("endDate") &&
                      "text-muted-foreground"
                  )}
                >
                  {form.watch("endDate")
                    ? format(form.watch("endDate")!, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("endDate")}
                  onSelect={(date) =>
                    form.setValue("endDate", date ?? undefined, {
                      shouldValidate: true,
                      shouldDirty: true,
                    })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <Button
  type="submit"
  disabled={form.formState.isSubmitting}
>
  {form.formState.isSubmitting
    ? "Saving..."
    : selectedExperience
    ? "Update Experience"
    : "Add Experience"}
</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
