import { useState } from "react";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "../store/chat.store";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

export default function MessageInput({ disabled }: { disabled?: boolean }) {
  const socket = getSocket();
  const { conversationId, activeChatId } = useChatStore();
  const [text, setText] = useState("");

  const send = () => {
    if (disabled || !text.trim() || !conversationId || !activeChatId) return;

    socket.emit(
      "chat:sendMessage",
      {
        conversationId,
        receiverId: activeChatId,
        content: text.trim(),
      },
      () => {
      }
    );

    setText("");
  };

  return (
    <div className={`flex items-center gap-2 bg-muted/60 p-2 sm:p-2.5 rounded-2xl border border-border/80 transition-all duration-300 ${!disabled ? "focus-within:bg-background focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary/10 focus-within:border-primary" : "opacity-60 grayscale-[0.5]"}`}>
     <textarea
  disabled={disabled}
  className="flex-1 bg-transparent border-none focus:outline-none py-2 md:py-3 px-1 text-[15px] text-foreground placeholder:text-muted-foreground/50 max-h-32 overflow-hidden"
  value={text}
  onChange={(e) => setText(e.target.value)}
  placeholder={disabled ? "Messages restricted in this chat" : "Type a message..."}
  onKeyDown={(e) => {
    if (!disabled && e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }}
/>

      <Button
        onClick={send}
        className="rounded-[14px] h-10 w-10 sm:h-12 sm:w-12 p-0 bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 shrink-0"
        disabled={disabled || !text.trim()}
      >
        <Send className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
}
