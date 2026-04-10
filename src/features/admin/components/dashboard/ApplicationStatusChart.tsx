import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

interface ApplicationStatusChartProps {
  data?: { name: string; value: number }[];
}

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

export function ApplicationStatusChart({ data }: ApplicationStatusChartProps) {
  const chartData = data?.length
    ? data
    : [
        { name: "Pending", value: 48 },
        { name: "Shortlisted", value: 16 },
        { name: "Selected", value: 5 },
        { name: "Rejected", value: 21 },
      ];

  return (
    <Card className="border-border/50 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Application Status Mix
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={88}
              paddingAngle={4}
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell key={`app-status-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
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
            <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ fontSize: 11, paddingTop: 16, color: "var(--muted-foreground)" }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
