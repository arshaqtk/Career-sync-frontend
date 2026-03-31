import { Badge } from "@/components/ui/shadcn/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import type { JobDetails } from "@/features/candidate/types/applicationDetail.types";


export const JobDetailsCard = ({ job }: { job: JobDetails }) => {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
          Job Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[12px] font-bold text-muted-foreground uppercase">Role</p>
            <p className="text-[14px] font-semibold text-foreground/90">{job.title}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[12px] font-bold text-muted-foreground uppercase">Type</p>
            <p className="text-[14px] font-semibold text-foreground/90">{job.jobType}</p>
          </div>
          <div className="space-y-1">
            <p className="text-[12px] font-bold text-muted-foreground uppercase">Experience</p>
            <p className="text-[14px] font-semibold text-foreground/90">{job.experienceMin} – {job.experienceMax} years</p>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[12px] font-bold text-muted-foreground uppercase">Skills Required</p>
          <div className="flex flex-wrap gap-1.5">
            {job.skills?.map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-muted/50 text-muted-foreground border border-border/50 font-medium">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {job.description && (
          <div className="space-y-2 pt-2 border-t border-slate-50">
            <p className="text-[12px] font-bold text-muted-foreground uppercase">Description</p>
            <p className="text-[14px] text-muted-foreground leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

