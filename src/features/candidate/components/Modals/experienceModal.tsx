import {Dialog,DialogContent,DialogHeader,DialogTitle,  DialogFooter} from "@/components/ui/shadcn/dialog";
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
import { experienceSchema } from "../../validators/Experience.schema";
import { ExperienceModalStore } from "../../store/experienceFormModal.store";
import { useLayoutEffect } from "react";
import type { Experience } from "../../types/Experience.types";

type ExperienceFormValues = Experience

;

export function ExperienceFormModal({
  onSubmit,
}: {
  onSubmit: (payload: Experience) => void;
}) {
  const { isOpen, closeModal, selectedExperience } = ExperienceModalStore();
console.log(selectedExperience)
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      company: "",
      role: "",
      description: "",
      skills: [],
      location: "",
      jobType: "full-time",   
      startDate:undefined,
      endDate:undefined ,
    },
  });
  useLayoutEffect(()=>{
    if(selectedExperience){
      form.reset({
        _id:selectedExperience?._id||"",
      company: selectedExperience?.company||"",
      role:selectedExperience?.role|| "",
      description:selectedExperience?.description|| "",
      skills: selectedExperience?.skills||[],
      location:selectedExperience?.location|| "",
      jobType:selectedExperience?.jobType|| "full-time",   
      startDate:selectedExperience?.startDate|| undefined,
      endDate: selectedExperience?.endDate||undefined ,
      })
    }else{
      form.reset()
    }
  },[selectedExperience,form])

  const errors = form.formState.errors;

  const handleSubmit = (data: ExperienceFormValues) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedExperience ? "Edit Experience" : "Add Experience"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">

          {/* Company */}
          <div> 
            <Input placeholder="Company Name" {...form.register("company")} />
            {errors.company && (
              <p className="text-red-500 text-sm">{errors.company.message}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <Input placeholder="Role" {...form.register("role")} />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Textarea
              placeholder="Description"
              {...form.register("description")}
            />
          </div>

          {/* Skills */}
          <div>
            <Input placeholder="Skills (comma separated)" {...form.register("skills")} />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <Input placeholder="Location" {...form.register("location")} />
          </div>

          {/* Job Type */}
          <div>
            <label className="text-sm font-medium">Job Type</label>
            <Select
              defaultValue={form.watch("jobType")}
              onValueChange={(value) => form.setValue("jobType", value as "full-time"|"part-time"|"internship")}
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

          {/* Start Date */}
          <div>
            <label className="text-sm font-medium">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full text-left", !form.watch("startDate") && "text-muted-foreground")}>
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

          {/* End Date */}
          <div>
            <label className="text-sm font-medium">End Date (Optional)</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full text-left", !form.watch("endDate") && "text-muted-foreground")}>
                  {form.watch("endDate")
                    ? format(form.watch("endDate")!, "PPP")
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("endDate")}
                  onSelect={(date) => form.setValue("endDate", date ?? undefined )}
                />
              </PopoverContent>
            </Popover>
          </div>

          <DialogFooter>
            <Button type="submit">
              {selectedExperience ? "Update Experience" : "Add Experience"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
