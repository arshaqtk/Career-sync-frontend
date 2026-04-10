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
const TOOLTIP_STYLE = {
  backgroundColor: "var(--card)",
  borderColor: "var(--border)",
  borderRadius: "12px",
  color: "var(--card-foreground)",
};
const TOOLTIP_LABEL_STYLE = { color: "var(--card-foreground)" };

interface PlatformGrowthChartProps {
  data?: {
    label: string
    recruiters: number
    candidates: number
    total: number
  }[];
}

export const PlatformGrowthChart = ({ data }: PlatformGrowthChartProps) => {
  const chartData = data?.map(item => ({
    name: item.label,
    recruiters: item.recruiters,
    candidates: item.candidates,
    total: item.total,
  })) || [
    { name: "Jan", recruiters: 24, candidates: 120, total: 144 },
    { name: "Feb", recruiters: 18, candidates: 96, total: 114 },
    { name: "Mar", recruiters: 28, candidates: 140, total: 168 },
    { name: "Apr", recruiters: 22, candidates: 108, total: 130 },
    { name: "May", recruiters: 31, candidates: 155, total: 186 },
    { name: "Jun", recruiters: 20, candidates: 94, total: 114 },
  ];

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Platform Registration Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={AXIS_TICK_STYLE}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={AXIS_TICK_STYLE}
            />
            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
              contentStyle={TOOLTIP_STYLE}
              labelStyle={TOOLTIP_LABEL_STYLE}
              itemStyle={{ color: "var(--card-foreground)" }}
            />
            <Bar
              dataKey="candidates"
              radius={[6, 6, 0, 0]} 
              barSize={40}
            >
              {chartData.map((_, index) => (
                <Cell 
                   key={`cell-${index}`} 
                   fill={index === chartData.length - 1 ? "var(--chart-1)" : "color-mix(in srgb, var(--chart-1) 35%, transparent)"} 
                   className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
            <Bar
              dataKey="recruiters"
              radius={[6, 6, 0, 0]}
              barSize={40}
            >
              {chartData.map((_, index) => (
                <Cell
                   key={`recruiter-cell-${index}`}
                   fill={index === chartData.length - 1 ? "var(--chart-2)" : "color-mix(in srgb, var(--chart-2) 35%, transparent)"}
                   className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
