interface ApplicationHeaderProps {
  jobTitle: string;
  company: string;
  status: string;
  appliedAt: string;
}

import { Building2, Calendar } from "lucide-react";
import ApplicationStatusBadge from "../applicationStatusBadge";

export function ApplicationHeader({ appliedAt, jobTitle, company, status }: ApplicationHeaderProps) {
  return (
    <div className="mb-8 bg-white p-6 rounded-lg border border-slate-200">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
            {jobTitle}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-[15px] font-bold text-blue-600">
              <Building2 size={18} className="text-blue-500" />
              {company}
            </div>
            <div className="flex items-center gap-2 text-[14px] font-medium text-slate-500">
              <Calendar size={18} className="text-slate-400" />
              Applied on {new Date(appliedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </div>
          </div>
        </div>
        <ApplicationStatusBadge status={status} />
      </div>
    </div>
  )
}

