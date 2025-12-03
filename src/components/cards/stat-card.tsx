import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, subtitle, icon }: StatCardProps) {
  return (
    <Card className="p-4 shadow-sm">
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-gray-600 font-medium">{title}</p>
          {icon}
        </div>

        <p className="text-3xl font-semibold">{value}</p>

        {subtitle && <p className="text-sm text-green-600">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
