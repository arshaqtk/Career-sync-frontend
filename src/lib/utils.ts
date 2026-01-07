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

export const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "Not scheduled";

  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDuration = (
  start?: string,
  end?: string
): string | null => {
  if (!start || !end) return null;

  const duration =
    (new Date(end).getTime() - new Date(start).getTime()) / 60000;

  return `${Math.round(duration)} min`;
};

export const getValidParams=<T extends readonly string[]>(value:string|null,
  allowed:T,
  fallback:T[number]):T[number]=>{
    return allowed.includes(value as T[number]) ? (value as T[number]):fallback
  }
