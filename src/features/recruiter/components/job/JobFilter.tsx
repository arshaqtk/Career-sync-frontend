import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
// import { Button } from "@/components/ui/shadcn/button";
// import { SlidersHorizontal } from "lucide-react";

export const JobFilter = () => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-card p-2 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* <Button variant="outline" size="sm">
        <SlidersHorizontal className="mr-2 h-4 w-4" />
        More filters
      </Button> */}
    </div>
  );
};