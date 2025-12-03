import { Card, CardContent } from "@/components/ui/card";
import React from "react";

interface ProfileStatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}

export function ProfileStatCard({ icon, label, value }: ProfileStatCardProps) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6 flex flex-col gap-3">
        {icon && <div>{icon}</div>}
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </CardContent>
    </Card>
  );
}
