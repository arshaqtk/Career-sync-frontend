import { Button } from "@/components/ui/shadcn/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/shadcn/card";
import { Calendar, MapPin, GraduationCap, Pencil } from "lucide-react";
import { EducationModalStore } from "../../store/educationModal.store";
import type { Education } from "../../types/Education.types";



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
    <Card className="w-full border bg-white shadow-sm hover:shadow-md transition rounded-xl p-4">
      <CardHeader className="p-0 mb-3">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          {school}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{standard}</p>
      </CardHeader>

      <CardContent className="p-0 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
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
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        )}

        {gradeOrPercentage && (
          <p className="text-sm font-medium text-primary">
            Grade: {gradeOrPercentage}
          </p>
        )}

        {description && (
          <p className="text-sm leading-relaxed text-gray-700">{description}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
         <Button onClick={() =>openModal(education)} className="sm flex gap-2">
        <Pencil className="w-4 h-4" />
      </Button>
      </CardFooter>
    </Card>
  );
}
