import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Pencil, X, Check } from "lucide-react";
import {Button} from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useState } from "react";
import { useUpdateProfileAbout } from "../../queries/useUpdateProfile";

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
    <Card className="p-5 rounded-xl shadow-sm border border-border bg-background">
      <CardHeader className="flex flex-row justify-between items-center p-0 mb-3">
        <CardTitle className="text-xl font-semibold">About</CardTitle>

        {!isEditing && (
          <Button className="text-muted-foreground hover:text-primary" onClick={startEdit}>
            <Pencil className="h-5 w-5" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground leading-relaxed p-0">
        {/* INLINE EDITING UI */}
        {isEditing ? (
          <div className="flex flex-col gap-3 w-full">
            <Textarea
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={5}
              placeholder="Write something about yourself..."
              className="resize-none"
            />

            <div className="flex gap-2">
              <Button onClick={save} className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                Save
              </Button>

              <Button onClick={cancelEdit} variant="outline" className="flex items-center gap-2">
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          // DISPLAY MODE
          <>
            {about && about.trim() !== "" ? (
              <p className="text-foreground">{about}</p>
            ) : (
              <div className="flex flex-col gap-2 items-start">
                <p className="italic text-muted-foreground">
                  You haven’t added an About section yet.
                </p>
                <Button className="mt-1" onClick={startEdit}>
                  Add About Info
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
