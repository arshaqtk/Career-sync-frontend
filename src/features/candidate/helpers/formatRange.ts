import { format } from "date-fns";

export const formatRange = (startIso: string, endIso?: string) => {
  try {
    const start = new Date(startIso);
    const startText = format(start, "LLL yyyy");
    if (!endIso) return `${startText} — Present`;
    const end = new Date(endIso);
    const endText = format(end, "LLL yyyy");
    return `${startText} — ${endText}`;
  } catch {
    return "Dates unavailable";
  }
};