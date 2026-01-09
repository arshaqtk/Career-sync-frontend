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

  const {openModal,closeModal}=EducationModalStore()
  const updateEducation=useUpdateProfileEducation()
  const addEducation=useAddProfileEducation()
  const hasNoEducation = !Education || Education.length === 0;
  
  const handleEducationSubmit=(payload:Education)=>{
    if(!payload._id){
      addEducation.mutate(payload)
      closeModal()
    }else{
      updateEducation.mutate({payload,educationId:payload._id})
      closeModal()
   
    }
  }


  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">Education Details</h3>
<div className="flex justify-end my-6">
  
          <Button 
           onClick={() => openModal()}
            className="flex items-center gap-2"
          >
            <Plus size={18} />
            Add Education
          </Button>
        </div>
         <EducationFormModal onSubmit={(payload) =>handleEducationSubmit(payload)}/>
      {hasNoEducation ? (
        <div className="border rounded-md p-6 bg-muted/20 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            No Education added yet
          </p>
          {/* <Button onClick={() => alert("Open Add Education Modal")}>
            Add Education
          </Button> */}
        </div>
      ) : (
        <div className="space-y-4">
          {Education.map((edu) => (
            <EducationCard key={edu._id} education={edu} />
          ))}
        </div>
      )}
    </div>
  );
}

