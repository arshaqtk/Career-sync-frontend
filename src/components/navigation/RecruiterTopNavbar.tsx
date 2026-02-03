import { Bell, LogOut, Menu, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem
} from "@/components/ui/shadcn/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/shadcn/avatar";
import useUserData from "@/hooks/useUserData";
import useLogout from "@/hooks/useLogout";
import { Spinner } from "../ui/shadcn/spinner";
import { Button } from "@/components/ui/shadcn/button";

interface RecruiterTopNavbarProps {
  onMenuClick?: () => void;
}

export function RecruiterTopNavbar({ onMenuClick }: RecruiterTopNavbarProps) {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const { data: user, isLoading } = useUserData()


  if (isLoading) return <Spinner />;
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b h-20">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Search bar - hidden on very small screens, or scaled */}
        {/* <div className="hidden sm:block">
          <Input
            placeholder="Search candidates, jobs, interviews..."
            className="w-[300px] lg:w-[450px] bg-gray-50 border-none transition-all focus:bg-white focus:ring-1"
          />
        </div> */}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Notification icon */}
        <button onClick={() => navigate("notifications")} className="relative">
          <Bell className="cursor-pointer" />

          {user?.notificationCount > 0 && (
            <span className="
      absolute 
      -top-1 
      -right-1 
      bg-red-500 
      text-white 
      text-[10px] 
      font-semibold 
      w-5 
      h-5 
      flex 
      items-center 
      justify-center 
      rounded-full
    ">
              {user.notificationCount}
            </span>
          )}
        </button>

        {/* Profile dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.profilePictureUrl} alt="Profile" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>

            <span className="hidden lg:block font-medium">{user?.name}</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/recruiter/profile")}>
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
