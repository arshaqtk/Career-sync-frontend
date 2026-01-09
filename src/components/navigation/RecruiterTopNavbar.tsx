import { Bell, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/shadcn/input";
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

export  function RecruiterTopNavbar() {
  const navigate = useNavigate();
   const handleLogout = useLogout();
  const {data:user,isLoading}=useUserData()

  
 if (isLoading) return  <Spinner /> ;
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white">

      {/* Search bar */}
      <Input
        placeholder="Search candidates, jobs, interviews..."
        className="max-w-lg"
      />

      {/* Right side */}
      <div className="flex items-center gap-6">

        {/* Notification icon */}
        <button onClick={() => navigate("notifications")} className="relative">
 <Bell className="cursor-pointer" />

  {user.notificationCount > 0 && (
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
