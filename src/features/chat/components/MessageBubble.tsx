export default function MessageBubble({
  text,
  mine,
}: {
  text: string
  mine: boolean
}) {

  return (
    <div className={`mb-2 flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`px-4 py-2 rounded-lg max-w-xs ${
          mine ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        {text}
      </div>
    </div>
  )
}
