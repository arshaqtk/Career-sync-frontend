import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary hover:bg-primary/20",
        soft: "bg-gray-100 text-gray-700 hover:bg-gray-200",
        minimal: "border border-gray-300 text-gray-700 hover:bg-gray-100",
        clear: "bg-transparent border border-gray-200 hover:bg-gray-100",
      },
      size: {
        sm: "px-2 py-1",
        md: "px-3 py-1.5",
        lg: "px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "soft",
      size: "md",
    },
  }
);

interface CustomBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "soft" | "minimal" | "clear";
  size?: "sm" | "md" | "lg";
}

export function CustomBadge({ className, variant, size, ...props }: CustomBadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}
