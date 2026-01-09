import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Button } from "@/components/ui/shadcn/button";
import type { ApplicationFilters } from "../../types/applicationFilters";

type ApplicationFilterProps = {
  filters: ApplicationFilters;
  onChange: (filters: ApplicationFilters) => void;
};

export const ApplicationFilter = ({
  filters,
  onChange,
}: ApplicationFilterProps) => {
  const updateFilter = <K extends keyof ApplicationFilters>(
    key: K,
    value: ApplicationFilters[K]
  ) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-3 rounded-lg border p-3">
      
      {/* STATUS FILTER */}
      {/* <div className="w-[220px] ">
        <label className="text-sm font-medium">Status</label> */}
        <Select
          value={filters.status}
          onValueChange={(value) =>
            updateFilter("status", value as ApplicationFilters["status"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Status [All]</SelectItem>
            {/* <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Shortlisted">Shortlisted</SelectItem> */}
            <SelectItem value="Interview">Interview</SelectItem>
            <SelectItem value="Selected">Selected</SelectItem>
            <SelectItem value="Rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      {/* </div> */}

      {/* SORT FILTER */}
      {/* <div className="w-[180px] space-y-1">
        <label className="text-sm font-medium">Sort by</label> */}
        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            updateFilter("sortBy", value as ApplicationFilters["sortBy"])
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      {/* </div> */}

      {/* CLEAR */}
      <Button
        variant="ghost"
        size="sm"
        className="ml-auto"
        onClick={() =>
          onChange({
            status: "all",
            sortBy: "newest",
          })
        }
      >
        Clear
      </Button>
    </div>
  );
};
