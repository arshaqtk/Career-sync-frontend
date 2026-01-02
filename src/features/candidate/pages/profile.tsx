import { Container } from "@/components/ui/container";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileStatsRow } from "../components/profile/ProfileStatsRow";
import { ProfileStatCard } from "../components/profile/ProfileStatCard";
import { ProfileTabs } from "../components/profile/ProfileTabs";
import { FileText, Video, Award, Clock } from "lucide-react";
import useUserData from "@/hooks/useUserData";
import useFetchCandidateProfileStats from "../hooks/useProfileStats";
import { SectionSkeleton } from "@/components/Loaders";

export default function CandidateProfilePage() {
  const { data: user, isLoading, error } = useUserData();
  const {data:stats, isLoading:statsLoading, error:statsError }=useFetchCandidateProfileStats()
  if (isLoading||statsLoading) return  <SectionSkeleton />
     
  if (error||statsError) return <p>Failed to load user</p>;
  if (!user) return <p>No user found</p>;

  const { name, email, phone, profilePictureUrl } = user;

  return (
    
      <Container className="py-6">
        <ProfileHeader
          user={{
            name,
            email,
            phone,
            profilePictureUrl,
          }}
        />

        <ProfileStatsRow>
          <ProfileStatCard
            icon={<FileText size={20} />}
            value={stats.totalApplications}
            label="Applications Submitted"
          />
          <ProfileStatCard
            icon={<Video size={20} />}
            value={stats.totalInterviews}
            label="Interviews Attended"
          />
          <ProfileStatCard
            icon={<Award size={20} />}
            value={stats.offersReceived}
            label="Offers Received"
          />
          <ProfileStatCard
            icon={<Clock size={20} />}
            value={stats.yearsOfExperience}
            label="Years of Experience"
          />
        </ProfileStatsRow>

        <ProfileTabs user={user} />
      </Container>
  );
}

