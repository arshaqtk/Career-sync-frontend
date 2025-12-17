import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { Button } from "@/components/ui/shadcn/button";
import { SlidersHorizontal } from "lucide-react";
import type { JobFilters } from "../../types/jobFilter.types";

type JobFilterProps = {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
};
export const JobFilter = ({filters,onChange}:JobFilterProps) => {
    const updateFilter=<K extends keyof JobFilters>(key:K,value:JobFilters[K])=>{
        onChange({
            ...filters,[key]:value,
        });
    }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Select 
         value={filters.status}
          onValueChange={(value) =>
            updateFilter("status", value as JobFilters["status"])
          }> 
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        <Select 
        value={filters.jobType}
        onValueChange={(value)=>updateFilter("jobType",value as JobFilters["jobType"])}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
              <SelectItem value="full-time">Full Time</SelectItem>
            <SelectItem value="part-time">Part Time</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button variant="outline" size="sm">
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        More filters
      </Button>
    </div>
  );
};