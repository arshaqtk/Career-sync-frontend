import { useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/shadcn/dialog"
import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/shadcn/select"
import { Calendar } from "@/components/ui/shadcn/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn, combineDateAndTime } from "@/lib/utils"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import type { ScheduleInterviewPayload } from "../../types/scheduledInterview.types"
import {
  scheduleInterviewSchemaWithTimeCheck,
  type ScheduleInterviewFormValues,
} from "../../schemas/scheduleInterview.schema"
import { Spinner } from "@/components/ui/shadcn/spinner"
import type { InterviewRoundType } from "../../types/interview.type"

type Props = {
  open: boolean
  onClose: () => void
  onSubmit: (data: ScheduleInterviewPayload) => void
  isPending: boolean
  defaultValues?: Partial<ScheduleInterviewFormValues>
}

export function ScheduleInterviewModal({
  open,
  onClose,
  onSubmit,
  isPending,
  defaultValues,
}: Props) {
const form = useForm<ScheduleInterviewFormValues>({
  resolver: zodResolver(scheduleInterviewSchemaWithTimeCheck),
  mode: "onChange", // ← Critical: instant validation
  defaultValues: {
      mode: "Online",
      roundType: "Hr",
      roundNumber: 1,
      startTime: "",
      endTime: "",
      meetingLink: "",
      location: "",
      ...defaultValues,
    },
  })
    
    
console.log(defaultValues)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = form

  const mode = watch("mode")

  // Reset form when modal opens or defaultValues change
 useEffect(() => {
  if (open) {
    const baseDefaults = {
      date: defaultValues?.date ?? undefined,
      startTime: defaultValues?.startTime ?? "",
      endTime: defaultValues?.endTime ?? "",
      roundNumber: defaultValues?.roundNumber ?? 1,
      roundType: (defaultValues?.roundType ?? "Hr") as InterviewRoundType,
    };

    const mode = defaultValues?.mode ?? "Online";

    if (mode === "Online") {
      reset({
        ...baseDefaults,
        mode: "Online",
        meetingLink: defaultValues?.meetingLink ?? "",
        location: undefined, // explicitly undefined or omit
      });
    } else {
      reset({
        ...baseDefaults,
        mode: "Offline",
        location: defaultValues?.location ?? "",
        meetingLink: undefined,
      });
    }
  }
}, [open, defaultValues, reset]);
console.log(errors)

  // Remove manual register() calls — not needed for controlled components

 const onFormSubmit = (data: ScheduleInterviewFormValues) => {
  const startTime = combineDateAndTime(data.date, data.startTime); 
  const endTime = combineDateAndTime(data.date, data.endTime);

    const payload: ScheduleInterviewPayload = {
      startTime,
      endTime,
      roundNumber: data.roundNumber,
      mode: data.mode,
      roundType: data.roundType,
      meetingLink: data.mode === "Online" ? data.meetingLink?.trim() || undefined : undefined,
      location: data.mode === "Offline" ? data.location?.trim() || undefined : undefined,
    }

    onSubmit(payload)
    onClose() // Optional: close modal on success
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Reschedule Interview" : "Schedule Interview"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Date Picker */}
         <div className="space-y-1">
  <label className="text-sm font-medium">Date</label>
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal",
          !watch("date") && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {watch("date") ? format(watch("date"), "PPP") : "Pick a date"}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar
        mode="single"
        selected={watch("date") as Date | undefined} // ← Fixes TS error
        onSelect={(date) => {
          setValue("date", date ?? new Date(), { shouldValidate: true })
        }}
        disabled={(date) =>
          date < new Date(new Date().setHours(0, 0, 0, 0))
        }
        initialFocus
      />
    </PopoverContent>
  </Popover>
  {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
</div>

          {/* Start Time */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Start Time</label>
            <Input type="time" {...register("startTime")} />
            {errors.startTime && <p className="text-xs text-red-500">{errors.startTime.message}</p>}
          </div>

          {/* End Time */}
          <div className="space-y-1">
            <label className="text-sm font-medium">End Time</label>
            <Input type="time" {...register("endTime")} />
            {errors.endTime && <p className="text-xs text-red-500">{errors.endTime.message}</p>}
          </div>

          {/* Round Number */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Round Number</label>
            <Input
              type="number"
              min="1"
              placeholder="e.g. 1"
              {...register("roundNumber", { valueAsNumber: true })}
            />
            {errors.roundNumber && <p className="text-xs text-red-500">{errors.roundNumber.message}</p>}
          </div>

          {/* Round Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Round Type</label>
            <Select
              value={watch("roundType")}
              onValueChange={(value) => setValue("roundType", value as InterviewRoundType,{
    shouldValidate: true,
  })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select round type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hr">HR</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Managerial">Managerial</SelectItem>
                <SelectItem value="Final">Final</SelectItem>
              </SelectContent>
            </Select>
            {errors.roundType && <p className="text-xs text-red-500">{errors.roundType.message}</p>}
          </div>

          {/* Mode */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Mode</label>
           <Select
  value={mode}
  onValueChange={(value) => {
    const newMode = value as "Online" | "Offline";
    setValue("mode", newMode);

    // Clear the opposite field — no need for shouldValidate or clearErrors
    if (newMode === "Online") {
      setValue("location", undefined); // or ""
    } else {
      setValue("meetingLink", undefined); // or ""
    }

    // Optional: trigger validation for instant feedback
    trigger();
  }}
>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Online">Online</SelectItem>
                <SelectItem value="Offline">Offline</SelectItem>
              </SelectContent>
            </Select>
            {errors.mode && <p className="text-xs text-red-500">{errors.mode.message}</p>}
          </div>

          {/* Conditional Field */}
          {mode === "Online" ? (
  <div className="space-y-1">
    <label className="text-sm font-medium">Meeting Link</label>
    <Input placeholder="https://meet.google.com/..." {...register("meetingLink")} />
    {errors.meetingLink && <p className="text-xs text-red-500">{errors.meetingLink.message}</p>}
  </div>
) : (
  <div className="space-y-1">
    <label className="text-sm font-medium">Location</label>
    <Input placeholder="Office address or venue" {...register("location")} />
    {errors.location && <p className="text-xs text-red-500">{errors.location.message}</p>}
  </div>
)}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}