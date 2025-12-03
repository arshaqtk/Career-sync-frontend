import { Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function TopNavbar() {
    const navigate=useNavigate()
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <Input placeholder="Search jobs, candidates, interviews..." className="max-w-xl" />

      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-3" onClick={()=>navigate("/candidate-profile")}>
          <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center">
            JD
          </div>
          <div>
            <p className="font-medium">John Doe</p>
            <p className="text-sm text-gray-500">Candidate</p>
          </div>
        </div>
      </div>
    </header>
  );
}
