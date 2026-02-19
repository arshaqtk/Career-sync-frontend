import { useForm } from "react-hook-form"
import { useUpdateRecruiterCompany } from "../../hooks/useUpdateRecruiterCompany"
import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import { Textarea } from "@/components/ui/shadcn/textarea"
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/shadcn/dialog"
import type { RecruiterCompany } from "../../types/Recruiter.type"
import { Spinner } from "@/components/ui/shadcn/spinner"

interface UpdateCompanyModalProps {
  open: boolean
  onClose: () => void
  company?: RecruiterCompany
}

export function UpdateCompanyModal({ open, onClose, company }: UpdateCompanyModalProps) {
  const { register, handleSubmit } = useForm<{
    name: string;
    website: string;
    location: string;
    description: string;
    industry: string;
    size: string;
    foundedYear: string | number;
  }>({
    defaultValues: {
      name: company?.name || "",
      website: company?.website || "",
      location: company?.location || "",
      description: company?.description || "",
      industry: company?.industry || "",
      size: company?.size || "",
      foundedYear: company?.foundedYear || "",
    },
  })

  const { mutate, isPending } = useUpdateRecruiterCompany()

  const onSubmit = (data: {
    name: string;
    website: string;
    location: string;
    description: string;
    industry: string;
    size: string;
    foundedYear: string | number;
  }) => {
    if (!company?._id) return;

    // Convert foundedYear to number if it's a string
    const processedData: Partial<RecruiterCompany> = {
      ...data,
      foundedYear: data.foundedYear ? Number(data.foundedYear) : undefined
    };

    mutate({ companyId: company._id, updates: processedData }, {
      onSuccess: () => {
        onClose()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
     <DialogContent className="max-w-2xl p-0 overflow-hidden border border-slate-200 shadow-xl rounded-xl max-h-[90vh] flex flex-col">
        <DialogHeader className="p-8 pb-4 shrink-0 bg-white z-10">
          <DialogTitle className="text-2xl font-bold text-slate-900">
            Update Company Profile
          </DialogTitle>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Provide comprehensive details about your company to attract the best talent.
          </p>
        </DialogHeader>

         <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Row 1 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Company Name</label>
              <Input
                placeholder="e.g. Acme Corp"
                className="h-11 rounded-lg border-slate-200 focus:border-blue-500 shadow-none font-medium"
                {...register("name")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Industry</label>
              <Input
                placeholder="e.g. Technology, Finance"
                className="h-11 rounded-lg border-slate-200 focus:border-blue-500 shadow-none font-medium"
                {...register("industry")}
              />
            </div>

            {/* Row 2 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Official Website</label>
              <Input
                placeholder="e.g. https://acme.com"
                className="h-11 rounded-lg border-slate-200 focus:border-blue-500 shadow-none font-medium"
                {...register("website")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">HQ Location</label>
              <Input
                placeholder="e.g. San Francisco, CA"
                className="h-11 rounded-lg border-slate-200 focus:border-blue-500 shadow-none font-medium"
                {...register("location")}
              />
            </div>

            {/* Row 3 */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Company Size</label>
              <Input
                placeholder="e.g. 50-100 employees"
                className="h-11 rounded-lg border-slate-200 focus:border-blue-500 shadow-none font-medium"
                {...register("size")}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Founded Year</label>
              <Input
                type="number"
                placeholder="e.g. 2010"
                className="h-11 rounded-lg border-slate-200 focus:border-blue-500 shadow-none font-medium"
                {...register("foundedYear")}
              />
            </div>

            {/* Row 4 - Full Width */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700">Company Description</label>
              <Textarea
                placeholder="Tell candidates what makes your company unique..."
                rows={4}
                className="rounded-lg border-slate-200 focus:border-blue-500 shadow-none resize-none leading-relaxed text-sm font-medium"
                {...register("description")}
              />
            </div>
            </div>
          </div>

       <DialogFooter className="p-8 py-6 border-t border-slate-100 shrink-0 bg-slate-50/50">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={isPending}
              className="font-bold text-slate-500 h-11 px-6 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold h-11 px-5 rounded-lg shadow-none min-w-[160px]"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Spinner className="h-4 w-4" />
                  Saving...
                </span>
              ) : (
                "Update All Data"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
