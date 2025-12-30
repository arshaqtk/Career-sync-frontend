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
import type { InterviewRoundType } from "../../types/interview.type"
import { Spinner } from "@/components/ui/shadcn/spinner"
import {
  scheduleInterviewSchema,
  type ScheduleInterviewFormValues,
} from "../../schemas/scheduleInterview.schema"
import { toast } from "sonner"

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
    resolver: zodResolver(scheduleInterviewSchema),
    defaultValues: {
      timezone: "Asia/Kolkata",
      mode: "Online",
      roundType: "Hr",
      ...defaultValues,
    },
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form

  const date = watch("date")
  const mode = watch("mode")
  const roundType = watch("roundType")

  /** 🔁 Reset form when modal opens */
  useEffect(() => {
    if (!open) return

    reset(
      {
        date: defaultValues?.date ?? undefined,
        startTime: defaultValues?.startTime ?? "",
        endTime: defaultValues?.endTime ?? "",
        durationMinutes: defaultValues?.durationMinutes ?? undefined,
        roundNumber: defaultValues?.roundNumber ?? undefined,
        timezone: defaultValues?.timezone ?? "Asia/Kolkata",
        mode: defaultValues?.mode ?? "Online",
        roundType: defaultValues?.roundType ?? "Hr",
        meetingLink: defaultValues?.meetingLink ?? "",
        location: defaultValues?.location ?? "",
      },
      {
        keepDirty: false,
        keepTouched: false,
      }
    )
  }, [open, defaultValues, reset])

  /** ✅ Submit handler */
  const handleFormSubmit = (data: ScheduleInterviewFormValues) => {
    const startTime = combineDateAndTime(data.date, data.startTime)
    const endTime = combineDateAndTime(data.date, data.endTime)

    if (endTime <= startTime) {
      toast.error("End time must be after start time")
      return
    }

    const payload: ScheduleInterviewPayload = {
      startTime,
      endTime,
      roundNumber: data.roundNumber,
      timezone: data.timezone,
      mode: data.mode,
      roundType: data.roundType,
      durationMinutes: data.durationMinutes,
      meetingLink: data.mode === "Online" ? data.meetingLink : undefined,
      location: data.mode === "Offline" ? data.location : undefined,
    }

    onSubmit(payload)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose()
      }}
    >
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Reschedule Interview" : "Schedule Interview"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Date */}
          <div>
            <label className="text-sm font-medium">Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => d && setValue("date", d)}
                  disabled={(d) => {
                    const today = new Date()
                    today.setHours(0, 0, 0, 0)
                    return d < today
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-xs text-red-500">{errors.date.message}</p>
            )}
          </div>

          <Input type="time" {...register("startTime")} />
          <Input type="time" {...register("endTime")} />

          <Input
            type="number"
            placeholder="Duration (minutes)"
            {...register("durationMinutes", { valueAsNumber: true })}
          />

          <Input
            type="number"
            placeholder="Round number"
            {...register("roundNumber", { valueAsNumber: true })}
          />

          <Select
            value={watch("timezone")}
            onValueChange={(v) => setValue("timezone", v)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Asia/Kolkata">IST</SelectItem>
              <SelectItem value="UTC">UTC</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={roundType}
            onValueChange={(v) =>
              setValue("roundType", v as InterviewRoundType)
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Hr">HR</SelectItem>
              <SelectItem value="Technical">Technical</SelectItem>
              <SelectItem value="Managerial">Managerial</SelectItem>
              <SelectItem value="Final">Final</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={mode}
            onValueChange={(v) =>
              setValue("mode", v as "Online" | "Offline")
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="Offline">Offline</SelectItem>
            </SelectContent>
          </Select>

          {mode === "Online" ? (
            <Input placeholder="Meeting link" {...register("meetingLink")} />
          ) : (
            <Input placeholder="Location" {...register("location")} />
          )}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <span className="flex gap-2">
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
