import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import type { ApplicantDTO } from "../../dto/applicant.dto";
import { Briefcase, Building2, Clock, DollarSign, MapPin } from "lucide-react";


type JobInfoProps={job:ApplicantDTO["jobId"]}

export  function JobInfoCard({ job }:JobInfoProps) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Briefcase className="h-4 w-4" />
          Job Information
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Briefcase className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Job Title</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{job?.title}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Building2 className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Company</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{job?.company}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <MapPin className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Location</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{job?.location}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Employment Type</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5 capitalize">{job?.jobType}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <DollarSign className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Salary Range</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{job?.salary}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
