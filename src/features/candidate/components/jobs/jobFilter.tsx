import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
// import { Button } from "@/components/ui/shadcn/button";
// import { Input } from "@/components/ui/shadcn/input";
// import { SlidersHorizontal, Search } from "lucide-react";
import type { JobFilters } from "../../types/jobFilter.types";
import { Search } from "lucide-react";
import { AutoCompleteInput } from "@/components/ui/AutoCompleteInput"
import { fetchJobSuggestions } from "@/api/job.api"
type JobFilterProps = {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
};

export const JobFilter = ({ filters, onChange }: JobFilterProps) => {
  const updateFilter = <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K]
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-3 shadow-sm">
      {/* Left filters */}
      <div className="flex flex-wrap items-center gap-3">

        {/* 🔍 Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          {/* <Input
            placeholder="Search jobs..."
            className="pl-8 w-[220px]"
            value={filters.search ?? ""}
            onChange={(e) =>
              updateFilter("search", e.target.value)
            }
          /> */}
          <AutoCompleteInput
  value={filters.search ?? ""}
  onChange={(value) => updateFilter("search", value)}
  placeholder="Search jobs..."
  fetchSuggestions={fetchJobSuggestions}
/>
        </div>

        {/* Status */}
        <Select
          value={filters.status}
          onValueChange={(value) =>
            updateFilter("status", value as JobFilters["status"])
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">Active</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>

        {/* Job Type */}
        <Select
          value={filters.jobType}
          onValueChange={(value) =>
            updateFilter("jobType", value as JobFilters["jobType"])
          }
        >
          <SelectTrigger className="w-40">
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

      {/* Right action */}
      {/* <Button variant="outline" size="sm">
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        More filters
      </Button> */}
    </div>
  );
};
