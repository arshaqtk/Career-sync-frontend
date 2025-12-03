import React from "react";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 ${className}`}>
      {children}
    </div>
  );
}
