import { Container } from "@/components/ui/container";
import { ProfileHeader } from "../components/profile/ProfileHeader";
import { ProfileTabs } from "../components/profile/ProfileTabs";
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
          <div className="mt-10">
          <ProfileTabs user={user} />
        </div>
      </Container>
  );
}

