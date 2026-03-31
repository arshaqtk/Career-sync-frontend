interface ApplicationHeaderProps {
  jobTitle: string;
  company: {
    name:string,
    _id:string
  };
  status: string;
  appliedAt: string;
}

import { Building2, Calendar } from "lucide-react";
import ApplicationStatusBadge from "../applicationStatusBadge";
import { useNavigate } from "react-router-dom";

export function ApplicationHeader({ appliedAt, jobTitle, company, status }: ApplicationHeaderProps) {
  const navigate=useNavigate()
  return (
    <div className="mb-8 bg-card p-6 rounded-lg border border-border">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {jobTitle}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-[15px] font-bold text-blue-600 cursor-pointer" 
            onClick={()=>navigate(`/companies/${company._id}`)}>
              <Building2 size={18} className="text-blue-500"/>
              {company.name}
            </div>
            <div className="flex items-center gap-2 text-[14px] font-medium text-muted-foreground">
              <Calendar size={18} className="text-muted-foreground/70" />
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

