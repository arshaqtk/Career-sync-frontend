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
    <div className="flex flex-wrap items-center gap-4 rounded-lg border bg-card p-2 shadow-sm">
      {/* STATUS FILTER */}
      <Select
        value={filters.status}
        onValueChange={(value) =>
          updateFilter("status", value as ApplicationFilters["status"])
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Shortlisted">Shortlisted</SelectItem>
          <SelectItem value="Interview">Interview Scheduled</SelectItem>
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
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
