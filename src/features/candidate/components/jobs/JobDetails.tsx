import { Button } from "@/components/ui/shadcn/button";
import type { CandidateJob } from "@/features/candidate/types/candidateJob.type";
import { ApplyToJobModal } from "../Modals/applyToJobModal";
import { useState } from "react";
import type { ApplyJobDTO } from "../../types/application.types";
import { useApplyNow } from "../../hooks/useApplication";
import useUserData from "@/hooks/useUserData";
import { Banknote, Briefcase, MapPin, Info, Share2, Building, Globe } from "lucide-react";
import { Badge } from "@/components/ui/shadcn/badge";
import { Separator } from "@/components/ui/shadcn/separator";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";


interface JobDetailsProps {
  job?: CandidateJob | null;
}

export function JobDetails({ job }: JobDetailsProps) {
  const [open, setIsOpen] = useState(false);
  const { mutate: applyNowJOb, isSuccess } = useApplyNow();
  const { data: userData } = useUserData();
  const navigate = useNavigate()
  if (!job)
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground bg-card h-full min-h-[400px]">
        <div className="text-center p-8 border-2 border-dashed border-border rounded-xl">
          <Building className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="font-semibold text-foreground">Select a job to view details</p>
          <p className="text-sm text-muted-foreground">Your next opportunity is just a click away.</p>
        </div>
      </div>
    );

  const handleApplyToJOb = (data: ApplyJobDTO) => {
    applyNowJOb(data);
    closeModal();
  };

  const isClosed = job.status === "closed";
  const isPaused = job.status === "paused";
  const isLoggedIn = userData
  let isApplied = job.hasApplied;
  if (isSuccess) {
    isApplied = true;
  }

  const closeModal = () => {
    setIsOpen(false);
  };
  const handleShare = async () => {
    const url = `${window.location.origin}/jobs?id=${job._id}`;
    if (navigator.share) {
      await navigator.share({
        title: "Check out this job",
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Job link copied!");
    }
  };

  return (
    <div className="flex-1 bg-card h-full flex flex-col overflow-hidden">
      <ApplyToJobModal
        jobIds={job._id as string}
        open={open}
        onSubmit={handleApplyToJOb}
        OpenChange={closeModal}
        candidateresumeUrl={userData?.candidateData?.resume?.key}
      />

      <div className="flex-1 overflow-y-auto px-6 py-4 md:px-10 scrollbar-hide">
        {/* Header Section */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-extrabold text-foreground leading-tight mb-1">
                {job.title}
              </h1>
              <div className="flex flex-col gap-0.5">
                <p
                  className="text-base font-bold text-primary hover:underline cursor-pointer transition-all flex items-center gap-2"
                  onClick={() => {
                    const compId = typeof job.company === 'object' ? job.company._id : job.companyId;
                    if (compId) navigate(`/companies/${compId}`);
                  }}
                >
                  {job.companyLogo && (
                    <img src={job.companyLogo} alt={typeof job.company === 'string' ? job.company : job.company.name} className="w-5 h-5 object-contain rounded-sm" />
                  )}
                  {typeof job.company === 'string' ? job.company : job.company.name}
                </p>
                <p className="text-[14px] font-medium text-muted-foreground flex items-center gap-1.5">
                  <MapPin size={14} className="text-muted-foreground/70" />
                  {job.location || "Remote"}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex gap-2">
              {/* <Button variant="ghost" size="icon" className="h-9 w-9 border border-slate-200 hover:bg-slate-50">
                <Bookmark className="w-4 h-4 text-slate-400" />
              </Button> */}
              <Button onClick={handleShare} variant="ghost" size="icon" className="h-9 w-9 border border-border hover:bg-muted">
                <Share2 className="w-4 h-4 text-muted-foreground/70" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Badge variant="secondary" className="bg-muted text-foreground hover:bg-muted/80 border-none px-2 py-0.5 text-[11px] font-bold capitalize">
              {job.jobType}
            </Badge>
            <span className="text-[13px] font-semibold flex items-center gap-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-sm">
              <Banknote size={14} className="text-blue-500" />
              ₹ {job.salary || "Not disclosed"}
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              className={cn(
                "min-w-32 h-10 text-sm font-bold transition-all",
                !isClosed && !isApplied && !isPaused
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
              disabled={isClosed || isApplied || isPaused || !isLoggedIn}
              onClick={() => setIsOpen(true)}
            >
              {!isLoggedIn ? "Log in" : isClosed ? "Job Closed" : isPaused ? "Job Blocked" : isApplied ? "Applied" : "Apply Now"}
            </Button>
            <span className="text-[12px] text-muted-foreground/70 font-medium italic sm:ml-2">
              Posted recently
            </span>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Content Section */}
        <div className="space-y-10 pb-10">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              Full Job Description
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none text-foreground/80 leading-relaxed font-normal text-[15px]">
              {job.description?.split('\n').map((para, i) => (
                <p key={i} className="mb-4">{para}</p>
              ))}
            </div>
          </section>

          {job.skills && job.skills.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-foreground mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1.5 text-[13px] font-medium bg-muted/30 border-border text-foreground/80 rounded-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          <section className="bg-muted/30 rounded-lg p-6 border border-border/50">
            <h2 className="text-lg font-bold text-foreground mb-4">Role Particulars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground/70 font-bold uppercase tracking-wider mb-0.5">Experience</p>
                  <p className="text-[15px] font-semibold text-foreground/90">{job.experienceMin} - {job.experienceMax} years</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground/70 font-bold uppercase tracking-wider mb-0.5">Location Type</p>
                  <p className="text-[15px] font-semibold text-foreground/90 capitalize">{job.remote ? "Remote" : "On-site"}</p>
                </div>
              </div>
            </div>
          </section>

          {(isClosed || isPaused) && (
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-md flex items-center gap-3 text-destructive">
              <Info size={20} />
              <p className="font-bold text-sm">Applications are no longer being accepted for this position.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
