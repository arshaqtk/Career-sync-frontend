import { Button } from "@/components/ui/shadcn/button";
import { Card, CardContent } from "@/components/ui/shadcn/card";
import { Textarea } from "@/components/ui/shadcn/textarea";
import {  useState } from "react";

export function InterviewNotes({
  notes,
}: {
  interviewId: string;
  notes?: string;
}) {
    const [note,setNote]=useState(notes||"")
 
    const isChanged=note.trim()!==notes?.trim()||""
    const handleSave=()=>{
        if(!isChanged) return 
        
    }
  return (
   <Card>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-medium">Notes</h3>

        <Textarea
          value={note}
          placeholder="Add notes..."
          onChange={(e) => setNote(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            size="sm"
            disabled={!isChanged}
            onClick={handleSave}
          >
            {notes ? "Update Note" : "Add Note"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
