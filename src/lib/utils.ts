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

  export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
};