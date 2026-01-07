export default function MessageBubble({
  text,
  mine,
}: {
  text: string;
  mine: boolean;
}) {
  return (
    <div className={`flex w-full ${mine ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className={`
          max-w-[75%] px-4 py-3 rounded-2xl shadow-sm
          transition-all duration-200 ease-out
          ${mine 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-gray-100 text-gray-900 rounded-bl-md'
          }
        `}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
          {text}
        </p>
      </div>
    </div>
  );
}