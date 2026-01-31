import { Card } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import { Badge } from "@/components/ui/shadcn/badge";
import { Briefcase, MapPin, Calendar, Pencil } from "lucide-react";
import type { Experience } from "../../types/Experience.types";
import { formatRange } from "../../helpers/formatRange";
import { ExperienceModalStore } from "../../store/experienceFormModal.store";
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
    <Card className={`overflow-hidden border border-slate-200 shadow-none hover:border-blue-200 transition-all bg-white group ${className}`}>
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <Briefcase size={24} />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {role}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-base font-bold text-blue-600">
                  {company}
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100 border-none px-2 py-0 text-[11px] font-bold capitalize">
                  {jobType}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
                  <Calendar size={14} className="text-slate-400" />
                  <span>{formatRange(startDate, endDate)}</span>
                </div>
                {location && (
                  <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
                    <MapPin size={14} className="text-slate-400" />
                    <span>{location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sm:opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => openModal(experience)}
              className="h-9 w-9 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-100"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {description && (
          <div className="mt-5 text-[15px] font-medium text-slate-600 leading-relaxed max-w-2xl whitespace-pre-wrap">
            {description}
          </div>
        )}

        {skills.length > 0 && (
          <div className="mt-6">
            <h4 className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-3">Relevant Skills</h4>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <Badge key={i} variant="outline" className="text-[12px] font-semibold py-1 px-3 bg-slate-50 border-slate-200 text-slate-600 rounded-lg">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

