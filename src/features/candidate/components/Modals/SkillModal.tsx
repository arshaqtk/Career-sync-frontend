import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/shadcn/dialog";
import { Input } from "@/components/ui/shadcn/input";
import { Button } from "@/components/ui/shadcn/button";
import { X } from "lucide-react";
import { CustomBadge } from "@/components/ui/cs-badge";

interface SkillsEditModalProps {
  open: boolean;
  onClose: () => void;
  initialSkills: string[];
  onSave: (skills: string[]) => void;
}

export const SkillFormModal=({
  open,
  onClose,
  initialSkills,
  onSave,
}: SkillsEditModalProps)=> {
  const [skills, setSkills] = useState(initialSkills);
  const [inputValue, setInputValue] = useState("");

  // Add skill
  const handleAddSkill = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
    }
    setInputValue("");
  };

  // Delete skill
  const handleDelete = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Save changes
  const handleSave = () => {
    const trimmed = inputValue.trim();

  if (trimmed && !skills.includes(trimmed)) {
    onSave([...skills, trimmed]);
  } else {
    onSave(skills);
  }
    setInputValue("");
    onClose();
  };

 return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl rounded-2xl p-0 border-none overflow-hidden bg-white shadow-2xl">
        <DialogHeader className="px-6 pt-6 pb-4 bg-slate-50/50 border-b border-slate-100">
          <DialogTitle className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">
            Key Skills
          </DialogTitle>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Add the primary skills recruiters look for in your profile.
            Press <span className="text-blue-600 font-bold">Enter</span> after each skill.
          </p>
        </DialogHeader>

        <div className="p-6 space-y-4">
          {/* Skill Chips Container */}
          <div className="min-h-[120px] p-4 border border-slate-200 rounded-xl bg-slate-50/30 flex flex-wrap content-start gap-2 transition-all focus-within:border-blue-200 focus-within:bg-white">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <CustomBadge
                  key={skill}
                  size="md"
                  variant="minimal"
                  className="bg-white border-slate-200 text-slate-700 font-bold hover:border-blue-300 hover:bg-blue-50 transition-all gap-1.5 py-1.5 pl-3 pr-2 shadow-sm"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleDelete(skill)}
                    className="p-0.5 rounded-full hover:bg-red-50 hover:text-red-500 text-slate-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </CustomBadge>
              ))
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center py-6">
                <p className="text-slate-400 text-sm font-medium italic">No skills added yet.</p>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="space-y-2">
            <label className="text-[12px] font-bold text-slate-500 uppercase tracking-wider px-1">Add New Skill</label>
            <Input
              placeholder="e.g. React Native, Project Management..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
              className="h-11 border-slate-200 focus-visible:ring-blue-600 font-medium text-slate-700 placeholder:text-slate-400"
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100 mt-0">
          <div className="flex w-full sm:justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="border-slate-200 text-slate-600 font-bold px-6 h-10 hover:bg-white"
            >
              Cancel
            </Button>

            <Button
              onClick={handleSave}
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 h-10 shadow-sm shadow-blue-100"
            >
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
