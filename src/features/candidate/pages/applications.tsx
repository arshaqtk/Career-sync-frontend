import {ApplicationsFilter} from "../components/applications/applicationFilter";
import ApplicationsTable from "../components/applications/applicationTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { useApplicationData } from "../hooks/useApplication";
import type { ApplicationFilters } from "../types/applicationFilter.types";
import { useState } from "react";
import { useAuthStore } from "@/store/auth.store";

export default function ApplicationsPage() {

  const [filters, setFilters] = useState<ApplicationFilters>({status:"all" ,sortBy:"newest"});
  const candidateId=useAuthStore((state)=>state.user?.id) as string
  const {data:applications,isLoading,error} = useApplicationData({candidateId,filters}) // your fetched data
 if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load user</p>;

  return (
     
    <div className="space-y-6">
      <ApplicationsFilter  filters={filters} onChange={setFilters}/>

      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
        </CardHeader>

        <CardContent>
          <ApplicationsTable applications={applications} />
        </CardContent>
      </Card>
    </div>
  );
}
