import { Outlet } from "react-router-dom";
import CandidateNavbar from "@/components/Navigation/CandidateNavbar";

export default function CandidateLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
        <CandidateNavbar />
      </div>
{/* pt-24 px-6 max-w-7xl mx-auto */}
      <main className="pt-20 px-6 pb-6">
        <Outlet />
      </main>
    </div>
  );
}
