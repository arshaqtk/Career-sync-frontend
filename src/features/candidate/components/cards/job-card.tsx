import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { MapPin, Clock, Users } from "lucide-react";
import type{ Job } from "@/features/recruiter/types/job.type";

interface JobCardProps {
  job: Job;
  onClick?: () => void;
}

export function JobCard({ job, onClick }: JobCardProps) {
  const experienceLabel =
    job.experienceMin !== undefined && job.experienceMax !== undefined
      ? `${job.experienceMin}-${job.experienceMax} yrs`
      : "Experience Not Specified";

  return (
    <Card
      onClick={onClick}
      className="p-4 cursor-pointer hover:bg-muted/40 transition"
    >
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-semibold">
          {job.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{job.company}</p>
      </CardHeader>

      <CardContent className="p-0 mt-3 space-y-2">
        {/* Salary */}
        {job.salary && (
          <p className="text-sm font-medium">₹ {job.salary}</p>
        )}

        {/* Location / Remote */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={14} />
          {job.remote ? "Remote" : job.location || "Location Unknown"}
        </div>

        {/* Experience */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock size={14} />
          {experienceLabel}
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mt-2">
          <Badge variant="outline">{job.jobType}</Badge>
          <Badge variant="secondary">{job.status}</Badge>
        </div>

        {/* Application count */}
        {job.applicationCount !== undefined && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
            <Users size={12} />
            {job.applicationCount} applicants
          </div>
        )}
      </CardContent>
    </Card>
  );
}
