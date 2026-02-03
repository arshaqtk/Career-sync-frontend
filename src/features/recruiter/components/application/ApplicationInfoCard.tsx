import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/shadcn/card";
import { Badge } from "@/components/ui/shadcn/badge";
import type { ApplicantDTO } from "../../dto/applicant.dto";
import { Info, Briefcase, IndianRupee, Clock, Calendar, FileText } from "lucide-react";

type ApplicationInfoProps = Pick<
  ApplicantDTO,
  | "status"
  | "experience"
  | "currentRole"
  | "expectedSalary"
  | "noticePeriod"
  | "createdAt"
  | "coverLetter"
>;

export function ApplicationInfoCard({ application }: { application: ApplicationInfoProps }) {
  return (
    <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200 py-4">
        <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <Info className="h-4 w-4" />
          Application Details
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Briefcase className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Current Role</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{application.currentRole || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <IndianRupee className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Expected Salary</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">₹{application.expectedSalary?.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Calendar className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Applied On</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">
                  {new Date(application.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Clock className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Notice Period</p>
                <p className="text-sm font-semibold text-gray-900 mt-0.5">{application.noticePeriod}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-100 rounded-lg shrink-0">
                <Info className="h-4 w-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Status</p>
                <Badge
                  variant="outline"
                  className={`mt-1 font-medium ${application.status === "Interview" ? "border-blue-600 text-blue-700 bg-blue-50" :
                      application.status === "Shortlisted" ? "border-purple-600 text-purple-700 bg-purple-50" :
                        application.status === "Selected" ? "border-green-600 text-green-700 bg-green-50" :
                          application.status === "Rejected" ? "border-red-600 text-red-700 bg-red-50" :
                            "border-gray-300 text-gray-600 bg-gray-50"
                    }`}
                >
                  {application.status}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {application.coverLetter && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-4 w-4 text-gray-400" />
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Cover Letter</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed italic">
                "{application.coverLetter}"
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
