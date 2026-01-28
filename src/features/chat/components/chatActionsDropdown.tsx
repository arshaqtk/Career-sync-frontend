import { MoreVertical, Trash2, Eraser } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/shadcn/dropdown-menu";
import { Button } from "@/components/ui/shadcn/button";
import { AlertDialogComponent } from "@/components/Dialogs/alertDialog";

export function ChatActionsDropdown({
  onClear,
  onDelete,
  disabled = false,
}: {
  onClear: () => void;
  onDelete: () => void;
  disabled?: boolean;
}) {
  return (
    <DropdownMenu onOpenChange={(o) => console.log("open:", o)}>
  
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          disabled={disabled}
          className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <AlertDialogComponent alertTitle="Clear Message" alertDescription="Are You Sure ?" onConfirm={onClear}
        trigger={
 <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Eraser className="mr-2 h-4 w-4" />
          Clear chat
        </DropdownMenuItem>
        }
        />
       

        <DropdownMenuSeparator />
<AlertDialogComponent alertTitle="Delete Message" alertDescription="Are You Sure ?" onConfirm={onDelete}
        trigger={
 <DropdownMenuItem onSelect={(e) => e.preventDefault()}

          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete chat
        </DropdownMenuItem>
        }
        />
       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
