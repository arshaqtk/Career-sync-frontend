import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useState } from "react";
import { toast } from "sonner";

type InterviewAction = "Cancelled" | "Completed";


type InterviewStatusDialogProps = {
  open: boolean;
  onClose: () => void;
  status: InterviewAction;
  roundNumber:number|null;
  onConfirm: (payload: {
    status: InterviewAction;
    notes?: string;
    roundNumber:number;
  }) => void;
};

export function InterviewStatusDialog({
  open,
  onClose,
  status,
  roundNumber,
  onConfirm,
}: InterviewStatusDialogProps) {
  const [remark, setRemark] = useState("");
  const isCancel = status === "Cancelled";
console.log(status,roundNumber)
  const handleConfirm = () => {
    if(roundNumber!=null){
      onConfirm({
        status,
        notes: remark.trim() || undefined,
        roundNumber
      });
      setRemark("");
      onClose();
    }else{
      toast.error("Something went wrong")
      return
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isCancel ? "Cancel Interview" : "Complete Interview"}
          </DialogTitle>
          <DialogDescription>
            {isCancel
              ? "Are you sure you want to cancel this interview?"
              : "Mark this interview as completed."}
          </DialogDescription>
        </DialogHeader>

        {/* Remark / Note */}
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {isCancel ? "Cancellation Note (optional)" : "Remark (optional)"}
          </label>
          <Textarea
            placeholder={
              isCancel
                ? "Reason for cancelling the interview..."
                : "Interview feedback or remarks..."
            }
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>

          <Button
            variant={isCancel ? "destructive" : "default"}
            onClick={handleConfirm}
          >
            {isCancel ? "Cancel Interview" : "Mark as Completed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
