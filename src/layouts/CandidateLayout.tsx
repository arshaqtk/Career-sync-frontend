import { Outlet, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {CandidateNavbar} from "../components/navigation/CandidateNavbar";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";
import useUserData from "@/hooks/useUserData";
import { ProfileInitModal } from "@/features/candidate/components/Modals/profileInitModal";
import { useState } from "react";

export default function CandidateLayout() {
  useNotificationSocket();
  const location = useLocation();
  const { data: user } = useUserData();

  const [isSkipped, setIsSkipped] = useState(
    sessionStorage.getItem("skipProfileInit") === "true"
  );

  const handleSkip = () => {
    sessionStorage.setItem("skipProfileInit", "true");
    setIsSkipped(true);
  };

  const showInitModal = Boolean(
    user?.role === "candidate" &&
    user?.candidateData?.isProfileInitialized === false &&
    !isSkipped
  );

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <ProfileInitModal open={showInitModal} onSkip={handleSkip} />
      <div className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border">
        <CandidateNavbar />
      </div>
      <main className={cn(
        "w-full mx-auto transition-all duration-300",
        location.pathname.includes("/chat") 
          ? "max-w-full px-0 pt-20 h-[calc(100dvh-0px)] overflow-hidden" 
          : "max-w-7xl px-6 pt-20 pb-6"
      )}>
        <Outlet />
      </main>
    </div>
  );
}
