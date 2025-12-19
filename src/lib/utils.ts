import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function combineDateAndTime(
  date: Date,
  time: string,
): string {
  const [hours, minutes] = time.split(":").map(Number);

  const localDate = new Date(date);
  localDate.setHours(hours, minutes, 0, 0);

  // Store as UTC ISO string
  return localDate.toISOString();
}