type TimelineItemProps = {
  step: {
    label: string;
    date?: string;
    done?: boolean;
    active?: boolean;
    status?: string;
  };
};

export function TimelineItem({ step }: TimelineItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`h-6 w-6 rounded-full flex items-center justify-center
          ${step.done ? "bg-green-500" : step.active ? "bg-primary" : "border"}`}
      />

      <div className="flex-1">
        <p className="font-medium">{step.label}</p>
        <p className="text-sm text-muted-foreground">
          {step.date ?? step.status}
        </p>
      </div>
    </div>
  );
}
