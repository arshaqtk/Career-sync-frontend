import { Container } from "@/components/ui/container";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileStatsRow } from "../components/profile/ProfileStatsRow";
import { ProfileStatCard } from "../components/profile/ProfileStatCard";
import { ProfileTabs } from "../components/profile/ProfileTabs";
import { FileText, Video, Award, Clock } from "lucide-react";
import useUserData from "@/hooks/useUserData";

export default function CandidateProfilePage() {
  const { data: user, isLoading, error } = useUserData();
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load user</p>;
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
            value="24"
            label="Applications Submitted"
          />
          <ProfileStatCard
            icon={<Video size={20} />}
            value="8"
            label="Interviews Attended"
          />
          <ProfileStatCard
            icon={<Award size={20} />}
            value="3"
            label="Offers Received"
          />
          <ProfileStatCard
            icon={<Clock size={20} />}
            value="4+"
            label="Years of Experience"
          />
        </ProfileStatsRow>

        <ProfileTabs user={user} />
      </Container>
  );
}

