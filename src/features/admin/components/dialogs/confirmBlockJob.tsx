import * as React from "react"
import { AlertTriangle, ShieldCheck, XCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/shadcn/dialog"
import { Button } from "@/components/ui/shadcn/button"
import { Textarea } from "@/components/ui/shadcn/textarea"
import { cn } from "@/lib/utils"

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
  entityName = "job",
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
      setError("Reason is required to block " + entityName)
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
      <DialogContent className="sm:max-w-[440px] bg-[#0d1117]/95 border-border/50 shadow-2xl backdrop-blur-xl p-0 overflow-hidden rounded-[2rem]">
        <div className="relative p-8">
          {/* Background decoration */}
          <div className={cn(
            "absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none",
            isBlocking ? "bg-red-500" : "bg-emerald-500"
          )} />

          <DialogHeader className="relative space-y-4 text-center sm:text-left">
            <div className={cn(
              "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto sm:mx-0 shadow-lg border border-white/5",
              isBlocking ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
            )}>
              {isBlocking ? (
                <AlertTriangle className="w-8 h-8 animate-in zoom-in-50 duration-300" />
              ) : (
                <ShieldCheck className="w-8 h-8 animate-in zoom-in-50 duration-300" />
              )}
            </div>
            
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold tracking-tight text-white capitalize">
                {isBlocking ? "Block" : "Unblock"} {entityName}
              </DialogTitle>
              <p className="text-sm text-slate-400 leading-relaxed">
                {isBlocking ? (
                  <>This will restrict access for this <strong>{entityName}</strong>. Please provide a reason to proceed.</>
                ) : (
                  <>Are you sure you want to restore access for this <strong>{entityName}</strong>?</>
                )}
              </p>
            </div>
          </DialogHeader>

          <div className="my-6 relative">
            {isBlocking && (
              <div className="space-y-3">
                <Textarea
                  placeholder={`Tell us why you are blocking this ${entityName}...`}
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-xl focus:ring-red-500/50 focus:border-red-500/50 min-h-[120px] resize-none p-4 transition-all"
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value)
                    if (error) setError("")
                  }}
                />
                {error && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs animate-in slide-in-from-top-1 duration-200">
                    <XCircle className="w-3.5 h-3.5" />
                    {error}
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
                variant="ghost" 
                onClick={onClose} 
                className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border-transparent hover:border-white/10 h-12 transition-all order-2 sm:order-1"
            >
              Cancel
            </Button>

            <Button
              className={cn(
                "flex-1 h-12 rounded-xl font-bold text-white shadow-lg transition-all active:scale-[0.98] order-1 sm:order-2",
                isBlocking 
                  ? "bg-red-500 hover:bg-red-600 shadow-red-500/20" 
                  : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20"
              )}
              onClick={handleConfirm}
              disabled={loading}
            >
              {loading ? (
                 <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>{isBlocking ? `Block ${entityName}` : `Activate ${entityName}`}</>
              )}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
