import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/shadcn/select";
import { Calendar } from "@/components/ui/shadcn/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn, combineDateAndTime } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {scheduleInterviewSchema,type ScheduleInterviewFormValues} from "../../interview/schemas/scheduleInterview.schema";

import type { ScheduleInterviewPayload } from "../../types/scheduledInterview.types";
import type { InterviewRoundType } from "../../interview/types/interview-details.types";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ScheduleInterviewPayload) => void;
};

export function ScheduleInterviewModal({
  open,
  onClose,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleInterviewFormValues>({
    resolver: zodResolver(scheduleInterviewSchema),
    defaultValues: {
      timezone: "Asia/Kolkata",
      mode: "Online",
      roundType: "HR",
    },
  });

  const date = watch("date");
  const mode = watch("mode");
  const roundType = watch("roundType");

  const handleFormSubmit = (data: ScheduleInterviewFormValues) => {
    const startTimeISO = combineDateAndTime(
      data.date,
      data.startTime
    );

    const endTimeISO = combineDateAndTime(
      data.date,
      data.endTime
    );

    const payload: ScheduleInterviewPayload = {
      startTime: startTimeISO,
      endTime: endTimeISO,
      timezone: data.timezone,
      mode: data.mode,
      roundType: data.roundType,
      durationMinutes: data.durationMinutes,

      meetingLink:
        data.mode === "Online" ? data.meetingLink : undefined,
      location:
        data.mode === "Offline" ? data.location : undefined,
    };

    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule Interview</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
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
                  onSelect={(d) => setValue("date", d!)}
                  disabled={(d) => d < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-xs text-red-500">
                {errors.date.message}
              </p>
            )}
          </div>

          {/* Start Time */}
          <div>
            <label className="text-sm font-medium">Start Time</label>
            <Input type="time" {...register("startTime")} />
            {errors.startTime && (
              <p className="text-xs text-red-500">
                {errors.startTime.message}
              </p>
            )}
          </div>

          {/* End Time */}
          <div>
            <label className="text-sm font-medium">End Time</label>
            <Input type="time" {...register("endTime")} />
            {errors.endTime && (
              <p className="text-xs text-red-500">
                {errors.endTime.message}
              </p>
            )}
          </div>

          {/* Duration */}
          <div>
            <label className="text-sm font-medium">
              Duration (minutes)
            </label>
            <Input
              type="number"
              placeholder="Eg: 30"
              {...register("durationMinutes", {
                valueAsNumber: true,
              })}
            />
            {errors.durationMinutes && (
              <p className="text-xs text-red-500">
                {errors.durationMinutes.message}
              </p>
            )}
          </div>

          {/* Timezone */}
          <div>
            <label className="text-sm font-medium">Timezone</label>
            <Select
              value={watch("timezone")}
              onValueChange={(v) => setValue("timezone", v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Kolkata">
                  IST (Asia/Kolkata)
                </SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="America/New_York">
                  EST (New York)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Round Type */}
          <div>
            <label className="text-sm font-medium">
              Interview Round
            </label>
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
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Managerial">Managerial</SelectItem>
                <SelectItem value="Final">Final</SelectItem>
              </SelectContent>
            </Select>
            {errors.roundType && (
              <p className="text-xs text-red-500">
                {errors.roundType.message}
              </p>
            )}
          </div>

          {/* Mode */}
          <div>
            <label className="text-sm font-medium">Mode</label>
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
          </div>

          {/* Meeting Link / Location */}
          {mode === "Online" ? (
            <div>
              <label className="text-sm font-medium">
                Meeting Link
              </label>
              <Input
                placeholder="Google Meet / Zoom link"
                {...register("meetingLink")}
              />
              {errors.meetingLink && (
                <p className="text-xs text-red-500">
                  {errors.meetingLink.message}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium">
                Interview Location
              </label>
              <Input
                placeholder="Office address"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-xs text-red-500">
                  {errors.location.message}
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Schedule
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
