import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog"
import { Button } from "@/components/ui/shadcn/button"
import { Textarea } from "@/components/ui/shadcn/textarea"

type Status = "active" | "blocked" | "closed"

interface ConfirmStatusDialogProps {
  open: boolean
  onClose: () => void
  entityName?: string
  currentStatus: Status | null
  loading?: boolean
  onConfirm: (payload: {
    currentStatus: Status
    reason: string
  }) => void
}

export function ConfirmStatusDialog({
  open,
  onClose,
  entityName = "user",
  currentStatus,
  loading,
  onConfirm,
}: ConfirmStatusDialogProps) {
  const isBlocking = currentStatus === "active"
  const [reason, setReason] = React.useState("")
  const [error, setError] = React.useState("")

  if (!currentStatus) return null

  const handleConfirm = () => {
    if (isBlocking && !reason.trim()) {
      setError("Reason is required")
      return
    }

    onConfirm({
      currentStatus,
      reason: reason.trim(),
    })

    setReason("")
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isBlocking ? "Block" : "Unblock"} {entityName}
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          Are you sure you want to{" "}
          <strong>{isBlocking ? "block" : "unblock"}</strong> this{" "}
          {entityName}?
        </p>

        {isBlocking && (
          <div className="space-y-1">
            <Textarea
              placeholder="Enter reason for blocking *"
              value={reason}
              onChange={(e) => {
                setReason(e.target.value)
                if (error) setError("")
              }}
            />
            {error && (
              <p className="text-xs text-red-600">{error}</p>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant={isBlocking ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={loading}
          >
            {isBlocking ? "Block" : "Unblock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
