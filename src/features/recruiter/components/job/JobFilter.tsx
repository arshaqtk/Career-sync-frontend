import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import type { JobFilters } from "../../types/jobFilter.types";
import { Search, SlidersHorizontal } from "lucide-react";

type JobFilterProps = {
  filters: JobFilters;
  onChange: (filters: JobFilters) => void;
};

export const JobFilter = ({ filters, onChange }: JobFilterProps) => {
  const updateFilter = <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K]
  ) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border bg-card py-2 px-4  shadow-sm  w-full">
      
      {/* 🔍 SEARCH (always visible) */}
      <div className="relative w-[260px]">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search jobs..."
          value={filters.search ?? ""}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-8"
        />
      </div>

      {/* MORE FILTERS */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
             Filters
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-[260px] space-y-4">
          <h4 className="text-sm font-semibold">Filters</h4>

          {/* Status */}
          <div className="space-y-1">
            <label className="text-sm">Status</label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                updateFilter("status", value as JobFilters["status"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">STATUS [ALL]</SelectItem>
                <SelectItem value="open">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Type */}
          <div className="space-y-1">
            <label className="text-sm">Job Type</label>
            <Select
              value={filters.jobType}
              onValueChange={(value) =>
                updateFilter("jobType", value as JobFilters["jobType"])
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">JOB TYPE [ALL]</SelectItem>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort by Application */}
          <div className="space-y-1">
            <label className="text-sm">Sort by</label>
            <Select
              value={filters.sortByApplication}
              onValueChange={(value) =>
                updateFilter(
                  "sortByApplication",
                  value as JobFilters["sortByApplication"]
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="most_applied">Most Applied</SelectItem>
                <SelectItem value="least_applied">Least Applied</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/*Clear filters */}
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() =>
              onChange({
                ...filters,
                status: "all",
                jobType: "all",
                sortByApplication: undefined,
              })
            }
          >
            Clear filters
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
