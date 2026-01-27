import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import type { ApplicationFilters } from "../../types/applicationFilter.types";

type ApplicationFilterProps = {
  filters: ApplicationFilters;
  onChange: (filters: ApplicationFilters) => void;
};

export const ApplicationsFilter = ({
  filters,
  onChange,
}: ApplicationFilterProps) => {
  const updateFilter = <K extends keyof ApplicationFilters>(
    key: K,
    value: ApplicationFilters[K]
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 shadow-sm mb-4">
      <div className="flex items-center gap-2">
        <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider px-1">
          Filter by:
        </span>
        {/* STATUS FILTER */}
        <Select
          value={filters.status}
          onValueChange={(value) =>
            updateFilter("status", value as ApplicationFilters["status"])
          }
        >
          <SelectTrigger className="w-[160px] h-9 text-[13px] font-medium border-slate-200 focus:ring-blue-500">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Shortlisted">Shortlisted</SelectItem>
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* SORT FILTER */}
        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            updateFilter("sortBy", value as ApplicationFilters["sortBy"])
          }
        >
          <SelectTrigger className="w-[160px] h-9 text-[13px] font-medium border-slate-200 focus:ring-blue-500">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

