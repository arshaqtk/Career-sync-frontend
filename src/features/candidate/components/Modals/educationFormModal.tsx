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
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedEducation ? "Edit Education" : "Add Education"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          {/* School */}
          <div>
            <Input placeholder="School / College Name" {...form.register("school")} />
            {errors.school && (
              <p className="text-red-500 text-sm">{errors.school.message}</p>
            )}
          </div>

          {/* Standard */}
          <div>
            <label className="text-sm font-medium">Standard</label>
            <Select
              defaultValue={form.watch("standard")}
              onValueChange={(value:EducationroundNumber) => form.setValue("standard", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Education roundNumber" />
              </SelectTrigger>
              <SelectContent>
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
              <p className="text-red-500 text-sm">{errors.standard.message}</p>
            )}
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
                    !form.watch("startDate") && "text-muted-foreground"
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
                  onSelect={(date) => form.setValue("startDate", date!)}
                />
              </PopoverContent>
            </Popover>
            {errors.startDate && (
              <p className="text-red-500 text-sm">{errors.startDate.message}</p>
            )}
          </div>
{errors.startDate && (
              <p className="text-red-500 text-sm">
                {errors.startDate.message}
              </p>
            )}
          {/* End Date */}
          <div>
            <label className="text-sm font-medium">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full text-left",
                    !form.watch("endDate") && "text-muted-foreground"
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
                    form.setValue("endDate", date ?? undefined)
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
{errors.endDate && (
              <p className="text-red-500 text-sm">
                {errors.endDate.message}
              </p>
            )}
          {/* Location */}
          <div>
            <Input placeholder="Location" {...form.register("location")} />
          </div>

          {/* Grade or Percentage */}
          <div>
            <Input
              placeholder="Grade / Percentage (optional)"
              {...form.register("gradeOrPercentage")}
            />
          </div>

          {/* Description */}
          <div>
            <Textarea
              placeholder="Description (optional)"
              {...form.register("description")}
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {selectedEducation ? "Update Education" : "Add Education"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
