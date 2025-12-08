import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { Briefcase, MapPin, Calendar, Pencil } from "lucide-react";
import type { Experience } from "../../types/Experience.types";
import { formatRange } from "../../helpers/formatRange";
import { ExperienceModalStore } from "../../store/experienceFormmodal.store";
export interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}
export default function ExperienceCard({ experience,className = "" }: ExperienceCardProps) {
  const {
    company,
    role,
    startDate,
    endDate,
    location,
    description,
    skills = [], 
    jobType
  } = experience;
  const { openModal } = ExperienceModalStore();

  return (
    <Card className={`p-4 sm:p-6 shadow-md ${className}`}>
      <CardHeader className="flex items-start gap-4 p-0">
        <div className="shrink-0">
            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Briefcase size={18} />
            </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle className="text-sm sm:text-base leading-tight">{role}</CardTitle>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground">{company} • {jobType}</CardDescription>
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
        {description && <p className={`text-sm mb-3`}>{description}</p>}

        {/* {responsibilities.length > 0 && (
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
        )} */}

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
        {/* {!compact && responsibilities.length > 6 && (
          <ScrollArea className="h-28 mt-2 p-2 border rounded-md">
            <ul className="list-disc list-inside text-sm space-y-1">
              {responsibilities.map((r, idx) => (
                <li key={idx}>{r}</li>
              ))}
            </ul>
          </ScrollArea>
        )} */}
      </CardContent>

      <CardFooter className="p-0 mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => window.open(`/company/${company}`, "_blank")}>View company</Button>
        </div>

        <Button onClick={() =>openModal(experience)} className="sm flex gap-2">
        <Pencil className="w-4 h-4" />
      </Button>
      </CardFooter>
    </Card>
  );
}

