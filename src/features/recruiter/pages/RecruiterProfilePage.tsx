
import { RecruiterProfileDetails } from "../components/profile/ProfileDetails";
import { RecruiterProfileHeader } from "../components/profile/profileHeader";
// import { RecruiterActivity } from "../components/profile/RecruiterActivity";
import { RecruiterStats } from "../components/profile/RecruiterStats";
import useFetchRecruiterProfile from "../hooks/useFetchProfile";
import useFetchRecruiterProfileStats from "../hooks/useRecruiterProfileStats";

export default function RecruiterProfilePage() {
    const { data: user, isLoading, error } = useFetchRecruiterProfile();
    const { data:stats,isLoading:statsIsLoading } = useFetchRecruiterProfileStats();

    if(isLoading||statsIsLoading){
        return <div>Loading</div>
    }
    if(error){
      return <div>Error</div>
    }
  return (
    <div className="space-y-6">
      <RecruiterProfileHeader recruiter={user}  />
      <RecruiterStats activeJobs={stats.activeJobs} applicationsCount={stats.applicationsCount} hiresCount={stats.hiresCount} 
      interviewsCount={stats.interviewsCount} jobsPosted={stats.jobsPosted} />
      <RecruiterProfileDetails profile={user} />
      {/* <RecruiterActivity /> */}
    </div>
  )
}
