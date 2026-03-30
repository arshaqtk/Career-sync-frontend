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

interface PlatformGrowthChartProps {
  data?: { month: number; count: number }[];
}

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const PlatformGrowthChart = ({ data }: PlatformGrowthChartProps) => {
  const chartData = data?.map(item => ({
    name: MONTH_NAMES[item.month - 1] || `Month ${item.month}`,
    count: item.count,
  })) || [
    { name: "Jan", count: 400 },
    { name: "Feb", count: 300 },
    { name: "Mar", count: 500 },
    { name: "Apr", count: 280 },
    { name: "May", count: 590 },
    { name: "Jun", count: 320 },
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
              tick={{ fill: "var(--text-muted)", fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "12px",
                color: "var(--foreground)",
              }}
              itemStyle={{ color: "var(--primary)" }}
            />
            <Bar 
              dataKey="count" 
              radius={[6, 6, 0, 0]} 
              barSize={40}
            >
              {chartData.map((_, index) => (
                <Cell 
                   key={`cell-${index}`} 
                   fill={index === chartData.length - 1 ? "var(--primary)" : "var(--primary-muted, #3b82f644)"} 
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
