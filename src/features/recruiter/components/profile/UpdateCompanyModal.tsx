import { useForm } from "react-hook-form"
import { useUpdateRecruiterCompany } from "../../hooks/useUpdateRecruiterCompany"
import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import { Textarea } from "@/components/ui/shadcn/textarea"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/shadcn/dialog"
import { AlertDialogHeader } from "@/components/ui/shadcn/alert-dialog"
import type { RecruiterCompany, UpdateRecruiterCompanyPayload } from "../../types/Recruiter.type"

interface UpdateCompanyModalProps {
  open: boolean
  onClose: () => void
  company?: RecruiterCompany
}
export function UpdateCompanyModal({ open, onClose, company }:UpdateCompanyModalProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      companyName: company?.companyName || "",
      companyWebsite: company?.companyWebsite || "",
      companyLocation: company?.companyLocation || "",
      companyDescription: company?.companyDescription || "",
    },
  })

  const { mutate, isPending } = useUpdateRecruiterCompany()

  const onSubmit = (data:UpdateRecruiterCompanyPayload) => {
    mutate(data, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <AlertDialogHeader>
          <DialogTitle>Update Company Details</DialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input placeholder="Company Name" {...register("companyName")} />
          <Input placeholder="Website" {...register("companyWebsite")} />
          <Input placeholder="Location" {...register("companyLocation")} />
          <Textarea
            placeholder="Company Description"
            rows={4}
            {...register("companyDescription")}
          />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
