import { Button } from "@/components/ui/shadcn/button";
import { useUpdateApplicantStatus } from "../../hooks/useUpdateApplicantStatus";
import type { ApplicationStatus } from "../../types/applicationStatus.types";
import { useInterviewScheduleModalStore } from "../../store/interviewScheduleModal.store";
import { CheckCircle2, XCircle, Calendar, Info } from "lucide-react";
import { Tooltip, TooltipContent,TooltipProvider,TooltipTrigger,} from "@/components/ui/shadcn/tooltip" 

interface RecruiterActionsProps {
  applicationId: string;
  currentStatus: ApplicationStatus;
}

export function RecruiterActions({ applicationId, currentStatus }: RecruiterActionsProps) {
  const { mutate, isPending } = useUpdateApplicantStatus();
    const {openModal}=useInterviewScheduleModalStore()

  const updateStatus = (status: ApplicationStatus) => {
    mutate({ applicationId, status });
  };

    const isInterviewed = currentStatus === "Interview";
  const isRejected = currentStatus === "Rejected";
  const isShortlisted = currentStatus === "Shortlisted";
  const isSelected = currentStatus === "Selected";

 return (
    <TooltipProvider>
      <div className="flex flex-col gap-3">
        {/* Shortlist */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800"
                onClick={() => updateStatus("Shortlisted")}
                disabled={isShortlisted || isInterviewed || isRejected || isSelected || isPending}
              >
                <CheckCircle2 className="h-4 w-4" />
                Shortlist Candidate
              </Button>
            </div>
          </TooltipTrigger>
          {(isShortlisted || isInterviewed || isRejected || isSelected) && (
            <TooltipContent side="left">
              <div className="flex items-center gap-2">
                <Info className="h-3.5 w-3.5" />
                <span>
                  {isShortlisted ? "Already shortlisted" :
                    isInterviewed ? "Candidate is already in interview stages" :
                      isSelected ? "Candidate is already selected" :
                        "Cannot shortlist a rejected candidate"}
                </span>
              </div>
            </TooltipContent>
          )}
        </Tooltip>

        {/* Interview */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-full">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
                onClick={() => openModal({ mode: "schedule" })}
                disabled={isInterviewed || isRejected || isSelected || isPending}
              >
                <Calendar className="h-4 w-4" />
                Schedule Interview
              </Button>
            </div>
          </TooltipTrigger>
          {(isInterviewed || isRejected || isSelected) && (
            <TooltipContent side="left">
              <div className="flex items-center gap-2">
                <Info className="h-3.5 w-3.5" />
                <span>
                  {isInterviewed ? "Initial interview already scheduled" :
                    isSelected ? "Candidate is already selected" :
                      "Cannot schedule for rejected candidates"}
                </span>
              </div>
            </TooltipContent>
          )}
        </Tooltip>

        <div className="pt-2">
          {/* Reject */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-full">
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => updateStatus("Rejected")}
                  disabled={isRejected || isSelected || isPending}
                >
                  <XCircle className="h-4 w-4" />
                  Reject Candidate
                </Button>
              </div>
            </TooltipTrigger>
            {(isRejected || isSelected) && (
              <TooltipContent side="left">
                <div className="flex items-center gap-2">
                  <Info className="h-3.5 w-3.5" />
                  <span>
                    {isRejected ? "Candidate is already rejected" : "Selected candidates cannot be rejected"}
                  </span>
                </div>
              </TooltipContent>
            )}
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
