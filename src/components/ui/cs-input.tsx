import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { cn } from "@/lib/utils";
import type { InputHTMLAttributes, ReactNode } from "react";

interface CSInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
}

export default function CSInput({
  label,
  icon,
  rightIcon,
  error,
  className = "",
  ...props
}: CSInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <Label className="text-sm font-medium text-[var(--text-primary)]">
          {label}
        </Label>
      )}

      <div className="relative">
        {/* LEFT ICON */}
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}

        {/* INPUT */}
        <Input
          {...props}
          className={cn(
            "h-11 border-[var(--border)] shadow-sm",
            icon ? "pl-10" : "pl-3",
            rightIcon ? "pr-10" : "pr-3",
            error && "border-red-500",
            className
          )}
        />

        {/* RIGHT ICON (Eye) */}
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600">
            {rightIcon}
          </span>
        )}
      </div>

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
