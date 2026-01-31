import { Card, CardContent } from "@/components/ui/shadcn/card";
import React from "react";

interface ProfileStatCardProps {
  icon?: React.ReactNode;
  label: string;
  value: string | number;
}

export function ProfileStatCard({ icon, label, value }: ProfileStatCardProps) {
  return (
    <Card className="border border-slate-200 shadow-none hover:border-blue-200 transition-colors bg-white">
      <CardContent className="p-5 flex flex-col items-center text-center gap-2">
        {icon && <div className="p-2 bg-blue-50 rounded-full mb-1">{icon}</div>}
        <div className="flex flex-col">
          <span className="text-xl font-extrabold text-slate-900">{value}</span>
          <span className="text-[12px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        </div>
      </CardContent>
    </Card>
  );
}
