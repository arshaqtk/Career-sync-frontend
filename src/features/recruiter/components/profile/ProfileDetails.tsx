import { CardTitle } from "@/components/ui/shadcn/card"
import { Button } from "@/components/ui/shadcn/button"
import { Pencil, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

import type { RecruiterProfileDetails as RecruiterProfileDetailsType } from "../../types/Recruiter.type"
import InfoRow from "./InfoRow"
import { UpdateCompanyModal } from "./UpdateCompanyModal"

interface RecruiterProfileDetailsProps {
  profile: RecruiterProfileDetailsType
}

export function RecruiterProfileDetails({ profile }: RecruiterProfileDetailsProps) {
  const [open, setOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const company = profile.recruiterData?.company;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">
      {/* Personal Info Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 px-1 border-b border-slate-100 pb-2">
          <CardTitle className="text-xl font-bold text-slate-900">Personal Information</CardTitle>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          <InfoRow label="Email Address" value={profile.email} />
          <InfoRow label="Phone Number" value={profile.phone || "Not provided"} />
          <InfoRow label="Professional Role" value={profile.role} />
        </div>
      </section>

      {/* Company Info Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1 border-b border-slate-100 pb-2">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-900">Company Overview</CardTitle>
            <p className="text-xs text-slate-500 font-medium tracking-tight">Public details shown on company pages</p>
          </div>

          <Button
            size="sm"
            variant="outline"
            className="text-blue-700 border-blue-200 font-bold hover:bg-blue-50 h-9 px-6 rounded-lg shadow-sm"
            onClick={() => setOpen(true)}
          >
            <Pencil className="w-3.5 h-3.5 mr-2" />
            Update Company
          </Button>
        </div>

        <div className="space-y-8 px-2">
          {/* Primary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <InfoRow label="Company Name" value={company?.name || "—"} />
            <InfoRow label="Official Website" value={company?.website || "—"} />
            <InfoRow label="HQ Location" value={company?.location || "—"} />
          </div>

          {/* Collapsible Section */}
          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <InfoRow label="Primary Industry" value={company?.industry || "—"} />
                <InfoRow label="Workforce Size" value={company?.size || "—"} />
                <InfoRow label="Founded Date" value={company?.foundedYear || "—"} />
              </div>

              <div className="space-y-3 p-6 bg-slate-50/50 rounded-xl border border-slate-100/50">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">About the Company</span>
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line font-medium italic">
                  "{company?.description || "No description provided yet. Add one to help candidates find you."}"
                </p>
              </div>
            </div>
          </div>

          {/* View More Button */}
          <div className="flex justify-start">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              {isExpanded ? (
                <>Show less information <ChevronUp size={16} /></>
              ) : (
                <>View full company profile <ChevronDown size={16} /></>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <UpdateCompanyModal
        open={open}
        onClose={() => setOpen(false)}
        company={company}
      />
    </div>
  )
}
