import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/shadcn/select";
import {Popover,PopoverContent,PopoverTrigger,} from "@/components/ui/shadcn/popover";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import type { JobFilters } from "../../types/jobFilter.types";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";

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

  const activeFiltersCount = [
    filters.status !== "all",
    filters.jobType !== "all",
    filters.sortByApplication !== undefined,
  ].filter(Boolean).length;

  const isFiltered = activeFiltersCount > 0 || (filters.search && filters.search.length > 0);

  return (
    <div className="flex items-center gap-3 w-full">
      {/* 🔍 SEARCH */}
      <div className="relative flex-1 max-w-md group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
        <Input
          placeholder="Search professional opportunities..."
          value={filters.search ?? ""}
          onChange={(e) => updateFilter("search", e.target.value)}
          className="pl-10 h-11 bg-white border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500/10 transition-all font-medium"
        />
        {filters.search && (
          <button
            onClick={() => updateFilter("search", "")}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      {/* FILTER BUTTON */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`h-11 px-5 rounded-xl border-slate-200 font-semibold transition-all hover:bg-slate-50 flex items-center gap-2 ${activeFiltersCount > 0 ? "border-blue-200 bg-blue-50/30 text-blue-600 shadow-sm shadow-blue-100/50" : "text-slate-600 shadow-sm"
              }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Refine Results</span>
            {activeFiltersCount > 0 && (
              <Badge className="ml-1 h-5 min-w-[20px] px-1 bg-blue-600 text-white border-none text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-[320px] p-0 rounded-2xl shadow-xl border-slate-100 mt-2 overflow-hidden">
          <div className="p-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Filter Settings</h4>
            {isFiltered && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                onClick={() =>
                  onChange({
                    ...filters,
                    status: "all",
                    jobType: "all",
                    sortByApplication: undefined,
                    search: ""
                  })
                }
              >
                Reset All
              </Button>
            )}
          </div>

          <div className="p-5 space-y-6">
            {/* Status */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Availability Status</label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  updateFilter("status", value as JobFilters["status"])
                }
              >
                <SelectTrigger className="h-10 rounded-lg border-slate-200 bg-slate-50/30 focus:ring-2 focus:ring-blue-500/10 font-medium text-slate-700">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-lg border-slate-100">
                  <SelectItem value="all" className="rounded-lg">STATUS [ALL]</SelectItem>
                  <SelectItem value="open" className="rounded-lg">Active Positions</SelectItem>
                  <SelectItem value="closed" className="rounded-lg">Closed / Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Job Type */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Employment Type</label>
              <Select
                value={filters.jobType}
                onValueChange={(value) =>
                  updateFilter("jobType", value as JobFilters["jobType"])
                }
              >
                <SelectTrigger className="h-10 rounded-lg border-slate-200 bg-slate-50/30 focus:ring-2 focus:ring-blue-500/10 font-medium text-slate-700">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-lg border-slate-100">
                  <SelectItem value="all" className="rounded-lg">JOB TYPE [ALL]</SelectItem>
                  <SelectItem value="full-time" className="rounded-lg">Full Time Engagement</SelectItem>
                  <SelectItem value="part-time" className="rounded-lg">Part Time Engagement</SelectItem>
                  <SelectItem value="internship" className="rounded-lg">Internship / Trainee</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort by Application */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Engagement Sort</label>
              <Select
                value={filters.sortByApplication}
                onValueChange={(value) =>
                  updateFilter(
                    "sortByApplication",
                    value as JobFilters["sortByApplication"]
                  )
                }
              >
                <SelectTrigger className="h-10 rounded-lg border-slate-200 bg-slate-50/30 focus:ring-2 focus:ring-blue-500/10 font-medium text-slate-700">
                  <SelectValue placeholder="Engagement priority" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-lg border-slate-100">
                  <SelectItem value="most_applied" className="rounded-lg flex items-center gap-2">
                    Highest Applicant Count
                  </SelectItem>
                  <SelectItem value="least_applied" className="rounded-lg">Lowest Applicant Count</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
