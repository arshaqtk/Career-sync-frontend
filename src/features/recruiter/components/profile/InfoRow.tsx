export default function InfoRow({
  label,
  value,
}: {
  label: string
  value?: string
}) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">
        {value || "—"}
      </span>
    </div>
  )
}
