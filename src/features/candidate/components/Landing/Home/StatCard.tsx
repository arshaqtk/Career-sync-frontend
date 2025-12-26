
import type{ LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export const StatCard = ({ icon: Icon, value, label }: StatCardProps) => (
  <div className="flex items-center gap-4 p-4 rounded-xl">
    <div className="p-3 bg-blue-50 rounded-lg">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <div className="text-xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  </div>
);