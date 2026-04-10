import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

const AXIS_TICK_STYLE = { fill: "var(--muted-foreground)", fontSize: 12 };

interface JobStatusChartProps {
  data?: { name: string; value: number }[];
}

const COLORS: Record<string, string> = {
  Open: "var(--chart-2)",
  Paused: "var(--chart-3)",
  Closed: "var(--muted-foreground)",
};

export function JobStatusChart({ data }: JobStatusChartProps) {
  const chartData = data?.length
    ? data
    : [
        { name: "Open", value: 42 },
        { name: "Paused", value: 8 },
        { name: "Closed", value: 19 },
      ];

  return (
    <Card className="border-border/50 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Job Status Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={AXIS_TICK_STYLE} />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "12px",
                color: "var(--card-foreground)",
              }}
              labelStyle={{ color: "var(--card-foreground)" }}
              itemStyle={{ color: "var(--card-foreground)" }}
            />
            <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={46}>
              {chartData.map((item) => (
                <Cell key={item.name} fill={COLORS[item.name] ?? "var(--primary)"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
