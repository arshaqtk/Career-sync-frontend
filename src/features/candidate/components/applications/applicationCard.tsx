import { Card } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import type { CandidateApplicationDTO } from "../../types/application.types";
import { MapPin, Building2, CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ApplicationsCardList({
  applications,
}: {
  applications: CandidateApplicationDTO[];
}) {
  const navigate=useNavigate()
  return (
    <div className="space-y-4">
      {applications.map((app) => (
        <Card
          key={app.id}
          className="p-4 hover:shadow-md transition-shadow"
        >
          {/* Wrapper */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Left: Job Info */}
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">
                {app.job.title}
              </h3>

              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  {app.job.company}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {app.job.location}
                </span>

                <span className="flex items-center gap-1">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(app.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Right: Status + Actions */}
            <div className="flex items-center justify-between lg:justify-end gap-4">
              <Badge variant="secondary">{app.status}</Badge>

              <Button size="sm" variant="outline" onClick={()=>navigate(`/applications/${app.id}`)}>
                View
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
