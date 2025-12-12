import { TableRow, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Eye } from "lucide-react";
import ApplicationStatusBadge from "./applicationStatusBadge";

interface ApplicationRowData{
    title:string,
    company:string,
    location:string,
    salary?:string,
    date:string,
    status:"Pending" | "Shortlisted" | "Selected" | "Rejected" }
    
export default function ApplicationRow({title,company,location,salary,date,status }:ApplicationRowData) {
    return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>{salary}</TableCell>
      <TableCell>{date}</TableCell>

      <TableCell>
        <ApplicationStatusBadge status={status} />
      </TableCell>

      <TableCell className="text-right">
        <Button size="sm" variant="ghost">
          <Eye size={18} className="mr-1" /> View
        </Button>
      </TableCell>
    </TableRow>
  );
}
