export function DashboardHeader({ title, subtitle }:{ title:string, subtitle:string }) {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-gray-500">{subtitle}</p>
    </div>
  );
}
