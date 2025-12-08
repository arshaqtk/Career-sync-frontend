import { Bell, LogOut, User } from "lucide-react";
import { Input } from "@/components/ui/shadcn/input";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/shadcn/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import useUserData from "@/hooks/useUserData";
import { useLogout } from "@/queries/auth/useLogout";

export default function TopNavbar() {
  const navigate = useNavigate();
 const { data: user, isLoading } = useUserData();
  const { mutate: logout } = useLogout();

  if (isLoading) return <div>Loading...</div>;

  const handleLogout = () => {
    logout(); 
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <Input
        placeholder="Search jobs, candidates, interviews..."
        className="max-w-xl"
      />

      <div className="flex items-center gap-6">
        <Bell className="cursor-pointer" />

        {/* Avatar Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 outline-none cursor-pointer">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.profilePictureUrl} />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>

              <div className="text-left">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.role}</p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/profile")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
