import { Button } from "@/components/ui/shadcn/button";
import type{ ButtonHTMLAttributes, ReactNode } from "react";

interface CSButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  children: ReactNode;
}

export default function CSButton({ fullWidth, children, className = "", ...props }: CSButtonProps) {
  return (
    <Button
     type={props.type || "submit"}
      {...props}
      className={`h-11 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium shadow-sm ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {children}
    </Button>
  );
}
