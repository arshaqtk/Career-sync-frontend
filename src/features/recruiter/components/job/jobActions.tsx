import { Button } from "@/components/ui/shadcn/button";
import { Pencil, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Job } from "@/types/job.type";
import { useJobModalStore } from "../../store/openJobModalStore";
import { useUpdateJobstatus } from "../../hooks/useUpdateJobStatus";

interface JobActionsProps {
  id: string;
  status: Job["status"];
  job?:Job
}

export const JobActions: React.FC<JobActionsProps> = ({ id, status,job}) => {
  const navigate = useNavigate();
  const { openModal } = useJobModalStore();
  const {mutate}=useUpdateJobstatus()
  return (
    <div className="flex gap-4 mt-8">
      <Button onClick={() =>openModal(job)} className="flex gap-2">
        <Pencil className="w-4 h-4" /> Edit Job
      </Button>

      <Button
        onClick={() => navigate(`/recruiter/jobs/${id}/applicants`)}
        variant="secondary"
        className="flex gap-2"
      >
        <Users className="w-4 h-4" /> Applicants
      </Button>

      {status === "open" ? (
        <Button variant="destructive" onClick={() => mutate({jobId:id,status:"closed"})}>
          Close Job
        </Button>
      ) : (
        <Button onClick={() =>mutate({jobId:id,status:"open"})}>Reopen Job</Button>
      )}
    </div>
  );
};


// import api from "@/lib/axios"; // <-- your axios instance
// import { IJob } from "../types/job.types";

// export const recruiterJobService = {
//   // GET job by ID
//   async getJobById(jobId: string): Promise<IJob> {
//     const response = await api.get(`/recruiter/jobs/${jobId}`);
//     return response.data.data as IJob;
//   },

//   // CLOSE job
//   async closeJob(jobId: string): Promise<{ message: string }> {
//     const response = await api.patch(`/recruiter/jobs/${jobId}/close`);
//     return response.data;
//   },

//   // REOPEN job
//   async reopenJob(jobId: string): Promise<{ message: string }> {
//     const response = await api.patch(`/recruiter/jobs/${jobId}/reopen`);
//     return response.data;
//   },

//   // Optional - Update Job
//   async updateJob(jobId: string, payload: Partial<IJob>): Promise<IJob> {
//     const response = await api.put(`/recruiter/jobs/${jobId}`, payload);
//     return response.data.data as IJob;
//   },

//   // Optional - Fetch all jobs posted by recruiter
//   async getMyJobs(): Promise<IJob[]> {
//     const response = await api.get(`/recruiter/jobs`);
//     return response.data.data as IJob[];
//   }
// };
