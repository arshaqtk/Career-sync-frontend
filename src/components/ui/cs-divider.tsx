import { Separator } from "@/components/ui/separator";

interface DividerProps {
  label: string;
}

export default function CSDivider({ label }: DividerProps) {
  return (
    <div className="relative my-6">
      <Separator className="bg-[var(--border)]" />
      <span className="absolute left-1/2 -translate-x-1/2 top-1/2 bg-white px-4 text-sm text-[var(--text-secondary)]">
        {label}
      </span>
    </div>
  );
}
