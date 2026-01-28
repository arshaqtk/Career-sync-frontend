import { useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/shadcn/sheet";
import { Link } from "react-router-dom";
import { candidateMobileSideBarNav } from "@/config/candidateNav.config";
import { Separator } from "../ui/shadcn/separator";
import useLogout from "@/hooks/useLogout";

export function CandidateMobileSidebar() {
  const [open, setOpen] = useState(false);
  const handleLogout = useLogout();
  // const navigate=useNavigate()
  return (
    
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden ">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
       
      

     <SheetContent side="right" className="flex flex-col h-full">
  {/* Logo */}
  {/* <div>
    <img
      src="/careerSyncNavLogo.png"
      alt="careerSync"
      className="h-12 cursor-pointer"
      onClick={() => navigate("/")}
    />
  </div> */}

  {/* Navigation */}
  <nav className="flex flex-col gap-4 mt-6">
    {candidateMobileSideBarNav.map((item) => (
      <div key={item.path}>
        <Link
          to={item.path}
          onClick={() => setOpen(false)}
          className="text-lg font-medium hover:text-primary transition p-4"
        >
          {item.label}
        </Link>
        <Separator />
      </div>
    ))}
  </nav>

  {/* Logout */}
  <div className="mt-auto pt-6">
    <button
      onClick={handleLogout}
      className="text-red-600 flex items-center p-4 hover:bg-red-50 rounded-md w-full"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </button>
  </div>
</SheetContent>

    </Sheet>
  );
}
