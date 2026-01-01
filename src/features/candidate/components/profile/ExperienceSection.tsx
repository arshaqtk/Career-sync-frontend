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
    console.log(payload)
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
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">
        Work Experience
      </h3>

      <div className="flex justify-end my-6">
        <Button
          onClick={() => openModal()}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Add Experience
        </Button>
      </div>

      <ExperienceFormModal
        onSubmit={handleExperienceSubmit}
      />

      {!experience?.length ? (
        <div className="border rounded-md p-6 bg-muted/20 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            No experience added yet
          </p>
          <Button onClick={() => openModal()}>
            Add Experience
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
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
