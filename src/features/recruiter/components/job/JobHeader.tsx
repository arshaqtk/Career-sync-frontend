import { Badge } from "@/components/ui/shadcn/badge";
import type{ Job } from "@/features/recruiter/types/job.type";

interface JobHeaderProps {
  title: string;
  company: string;
  status: Job["status"];
}

export const JobHeader: React.FC<JobHeaderProps> = ({
  title,
  company,
  status,
}) => {
  const variant =
    status === "open" ? "default" :
    status === "closed" ? "destructive" : "secondary";

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{company}</p>
      </div>
      <Badge variant={variant}>{status}</Badge>
    </div>
  );
};
