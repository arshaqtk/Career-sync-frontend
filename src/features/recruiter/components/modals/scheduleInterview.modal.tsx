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
import { CalendarIcon, Clock, Layers, Video, MapPin, Link as LinkIcon, Info } from "lucide-react"
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
    mode: "onChange",
    defaultValues: {
      mode: "Online",
      roundType: "Hr",
      roundNumber: 1,
      startTime: "",
      endTime: "",
      meetingLink: "",
      location: "",
      interviewerEmail:"",
      ...defaultValues,
    },
  })

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
          interviewerEmail:defaultValues?.interviewerEmail ?? "",
          location: undefined,
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
      interviewerEmail:data.interviewerEmail,
      location: data.mode === "Offline" ? data.location?.trim() || undefined : undefined,
    }

    onSubmit(payload)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="bg-gray-50 border-b border-gray-200 p-6">
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            {defaultValues?.startTime ? "Reschedule Interview" : "Schedule Interview"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
          {/* Section: Basic Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Info className="h-3 w-3" />
              General Details
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-gray-400" />
                  Round Type
                </label>
                <Select
                  value={watch("roundType")}
                  onValueChange={(value) => setValue("roundType", value as InterviewRoundType, { shouldValidate: true })}
                >
                  <SelectTrigger className="bg-white border-gray-200">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hr">HR</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Managerial">Managerial</SelectItem>
                    <SelectItem value="Final">Final</SelectItem>
                  </SelectContent>
                </Select>
                {errors.roundType && <p className="text-xs font-medium text-red-500">{errors.roundType.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Round No.</label>
                <Input
                  type="number"
                  min="1"
                  className="bg-white border-gray-200"
                  {...register("roundNumber", { valueAsNumber: true })}
                />
                {errors.roundNumber && <p className="text-xs font-medium text-red-500">{errors.roundNumber.message}</p>}
              </div>
            </div>
          </div>

          {/* Section: Date & Time */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Clock className="h-3 w-3" />
              Schedule Details
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal border-gray-200 bg-white",
                      !watch("date") && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    {watch("date") ? format(watch("date"), "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={watch("date") as Date | undefined}
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
              {errors.date && <p className="text-xs font-medium text-red-500">{errors.date.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Start Time</label>
                <Input type="time" className="bg-white border-gray-200" {...register("startTime")} />
                {errors.startTime && <p className="text-xs font-medium text-red-500">{errors.startTime.message}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">End Time</label>
                <Input type="time" className="bg-white border-gray-200" {...register("endTime")} />
                {errors.endTime && <p className="text-xs font-medium text-red-500">{errors.endTime.message}</p>}
              </div>
            </div>
          </div>

          {/* Section: Location/Mode */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Video className="h-3 w-3" />
              Mode & Venue
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Mode</label>
                <Select
                  value={mode}
                  onValueChange={(value) => {
                    const newMode = value as "Online" | "Offline";
                    setValue("mode", newMode);
                    if (newMode === "Online") setValue("location", undefined);
                    else setValue("meetingLink", undefined);
                    trigger();
                  }}
                >
                  <SelectTrigger className="bg-white border-gray-200 text-xs">
                    <SelectValue placeholder="Mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Online">Online</SelectItem>
                    <SelectItem value="Offline">Offline</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="col-span-2 space-y-1.5">
                {mode === "Online" ? (
                  <>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <LinkIcon className="h-3.5 w-3.5 text-gray-400" />
                      Meeting Link
                    </label>
                    <Input placeholder="Meet link" className="bg-white border-gray-200 h-9" {...register("meetingLink")} />
                    {errors.meetingLink && <p className="text-xs font-medium text-red-500">{errors.meetingLink.message}</p>}
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <LinkIcon className="h-3.5 w-3.5 text-gray-400" />
                     Interviewer Email(optional)
                    </label>
                    <Input placeholder="email" className="bg-white border-gray-200 h-9" {...register("interviewerEmail")} />
                    {errors.meetingLink && <p className="text-xs font-medium text-red-500">{errors.interviewerEmail?.message}</p>}
                  </>
                ) : (
                  <>
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      Location
                    </label>
                    <Input placeholder="Office address" className="bg-white border-gray-200 h-9" {...register("location")} />
                    {errors.location && <p className="text-xs font-medium text-red-500">{errors.location.message}</p>}
                  </>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700">
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 shadow-md min-w-[100px]">
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Saving...
                </span>
              ) : (
                "Schedule"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
