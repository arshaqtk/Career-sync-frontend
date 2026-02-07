import { Container } from "@/components/ui/container";
import { ProfileHeader } from "../components/profile/ProfileHeader";
// import { ProfileStatsRow } from "../components/profile/ProfileStatsRow";
// import { ProfileStatCard } from "../components/profile/ProfileStatCard";
import { ProfileTabs } from "../components/profile/ProfileTabs";
// import { FileText, Video, Award, Clock } from "lucide-react";
import useUserData from "@/hooks/useUserData";
import useFetchCandidateProfileStats from "../hooks/useProfileStats";
import { SectionSkeleton } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";

export default function CandidateProfilePage() {
  const { data: user, isLoading, error } = useUserData();
  const {
    // data:stats,
     isLoading:statsLoading, error:statsError }=useFetchCandidateProfileStats()
  if (isLoading||statsLoading) return  <SectionSkeleton />
     
  if (error||statsError) return handleRQError(error),<p>Failed to load user</p>;
  if (!user) return <p>No user found</p>;

  const { name, email, phone, profilePicture,field } = user;

  return (
    
      <Container className="py-8 max-w-5xl">
        <ProfileHeader
          user={{
            name,
            email,
            phone,
            field,
            profilePicture,
          }}
        />
 {/* <div className="mt-8">
          <ProfileStatsRow>
            <ProfileStatCard
              icon={<FileText size={20} className="text-blue-600" />}
              value={stats.totalApplications}
              label="Applications"
            />
            <ProfileStatCard
              icon={<Video size={20} className="text-blue-600" />}
              value={stats.totalInterviews}
              label="Interviews"
            />
            <ProfileStatCard
              icon={<Award size={20} className="text-blue-600" />}
              value={stats.offersReceived}
              label="Offers"
            />
            <ProfileStatCard
              icon={<Clock size={20} className="text-blue-600" />}
              value={stats.yearsOfExperience}
              label="Years Exp"
            />
          </ProfileStatsRow>
        </div> */}
          <div className="mt-10">
          <ProfileTabs user={user} />
        </div>
      </Container>
  );
}

