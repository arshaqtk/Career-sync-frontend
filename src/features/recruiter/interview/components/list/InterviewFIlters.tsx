import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/shadcn/select";
import { Input } from "@/components/ui/shadcn/input";
import type { InterviewListFilters as FiltersType, InterviewStatus } from "../../types/interview.type";

type Props = {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
};

export function InterviewFilters({ filters, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3 rounded-lg border p-3">
      <Select
        value={filters.status}
        onValueChange={(value) =>
          onChange({ ...filters, status: value as "All"|InterviewStatus })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Scheduled">Scheduled</SelectItem>
          <SelectItem value="Rescheduled">Rescheduled</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Input
        placeholder="Search candidate"
        value={filters.search}
        onChange={(e) =>
          onChange({ ...filters, search: e.target.value })
        }
        className="w-[240px]"
      />
    </div>
  );
}
