import { Button } from "@/components/ui/shadcn/button";
import { Calendar, MapPin, GraduationCap, Pencil } from "lucide-react";
import { EducationModalStore } from "../../store/educationModal.store";
import type { Education } from "../../types/Education.types";
import { Card } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";



export default function EducationCard({education}:{education:Education}){
  const {school,
  standard,
  startDate,
  endDate,
  isCurrent,
  location,
  description,
  gradeOrPercentage,
}=education

  const { openModal } = EducationModalStore();

  return (
    <Card className="overflow-hidden border border-slate-200 shadow-none hover:border-blue-200 transition-all bg-white group">
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                <GraduationCap size={24} />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {school}
              </h3>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-base font-bold text-blue-600">
                  {standard}
                </span>
                {gradeOrPercentage && (
                  <>
                    <span className="text-slate-300 hidden sm:inline">•</span>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 border-none px-2 py-0 text-[11px] font-bold">
                      Grade: {gradeOrPercentage}
                    </Badge>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
                  <Calendar size={14} className="text-slate-400" />
                  <span>
                    {new Date(startDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {isCurrent
                      ? "Present"
                      : endDate
                        ? new Date(endDate).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })
                        : "N/A"}
                  </span>
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
              onClick={() => openModal(education)}
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
      </div>
    </Card>
  );
}
