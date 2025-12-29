import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/shadcn/table"
import { JobStatusBadge } from "../../shared/JobStatusBadge"
import { JobActions } from "./JobActions"

type JobStatus = "active" | "blocked" | "closed"

interface JobListItem {
  _id: string
  title: string
  recruiter: {
    _id: string
    name: string
    company: string
  }
  jobType: string
  location: string
  applicationCount: number
  status: JobStatus
}

export function JobTable({
  jobs,
  onView,
  onAction,
}: {
  jobs: JobListItem[]
  onView: (jobId: string) => void
  onAction: (jobId: string, status: JobStatus) => void
}) {
  return (
    <div className="bg-white border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job</TableHead>
            <TableHead>Recruiter</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Applications</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {jobs.length ? (
            jobs.map((job) => (
              <TableRow key={job._id}>
                <TableCell className="font-medium">
                  {job.title}
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">
                      {job.recruiter.company}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {job.recruiter.name}
                    </p>
                  </div>
                </TableCell>

                <TableCell className="capitalize">
                  {job.jobType}
                </TableCell>

                <TableCell>{job.location}</TableCell>

                <TableCell>
                  {job.applicationCount}
                </TableCell>

                <TableCell>
                  <JobStatusBadge status={job.status} />
                </TableCell>

                <TableCell className="text-right">
                  <JobActions
                    status={job.status}
                    onView={() => onView(job._id)}
                    onAction={(status) =>
                      onAction(job._id, status)
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground"
              >
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
