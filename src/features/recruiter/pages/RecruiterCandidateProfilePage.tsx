import { useParams } from "react-router-dom";

import BasicInfoCard from "../components/candidate-profile/BasicInfoCard";
import AboutCard from "../components/candidate-profile/AboutCard";
import SkillsCard from "../components/candidate-profile/SkillsCard";
import ExperienceCard from "../components/candidate-profile/ExperienceCard";
// import EducationCard from "./components/EducationCard";
import ResumeCard from "../components/candidate-profile/ResumeCard";
import PortfolioCard from "../components/candidate-profile/PortfolioCard";
import useRecruiterFetchCandidateProfile from "../hooks/useFetchCandidateProfile";
import { SectionSkeleton } from "@/components/Loaders";

export default function RecruiterCandidateProfilePage() {
  const { candidateId } = useParams();
 
  const { data, isLoading } = useRecruiterFetchCandidateProfile(candidateId!);

  if (isLoading) return <SectionSkeleton/>
  if (!data) return <p>No candidate found.</p>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-semibold">Candidate Profile</h1>

      <BasicInfoCard candidate={data} />
      <AboutCard about={data.candidateData.about} />
      <SkillsCard skills={data.candidateData.skills} />
      <ExperienceCard experience={data.candidateData.experience} />
      {/* <EducationCard education={data.education} /> */}
      <ResumeCard resume={data.candidateData.resume} />
      <PortfolioCard url={data.candidateData.portfolioUrl} />
    </div>
  );
}
