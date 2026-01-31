import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Pencil, X, Check } from "lucide-react";
import {Button} from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useState } from "react";
import { useUpdateProfileAbout } from "../../hooks/useUpdateProfile";

interface AboutSectionProps {
  about: string | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(about || "");
  const { mutate } = useUpdateProfileAbout();

  const startEdit = () => {
    setValue(about || "");
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setValue(about || "");
  };

  const save = () => {
    mutate({ about: value });
    setIsEditing(false);
  };

  return (
    <Card className="border border-slate-200 shadow-none bg-white overflow-hidden">
      <CardHeader className="flex flex-row justify-between items-center px-6 py-4 border-b border-slate-50 bg-slate-50/50">
        <CardTitle className="text-lg font-extrabold text-slate-900 uppercase tracking-tight">About</CardTitle>

        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold flex items-center gap-1.5 transition-colors"
            onClick={startEdit}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent className="px-6 py-6">
        {isEditing ? (
          <div className="flex flex-col gap-4 w-full">
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={5}
              placeholder="Tell us about yourself, your career goals, and what makes you unique..."
              className="resize-none border-slate-200 focus-visible:ring-blue-500 font-medium text-slate-700"
            />

            <div className="flex gap-2 justify-end">
              <Button onClick={save} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 h-9 flex items-center gap-2">
                <Check className="h-4 w-4" />
                Save Changes
              </Button>

              <Button onClick={cancelEdit} variant="outline" className="border-slate-200 text-slate-600 font-bold px-4 h-9 flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            {about && about.trim() !== "" ? (
              <p className="text-[15px] font-medium text-slate-600 leading-relaxed whitespace-pre-wrap">
                {about}
              </p>
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center py-6 text-center">
                <div className="p-3 bg-slate-50 rounded-full">
                  <Pencil className="h-6 w-6 text-slate-300" />
                </div>
                <div>
                  <p className="text-slate-500 font-bold mb-1">No about section yet</p>
                  <p className="text-slate-400 text-sm mb-4">Add a brief description to help recruiters get to know you.</p>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-9"
                    onClick={startEdit}
                  >
                    Add Description
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
