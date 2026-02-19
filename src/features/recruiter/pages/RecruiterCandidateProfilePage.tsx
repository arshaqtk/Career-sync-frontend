import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import BasicInfoCard from "../components/candidate-profile/BasicInfoCard";
import AboutCard from "../components/candidate-profile/AboutCard";
import SkillsCard from "../components/candidate-profile/SkillsCard";
import ExperienceCard from "../components/candidate-profile/ExperienceCard";
import EducationCard from "../components/candidate-profile/EducationCard";
import ResumeCard from "../components/candidate-profile/ResumeCard";
import PortfolioCard from "../components/candidate-profile/PortfolioCard";
import useRecruiterFetchCandidateProfile from "../hooks/useFetchCandidateProfile";
import { CandidateProfileSkeleton } from "@/components/Loaders";
import { handleRQError } from "@/lib/react-query/errorHandler";
import { Button } from "@/components/ui/shadcn/button";
import { ArrowLeft } from "lucide-react";

export default function RecruiterCandidateProfilePage() {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useRecruiterFetchCandidateProfile(candidateId!);

  useEffect(() => {
    if (error) handleRQError(error);
  }, [error]);

  if (isLoading) return <CandidateProfileSkeleton />

  if (!data) return (
    <div className="p-10 text-center">
      <p className="text-gray-500">No candidate profile found.</p>
      <Button variant="link" onClick={() => navigate(-1)} className="mt-4">
        Go Back
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="h-9 w-9 p-0 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Candidate Profile</h1>
            <p className="text-sm text-gray-500 font-medium">Viewing full details for {data.name}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <BasicInfoCard candidate={data} />
          <AboutCard about={data.candidateData.about} />
          <ExperienceCard experience={data.candidateData.experience} />
          <EducationCard education={data.candidateData.education} />
        </div>

        {/* Sidebar Area */}
        <div className="space-y-6">
          <SkillsCard skills={data.candidateData.skills} />
          <ResumeCard resume={data.candidateData.resume} />
          <PortfolioCard url={data.candidateData.portfolioUrl} />
        </div>
      </div>
    </div>
  );
}
