import { Menu, Bell } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/shadcn/sheet";
import { Link } from "react-router-dom";
import { candidateNav } from "@/config/candidateNav.config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";
import { Input } from "@/components/ui/shadcn/input";

export default function CandidateNavbar() {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white border-b">

      {/* Mobile Navigation Drawer */}
      <Sheet>
        <SheetTrigger className="lg:hidden">
          <Menu className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="p-6">
          <nav className="flex flex-col gap-4 mt-6">
            {candidateNav.map(item => (
              <Link key={item.path} to={item.path} className="text-lg">
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex gap-8 text-sm font-medium">
        {candidateNav.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="hover:text-blue-600 transition"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Search + Notification + Profile */}
      <div className="flex items-center gap-6">
        {/* Search bar (desktop only) */}
        <Input
          placeholder="Search jobs..."
          className="hidden lg:block max-w-md"
        />

        <Bell className="cursor-pointer" />

        <Avatar>
          <AvatarImage src="" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      </div>

    </header>
  );
}
