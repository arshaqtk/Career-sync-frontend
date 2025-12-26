import { TableRow, TableCell } from "@/components/ui/shadcn/table";
import { Button } from "@/components/ui/shadcn/button";
import { Eye } from "lucide-react";
import ApplicationStatusBadge from "./applicationStatusBadge";
import { useNavigate } from "react-router-dom";

interface ApplicationRowData{
  applicationId:string
    title:string,
    company:string,
    location:string,
    date:string,
    status:"Pending" | "Shortlisted" | "Selected" | "Rejected" }
    
export default function ApplicationRow({applicationId,title,company,location,date,status }:ApplicationRowData) {
  const navigate=useNavigate()
    return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>{company}</TableCell>
      <TableCell>{location}</TableCell>
      <TableCell>{date}</TableCell>

      <TableCell>
        <ApplicationStatusBadge status={status} />
      </TableCell>

      <TableCell className="text-right">
        <Button size="sm" variant="ghost" onClick={()=>navigate(`/applications/${applicationId}`)}>
          <Eye size={18} className="mr-1" /> View
        </Button>
      </TableCell>
    </TableRow>
  );
}
