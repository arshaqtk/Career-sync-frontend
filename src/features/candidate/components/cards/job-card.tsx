import { Card, CardContent } from "@/components/ui/shadcn/card";
import { MapPin, Briefcase } from "lucide-react";
import type { Job } from "@/features/recruiter/types/job.type";
import { cn } from "@/lib/utils";

interface JobCardProps {
  job: Job;
  onClick?: () => void;
  isSelected?: boolean;
}

export function JobCard({ job, onClick, isSelected }: JobCardProps) {

  const today = new Date().getTime()
  const inputDate = job.createdAt ? new Date(job.createdAt)?.getTime() : undefined
  const diffInMs = inputDate ? today - inputDate : 0; // milliseconds
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  return (
    <Card
      onClick={onClick}
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-200 border shadow-sm hover:shadow-md",
        isSelected
          ? "bg-primary/5 border-primary/20 ring-1 ring-primary/20"
          : "bg-card border-border hover:border-border/80"
      )}
    >
      {/* Blue indicator for selected state */}
      <div className={cn(
        "absolute left-0 top-0 bottom-0 w-1 transition-all",
        isSelected ? "bg-primary" : "bg-transparent"
      )} />

      <div className="p-4">
        <div className="flex justify-between items-start gap-4 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              "text-[16px] font-bold leading-tight truncate transition-colors",
              isSelected ? "text-primary" : "text-primary hover:underline"
            )}>
              {job.title}
            </h3>
            <p className="text-[13px] font-medium text-foreground/80 mt-1">
              {typeof job.company === "string" ? job.company : job.company?.name}
            </p>
          </div>
          {job.jobType && (
            <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
              {job.jobType}
            </span>
          )}
        </div>

        <CardContent className="p-0 space-y-2.5">
          <div className="flex flex-col gap-1 text-[12px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-muted-foreground/70" />
              <span className="truncate">{job.remote ? "Remote" : job.location || "On-site"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={13} className="text-muted-foreground/70" />
              <span className="font-bold text-foreground">₹ {job.salary || "Not Disclosed"}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {job.skills?.slice(0, 3).map((skill, i) => (
              <span key={i} className="text-[10px] bg-muted/50 text-muted-foreground px-2 py-0.5 rounded-sm border border-border/50">
                {skill}
              </span>
            ))}
            {(job.skills?.length ?? 0) > 3 && (
              <span className="text-[10px] text-muted-foreground/80 font-medium">
                +{(job.skills?.length ?? 0) - 3} more
              </span>
            )}
          </div>

          <div className="pt-1">
            <span className="text-[11px] text-muted-foreground/70 font-medium italic">
              {diffInDays <= 2 ? "Posted recently" : (diffInDays < 7) ? `Posted ${diffInDays} days ago` : "Posted Few Weeks ago"}

            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
