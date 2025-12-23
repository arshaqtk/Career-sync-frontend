import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import type { Job } from "@/types/job.type";
import { ApplyToJobModal } from "../Modals/applyToJobModal";
import { useState } from "react";
import type { ApplyJobDTO } from "../../types/application.types";
import { useApplyNow } from "../../hooks/useApplication";
import useUserData from "@/hooks/useUserData";

interface JobDetailsProps {
  job?: Job | null;
}

export function JobDetails({ job }: JobDetailsProps) {
  const [open, setIsOpen] = useState(false)
  const applyNowJOb = useApplyNow()
  const { data: userData } = useUserData()
  if (!job)
    return (
      <div className="w-[55%] flex items-center justify-center text-muted-foreground">
        Select a job to view details
      </div>
    );

  const handleApplyToJOb = (data: ApplyJobDTO) => {
    applyNowJOb.mutate(data)
  }


  return (
    <div className="w-[65%] h-full overflow-y-auto p-4">
      <ApplyToJobModal jobIds={job._id as string} open={open} onSubmit={handleApplyToJOb} onOpenChange={setIsOpen} candidateResumeUrl={userData?.candidateData?.resume?.url}></ApplyToJobModal>
      <Card>
        <CardContent className="p-4 space-y-3">
          <h2 className="text-2xl font-bold">{job.title}</h2>
          <p className="text-muted-foreground">
            {job.company} • {job.location || "Unknown"}
          </p>

          <p className="text-lg font-semibold text-primary">
            ₹ {job.salary || "Not provided"}
          </p>

          <div className="flex gap-2 mt-2 flex-wrap">
            <Badge variant="outline">{job.jobType}</Badge>
            <Badge variant="secondary">{job.status}</Badge>
            {job.remote && <Badge>Remote</Badge>}
          </div>

          <Button
            className="w-full mt-4"
            onClick={() => setIsOpen(true)}
            disabled={job.status === "closed"}
          >
            {job.status === "open" ? "Apply Now" : "Job is closed"}
          </Button>

          {/* Skills */}
          {job.skills && job.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-medium">Required Skills</h3>
              <div className="flex gap-2 flex-wrap mt-1">
                {job.skills.map((s, i) => (
                  <Badge key={i} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium">Job Description</h3>
            <p className="text-sm mt-2 whitespace-pre-line">{job.description}</p>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-lg font-medium">Experience Required</h3>
            <p className="text-sm mt-1">
              {job.experienceMin} - {job.experienceMax} years
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
