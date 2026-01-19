import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/shadcn/sheet";
import { Link, useNavigate } from "react-router-dom";
import { candidateMobileSideBarNav } from "@/config/candidateNav.config";
import { Separator } from "../ui/shadcn/separator";

export function CandidateMobileSidebar() {
  const [open, setOpen] = useState(false);
  const navigate=useNavigate()
  return (
    
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden ">
        <Menu className="h-6 w-6" />
      </SheetTrigger>
       
      

      <SheetContent side="right">
         <div>
        <img src="/careerSyncNavLogo.png" alt="careerSync" className="h-12" onClick={()=>navigate("/")}/>
      </div>
        <nav className="flex flex-col gap-4 mt-6">
          {candidateMobileSideBarNav.map((item) => (
           <div>
             <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className="text-lg font-medium hover:text-primary transition p-4"
              >
                {item.label}
              </Link>
            <Separator/>
           </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
