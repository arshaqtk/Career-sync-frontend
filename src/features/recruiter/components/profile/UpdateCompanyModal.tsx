import { useForm } from "react-hook-form"
import { useUpdateRecruiterCompany } from "../../hooks/useUpdateRecruiterCompany"
import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import { Textarea } from "@/components/ui/shadcn/textarea"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/shadcn/dialog"
import { Building2, Globe, MapPin, FileText } from "lucide-react"
import type { RecruiterCompany } from "../../types/Recruiter.type"
import { Spinner } from "@/components/ui/shadcn/spinner"

interface UpdateCompanyModalProps {
  open: boolean
  onClose: () => void
  company?: RecruiterCompany
}

export function UpdateCompanyModal({ open, onClose, company }: UpdateCompanyModalProps) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: company?.name || "",
      website: company?.website || "",
      location: company?.location || "",
      description: company?.description || "",
    },
  })

  const { mutate, isPending } = useUpdateRecruiterCompany()

  const onSubmit = (data: Partial<RecruiterCompany>) => {
    if (!company?._id) return;
    mutate({ companyId: company._id, updates: data }, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="bg-gray-50 border-b border-gray-200 p-6 text-black">
          <DialogTitle className="flex items-center gap-2 text-gray-900">
            <Building2 className="h-5 w-5 text-blue-600" />
            Update Company Details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Building2 className="h-3.5 w-3.5 text-gray-400" />
                Company Name
              </label>
              <Input placeholder="e.g. Acme Corp" className="bg-white border-gray-200" {...register("name")} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <Globe className="h-3.5 w-3.5 text-gray-400" />
                Company Website
              </label>
              <Input placeholder="e.g. https://acme.com" className="bg-white border-gray-200" {...register("website")} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gray-400" />
                Location
              </label>
              <Input placeholder="e.g. San Francisco, CA" className="bg-white border-gray-200" {...register("location")} />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                <FileText className="h-3.5 w-3.5 text-gray-400" />
                Description
              </label>
              <div className="relative">
                <Textarea
                  placeholder="Tell us about your company..."
                  rows={4}
                  className="bg-white border-gray-200 resize-none"
                  {...register("description")}
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isPending}
              className="text-gray-500"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="bg-blue-600 hover:bg-blue-700 shadow-md min-w-[100px]">
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
