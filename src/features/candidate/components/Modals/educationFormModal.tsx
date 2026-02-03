import { Dialog,DialogContent,DialogHeader, DialogTitle,} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Button } from "@/components/ui/shadcn/button";
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem,} from "@/components/ui/shadcn/select";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/shadcn/popover";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { educationSchema } from "../../validators/education.schema";
import { EducationModalStore } from "../../store/educationModal.store";
import { useEffect } from "react";
import type { Education, EducationroundNumber } from "../../types/Education.types";

export function EducationFormModal({
  onSubmit,
}: {
  onSubmit: (payload: Education) => void;
}) {
  const { isOpen, closeModal, selectedEducation } = EducationModalStore();

  const form = useForm<Education>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      school: "",
      standard:undefined,
      startDate: undefined,
      endDate: undefined,
      isCurrent: false,
      location: "",
      description: "",
      gradeOrPercentage: "",
    },
  });

  const errors = form.formState.errors;

  useEffect(() => {
    if (selectedEducation) {
      form.reset({
        ...selectedEducation,
        startDate: selectedEducation.startDate
          ? new Date(selectedEducation.startDate)
          : undefined,
        endDate: selectedEducation.endDate
          ? new Date(selectedEducation.endDate)
          : undefined,
      });
    } else {
      form.reset();
    }
  }, [selectedEducation,form]);

  const handleSubmit = (data: Education) => {
    onSubmit({
      ...data,
    });
  };


  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 border-none bg-white shadow-2xl rounded-2xl">
        <DialogHeader className="px-8 pt-8 pb-6 bg-slate-50/50 border-b border-slate-100">
          <DialogTitle className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase">
            {selectedEducation ? "Update Education" : "Add Education"}
          </DialogTitle>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Provide details about your academic background to help recruiters find you.
          </p>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="p-8 space-y-6">
          {/* School */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Institution Name</label>
            <Input
              placeholder="e.g. Stanford University, MIT..."
              className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
              {...form.register("school")}
            />
            {errors.school && (
              <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.school.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Standard */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Degree / Standard</label>
              <Select
                defaultValue={form.watch("standard")}
                onValueChange={(value: EducationroundNumber) => form.setValue("standard", value)}
              >
                <SelectTrigger className="h-11 border-slate-200 focus:ring-blue-600 font-medium">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                  <SelectItem value="High School">High School</SelectItem>
                  <SelectItem value="Higher Secondary">Higher Secondary</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                  <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                  <SelectItem value="Doctorate">Doctorate</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.standard && (
                <p className="text-red-500 text-[12px] font-bold mt-1 px-1">⚠ {errors.standard.message}</p>
              )}
            </div>

            {/* Grade */}
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Grade / CGPA / %</label>
              <Input
                placeholder="e.g. 3.84 / 4.0 or 92%"
                className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
                {...form.register("gradeOrPercentage")}
              />
            </div>
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
                    onSelect={(date) => form.setValue("startDate", date!)}
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
              <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">End Date</label>
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
                      form.setValue("endDate", date ?? undefined)
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

          {/* Location */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Location</label>
            <Input
              placeholder="e.g. New York, USA"
              className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium"
              {...form.register("location")}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 uppercase tracking-wider px-1">Description</label>
            <Textarea
              placeholder="Describe your major accomplishments, extracurriculars, or relevant projects..."
              className="min-h-[120px] border-slate-200 focus-visible:ring-blue-600 font-medium text-slate-700 placeholder:text-slate-400 resize-none rounded-xl p-4"
              {...form.register("description")}
            />
          </div>

          <div className="pt-8 border-t border-slate-100 flex justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={closeModal}
              className="text-slate-500 font-bold hover:bg-slate-50 px-6 h-12"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-10 h-12 shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              {selectedEducation ? "Save Changes" : "Save Education"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
