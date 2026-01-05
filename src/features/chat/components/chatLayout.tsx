import ChatList from "../components/chatList"
import ChatWindow from "../components/chatWIndow"

export default function ChatLayout() {
  return (
    <div className="flex h-[90vh]">
      <div className="w-1/3 border-r">
        <ChatList />
      </div>
      <div className="w-2/3">
        <ChatWindow />
      </div>
    </div>
  )
}
