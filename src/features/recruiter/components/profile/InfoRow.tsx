export default function InfoRow({
  label,
  value,
}: {
  label: string
  value?: string | number
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm font-semibold text-slate-900 break-words">
        {value || "—"}
      </span>
    </div>
  )
}
