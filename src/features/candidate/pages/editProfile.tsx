import { Container } from "@/components/ui/container";
import CandidateLayout from "@/layouts/dashboard-layout";
import  useCandidateData  from "@/features/candidate/queries/useCandidateProfile";

import { EditProfileForm } from "../components/profile/EditProfileForm";

export default function EditProfilePage() {
  const { data: user, isLoading, error } = useCandidateData();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load profile</p>;
  if (!user) return <p>No user data available</p>;

  return (
    <CandidateLayout>
      <Container className="py-8">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
        <EditProfileForm user={user} />
      </Container>
    </CandidateLayout>
  );
}
