import { Container } from "@/components/ui/container";
import  useCandidateData  from "@/hooks/useUserData";

import { EditProfileForm } from "../components/profile/EditProfileForm";
import { SectionSkeleton } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";

export default function EditProfilePage() {
  const { data: user, isLoading, error ,isError} = useCandidateData();

   if (isLoading) {
      return <SectionSkeleton />
    }
   if(isError)handleRQError(error)
  if (!user) return <p>No user data available</p>;

  return (
      <Container className="py-8">
        <h1 className="text-2xl font-semibold mb-6">Edit Profile</h1>
        <EditProfileForm user={user} />
      </Container>
  );
}
