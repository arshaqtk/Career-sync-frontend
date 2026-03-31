import { Bell, LogOut, MessageSquareText, User } from "lucide-react";
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
import useLogout from "@/features/auth/hooks/useLogout";
import useUserData from "@/hooks/useUserData";
import { CandidateMobileSidebar } from "./CandidateMobileSidebar";
import { useNotificationStore } from "@/store/notification.store";
import { useEffect } from "react";
import { NavbarSkeleton } from "../Loaders/NavSkelton";
import { Button } from "../ui/shadcn/button";
import { AlertDialogComponent } from "../dialogs/alertDialog";
import { ThemeToggle } from "@/components/ThemeToggle";
import CareerSyncLogo from "@/shared/logo/careerSync.logo";

export function CandidateNavbar() {

  const { data: user, isLoading } = useUserData();

  const navigate = useNavigate();
  const handleLogout = useLogout();
  const notificationCount = useNotificationStore(
    (state) => state.notificationCount
  );
  const setNotificationCount = useNotificationStore(
    (state) => state.setNotificationCount
  );

  useEffect(() => {
    if (user?.notificationCount !== undefined) {
      setNotificationCount(user.notificationCount);
    }
  }, [user?.notificationCount, setNotificationCount]);

  if (isLoading) return <NavbarSkeleton />;


  return (
    <header className="w-full mx-auto flex items-center justify-between px-6 py-4 bg-card dark:bg-slate-950 text-foreground dark:text-slate-50 border-b border-border dark:border-slate-800 h-16 transition-colors duration-300">

      <div>
       <CareerSyncLogo/>

        {/* <img src="/careerSyncNavName.png" alt="careerSync" className="h-6 mt-1" onClick={() => navigate("/")} /> */}
      </div>

      {/* DesktopLogo */}
      {/* <div className="hidden lg:flex">
        <img src="/careerSyncNavLogo.png" alt="careerSync" className="h-12" onClick={() => navigate("/")} />
      </div> */}
      {/* <div className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Briefcase className="h-6 w-6" />
                    <span>CareerSync</span>
                </div> */}

      {/* Desktop Navigation */}
      {
        user ? (<nav className="hidden lg:flex gap-8 text-sm font-medium">
          {candidateNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-blue-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>) : ("")
      }


      {/* Right Side */}
      {user ? (
        <div className="flex items-center gap-6">
          <ThemeToggle />

          <button onClick={() => navigate("/chat")} className="hover:text-blue-600 transition-colors">
            <MessageSquareText />
          </button>
          {/* Notifications */}
          <button onClick={() => navigate("/notifications")} className="relative hover:text-blue-600 transition-colors">
            <Bell />

            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
          {/* Mobile Sidebar */}
          <CandidateMobileSidebar />

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer hidden lg:flex">
              <Avatar>
                <AvatarImage src={user?.profilePicture.url} />
                <AvatarFallback>
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <AlertDialogComponent
                alertTitle="Logout confirmation"
                alertDescription="Are you sure you want to logout?"
                onConfirm={handleLogout}
                trigger={
                  <DropdownMenuItem
                    onSelect={(e) => e.preventDefault()}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                }
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" className="hidden sm:inline-flex"
            onClick={() => navigate("/auth/login")}>Login</Button>
          <Button
            onClick={() => navigate("/auth/register")}>Get Started</Button>
        </div>)}


    </header>
  );
}
