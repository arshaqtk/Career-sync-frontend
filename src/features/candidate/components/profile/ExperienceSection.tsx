import ExperienceCard from "@/features/candidate/components/cards/experience-card";
import { Button } from "@/components/ui/shadcn/button";
import { Plus } from "lucide-react";
import type { Experience } from "../../types/Experience.types";
import { ExperienceModalStore } from "../../store/experienceFormModal.store";
import { ExperienceFormModal } from "../Modals/experienceModal";
import {
  useAddProfileExperience,
  useUpdateProfileExperience,
} from "../../hooks/useUpdateProfile";

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({
  experience,
}: ExperienceSectionProps) {
  const { openModal, closeModal } = ExperienceModalStore();

  const addExperience = useAddProfileExperience();
  const updateExperience = useUpdateProfileExperience();

  const handleExperienceSubmit = (payload: Experience) => {
    if (!payload._id) {
      addExperience.mutate(payload);
    } else {
      updateExperience.mutate({
        payload,
        experienceId: payload._id,
      });
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-foreground uppercase tracking-tight">
          Work Experience
        </h3>
        <Button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Experience
        </Button>
      </div>

      <ExperienceFormModal
        onSubmit={handleExperienceSubmit}
      />

      {!experience?.length ? (
        <div className="border border-border border-dashed rounded-xl p-10 bg-muted/50/50 text-center flex flex-col items-center">
          <div className="p-3 bg-card rounded-full shadow-sm mb-4">
            <Plus className="h-6 w-6 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground font-bold mb-1">
            No experience added yet
          </p>
          <p className="text-muted-foreground/70 text-sm mb-4 max-w-xs">
            Showcase your professional journey to attract potential employers.
          </p>
          <Button
            variant="outline"
            onClick={() => openModal()}
            className="border-border text-muted-foreground font-bold"
          >
            Add your first job
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {experience.map((exp) => (
            <ExperienceCard
              key={exp._id}
              experience={exp}
            />
          ))}
        </div>
      )}
    </div>
  );
}
