import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/shadcn/dropdown-menu"
import { LogOut } from "lucide-react"
import useLogout from "@/hooks/useLogout";

export  function AdminTopNavbar() {
  const handleLogout = useLogout();
  return (
    <div className="h-full flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
 <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <Avatar>
        <AvatarFallback>AD</AvatarFallback>
      </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">

            
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
  )
}
