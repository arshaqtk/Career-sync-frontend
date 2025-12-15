import { Menu } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/shadcn/sheet";
import { recruiterSidebar } from "@/config/recruiterSidebar.config";
import { NavLink } from "react-router-dom";

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden p-2">
        <Menu className="h-6 w-6" />
      </SheetTrigger>

      <SheetContent side="left" className="p-6 w-64">
        <nav className="flex flex-col gap-4">
          {recruiterSidebar.map(item => (
            <NavLink key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
