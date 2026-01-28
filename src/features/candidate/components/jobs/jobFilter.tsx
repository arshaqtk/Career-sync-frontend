import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Search } from "lucide-react";
import type { JobFilters } from "../../types/jobFilter.types";
import { AutoCompleteInput } from "@/components/ui/AutoCompleteInput"
import { fetchJobSuggestions } from "@/api/job.api"
import { JobAdvancedFilterPopover } from "./AdvancedFilterPopover";
import { cn } from "@/lib/utils";
import { JobMobileFilterPopover } from "./mobileFilter";

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
    <div className="flex flex-col flex-row items-stretch md:items-center gap-4 py-1 px-4 md:px-0 bg-transparent">
      {/* 🔍 Search Input */}
      <div className="relative w-4/5 md:flex-1 group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors z-20">
          <Search size={18} />
        </div>
        <div className={cn(
          "relative transition-all rounded-md",
          "bg-white border border-slate-300 focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100 z-10"
        )}>
          <AutoCompleteInput
            value={filters.search ?? ""}
            onChange={(value) => updateFilter("search", value)}
            placeholder="Work title, skills, or company"
            fetchSuggestions={fetchJobSuggestions}
            className="pl-10 h-11 bg-white border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-[15px] font-normal placeholder:text-slate-400"
          />
        </div>
      </div>

<div  className="w-1/5 h-11 md:hidden flex items-center justify-center rounded-md border border-slate-300 bg-white hover:border-slate-400 transition">
<JobMobileFilterPopover filters={filters} onChange={onChange} />
</div >
      
       

      <div className="hidden md:flex flex-wrap items-center gap-3">
        {/* Status */}
        <Select
          value={filters.status}
          onValueChange={(value) =>
            updateFilter("status", value as JobFilters["status"])
          }
        >
          <SelectTrigger className="w-[140px] h-11 bg-white border-slate-300 rounded-md hover:border-slate-400 transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-600 text-[14px] font-medium text-slate-700 shadow-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="rounded-md border-slate-200">
            <SelectItem value="all">All listings</SelectItem>
            <SelectItem value="open">Open</SelectItem>
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
          <SelectTrigger className="w-[140px] h-11 bg-white border-slate-300 rounded-md hover:border-slate-400 transition-all focus:ring-2 focus:ring-blue-100 focus:border-blue-600 text-[14px] font-medium text-slate-700 shadow-none">
            <SelectValue placeholder="Job type" />
          </SelectTrigger>
          <SelectContent className="rounded-md border-slate-200">
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="full-time">Full-time</SelectItem>
            <SelectItem value="part-time">Part-time</SelectItem>
            <SelectItem value="internship">Internship</SelectItem>
          </SelectContent>
        </Select>

        <JobAdvancedFilterPopover
          filters={filters}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
