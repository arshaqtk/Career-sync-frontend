import { MoreVertical, Trash2, Eraser, UserX, UserCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/shadcn/dropdown-menu";
import { Button } from "@/components/ui/shadcn/button";
import { AlertDialogComponent } from "@/components/dialogs/alertDialog";

export function ChatActionsDropdown({
  onClear,
  onDelete,
  onBlock,
  onUnblock,
  isBlocked = false,
  disabled = false,
}: {
  onClear: () => void;
  onDelete: () => void;
  onBlock: () => void;
  onUnblock: () => void;
  isBlocked?: boolean;
  disabled?: boolean;
}) {
  return (
    <DropdownMenu>

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
        <AlertDialogComponent
          alertTitle="Clear chat history?"
          alertDescription="This will remove all messages from this chat. You can’t undo this action."
          onConfirm={onClear}
          trigger={
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Eraser className="mr-2 h-4 w-4" />
              Clear chat
            </DropdownMenuItem>
          }
        />

        <DropdownMenuSeparator />

        {isBlocked ? (
          <AlertDialogComponent
            alertTitle="Unblock user?"
            alertDescription="This will allow you to send and receive messages from this user again."
            onConfirm={onUnblock}
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <UserCheck className="mr-2 h-4 w-4" />
                Unblock user
              </DropdownMenuItem>
            }
          />
        ) : (
          <AlertDialogComponent
            alertTitle="Block user?"
            alertDescription="Blocking will stop you from sending and receiving messages in this chat."
            onConfirm={onBlock}
            trigger={
              <DropdownMenuItem 
                onSelect={(e) => e.preventDefault()}
                className="text-orange-600 focus:text-orange-600"
              >
                <UserX className="mr-2 h-4 w-4" />
                Block user
              </DropdownMenuItem>
            }
          />
        )}

        <DropdownMenuSeparator />
        <AlertDialogComponent
          alertTitle="Delete this chat?"
          alertDescription="This will permanently delete the chat and all its messages. This action cannot be undone."
          onConfirm={onDelete}
          trigger={
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
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
