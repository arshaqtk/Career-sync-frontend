import { Button } from "@/components/ui/shadcn/button";
import { Edit, MoreHorizontal, Users, Trash2, Power } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Job } from "@/features/recruiter/types/job.type";
import { useJobModalStore } from "../../store/openJobModalStore";
import { useUpdateJobstatus } from "../../hooks/useUpdateJobStatus";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";

interface JobActionsProps {
  id: string;
  status: Job["status"];
  job?: Job;
  asDropdown?: boolean;
}

export const JobActions: React.FC<JobActionsProps> = ({ id, status, job, asDropdown }) => {
  const navigate = useNavigate();
  const { openModal } = useJobModalStore();
  const { mutate } = useUpdateJobstatus();

  if (asDropdown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openModal(job)}>
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate(`/recruiter/jobs/${id}/applicants`)}>
            <Users className="mr-2 h-4 w-4" /> View Applicants
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {status === "open" && (
            <DropdownMenuItem
              onClick={() => mutate({ jobId: id, status: "closed" })}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Close Job
            </DropdownMenuItem>
          )}
          {status === "closed" && (
            <DropdownMenuItem
              onClick={() => mutate({ jobId: id, status: "open" })}
              className="text-green-600 focus:text-green-600"
            >
              <Power className="mr-2 h-4 w-4" /> Reopen Job
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex gap-4 mt-8">
      <Button onClick={() => openModal(job)} className="flex gap-2">
        <Edit className="w-4 h-4" /> Edit Job
      </Button>

      <Button
        onClick={() => navigate(`/recruiter/jobs/${id}/applicants`)}
        variant="secondary"
        className="flex gap-2"
      >
        <Users className="w-4 h-4" />
        Applicants {job?.applicationCount}
      </Button>

      {status === "paused" && (
        <Button disabled variant="destructive">
          Blocked
        </Button>
      )}

      {status === "open" && (
        <Button
          variant="destructive"
          onClick={() => mutate({ jobId: id, status: "closed" })}
        >
          Close Job
        </Button>
      )}

      {status === "closed" && (
        <Button onClick={() => mutate({ jobId: id, status: "open" })}>
          Reopen Job
        </Button>
      )}
    </div>
  );
};
