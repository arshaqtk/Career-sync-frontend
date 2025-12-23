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
    });

    setAction(null);
    setNote("");
  };

  if (isFinalized) {
    return (
      <div className="rounded-md border bg-muted p-4 text-sm text-muted-foreground">
        This application has been <b>{currentStatus}</b>.
      </div>
    );
  }

  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={() => setAction("Selected")}
          disabled={isPending}
        >
          Select Candidate
        </Button>

        <Button
          variant="destructive"
          onClick={() => setAction("Rejected")}
          disabled={isPending}
        >
          Reject Candidate
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!action} onOpenChange={() => setAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirm {action}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently update the candidate’s application
              status. You may add a note for internal records or email context.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <Textarea
            placeholder="Add a note (optional but recommended)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>
              Cancel
            </AlertDialogCancel>
            <Button onClick={handleConfirm} disabled={isPending}>
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
