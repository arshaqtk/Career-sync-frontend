import { Container } from "@/components/ui/container";

import { RecruiterEditProfileForm } from "../components/profile/EditProfileForm";
import useFetchRecruiterProfile from "../hooks/useFetchProfile";
import { SectionSkeleton } from "@/components/Loaders";

export default function RecruiterEditProfilePage() {
  const { data: user, isLoading, error } = useFetchRecruiterProfile();

  if (isLoading) return <SectionSkeleton/>
  if (error) return <p>Failed to load profile</p>;
  if (!user) return <p>No user data available</p>;

  return (
      <Container className="py-8">
        <RecruiterEditProfileForm user={user} />
      </Container>
  );
}