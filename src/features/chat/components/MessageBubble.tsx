import { cn } from "@/lib/utils";

export default function MessageBubble({
  text,
  mine,
}: {
  text: string;
  mine: boolean;
}) {
  return (
    <div className={cn(
      "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
      mine ? "justify-end" : "justify-start"
    )}>
      <div
        className={cn(
          "max-w-[75%] px-4 py-2.5 relative group transition-all",
          mine
            ? "bg-blue-600 text-white rounded-[18px] rounded-tr-[4px] shadow-sm"
            : "bg-slate-100 text-slate-800 rounded-[18px] rounded-tl-[4px]"
        )}
      >
        <p className="text-[14px] leading-relaxed whitespace-pre-wrap break-words">
          {text}
        </p>

        <span className={cn(
          "absolute text-[10px] bottom-1 opacity-0 group-hover:opacity-70 transition-opacity",
          mine ? "right-2 text-blue-100" : "left-2 text-slate-400"
        )}>
        </span>
      </div>

    </div>
  );
}