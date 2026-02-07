import { useState } from "react";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "../store/chat.store";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";

export default function MessageInput() {
  const socket = getSocket();
  const { conversationId, activeChatId } = useChatStore();
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim() || !conversationId || !activeChatId) return;

    socket.emit(
      "chat:sendMessage",
      {
        conversationId,
        receiverId: activeChatId,
        content: text.trim(),
      },
      (res: { success: boolean; message?: string }) => {
        console.log(res);
      }
    );

    setText("");
  };

   return (
    <div className="flex items-center gap-1.5 md:gap-2 bg-slate-50 p-1.5 md:p-2 rounded-xl border border-slate-200 focus-within:bg-white focus-within:shadow-sm focus-within:border-blue-400 transition-all duration-300">
      {/* <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-white rounded-full h-10 w-10 shrink-0">
        <Paperclip className="h-5 w-5" />
      </Button> */}

      <input
        className="flex-1 bg-transparent border-none focus:outline-none py-2 md:py-2.5 text-[15px] text-slate-800 placeholder:text-slate-400 max-h-32"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }}
      />

      {/* <Button variant="ghost" size="icon" className="text-slate-400 hover:text-blue-600 hover:bg-white rounded-full h-10 w-10 shrink-0">
        <Smile className="h-5 w-5" />
      </Button> */}

      <Button
        onClick={send}
        className="rounded-lg h-10 w-10 p-0 bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-all duration-200 shrink-0"
        disabled={!text.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>

  );
}
