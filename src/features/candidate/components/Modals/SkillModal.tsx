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
      <DialogContent className="max-w-xl rounded-2xl p-6">
        <DialogHeader>
  <DialogTitle className="text-xl font-semibold">
    Key Skills
  </DialogTitle>
  <p className="text-sm text-gray-500">
    Add the key skills recruiters search for when reviewing profiles. 
    Press <strong>Enter</strong> after each skill to add it before saving.
  </p>
</DialogHeader>
        {/* Skill Chips */}
        <div className="border rounded-xl p-4 min-h-10 flex flex-wrap gap-2">
          {skills.map((skill) => (
             <CustomBadge
                        key={skill}
                        size="md"
                        variant="minimal"
                        className="cursor-pointer hover:shadow-sm transition"
                      >
                        <span>{skill}</span>
               <X
                size={14}
                 className="cursor-pointer text-gray-500 hover:text-black"
                 onClick={() => handleDelete(skill)}
              />
    
                      </CustomBadge>
          ))}
        </div>

        {/* Input Field */}
        <Input
          placeholder="Enter your key skills"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          className="mt-3"
        />

        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>

          <Button onClick={handleSave} variant={"default"}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
