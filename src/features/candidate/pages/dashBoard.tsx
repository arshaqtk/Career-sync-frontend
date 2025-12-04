import CandidateLayout from '@/layouts/dashboard-layout'
import React from 'react'
import WelcomeHeader from '../components/dashboard/WelcomeHeader'
import StatsSection from '../components/dashboard/StatsSection'
import RecommendedJobsSection from '../components/dashboard/RecommendedJobsSection'
import UpcomingInterviewsSection from '../components/dashboard/UpcomingInterviewsSection'

export default  function DashboardPage() {
  return (
    <CandidateLayout>
        <WelcomeHeader/>
         <StatsSection />
      <RecommendedJobsSection />
      <UpcomingInterviewsSection />
    </CandidateLayout>
  )
}

