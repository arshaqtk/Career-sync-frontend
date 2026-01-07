import { Menu, Bell, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/shadcn/sheet";
import { Link, useNavigate } from "react-router-dom";
import { candidateNav } from "@/config/candidateNav.config";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/shadcn/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";
import useLogout from "@/hooks/useLogout";
import useUserData from "@/hooks/useUserData";
import { Spinner } from "../ui/shadcn/spinner";

export  function CandidateNavbar() {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const { data: user, isLoading } = useUserData();

  if (isLoading) return <Spinner />;

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

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Search bar */}
        {/* <Input
          placeholder="Search jobs..."
          className="hidden lg:block max-w-md"
        /> */}

        {/* Notifications */}
        <button onClick={() => navigate("/notifications")}>
  <Bell className="cursor-pointer" />
</button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar>
              <AvatarImage src={user?.profilePictureUrl} />
              <AvatarFallback>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/profile")}
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}
