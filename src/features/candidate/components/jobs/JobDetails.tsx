import { Button } from "@/components/ui/shadcn/button";
import type { CandidateJob } from "@/features/candidate/types/candidateJob.type";
import { ApplyToJobModal } from "../Modals/applyToJobModal";
import { useState } from "react";
import type { ApplyJobDTO } from "../../types/application.types";
import { useApplyNow } from "../../hooks/useApplication";
import useUserData from "@/hooks/useUserData";
import { Banknote, Briefcase, MapPin, Bookmark, Info, Share2, Building, Globe } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";
import { Separator } from "@/components/ui/shadcn/separator";
import { cn } from "@/lib/utils";

interface JobDetailsProps {
  job?: CandidateJob | null;
}

export function JobDetails({ job }: JobDetailsProps) {
  const [open, setIsOpen] = useState(false);
  const { mutate: applyNowJOb, isSuccess } = useApplyNow();
  const { data: userData } = useUserData();

  if (!job)
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-white h-full min-h-[400px]">
        <div className="text-center p-8 border-2 border-dashed border-slate-100 rounded-xl">
          <Building className="w-12 h-12 mx-auto mb-4 text-slate-200" />
          <p className="font-semibold text-slate-500">Select a job to view details</p>
          <p className="text-sm text-slate-400">Your next opportunity is just a click away.</p>
        </div>
      </div>
    );

  const handleApplyToJOb = (data: ApplyJobDTO) => {
    applyNowJOb(data);
    closeModal();
  };

  const isClosed = job.status === "closed";
  const isPaused = job.status === "paused";
  let isApplied = job.hasApplied;
  if (isSuccess) {
    isApplied = true;
  }

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex-1 bg-white h-full flex flex-col overflow-hidden">
      <ApplyToJobModal
        jobIds={job._id as string}
        open={open}
        onSubmit={handleApplyToJOb}
        OpenChange={closeModal}
        candidateResumeUrl={userData?.candidateData?.resumeUrl}
      />

      <div className="flex-1 overflow-y-auto px-6 py-4 md:px-10 scrollbar-hide">
        {/* Header Section */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-tight mb-1">
                {job.title}
              </h1>
              <div className="flex flex-col gap-0.5">
                <p className="text-base font-bold text-blue-600 hover:underline cursor-pointer transition-all">
                  {job.company}
                </p>
                <p className="text-[14px] font-medium text-slate-600 flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  {job.location || "Remote"}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 border border-slate-200 hover:bg-slate-50">
                <Bookmark className="w-4 h-4 text-slate-400" />
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 border border-slate-200 hover:bg-slate-50">
                <Share2 className="w-4 h-4 text-slate-400" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-100 border-none px-2 py-0.5 text-[11px] font-bold capitalize">
              {job.jobType}
            </Badge>
            <span className="text-[13px] font-semibold text-slate-800 flex items-center gap-1.5 bg-blue-50 text-blue-700 px-2 py-0.5 rounded-sm">
              <Banknote size={14} className="text-blue-500" />
              ₹ {job.salary || "Not disclosed"}
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              className={cn(
                "min-w-32 h-10 text-sm font-bold transition-all",
                !isClosed && !isApplied && !isPaused
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  : "bg-slate-200 text-slate-500 cursor-not-allowed"
              )}
              disabled={isClosed || isApplied || isPaused}
              onClick={() => setIsOpen(true)}
            >
              {isClosed ? "Job Closed" : isPaused ? "Job Blocked" : isApplied ? "Applied" : "Apply Now"}
            </Button>
            <span className="text-[12px] text-slate-400 font-medium italic sm:ml-2">
              Posted recently
            </span>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Content Section */}
        <div className="space-y-10 pb-10">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              Full Job Description
            </h2>
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-normal text-[15px]">
              {job.description?.split('\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          </section>

          {job.skills && job.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1.5 text-[13px] font-medium bg-slate-50 border-slate-200 text-slate-700 rounded-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          <section className="bg-slate-50 rounded-lg p-6 border border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Role Particulars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Experience</p>
                  <p className="text-[15px] font-semibold text-slate-800">{job.experienceMin} - {job.experienceMax} years</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-0.5">Location Type</p>
                  <p className="text-[15px] font-semibold text-slate-800 capitalize">{job.remote ? "Remote" : "On-site"}</p>
                </div>
              </div>
            </div>
          </section>

          {(isClosed || isPaused) && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-md flex items-center gap-3 text-red-600">
              <Info size={20} />
              <p className="font-bold text-sm">Applications are no longer being accepted for this position.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
