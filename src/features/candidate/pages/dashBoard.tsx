import DashBoardLayout from '@/layouts/dashboard-layout'
import WelcomeHeader from '../components/dashboard/WelcomeHeader'
import StatsSection from '../components/dashboard/StatsSection'
import RecommendedJobsSection from '../components/dashboard/RecommendedJobsSection'
import UpcomingInterviewsSection from '../components/dashboard/UpcomingInterviewsSection'
import useCandidateData from '../../../hooks/useUserData'

export default  function DashboardPage() {
    const { data: user,isLoading } = useCandidateData();
  if (isLoading) return <div>Loading...</div>;
    

  return (
    <DashBoardLayout>
        <WelcomeHeader name={user.name}/>
         <StatsSection />
      <RecommendedJobsSection />
      <UpcomingInterviewsSection />
    </DashBoardLayout>
  )
}

