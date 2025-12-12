import ApplicationsFilters from "../components/applications/applicationFilter";
import ApplicationsTable from "../components/applications/applicationTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { useApplicationData } from "../hooks/useApplication";
import CandidateLayout from "@/layouts/dashboard-layout";
export default function ApplicationsPage() {
  const {data:applications,isLoading,error} = useApplicationData() // your fetched data
 if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load user</p>;

  return (
     <CandidateLayout>
    <div className="space-y-6">
      <ApplicationsFilters />

      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
        </CardHeader>

        <CardContent>
          <ApplicationsTable applications={applications} />
        </CardContent>
      </Card>
    </div>
    </CandidateLayout>
  );
}
