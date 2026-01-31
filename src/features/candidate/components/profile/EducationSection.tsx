import EducationCard from "@/features/candidate/components/cards/education-card";
import { Button } from "@/components/ui/shadcn/button";
import { Plus } from "lucide-react";
import type { Education } from "../../types/Education.types";
import { EducationModalStore } from "../../store/educationModal.store";
import { EducationFormModal } from "../Modals/educationFormModal";
import { useAddProfileEducation, useUpdateProfileEducation } from "../../hooks/useUpdateProfile";

interface EducationSectionProps {
  Education: Education[];
}

export function EducationSection({ Education }: EducationSectionProps) {

  const { openModal, closeModal } = EducationModalStore()
  const updateEducation = useUpdateProfileEducation()
  const addEducation = useAddProfileEducation()
  const hasNoEducation = !Education || Education.length === 0;

  const handleEducationSubmit = (payload: Education) => {
    if (!payload._id) {
      addEducation.mutate(payload)
      closeModal()
    } else {
      updateEducation.mutate({ payload, educationId: payload._id })
      closeModal()

    }
  }


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">Education Details</h3>
        <Button
          onClick={() => openModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Education
        </Button>
      </div>
      <EducationFormModal onSubmit={(payload) => handleEducationSubmit(payload)} />
      {hasNoEducation ? (
        <div className="border border-slate-200 border-dashed rounded-xl p-10 bg-slate-50/50 text-center flex flex-col items-center">
          <div className="p-3 bg-white rounded-full shadow-sm mb-4">
            <Plus className="h-6 w-6 text-slate-300" />
          </div>
          <p className="text-slate-500 font-bold mb-1">
            No education added yet
          </p>
          <p className="text-slate-400 text-sm mb-4 max-w-xs">
            Add your academic background to complete your profile.
          </p>
          <Button
            variant="outline"
            onClick={() => openModal()}
            className="border-slate-200 text-slate-600 font-bold"
          >
            Add your education
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {Education.map((edu) => (
            <EducationCard key={edu._id} education={edu} />
          ))}
        </div>
      )}
    </div>
  );
}

