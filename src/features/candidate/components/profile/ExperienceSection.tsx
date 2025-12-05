import ExperienceCard from "@/features/candidate/components/cards/experience-card";
import { Button } from "@/components/ui/shadcn/button";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export interface ExperienceItem {
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
  resumeUrl?: string;
}

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  const hasNoExperience = !experience || experience.length === 0;
  const navigate=useNavigate()
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
<div className="flex justify-end mt-6">
          <Button 
            onClick={() => navigate("/recruiter/jobs/add")}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Experience
          </Button>
        </div>
      {hasNoExperience ? (
        <div className="border rounded-md p-6 bg-muted/20 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            No experience added yet
          </p>
          <Button onClick={() => alert("Open Add Experience Modal")}>
            Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      )}
    </div>
  );
}

