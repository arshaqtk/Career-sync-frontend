import ExperienceCard from "@/features/candidate/components/cards/experience-card";
import { Button } from "@/components/ui/shadcn/button";
import { Plus } from "lucide-react";
import type { Experience } from "../../types/Experience.types";
import { ExperienceModalStore } from "../../store/experienceFormmodal.store";
import { ExperienceFormModal } from "../Modals/ExperienceFormModal";



interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {

  const {openModal}=ExperienceModalStore()
  const hasNoExperience = !experience || experience.length === 0;
  

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Work Experience</h3>
<div className="flex justify-end mt-6">
  
          <Button 
           onClick={() => openModal()}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Experience
          </Button>
        </div>
         <ExperienceFormModal onSubmit={(payload) =>}/>
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
            <ExperienceCard key={exp._id} experience={exp} />
          ))}
        </div>
      )}
    </div>
  );
}

