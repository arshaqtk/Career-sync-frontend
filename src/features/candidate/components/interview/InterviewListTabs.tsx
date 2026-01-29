import { Tabs, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs"

export function InterviewListTabs({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
      <TabsList className="bg-slate-100/50 p-1 h-11 border border-slate-200">
        <TabsTrigger
          value="upcoming"
          className="rounded-md px-6 font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
        >
          Upcoming
        </TabsTrigger>
        <TabsTrigger
          value="today"
          className="rounded-md px-6 font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
        >
          Scheduled Today
        </TabsTrigger>
        <TabsTrigger
          value="past"
          className="rounded-md px-6 font-bold data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm transition-all"
        >
          Past Interviews
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

