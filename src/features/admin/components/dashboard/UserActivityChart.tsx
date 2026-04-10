import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

const AXIS_TICK_STYLE = { fill: "var(--muted-foreground)", fontSize: 10 };
const TOOLTIP_STYLE = {
  backgroundColor: "var(--card)",
  borderColor: "var(--border)",
  borderRadius: "12px",
  color: "var(--card-foreground)",
};
const TOOLTIP_LABEL_STYLE = { color: "var(--card-foreground)" };

interface UserActivityChartProps {
  data?: { date: string; label: string; count: number }[];
}

export const UserActivityChart = ({ data }: UserActivityChartProps) => {
  const chartData = data?.map(item => ({
    name: item.label,
    count: item.count,
  })) || [
    { name: "20/03", count: 40 },
    { name: "21/03", count: 35 },
    { name: "22/03", count: 50 },
    { name: "23/03", count: 45 },
    { name: "24/03", count: 65 },
    { name: "25/03", count: 55 },
    { name: "26/03", count: 80 },
  ];

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Daily Application Volume
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
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
              contentStyle={TOOLTIP_STYLE}
              labelStyle={TOOLTIP_LABEL_STYLE}
              itemStyle={{ color: "var(--card-foreground)" }}
            />
            <Area 
              type="monotone" 
              dataKey="count" 
              stroke="var(--chart-1)" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorCount)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
