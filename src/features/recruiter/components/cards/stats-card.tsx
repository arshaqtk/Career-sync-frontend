export function StatsCard({ label, value, note }:{ label:string, value:string, note:string }) {
  return (
    <div className="p-5 bg-white rounded-xl border shadow-sm flex flex-col gap-2">
      <div className="text-gray-600">{label}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-green-600">{note}</div>
    </div>
  );
}
