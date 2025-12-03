import Sidebar from "@/components/Sidebar/Sidebar";
import TopNavbar from "@/components/TopNavbar/TopNavbar";

export default function CandidateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <TopNavbar />
        <main className="p-6 bg-gray-50 min-h-screen">{children}</main>
      </div>
    </div>
  );
}
