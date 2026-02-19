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
import { Badge } from "../ui/shadcn/badge";

interface RecruiterTopNavbarProps {
  onMenuClick?: () => void;
}

export function RecruiterTopNavbar({ onMenuClick }: RecruiterTopNavbarProps) {
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const { data: user, isLoading } = useUserData()


  if (isLoading) return <div className="h-20 flex items-center justify-center bg-white border-b border-slate-100">
    <Spinner />
  </div>
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
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("notifications")}
            className="text-slate-500 hover:bg-slate-50 relative"
          >
            <Bell className="h-5 w-5" />
            {user?.notificationCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            )}
          </Button>
        </div>

        <div className="h-6 w-[1px] bg-slate-100 mx-2 hidden sm:block" />

        {/* User Profile Section */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="pl-1 pr-2 py-1 h-auto flex items-center gap-3 rounded-full hover:bg-slate-50 transition-all group">
              <div className="relative">
                <Avatar className="h-9 w-9 border-2 border-white shadow-sm ring-1 ring-slate-100 transition-all group-hover:ring-blue-100">
                  <AvatarImage src={user?.profilePicture?.url} alt={user?.name} className="object-cover" />
                  <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-xs uppercase">
                    {user?.name?.substring(0, 2) || "RC"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>

              <div className="hidden lg:flex flex-col items-start leading-none text-left gap-1">
                <span className="text-sm font-bold text-slate-900 line-clamp-1">{user?.name}</span>
                <Badge variant="outline" className="text-[9px] px-1.5 py-0 border-none bg-slate-100 text-slate-500 font-bold tracking-wider leading-none uppercase">
                  Recruiter
                </Badge>
              </div>
            </Button>
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
