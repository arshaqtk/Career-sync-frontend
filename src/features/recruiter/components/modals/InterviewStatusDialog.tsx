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
import { XCircle, CheckCircle2, MessageSquare, Info } from "lucide-react";

type InterviewAction = "Cancelled" | "Completed";

type InterviewStatusDialogProps = {
  open: boolean;
  onClose: () => void;
  status: InterviewAction;
  roundNumber: number | null;
  onConfirm: (payload: {
    status: InterviewAction;
    notes?: string;
    roundNumber: number;
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

  const handleConfirm = () => {
    if (roundNumber != null) {
      onConfirm({
        status,
        notes: remark.trim() || undefined,
        roundNumber
      });
      setRemark("");
      onClose();
    } else {
      toast.error("Something went wrong")
      return
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className={`p-6 border-b ${isCancel ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isCancel ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {isCancel ? <XCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <div>
              <DialogTitle className={`text-lg font-bold ${isCancel ? 'text-red-900' : 'text-green-900'}`}>
                {isCancel ? "Cancel Interview" : "Mark as Completed"}
              </DialogTitle>
              <DialogDescription className={`text-sm ${isCancel ? 'text-red-700/70' : 'text-green-700/70'}`}>
                {isCancel
                  ? "Are you sure you want to cancel this interview?"
                  : "Submit feedback and complete this interview round."}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gray-400" />
              {isCancel ? "Cancellation Reason" : "Interview Feedback"}
            </label>
            <Textarea
              placeholder={
                isCancel
                  ? "Briefly explain why this interview is being cancelled..."
                  : "Key takeaways, performance notes, or next steps..."
              }
              className="bg-gray-50/50 border-gray-200 min-h-[100px] resize-none focus:bg-white transition-colors"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>

          {!isCancel && (
            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Info className="h-4 w-4 text-blue-600 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Completing this round will update the applicant's status and notify the relevant team members.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 bg-gray-50/50 border-t border-gray-100 gap-2">
          <Button variant="ghost" onClick={onClose} className="text-gray-500 hover:text-gray-700 font-medium">
            Close
          </Button>
          <Button
            className={`font-bold shadow-sm ${isCancel ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            onClick={handleConfirm}
          >
            {isCancel ? "Confirm Cancellation" : "Complete Round"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
