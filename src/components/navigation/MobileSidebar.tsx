import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/shadcn/sheet";
import { recruiterSidebar } from "@/config/recruiterSidebar.config";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    const handleSheetOpen=()=>{
      setOpen(false);
    }
    handleSheetOpen()
}, [location.pathname]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden p-2">
        <Menu className="h-6 w-6" />
      </SheetTrigger>

      <SheetContent side="left" className="p-6 w-64">
        <nav className="flex flex-col gap-4">
          {recruiterSidebar.map(item => (
            <NavLink key={item.path} to={item.path}
            onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
