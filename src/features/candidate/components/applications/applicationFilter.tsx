import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/shadcn/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function ApplicationsFilters() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
      <Input className="w-full md:w-96" placeholder="Search applications..." />

      <div className="flex gap-3">
        {/* Status dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              All Statuses <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All</DropdownMenuItem>
            <DropdownMenuItem>Applied</DropdownMenuItem>
            <DropdownMenuItem>Shortlisted</DropdownMenuItem>
            <DropdownMenuItem>Interview Scheduled</DropdownMenuItem>
            <DropdownMenuItem>Rejected</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Sort dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Sort by Most Recent <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Most Recent</DropdownMenuItem>
            <DropdownMenuItem>Oldest First</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
