import {
  Table, TableHeader, TableHead,
  TableRow, TableBody,
} from "@/components/ui/shadcn/table";
import ApplicationRow from "./applicationRow";
import type { Application } from "../../types/application.types";

export default function ApplicationsTable({ applications }:{applications:Application[]}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Applied Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {applications.map((app, i) => (
          <ApplicationRow key={i} company={app.jobId.company} date={app.createdAt} location={app.jobId.location} salary={app.jobId.salary} status={app.status} title={app.jobId.title} />
        ))}
      </TableBody>
    </Table>
  );
}
