import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";

interface CategoryDistributionChartProps {
  data?: { name: string; value: number }[];
}

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

export const CategoryDistributionChart = ({ data }: CategoryDistributionChartProps) => {
  const chartData = data?.length ? data : [];

  return (
    <Card className="border-border/50 shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Job Distribution by Sector
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              cornerRadius={4}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={1500}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              wrapperStyle={{ fontSize: 10, paddingTop: 20, color: "var(--muted-foreground)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
