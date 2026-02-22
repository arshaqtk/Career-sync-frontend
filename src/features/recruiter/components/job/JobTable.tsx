import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/shadcn/table";
import { Badge } from "@/components/ui/shadcn/badge";
import type { Job } from "../../types/job.type";
import { JobActions } from "./jobActions";
import { useState } from "react";
import { JobDetailDrawer } from "./JobDetailDrawer";

interface JobTableProps {
    jobs: Job[];
    isLoading?: boolean;
}

export function JobTable({ jobs, isLoading }: JobTableProps) {
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleRowClick = (job: Job) => {
        setSelectedJob(job);
        setIsDrawerOpen(true);
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="animate-pulse space-y-3">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50 border-b border-gray-200">
                            <TableHead className="font-semibold text-gray-700 h-12">Job Title</TableHead>
                            <TableHead className="font-semibold text-gray-700">Type</TableHead>
                            <TableHead className="font-semibold text-gray-700">Location</TableHead>
                            <TableHead className="font-semibold text-gray-700">Applicants</TableHead>
                            <TableHead className="font-semibold text-gray-700">Status</TableHead>
                            <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow
                                key={job._id}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                                onClick={() => handleRowClick(job)}
                            >
                                <TableCell className="py-4">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-900">{job.title}</span>
                                        <span className="text-sm text-gray-500">{typeof job?.company=="string"?job?.company:job?.company?.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="secondary"
                                        className="font-normal capitalize bg-gray-100 text-gray-700 border-0"
                                    >
                                        {job.jobType}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-600">{job.location}</TableCell>
                                <TableCell>
                                    <span className="font-medium text-gray-900">{job.applicationCount || 0}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`font-medium capitalize ${job.status === "open"
                                                ? "border-green-600 text-green-700 bg-green-50"
                                                : job.status === "closed"
                                                    ? "border-red-600 text-red-700 bg-red-50"
                                                    : "border-orange-600 text-orange-700 bg-orange-50"
                                            }`}
                                    >
                                        {job.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                                    <JobActions id={job._id!} status={job.status} job={job} asDropdown />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <JobDetailDrawer
                job={selectedJob}
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
            />
        </>
    );
}
