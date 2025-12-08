import { CustomBadge } from "@/components/ui/cs-badge";
import { Pencil } from "lucide-react";
import { SkillModalStore } from "../../store/SkillModal";

interface SkillsSectionProps {
  skills: string[];

}

export function SkillsSection({skills }: SkillsSectionProps) {
  const {openModal}=SkillModalStore()
  return (
    <div className="mt-6">

     
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Key skills</h3>
        <Pencil  onClick={openModal} className="w-4 h-4 text-gray-500 cursor-pointer hover:text-black transition" />
      </div>

      
      <div className="flex gap-2 flex-wrap p-4 rounded-xl border bg-white">
        {skills.map((skill,i) => (
          <CustomBadge
            key={i}
            size="md"
            variant="minimal"
            className="cursor-pointer hover:shadow-sm transition"
          >
            {skill}
          </CustomBadge>
        ))}
      </div>
    </div>
  );
}
