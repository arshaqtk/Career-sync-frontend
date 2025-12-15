import { useParams } from "react-router-dom";
import { useCandidateProfile } from "../hooks/useCandidateProfile";

import BasicInfoCard from "../components/candidate-profile/BasicInfoCard";
import AboutCard from "../components/candidate-profile/AboutCard";
import SkillsCard from "../components/candidate-profile/SkillsCard";
import ExperienceCard from "../components/candidate-profile/ExperienceCard";
import EducationCard from "./components/EducationCard";
import ResumeCard from "../components/candidate-profile/ResumeCard";
import PortfolioCard from "../components/candidate-profile/PortfolioCard";

export default function CandidateProfilePage() {
  const { candidateId } = useParams();
  const { data, isLoading } = useCandidateProfile(candidateId!);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No candidate found.</p>;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-6">
      <h1 className="text-3xl font-semibold">Candidate Profile</h1>

      <BasicInfoCard candidate={data} />
      <AboutCard about={data.about} />
      <SkillsCard skills={data.skills} />
      <ExperienceCard experience={data.experience} />
      {/* <EducationCard education={data.education} /> */}
      <ResumeCard resume={data.resume} />
      <PortfolioCard url={data.portfolioUrl} />
    </div>
  );
}
