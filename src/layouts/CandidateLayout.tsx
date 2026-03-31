import { Outlet } from "react-router-dom";
import {CandidateNavbar} from "../components/navigation/CandidateNavbar";
import { useNotificationSocket } from "@/hooks/useNotificationSocket";
import useUserData from "@/hooks/useUserData";
import { ProfileInitModal } from "@/features/candidate/components/Modals/profileInitModal";
import { useState } from "react";

export default function CandidateLayout() {
  useNotificationSocket();
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
      <main className="pt-20 px-6 pb-6 max-w-7xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
