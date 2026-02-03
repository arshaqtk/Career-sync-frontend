import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/shadcn/alert-dialog";
import { Trophy, XCircle, AlertCircle, Loader2 } from "lucide-react";

import { useFinalizeApplicantStatus } from "../../hooks/useFinalizeApplication";
import type { SelectedOrRejected } from "../../types/applicationStatus.types";

interface RecruiterActionsProps {
  applicationId: string;
  currentStatus: SelectedOrRejected;
}

type FinalAction = "Selected" | "Rejected" | null;

export function RecruiterFinalizeApplicationActions({
  applicationId,
  currentStatus,
}: RecruiterActionsProps) {
  const { mutate, isPending } = useFinalizeApplicantStatus();

  const [action, setAction] = useState<FinalAction>(null);
  const [note, setNote] = useState("");

  const isFinalized =
    currentStatus === "Selected" || currentStatus === "Rejected";

  const handleConfirm = () => {
    if (!action) return;

    mutate({
      applicationId,
      status: action,
      note,
    }, {
      onSuccess: () => {
        setAction(null);
        setNote("");
      }
    });
  };

  if (isFinalized) {
    return (
      <div className={`rounded-lg border p-4 flex items-center gap-3 ${currentStatus === "Selected"
          ? "bg-green-50 border-green-100 text-green-800"
          : "bg-red-50 border-red-100 text-red-800"
        }`}>
        {currentStatus === "Selected" ? (
          <Trophy className="h-5 w-5 text-green-600" />
        ) : (
          <XCircle className="h-5 w-5 text-red-600" />
        )}
        <div className="text-sm">
          <p className="font-bold uppercase tracking-wider text-[10px]">Application {currentStatus}</p>
          <p className="font-medium">This candidate has been formally <b>{currentStatus.toLowerCase()}</b>.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        <Button
          className="w-full justify-start gap-2 bg-green-600 hover:bg-green-700 text-white shadow-sm"
          onClick={() => setAction("Selected")}
          disabled={isPending}
        >
          <Trophy className="h-4 w-4" />
          Select Candidate
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 hover:border-red-200"
          onClick={() => setAction("Rejected")}
          disabled={isPending}
        >
          <XCircle className="h-4 w-4" />
          Reject Candidate
        </Button>
      </div>

      <AlertDialog open={!!action} onOpenChange={() => setAction(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {action === "Selected" ? (
                <>
                  <Trophy className="h-5 w-5 text-green-600" />
                  Confirm Selection
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-600" />
                  Confirm Rejection
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500">
              {action === "Selected"
                ? "You are about to formally select this candidate for the role. This will update their status and notify them."
                : "You are about to reject this application. This action is permanent and will notify the candidate."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3 py-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
              <AlertCircle className="h-3 w-3" />
              Final Decision Note
            </div>
            <Textarea
              placeholder={action === "Selected" ? "Explain why this candidate was selected..." : "Reason for rejection (will be sent to candidate)..."}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="resize-none min-h-[120px] bg-gray-50 border-gray-200 focus:bg-white transition-all"
            />
          </div>

          <AlertDialogFooter className="bg-gray-50 -mx-6 -mb-6 p-6 mt-2 border-t border-gray-100">
            <AlertDialogCancel disabled={isPending} className="border-gray-200">
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleConfirm}
              disabled={isPending}
              className={action === "Selected" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm {action}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
