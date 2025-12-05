import { MapPin, Briefcase, Calendar, Clock, DollarSign } from "lucide-react";
import type{ Job } from "@/types/job.type";

interface JobMetaInfoProps {
  job: Job;
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-2 text-sm">
    <Icon className="w-4 h-4 text-muted-foreground" />
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

export const JobMetaInfo: React.FC<JobMetaInfoProps> = ({ job }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {job.location && <InfoItem icon={MapPin} label="Location" value={job.location} />}

      <InfoItem icon={Briefcase} label="Job Type" value={job.jobType} />

      {(job.experienceMin || job.experienceMax) && (
        <InfoItem
          icon={Clock}
          label="Experience"
          value={`${job.experienceMin ?? 0} - ${job.experienceMax ?? 0} years`}
        />
      )}

      {job.salary && <InfoItem icon={DollarSign} label="Salary" value={job.salary} />}

      {job.remote !== undefined && (
        <InfoItem
          icon={Briefcase}
          label="Work Mode"
          value={job.remote ? "Remote" : "On-site"}
        />
      )}

      {job.createdAt && (
        <InfoItem
          icon={Calendar}
          label="Posted On"
         value={new Date(job.createdAt).toISOString().slice(0, 10)}
        />
      )}
    </div>
  );
};
