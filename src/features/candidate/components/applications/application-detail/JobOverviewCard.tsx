import { Badge } from "@/components/ui/shadcn/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import type { JobDetails } from "@/features/candidate/types/applicationDetail.types";


export const JobDetailsCard = ({ job }: { job: JobDetails }) => {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
          Job Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[12px] font-bold text-slate-500 uppercase">Role</p>
            <p className="text-[14px] font-semibold text-slate-800">{job.title}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[12px] font-bold text-slate-500 uppercase">Type</p>
            <p className="text-[14px] font-semibold text-slate-800">{job.jobType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[12px] font-bold text-slate-500 uppercase">Experience</p>
            <p className="text-[14px] font-semibold text-slate-800">{job.experienceMin} – {job.experienceMax} years</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[12px] font-bold text-slate-500 uppercase">Skills Required</p>
          <div className="flex flex-wrap gap-1.5">
            {job.skills?.map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-slate-50 text-slate-600 border border-slate-100 font-medium">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {job.description && (
          <div className="space-y-2 pt-2 border-t border-slate-50">
            <p className="text-[12px] font-bold text-slate-500 uppercase">Description</p>
            <p className="text-[14px] text-slate-600 leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

