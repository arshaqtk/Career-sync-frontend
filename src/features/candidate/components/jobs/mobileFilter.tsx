import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/shadcn/popover"
import { Button } from "@/components/ui/shadcn/button"
import { Input } from "@/components/ui/shadcn/input"
import { Checkbox } from "@/components/ui/shadcn/checkbox"
import { SlidersHorizontal } from "lucide-react"
import type { JobFilters } from "../../types/jobFilter.types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select"

type Props = {
  filters: JobFilters
  onChange: (filters: JobFilters) => void
}

const FIELD_OPTIONS = [
  { label: "IT / Software", value: "IT" },
  { label: "Healthcare / Medical", value: "Healthcare" },
  { label: "Design", value: "Design" },
  { label: "Education", value: "Education" },
  { label: "Finance", value: "Finance" },
  { label: "Other", value: "Other" },
];

const DEFAULT_FILTERS: JobFilters = {
  status: "all",
  jobType: "all",
  search: "",
  field: undefined,
  location: "",
  experienceMin: undefined,
  remote:undefined,
};


export function JobMobileFilterPopover({ filters, onChange }: Props) {
  const update = <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K]
  ) => {
    onChange({ ...filters, [key]: value })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-[320px] p-4 space-y-4">
        <h4 className="font-semibold text-sm">Filters</h4>

        {/* Field */}
        <div className="space-y-2">
           
           <Select
          value={filters.status}
          onValueChange={(value) =>
            update("status", value as JobFilters["status"])
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
            update("jobType", value as JobFilters["jobType"])
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

              <Select onValueChange={(value) => update("field",value)} value={filters.field}>
                  <SelectTrigger className="h-10 w-[100%]">
                    <SelectValue placeholder="Select your field" />
                  </SelectTrigger>
                <SelectContent>
                  {FIELD_OPTIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          <label className="text-sm">Field</label>
         
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm">Location</label>
          <Input
            placeholder="Kochi, Bangalore..."
            value={filters.location ?? ""}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <label className="text-sm">Experience (Years)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.experienceMin ?? ""}
              onChange={(e) =>
                update("experienceMin", Number(e.target.value))
              }
            />
            {/* <Input
              type="number"
              placeholder="Max"
              value={filters.experienceMax ?? ""}
              onChange={(e) =>
                update("experienceMax", Number(e.target.value))
              }
            /> */}
          </div>
        </div>

        {/* Remote */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={filters.remote ?? false}
            onCheckedChange={(v) => update("remote", Boolean(v))}
          />
          <span className="text-sm">Remote only</span>
        </div>
        <Button  variant="ghost"
  size="sm" onClick={()=>onChange(DEFAULT_FILTERS)}>Clear Filters</Button>
      </PopoverContent>
    </Popover>
  )
}
