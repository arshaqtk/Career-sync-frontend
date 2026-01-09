import { useState } from "react";
import { getSocket } from "@/lib/socket";
import { useChatStore } from "../store/chat.store";

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
    <div className="p-4 border-t flex gap-2">
      <input
        className="flex-1 border px-3 py-2 rounded"
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

      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={send}
      >
        Send
      </button>
    </div>
  );
}
