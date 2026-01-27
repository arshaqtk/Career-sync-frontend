import { Card } from "@/components/ui/shadcn/card";
import { Button } from "@/components/ui/shadcn/button";
import type { CandidateApplicationDTO } from "../../types/application.types";
import { MapPin, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import ApplicationStatusBadge from "./applicationStatusBadge";

export default function ApplicationsCardList({
  applications,
}: {
  applications: CandidateApplicationDTO[];
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-3">
      {applications.map((app) => (
        <Card
          key={app.id}
          onClick={() => navigate(`/applications/${app.id}`)}
          className="relative overflow-hidden cursor-pointer transition-all duration-200 border border-slate-200 bg-white hover:border-slate-300 hover:shadow-md group"
        >
          {/* Status Indicator */}
          <div className={cn(
            "absolute left-0 top-0 bottom-0 w-1 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
          )} />

          <div className="p-4">
            <div className="flex justify-between items-start gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-[17px] font-bold text-blue-600 leading-tight group-hover:underline transition-colors">
                  {app.job.title}
                </h3>
                <p className="text-[14px] font-bold text-slate-700 mt-1">
                  {app.job.company}
                </p>
              </div>
              <ApplicationStatusBadge status={app.status || "Pending"} />
            </div>

            <div className="flex flex-wrap gap-4 text-[13px] text-slate-500 font-medium pb-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-slate-400" />
                {app.job.location || "Remote"}
              </span>

              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-slate-400" />
                Applied {new Date(app.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}
              </span>
            </div>


            <div className="mt-4 pt-3 border-t border-slate-50 flex justify-end">
              <Button
                size="sm"
                variant="ghost"
                className="text-blue-600 font-bold hover:bg-blue-50 text-[12px] h-8"
              >
                View Details
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

