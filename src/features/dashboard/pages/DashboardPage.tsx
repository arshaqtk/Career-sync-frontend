import CandidateLayout from '@/layouts/dashboard-layout'
import React from 'react'
import WelcomeHeader from '../components/WelcomeHeader'
import StatsSection from '../components/StatsSection'
import RecommendedJobsSection from '../components/RecommendedJobsSection'
import UpcomingInterviewsSection from '../components/UpcomingInterviewsSection'

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

