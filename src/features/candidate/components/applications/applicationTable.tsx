import {
  Table, TableHeader, TableHead,
  TableRow, TableBody,
} from "@/components/ui/shadcn/table";
import ApplicationRow from "./applicationRow";
import type { CandidateApplicationDTO } from "../../types/application.types";

export default function ApplicationsTable({ applications }:{applications:CandidateApplicationDTO[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Applied Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {applications.map((app, i) => (
          <ApplicationRow key={i} company={app.job.company} date={app.createdAt} location={app.job.location}  status={app.status} title={app.job.title} />
        ))}
      </TableBody>
    </Table>
  );
}
