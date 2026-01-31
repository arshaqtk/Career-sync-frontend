import { CustomBadge } from "@/components/ui/cs-badge";
import { Pencil } from "lucide-react";
import { SkillModalStore } from "../../store/SkillModal";
import { Button } from "@/components/ui/shadcn/button";

interface SkillsSectionProps {
  skills: string[];

}

export function SkillsSection({skills }: SkillsSectionProps) {
  const {openModal}=SkillModalStore()
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">Key skills</h3>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold flex items-center gap-1.5 transition-colors"
          onClick={openModal}
        >
          <Pencil className="h-3.5 w-3.5" />
          Edit Skills
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap p-6 rounded-xl border border-slate-200 bg-white min-h-[100px]">
        {skills.length > 0 ? (
          skills.map((skill, i) => (
            <CustomBadge
              key={i}
              size="md"
              variant="minimal"
              className="bg-slate-50 border-slate-200 text-slate-700 font-bold hover:border-blue-200 hover:bg-blue-50 transition-all cursor-default"
            >
              {skill}
            </CustomBadge>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-slate-400 text-sm font-medium italic">No skills added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
