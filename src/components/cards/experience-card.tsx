import React from "react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Avatar } from "@/components/ui/shadcn/avatar";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { format } from "date-fns";
import { Briefcase, MapPin, Calendar, Download } from "lucide-react";

// --------------------
// Types
// --------------------
export interface Experience {
  id?: string;
  company: string;
  role: string;
  startDate: string; // ISO date string
  endDate?: string; // ISO date string or undefined -> Present
  location?: string;
  logoUrl?: string;
  description?: string;
  responsibilities?: string[];
  skills?: string[];
  resumeUrl?: string; // optional URL to the resume file (used for download/view)
}

export interface ExperienceCardProps {
  experience: Experience;
  compact?: boolean; // smaller footprint variant
  onDownloadResume?: (url?: string) => void; // callback for download action
  className?: string;
}

// --------------------
// Helpers
// --------------------
const formatRange = (startIso: string, endIso?: string) => {
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

// --------------------
// Component
// --------------------
export default function ExperienceCard({ experience, compact = false, onDownloadResume, className = "" }: ExperienceCardProps) {
  const {
    company,
    role,
    startDate,
    endDate,
    location,
    logoUrl,
    description,
    responsibilities = [],
    skills = [],
    resumeUrl,
  } = experience;

  return (
    <Card className={`p-4 sm:p-6 shadow-md ${className}`}>
      <CardHeader className="flex items-start gap-4 p-0">
        <div className="flex-shrink-0">
          {logoUrl ? (
            <Avatar>
              <img src={logoUrl} alt={`${company} logo`} />
            </Avatar>
          ) : (
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Briefcase size={18} />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm sm:text-base leading-tight">{role}</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">{company}</CardDescription>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar size={14} />
                <span>{formatRange(startDate, endDate)}</span>
              </div>
              {location && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                  <MapPin size={14} />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 p-0">
        {description && <p className={`text-sm mb-3 ${compact ? "line-clamp-3" : ""}`}>{description}</p>}

        {responsibilities.length > 0 && (
          <div className="mb-3">
            <h4 className="text-xs font-medium mb-2">Key contributions</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {responsibilities.slice(0, compact ? 3 : 6).map((r, idx) => (
                <li key={idx} className="text-sm leading-snug">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        )}

        {skills.length > 0 && (
          <div className="mb-2">
            <h4 className="text-xs font-medium mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 8).map((s, i) => (
                <Badge key={i} className="text-xs py-1 px-2">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Compact: allow a small scroll area for long content to keep cards uniform */}
        {!compact && responsibilities.length > 6 && (
          <ScrollArea className="h-28 mt-2 p-2 border rounded-md">
            <ul className="list-disc list-inside text-sm space-y-1">
              {responsibilities.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>

      <CardFooter className="p-0 mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => window.open(`/company/${company}`, "_blank")}>View company</Button>
        </div>

        <div className="flex items-center gap-2">
          {resumeUrl && (
            <Button
              size="sm"
              onClick={() => (onDownloadResume ? onDownloadResume(resumeUrl) : window.open(resumeUrl, "_blank"))}
            >
              <Download size={14} />
              <span className="ml-2">Resume</span>
            </Button>
          )}

          <Button size="sm" onClick={() => alert("Edit experience — open modal or navigate to edit form")}>Edit</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// --------------------
// Example usage (paste into a page) - keep this out of the exported file when integrating
// --------------------

/*
const mock: Experience = {
  id: "1",
  company: "Acme Tech Pvt Ltd",
  role: "Frontend Engineer",
  startDate: "2021-06-01",
  endDate: "2024-02-28",
  location: "Kochi, Kerala",
  logoUrl: "/logos/acme.png",
  description: "Built scalable UI components and design systems for the core product.",
  responsibilities: [
    "Designed & implemented reusable component library using React + Tailwind.",
    "Reduced bundle size by 18% using code-splitting and lazy loading.",
    "Led accessibility improvements and implemented keyboard navigation.",
    "Mentored 3 junior developers and led code reviews.",
  ],
  skills: ["React", "TypeScript", "Tailwind", "React Query", "Accessibility"],
  resumeUrl: "/resumes/arshaq-experience-frontend.pdf",
};

<ExperienceCard experience={mock} onDownloadResume={(url) => console.log("download", url)} />
*/

// --------------------
// Integration notes
// --------------------
// - This component uses shadcn UI primitives (Card, Avatar, Badge, Button). Replace the import paths if your project structure differs.
// - Keep dates as ISO strings in your data layer (e.g. API responses) for predictable formatting.
// - For accessibility: ensure images have alt text, buttons have clear labels, and interactive elements are keyboard reachable.
// - For the resume upload flow: present an Upload control elsewhere in the UI and save resumeUrl in the experience entry. When user uploads a new resume, update the experience.resumeUrl and re-render the card.
// - Variant ideas: "timeline" mode (show dot + vertical line), "compact" mode (for lists), "highlight" mode (current role with gradient border).
